import React from 'react';
import Plot from 'react-plotly.js';
import PageNavbar from './PageNavbar';
import CategoryRow from './CategoryRow';
import DashboardMovieRow from './DashboardMovieRow';
import '../style/BestGenres.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class BestGenre extends React.Component {
	constructor(props) {
	  super(props);
  
	  // The state maintained by this React Component. This component maintains the list of genres,
	  // and a list of movies for a specified genre.
	  this.state = {
		genres: [],
		movies: []
	  }
  
	  //this.showMovies = this.showMovies.bind(this);
	}
  
	// React function that is called when the page load.
	componentDidMount() {
	  // Send an HTTP request to the server.
	  fetch("http://localhost:8081/category", {
		method: 'GET' // The type of HTTP request.
	  })
		.then(res => res.json()) // Convert the response data to a JSON.
		.then(genreList => {
		  if (!genreList) return;
		  // Map each genreObj in genreList to an HTML element:
		  // A button which triggers the showMovies function for each genre.
		  let genreDivs = genreList.map((genreObj, i) =>
		  <CategoryRow id={"button-" + genreObj.genre} genre={genreObj.genre} href={"plot/" + genreObj.genre.toString()}/>
		  );
  
		  // Set the state of the genres list to the value returned by the HTTP response from the server.
		  this.setState({
			genres: genreDivs
		  })
		})
		.catch(err => console.log(err))	// Print the error if there is one.
	}
  
  /*
	// ---- Q1b (Dashboard) ---- 
	// Set this.state.movies to a list of <DashboardMovieRow />'s. 
	showMovies(genre) {
	  console.log(genre)
		fetch('http://localhost:8081/category/' + genre, {
		method: "GET"
	  })
		.then(res => res.json())
		.then(topApps => {
		  console.log(topApps);
		  let AppRowsDiv = topApps.map((app, i) =>
          <DashboardMovieRow title={app.Rating} rating={app.Rating} vote_count={app.Rating} />
		);
		
		  //This saves our HTML representation of the data into the state, which we can call in our render function
		  this.setState({
			movies: topApps
		  })
		})
		.catch(err => console.log(err))
	} */
  
	render() {    
	  return (
		<div className="Category">

        <PageNavbar active="category" />

        <br></br>
        <div className="container movies-container">
          <div className="jumbotron">
            <div className="h5">Categories</div>
            <div className="genres-container">
              {this.state.genres}
            </div>
          </div>

	

        </div>
      </div>
	  );
	}
  }


