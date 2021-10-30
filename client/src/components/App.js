 import React from 'react';
 import httpClient from './httpClient'
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom';
import Dashboard from './Dashboard';
import Recommendations from './Recommendations';
import Search from './Search';
import AppProfile from './AppProfile';
import Login from './Login';
import Logout from './Logout';
import Signup from './signup';
import VIP from './VIP';
import CategoryPlot from './CategoryPlot';
import BestGenres from './BestGenres';

export default class App extends React.Component {
	state = { currentUser: httpClient.getCurrentUser() }

	onLoginSuccess(user) {
		this.setState({ currentUser: httpClient.getCurrentUser() })
	}

	logout() {
		httpClient.logOut()
		this.setState({ currentUser: null })
	}

	render() {
		const { currentUser } = this.state
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							render={(props) => (
								<Login {...props} onLoginSuccess={this.onLoginSuccess.bind(this)} />
							)}
						/>
						<Route
							exact
							path="/logout"
							render={(props) => (
								<Logout onLogOut={this.logout.bind(this)} />
							)}
						/>
						<Route
							exact
							path="/signup"
							render={() => (
								<Signup />
							)}
						/>
						<Route
							exact
							path="/search"
							render={() => (
								<Search />
							)}
						/>
						<Route
							exact
							path="/dashboard"
							render={() => (
								currentUser ? (
									<Dashboard  />
								  ) : (
									<Redirect to="/" />
								  )
							)}
						/>
						<Route
							path="/recommendations"
							render={() => (
								<Recommendations />
							)}
						/>
						<Route
							path="/category"
							render={() => (
								<BestGenres />
							)}
						/>
						<Route
							path="/appprofile/:id"
							render={(props) => (
								<AppProfile {...props}/>
							)}
						/>
						<Route
							exact
							path="/vip"
							render={() => (
								currentUser ? <VIP /> : <Redirect to="/" />
							)}
						/>
						<Route
							path="/plot/:category"
							render={(props) => (
								<CategoryPlot {...props}/>
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}