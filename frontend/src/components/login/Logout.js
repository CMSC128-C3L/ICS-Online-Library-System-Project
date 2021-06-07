import React, {useState, useEffect, useContext} from 'react';
import { GoogleLogout } from 'react-google-login';
import {useHistory} from 'react-router-dom'
import googleIcon from '../../assets/googleIcon.png';
import '../header_user/Header.css';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { UserContext } from '../user/UserContext';
import axios from 'axios';
import decode from 'jwt-decode';
const clientId = '138358192531-fu4c71u8ev4vbh1mv1aa6ebudt1d7g4h.apps.googleusercontent.com';

function Logout() {
  const history = useHistory();
  const {loggedUser, setLoggedUser} = useContext(UserContext)
  const onSuccess = async () => {
    // console.log(loggedUser.email);
    let options =  {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}, }
    const logout_date = new Date();
    const record = await axios.post('/api/log/logout', {
          user_id: loggedUser.user_id,
          log_id: loggedUser.log_id,
          log_date: [
              {
                logout: logout_date.toISOString()
              }
          ]
      }, options);


    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    console.log(localStorage.getItem('token'));
    const response = fetch('/api/users/logout', {
      method:'GET',
      headers: new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    });

    

    setLoggedUser({});
    console.log(response);
    localStorage.removeItem('token'); 
    console.log('Logout made successfully');
    history.push('/');
    alert('Logout made successfully');
  };

  const googleLogo = (
    <Icon>
      <img src={googleIcon}></img>
    </Icon>
  );

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        onLogoutSuccess={onSuccess}
        render={renderProps => (
          <Button className="Button" startIcon={googleLogo} onClick={renderProps.onClick} disabled={renderProps.disabled}>LOGOUT</Button>
        )}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;