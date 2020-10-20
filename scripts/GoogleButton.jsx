import * as React from 'react';
import { Socket } from './Socket';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import { Content } from './Content';


 function responseGoogle(response) {
    // TODO replace with name from oauth
    let name = response.profileObj.name;
    let email = response.profileObj.email;
    let url = response.profileObj.imageUrl;
    Socket.emit('new username', {
        'address': name+' ('+email+') :',
    });
    
    console.log('Sent the name ' + name +' and email '+email+ ' to the server!');
    ReactDOM.render(<Content />, document.getElementById('content'));
}

export function GoogleButton() {
  return( 
      <GoogleLogin
      className="googleButton"
      clientId="668309875676-im3a1fisoqlb32o5d09dd8t243qn9cok.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}/>
      );
}

