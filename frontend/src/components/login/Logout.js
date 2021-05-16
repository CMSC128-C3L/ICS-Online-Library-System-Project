import React from 'react';
import { GoogleLogout } from 'react-google-login';
import {useHistory} from 'react-router-dom'
import googleIcon from '../../assets/googleIcon.png';

const clientId = '138358192531-fu4c71u8ev4vbh1mv1aa6ebudt1d7g4h.apps.googleusercontent.com';

function Logout() {
  const history = useHistory();
  const onSuccess = () => {
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
    console.log(response);
    localStorage.removeItem('token'); 
    console.log('Logout made successfully');
    history.push('/');
    alert('Logout made successfully');
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
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
        render={renderProps => (
          <button onClick={renderProps.onClick} disabled={renderProps.disabled} style={sectionStyle}>Log Out</button>
        )}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;