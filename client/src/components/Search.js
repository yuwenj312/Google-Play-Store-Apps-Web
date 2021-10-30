import React from 'react';
import PageNavbar from './PageNavbar';
import MatchedAppRow from './MatchedAppRow';
import '../style/Search.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Search extends React.Component {
	constructor(props) {
		super(props);
		

		// State maintained by this React component is the selected movie name,
		// and the list of recommended movies.
		this.state = {
			appName: "",
			macthedApps: [],
			currentPage: 1,
          	resPerPage: 10
		}

		this.handleClick = this.handleClick.bind(this);
		this.handleAppNameChange = this.handleAppNameChange.bind(this);
		this.submitApp = this.submitApp.bind(this);
		this.submitFree = this.submitFree.bind(this);
		this.submitPaid = this.submitPaid.bind(this);
	}

	handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
	}
	
	handleAppNameChange(e) {
		this.setState({
			appName: e.target.value,
		});
	}

	//keyword submitted is contained in `this.state.appName`.
	submitApp() {
	    console.log(this.state.appName)
	    var url = 'http://localhost:8081/search/' + this.state.appName
	    console.log(url)
	    if (url == 'http://localhost:8081/search/') {
	    	url = 'http://localhost:8081/searchall'
	    }
	      fetch(url, {
	      method: "GET"
	    })
	      .then(res => res.json())
	      .then(macthedApps => {
	        console.log(macthedApps); //displays your JSON object in the console
	        let recAppsDiv = macthedApps.map((app, i) =>
	          <MatchedAppRow name={app.App} category={app.Category} rating={app.Rating} price={app.Price} href={"appprofile/" + app.App_id.toString()}/>
	        );

	        //This saves our HTML representation of the data into the state, which we can call in our render function
	        this.setState({
	          macthedApps: recAppsDiv
	        })
	      })
	      .catch(err => console.log(err))
	}


	submitFree() {
	    console.log(this.state.appName + "/"+"free")
	    var url = 'http://localhost:8081/search/' + this.state.appName + '/' + "free"
	    console.log(url)
	    if (url == 'http://localhost:8081/search//free') {
	    	url = 'http://localhost:8081/searchallfree'
	    }
	      fetch(url, {
	      method: "GET"
	    })
	      .then(res => res.json())
	      .then(macthedApps => {
	        console.log(macthedApps); //displays your JSON object in the console
	        let recTypeDiv = macthedApps.map((app, i) =>
	          <MatchedAppRow name={app.App} category={app.Category} rating={app.Rating} price={app.Price} href={"appprofile/" + app.App_id.toString()}/>
	        );

	        //This saves our HTML representation of the data into the state, which we can call in our render function
	        this.setState({
	          macthedApps: recTypeDiv
	        })
	      })
	      .catch(err => console.log(err))
	}
	submitPaid() {
			console.log(this.state.appName + "/"+"paid")
				var url = 'http://localhost:8081/search/' + this.state.appName + '/' + "paid"
			    console.log(url)
			    if (url == 'http://localhost:8081/search//paid') {
			    	url = 'http://localhost:8081/searchallpaid'
			    }
				fetch(url, {
				method: "GET"
			})
				.then(res => res.json())
				.then(macthedApps => {
					console.log(macthedApps); //displays your JSON object in the console
					let recAppsDiv = macthedApps.map((app, i) =>
						<MatchedAppRow name={app.App} category={app.Category} rating={app.Rating} price={app.Price} href={"appprofile/" + app.App_id.toString()}/>
					);

					//This saves our HTML representation of the data into the state, which we can call in our render function
					this.setState({
						macthedApps: recAppsDiv
					})
				})
				.catch(err => console.log(err))
	}
	
	render() {
		const indexOfLast = this.state.currentPage * this.state.resPerPage;
		const indexOfFirst = indexOfLast - this.state.resPerPage;
		const current = this.state.macthedApps.slice(indexOfFirst, indexOfLast);
		const renderRes= current.map((todo, index) => {
			return <li key={index}>{todo}</li>;
		});
		const pageNumbers = [];
        for (let i = 1; i <= Math.min(10,Math.ceil(this.state.macthedApps.length / this.state.resPerPage)); i++) {
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
			<div className="Search">
				<PageNavbar active="search" />

			    <div className="container searcher-container">
			    	<div className="jumbotron">
			    		<div className="h5">Search</div>
			    		<br></br>
			    		<div className="input-container">
			    			<input type='text' placeholder="Enter Search Key Words" value={this.state.appName} onChange={this.handleAppNameChange} id="appName" className="app-input"/>
			    			<button id="submitAppBtn" className="submit-btn" onClick={this.submitApp}>Submit</button>
								<button class="btn" onClick={this.submitApp} id="all"> Show all</button>
							  <button class="btn" onClick={this.submitFree} id="free"> Free</button>
							  <button class="btn" onClick={this.submitPaid} id="paid"> Paid</button>
							</div>
			    		<div className="header-container">
			    			<div className="headers">
			    				<div className="header"><strong>App Name</strong></div>
			    				<div className="header"><strong>Category</strong></div>
					            <div className="header"><strong>Rating</strong></div>
					            <div className="header"><strong>Price</strong></div>
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
