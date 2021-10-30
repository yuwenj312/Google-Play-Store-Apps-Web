import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import GenreButton from './GenreButton';
import DashboardMovieRow from './DashboardMovieRow';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of genres,
    // and a list of movies for a specified genre.
    this.state = {
      genres: [],
      movies: [],
      picurls: []
    }

    this.showMovies = this.showMovies.bind(this);
  }

  // React function that is called when the page load.
  componentDidMount() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/genres", {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(genreList => {
        if (!genreList) return;
        // Map each genreObj in genreList to an HTML element:
        // A button which triggers the showMovies function for each genre.
        let genreDivs = genreList.map((genreObj, i) =>
          <GenreButton id={"button-" + genreObj.genre} onClick={() => this.showMovies(genreObj.genre)} genre={genreObj.genre} />
        );

        // Set the state of the genres list to the value returned by the HTTP response from the server.
        this.setState({
          genres: genreDivs
        })
      })
      .catch(err => console.log(err))	// Print the error if there is one.
  }


  /* ---- Q1b (Dashboard) ---- */
  /* Set this.state.movies to a list of <DashboardMovieRow />'s. */
  showMovies(genre) {
    console.log(genre)
    fetch("http://localhost:8081/catpictures/" + genre, {
      method: 'GET' // The type of HTTP request.
    })
     .then(res => res.json()) // Convert the response data to a JSON.
      .then(picurls => {
        // Set the state of 
        console.log(picurls)
        let tmpurls =  picurls.map((urlobj, i) =>
          urlobj.url
        );
        this.setState({
          picurls: tmpurls
        })
      })
      .catch(err => console.log(err)) // Print the error if there is one.
      .then(
      fetch('http://localhost:8081/genres/' + genre, {
      method: "GET"
    })
      .then(res => res.json())
      .then(topApps => {
        console.log(topApps); //displays your JSON object in the console
        let AppRowsDiv = topApps.map((app, i) =>
          <DashboardMovieRow url = {this.state.picurls[i <= 4 ? i : Math.floor(Math.random() * (4 - 0 + 1)) + 0]} title={app.App} rating={app.Rating} vote_count={app.Average_Sentiment_Polarity} />
        );

        //This saves our HTML representation of the data into the state, which we can call in our render function
        this.setState({
          movies: AppRowsDiv
        })
      })
      .catch(err => console.log(err))
      )
  }
    // showMovies(genre) {
    //     fetch("http://localhost:8081/genres/" + genre, {
    //         method: 'GET' // The type of HTTP request.
    //     })
    //         .then(res => res.json()) // Convert the response data to a JSON.
    //         .then(movieList => {
    //             let movieDivs = movieList.map((movies, i) => <DashboardMovieRow  movies = {movies} />
    //             );
    //             console.log(genre);
    //             this.setState({
    //                 movies: movieDivs
    //             })
    //         })
    //         .catch(err => console.log(err))
    // }


  render() {    
    return (
      <div className="Dashboard">

        <PageNavbar active="dashboard" />

        <br></br>
        <div className="container movies-container">
          <div className="jumbotron">
            <div className="h5">Top Apps</div>
            <div className="genres-container">
              {this.state.genres}
            </div>
          </div>

          <br></br>
          <div className="jumbotron">
            <div className="movies-container">
              <div className="movies-header">
                <div className="header-pic"><strong>App Pic</strong></div>
                <div className="header-lg"><strong>App Name</strong></div>
                <div className="header"><strong>Rating</strong></div>
                <div className="header"><strong>Average Sentiment Polarity</strong></div>
              </div>
              <div className="results-container" id="results">
                {this.state.movies}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}







