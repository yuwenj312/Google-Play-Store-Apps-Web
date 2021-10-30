import React from 'react';
import httpClient from './httpClient'
import '../style/signup.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import {
	Redirect
} from 'react-router-dom';

export default class Signup extends React.Component {
	constructor(props) {
		super(props);
	}

	state = {
		fields: { name: '', email: '', password: ''},
		redirectToReferrer: false
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
		console.log(this.state.fields);
		this.setState({
			redirectToReferrer: true
		})
		axios({
			method: "POST",
			url: "http://localhost:8081/signup",
			data: this.state.fields
		}).then(response => {
			console.log(response);
		})
	}

	render() {
  		   const redirectToReferrer = this.state.redirectToReferrer;
           if (redirectToReferrer) {
             return <Redirect to="" />
             }
		return (
  			<div className="App">
				<div className='col-md-6 offset-md-3 text-center'>
					<h3>Sign up</h3>
					<form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
						<input type="text" placeholder="Username" name="name" value={this.state.name} />
						<br></br>
						<input type="text" placeholder="Email" name="email" value={this.state.email} />
						<br></br>
						<input type="password" placeholder="Password" name="password" value={this.state.password} />
						<br></br>
						<button>Sign up</button>
					</form>
					<br></br>
				</div>
  			</div>

		   );
	}
}

