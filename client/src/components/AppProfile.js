import React from 'react';
import PageNavbar from './PageNavbar';
import '../style/AppProfile.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			appName: "test",
			appCategory: "",
			appRating: "",
			appReview: "",
			appPrice: "",
			picurl: ""
		}
		this.status = this.props.match.params.id

	}

	componentDidMount() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/searchapp/" + this.status, {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(appInfo => {
        // Set the state of 
        console.log(appInfo)
        console.log(appInfo[0].App)
        this.setState({
          appName: appInfo[0].App,
          appRating: appInfo[0].Rating,
          appPrice: appInfo[0].Price,
          appCategory: appInfo[0].appCategory
        })
        console.log(appInfo[0].App)
      })
      .catch(err => console.log(err))	// Print the error if there is one.
    .then(
    fetch("http://localhost:8081/pictures/" + this.status, {
      method: 'GET' // The type of HTTP request.
    })
     .then(res => res.json()) // Convert the response data to a JSON.
      .then(picurls => {
        // Set the state of 
        console.log(picurls[0].url)
        this.setState({
          picurl: picurls[0].url
        })
      })
      .catch(err => console.log(err))	// Print the error if there is one.
     )
    fetch("http://localhost:8081/reviews/" + this.status, {
      method: 'GET' // The type of HTTP request.
    })
     .then(res => res.json()) // Convert the response data to a JSON.
      .then(reviews => {
        // Set the state of 
        console.log(reviews)
        this.setState({
          appReview: reviews[0].Translated_Review
        })
      })
      .catch(err => console.log(err))	// Print the error if there is one.
    }




	render() {
		console.log(this.status)
		console.log(this.state.appName)
		console.log(this.state.picurl)
		return (
      
			<div className="Profile">
				<PageNavbar />
				<div className="container app-container"> 
					<div className="jumbotron">
						<div className="app-info"> 
							<h2>{this.state.appName}</h2>
							<img src={this.state.picurl} alt="" />
              <div className="app-review">
                <h4>Rating: {this.state.appRating}</h4>
              </div>
							<div className="app-review">
								<h4>Selected Review</h4>
								{this.state.appReview}
							</div>
							<div className="app-additional-info">
								<h4>Price: ${this.state.appPrice}</h4>
								
							</div>
						</div>
					</div>	
				</div>
		    </div>
		);
	}
}
