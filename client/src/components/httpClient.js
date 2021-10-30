import axios from 'axios'
import jwtDecode from 'jwt-decode'

// instantiate axios
const httpClient = axios.create()

httpClient.getToken = function() {
	return localStorage.getItem('token')
}

httpClient.setToken = function(token) {
	localStorage.setItem('token', token)
	return token
}

httpClient.getCurrentUser = function() {
	const token = this.getToken()
	if(token) return jwtDecode(token)
	return null
}

httpClient.logIn = function(credentials) {
	return this({ method: 'post', url: '/signin', data: credentials })
		.then((serverResponse) => {
			console.log(serverResponse);
			const token = serverResponse.data.token
			if(token) {
				// sets token as an included header for all subsequent api requests
				this.defaults.headers.common.token = this.setToken(token)
				return jwtDecode(token)
			} else {
				return false
			}
		})
}

httpClient.logIngoogle = function(credentials) {
				console.log("Google login success", credentials);
	return this({ method: 'post', url: '/api/googlelogin', data: {tokenId: credentials} })
		.then((serverResponse) => {
			console.log("Google login success", serverResponse);
			console.log("Google login success**", serverResponse.data.user);
			const token = serverResponse.data.token
			if(token) {
				// sets token as an included header for all subsequent api requests
				this.defaults.headers.common.token = this.setToken(token)
				return jwtDecode(token)
			} else {
				return false
			}
		})
}


httpClient.logInfacebook = function(credentials) {
				console.log("Facebook login success", credentials);
	return this({ method: 'post', url: '/api/facebooklogin', data: credentials })
		.then((serverResponse) => {
			console.log("Google login success", serverResponse);
			console.log("Google login success**", serverResponse.data.user);
			const token = serverResponse.data.token
			if(token) {
				// sets token as an included header for all subsequent api requests
				this.defaults.headers.common.token = this.setToken(token)
				return jwtDecode(token)
			} else {
				return false
			}
		})
}


	 //  axios({
		// 	method: "POST",
		// 	url: "http://localhost:8081/api/facebooklogin",
		// 	data: {accessToken: response.accessToken, userID: response.userID}
		// }).then(response => {
		// 	console.log("Facebook login success, client side", response);
		// 	if(response) {
		// 		console.log("Facebook login success**", response.data.token);
		// 		this.props.onLoginSuccess(response.data.token)
		// 		this.props.history.push('/')
		// 	}
		// }).catch((err) => {
  //         console.log(err);
  //       })




	 //  axios({
		// 	method: "POST",
		// 	url: "http://localhost:8081/api/googlelogin",
		// 	data: {tokenId: response.tokenId}
		// }).then(response => {
		// 	console.log("Google login success", response);
		// 	console.log("Google login success**", response.data.user);
		// 	if(response) {
		// 		this.props.onLoginSuccess(response.data.user)
		// 		this.props.history.push('/')
		// 	}
		// })

// logIn and signUp functions could be combined into one since the only difference is the url we're sending a request to..
httpClient.signUp = function(userInfo) {
	return this({ method: 'post', url: '/api/users', data: userInfo})
		.then((serverResponse) => {
			const token = serverResponse.data.token
			if(token) {
				// sets token as an included header for all subsequent api requests
				this.defaults.headers.common.token = this.setToken(token)
				return jwtDecode(token)
			} else {
				return false
			}
		})
}

httpClient.logOut = function() {
	localStorage.removeItem('token')
	delete this.defaults.headers.common.token
	return true
}

// During initial app load attempt to set a localStorage stored token
// as a default header for all api requests.
httpClient.defaults.headers.common.token = httpClient.getToken()
export default httpClient