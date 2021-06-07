import React, {useState, useEffect, useContext} from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useHistory } from 'react-router-dom'
import googleIcon from '../../assets/googleIcon.png';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import '../header_user/Header.css';
import decode from 'jwt-decode';
import axios from 'axios';
import { UserContext } from '../user/UserContext'

// refresh token
// import { refreshTokenSetup } from '../utils/refreshToken';

const clientId = '138358192531-fu4c71u8ev4vbh1mv1aa6ebudt1d7g4h.apps.googleusercontent.com';

function Login() {
  const history = useHistory();
  const {loggedUser, setLoggedUser} = useContext(UserContext); 

  const onSuccess = async (res) => {
    var auth2 = window.gapi.auth2.getAuthInstance();
    console.log('Login Success: currentUser:', res.profileObj);
    const id_token = res.getAuthResponse().id_token;
    console.log(id_token);

    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id_token})
    });
    console.log(response);

    if(response.status == 401) {
      alert('Please log in with a up.edu.ph email.');
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
    } else {
      
      const data = await response.json();

      // store user token verified by backend server
      const user = decode(data.token);
      // console.log('data', user);
      localStorage.setItem('token', data.token);

      //RECORD LOGIN
      let options =  {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}, }
      const user_id = await axios.get('/api/log/user/'+user.email, options);
      // console.log(user_id);
      const login_date = new Date();
      const record = await axios.post('/api/log/login', {
          user_id: user_id.data,
          log_date: [
              {
                login: login_date.toISOString()
              }
          ],
          doc_count: 0,
          doc_log:[]
      }, options);
      // console.log(user_id.data);
      user.user_id = user_id.data;
      user.log_id = record.data;
      // console.log(user);
      setLoggedUser(user);
      history.push(`/adminHome`); //if success, redirect to user account
      // refreshTokenSetup(res);
    }
  };



  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login.`
    );
  };

  const googleLogo = (
    <Icon>
      <img src={googleIcon}></img>
    </Icon>
  );
  
return (
      <GoogleLogin
        clientId={clientId}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
 
        render={renderProps => (
          <Button className="Button" startIcon={googleLogo}  onClick={renderProps.onClick} disabled={renderProps.disabled}>LOG IN</Button>
        )}
        isSignedIn={true}
      />
  );
}

export default Login;