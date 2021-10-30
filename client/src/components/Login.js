import React from 'react';
import httpClient from './httpClient'
import PageNavbar from './PageNavbar';
import '../style/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import {
	Link
} from 'react-router-dom';

export default class Login extends React.Component {
	constructor(props) {
		super(props);
	}

	state = {
		fields: { email: '', password: ''}
	}

	onInputChange(evt) {
		this.setState({
			fields: {
				...this.state.fields,
				[evt.target.name]: evt.target.value
			}
		})
	}

	onFormSubmit(evt) {
		evt.preventDefault()
		httpClient.logIn(this.state.fields).then(user => {
			console.log(user);
			this.setState({ fields: { email: '', password: '' } })
			if(user) {
				this.props.onLoginSuccess(user)
				this.props.history.push('/vip')
			}
			
		})
	}

	responseSuccessGoogle = (response) => {
	  console.log(response);
	  httpClient.logIngoogle(response.tokenId).then(user => {
			console.log(user);
			this.setState({ fields: { email: '', password: '' } })
			if(user) {
				this.props.onLoginSuccess(user)
				this.props.history.push('/vip')
			}
	  })
	 //  setTimeout(function(){
		//             window.location.href = 'http://localhost:3000/dashboard';
	 //  }, 2000);

	}

	responseFailureGoogle = (response) => {
	  console.log(response);
	}


	responseFacebook = (response) => {
	  console.log(response);
	  httpClient.logInfacebook({accessToken: response.accessToken, userID: response.userID}).then(user => {
			console.log(user);
			this.setState({ fields: { email: '', password: '' } })
			if(user) {
				this.props.onLoginSuccess(user)
				this.props.history.push('/vip')
			}
	  })
	 //  setTimeout(function(){
		//             window.location.href = 'http://localhost:3000/dashboard';
	 //  }, 2000);

	}


	render() {

		return (
  			<div className="App">
  				<h1>Welcome to our App Store!</h1>
  				<div className = "col-md-6 offset-md-3 text-center">
  			    <h3>Login with Google</h3>
  			    <GoogleLogin
			    clientId="917647116939-p2a84fj85v0te6ng48cbnoq5fh2d942a.apps.googleusercontent.com"
			    buttonText="Login"
			    onSuccess={this.responseSuccessGoogle}
			    onFailure={this.responseFailureGoogle}
			    cookiePolicy={'single_host_origin'}
			    />
  			    </div>
  			    <div className = "col-md-6 offset-md-3 text-center">
  			    <h3>Login with Facebook</h3>
  			    <FacebookLogin
			    appId="186003696492787"
			    autoLoad={false}
			    callback={this.responseFacebook} />
  			    </div>
				<div className='col-md-6 offset-md-3 text-center'>
					<h3>Log In</h3>
					<form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
						<input type="text" placeholder="Email" name="email" value={this.state.email} />
						<br></br>
						<input type="password" placeholder="Password" name="password" value={this.state.password} />
						<br></br>
						<button>Log In</button>
					</form>
					<br></br>
					<Link to="/signup">Click me to register!</Link>
				</div>

  			</div>
		);
	}
}

