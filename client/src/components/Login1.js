import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import GenreButton from './GenreButton';
import DashboardMovieRow from './DashboardMovieRow';
import GoogleLogin from 'react-google-login';

function Login() {

const responseGoogle = (response) => {
  console.log(response);
}
 
return (
  <div>
  <GoogleLogin
    clientId="917647116939-p2a84fj85v0te6ng48cbnoq5fh2d942a.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
  </div>
);


}

export default Login;


