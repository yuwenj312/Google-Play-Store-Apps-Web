import React from 'react';
import PageNavbar from './PageNavbar';
import RecommendationsRow from './RecommendationsRow';
import '../style/Recommendations.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Recommendations extends React.Component {
	constructor(props) {
		super(props);

		// State maintained by this React component is the selected movie name,
		// and the list of recommended movies.
		this.state = {
			appName: "",
			recApps: [],
			currentPage: 1,
          	resPerPage: 10,
          	picurls: []
		}

		this.handleAppNameChange = this.handleAppNameChange.bind(this);
		this.submitApp = this.submitApp.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleAppNameChange(e) {
		this.setState({
			appName: e.target.value
		});
	}

	handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
	}

	submitApp() {
	    console.log(this.state.appName)
	      fetch('http://localhost:8081/rec/' + this.state.appName, {
	      method: "GET"
	    })
	      .then(res => res.json())
	      .then(recApps => {
	        console.log(recApps); //displays your JSON object in the console
	        let recAppsDiv = recApps.map((app, i) => 
	          <RecommendationsRow name={app.App} category={app.Category} rating={app.Rating} price={app.Price} />
	        );
	        
	        //This saves our HTML representation of the data into the state, which we can call in our render function
	        this.setState({
				recApps: recAppsDiv
	        })
	      })
	      .catch(err => console.log(err))
	}

	
	render() {
		const indexOfLast = this.state.currentPage * this.state.resPerPage;
		const indexOfFirst = indexOfLast - this.state.resPerPage;
		const current = this.state.recApps.slice(indexOfFirst, indexOfLast);
		const renderRes= current.map((todo, index) => {
			return <li key={index}>{todo}</li>;
		});
		const pageNumbers = [];
        for (let i = 1; i <= Math.min(10, Math.ceil(this.state.recApps.length / this.state.resPerPage)); i++) {
          pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
          return (
            <li
              key={number}
              id={number}
              onClick={this.handleClick}
            >
              {number}
            </li>
          );
        });
		return (
			<div className="Recommendations">
				<PageNavbar active="recommendations" />

			    <div className="container recommendations-container">
			    	<div className="jumbotron">
			    		<div className="h5">Recommended Apps</div>
			    		<br></br>
			    		<div className="input-container">
			    			<input type='text' placeholder="Enter App Name" value={this.state.appName} onChange={this.handleAppNameChange} id="appName" className="app-input"/>
			    			<button id="submitAppBtn" className="submit-btn" onClick={this.submitApp}>Submit</button>
			    		</div>
			    		<div className="header-container">
			    			<div className="h6">You may like ...</div>
			    			<div className="headers">
			    				<div className="header-pic"><strong>App Pic</strong></div>
			    				<div className="header-app"><strong>App Name</strong></div>
			    				<div className="header-cat"><strong>Category</strong></div>
					            <div className="header-rec"><strong>Rating</strong></div>
					            <div className="header-rec"><strong>Price</strong></div>
			    			</div>
			    		</div>
			    		<div className="results-container" id="results">
							<ul>
								{renderRes}
							</ul>
							<ul id="page-numbers">
								{renderPageNumbers}
							</ul>
			    		</div>
			    	</div>
			    </div>
		    </div>
		);
	}
}