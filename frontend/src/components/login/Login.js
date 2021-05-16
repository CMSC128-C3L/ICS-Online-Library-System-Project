import React from 'react';
import { GoogleLogin } from 'react-google-login';
import {useHistory} from 'react-router-dom'
import googleIcon from '../../assets/googleIcon.png';
// refresh token
// import { refreshTokenSetup } from '../utils/refreshToken';

const clientId = '138358192531-fu4c71u8ev4vbh1mv1aa6ebudt1d7g4h.apps.googleusercontent.com';

function Login() {
  const history = useHistory();
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    const id_token = res.getAuthResponse().id_token;
    console.log(id_token);

    const response = fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id_token})
    });
    console.log(response);
    // const data = response.json(); //causes error: json() is not a function
    // // console.log(response.json());
    // localStorage.setItem('token', data.token);
    history.push('/adminHome'); //if success, redirect to user account
    alert(
      `Logged in successfully welcome ${res.profileObj.name}. \n See console for full profile object.`
    );
    // refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login.`
    );
  };

  const sectionStyle = {
    background: 'white',
    color: '#444',
    'white-space': 'nowrap',

    backgroundImage: 'url("'+(googleIcon)+'")',
    width: '42px',
    height: '50px',

    'vertical-align': 'middle',
    'padding-left': '42px',
    'padding-right': '60px',
    'font-size': '16px',
    'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
  };

return (
    <div>
      <GoogleLogin
        clientId={clientId}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
 
        render={renderProps => (
          <button onClick={renderProps.onClick} disabled={renderProps.disabled} style={sectionStyle}>LOG IN</button>
        )}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;