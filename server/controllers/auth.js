const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox572275ab82d74176b40d7db2240ad497.mailgun.org';
const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN});

const client = new OAuth2Client("917647116939-p2a84fj85v0te6ng48cbnoq5fh2d942a.apps.googleusercontent.com");
const fetch = require('node-fetch');

//create user without email account activation
exports.signup = (req,res) => {
	console.log(req.body);
	const {name, email, password} = req.body;
	User.findOne({email}).exec((err, user) => {
		if (user) {
			return res.status(400).json({error: "User with this email already exists"});
		}

		let newUser = new User({name, email, password});
		newUser.save((err, success) => {
			if (err) {
				console.log("Error in signup: ", err);
				return res.status(400).json({error: err})
			}
			res.json({
				message: "Signup success!"
			})
		})
	});
}

//create user with email account activation
exports.signup2 = (req,res) => {
	console.log(req.body);
	const {name, email, password} = req.body;
	User.findOne({email}).exec((err, user) => {
		if (user) {
			return res.status(400).json({error: "User with this email already exists"});
		}

		const token = jwt.sign({name, email, password}, process.env.JWT_ACC_ACTIVATE, {expiresIn: '20m'});

		const data = {
			from: 'noreply@hello.com',
			to: email,
			subject: 'Account Activation Link',
			html: `
				<h2>Please click on given link to activate your account</h2>
				<p>${process.env.CLIENT_URL}/authentication/activate/${token}</p>
			`
		};
		mg.messages().send(data, function (error, body) {
			if(err) {
				return res.json({
					error: err.message
				})
			}
			return res.json({message: 'Email has been sent, kindly activate your account'});
		});

	})
}

	exports.activateAccount = (req, res) => {
		const {token} = req.body;
		if(token) {
			jwt.verify(token, process.env.JWT_ACC_ACTIVATE, function(err, decodeToken) {
				if(err) {
					return res.status(400).json({error: 'incorrect or Expired link'})
				}
				const {name, email, password} = decodeToken;
				User.findOne({email}).exec((err, user) => {
					if (user) {
						return res.status(400).json({error: "User with this email already exists"});
					}
					let newUser = new User({name, email, password});
					newUser.save((err, success) => {
						if (err) {
							console.log("Error in signup while account activation: ", err);
							return res.status(400).json({error: 'Error activating account'})
						}
						res.json({
							message: "Signup success!"
						})
					})
				})
			}) 
		}

	}


exports.signin = (req, res) => {
	const {email, password} = req.body;
	User.findOne({email}).exec((err, user) => {
		console.log(user);
		if(!user) {
			// deny access
			return res.json({success: false, message: "Invalid credentials."})
		}
		if (err) {
			return res.status(400).json({
				error: "This user doesn't exist, signup first"
			})
		}

		if (user.password !== password) {
			return res.status(400).json({
				error: "Email or password incorrect"
			})
		}
		const token = jwt.sign({_id: user._id}, process.env.JWT_SIGNIN_KEY, {expiresIn: '7d'});
		const {_id, name, email} = user;
		console.log(token);
		res.json({
			token,
			user: {_id, name, email}
		})


	})
}


exports.googlelogin = (req, res, next) => {
	const {tokenId} = req.body;
	console.log(tokenId);
	if (tokenId === undefined) {
		console.log('Yes in fact it is undefined');

	} else {
		client.verifyIdToken({idToken : tokenId, audience: "917647116939-p2a84fj85v0te6ng48cbnoq5fh2d942a.apps.googleusercontent.com"}).then(response => {
			const {email_verified, name, email} = response.payload;
			if (email_verified) {
				User.findOne({email}).exec((err, user) => {
					if (err) {
						return res.status(400).json({
							error: "Something went wrong..."
						})
					} else {
						if (user) {
							const token = jwt.sign({_id: user._id}, process.env.JWT_SIGNIN_KEY, {expiresIn: '7d'});
							const {_id, name, email} = user;

							res.json({
								token,
								user: {_id, name, email}
							})
						} else {
							let password = email+process.env.JWT_SIGNIN_KEY;
							let newUser = new User({name, email, password});
							newUser.save((err, data) => {
								if (err) {
									return res.status(400).json({
										error: "Something went wrong..."
									})
								}
								const token = jwt.sign({_id: data._id}, process.env.JWT_SIGNIN_KEY, {expiresIn: '7d'});
								const {_id, name, email} = newUser;

								res.json({
									token,
									user: {_id, name, email}
								})

							})

						}
					}
				})
			}

			console.log(response.payload);
		})
		console.log()
	}

}


exports.facebooklogin = (req, res) => {
	const {accessToken, userID} = req.body;
	console.log(req.body);

	let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`
	fetch(urlGraphFacebook, {
		method: 'GET'
	})
	.then(response => response.json())
	.then(response => {
		const {email, name} = response;
		User.findOne({email}).exec((err, user) => {
			if (err) {
				return res.status(400).json({
					error: "Something went wrong..."
				})
			} else {
				if (user) {
					const token = jwt.sign({_id: user._id}, process.env.JWT_SIGNIN_KEY, {expiresIn: '7d'});
					const {_id, name, email} = user;

					res.json({
						token,
						user: {_id, name, email}
					})
				} else {
					let password = email+process.env.JWT_SIGNIN_KEY;
					let newUser = new User({name, email, password});
					newUser.save((err, data) => {
						if (err) {
							return res.status(400).json({
								error: "Something went wrong..."
							})
						}
						const token = jwt.sign({_id: data._id}, process.env.JWT_SIGNIN_KEY, {expiresIn: '7d'});
						const {_id, name, email} = newUser;

						res.json({
							token,
							user: {_id, name, email}
						})

					})

				}
			}
		});
	});

}


exports.verifyToken = (req, res, next) => {

	// grab token from either headers, req.body, or query string
	const token = req.get('token') || req.body.token || req.query.token
	// if no token present, deny access
	if(!token) return res.json({success: false, message: "No token provided"})
	// otherwise, try to verify token
	jwt.verify(token, JWT_SIGNIN_KEY, (err, decodedData) => {
		// if problem with token verification, deny access
		if(err) return res.json({success: false, message: "Invalid token."})
		// otherwise, search for user by id that was embedded in token
		User.findById(decodedData._id, (err, user) => {
			// if no user, deny access
			if(!user) return res.json({success: false, message: "Invalid token."})
			// otherwise, add user to req object
			req.user = user
			// go on to process the route:
			next()
		})
	})
}
