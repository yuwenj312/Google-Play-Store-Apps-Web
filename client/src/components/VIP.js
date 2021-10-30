import React from 'react';
import '../style/vip.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import GenreButton from './GenreButton';
import DashboardMovieRow from './DashboardMovieRow';
import {
  Redirect
} from 'react-router-dom';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

  }

  state = {
    redirect: false
  }

  componentDidMount() {
    this.id = setTimeout(() => this.setState({ redirect: true }), 2000)
  }

  componentWillUnmount() {
    clearTimeout(this.id)
  }

  render() {    
    return this.state.redirect ? <Redirect to="/dashboard" /> 
    : (
    	<div className='VIP'>
			<h3>Sign in successfully!</h3>
      <br></br>
      <h5>Redirect to dashboard...</h5>	
		</div>
    );
  }
}







