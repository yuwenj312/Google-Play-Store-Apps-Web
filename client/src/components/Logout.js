import React from 'react';
import httpClient from './httpClient'
import PageNavbar from './PageNavbar';
import '../style/BestGenres.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

export default class Login extends React.Component {
	componentDidMount() {
		this.props.onLogOut()
	}



	render() {

		return (
  			<Redirect to="/" />
		);
	}
}

