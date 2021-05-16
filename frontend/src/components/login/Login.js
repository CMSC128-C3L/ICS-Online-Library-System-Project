import React from 'react';
import { GoogleLogin } from 'react-google-login';
import {useHistory} from 'react-router-dom'
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

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;