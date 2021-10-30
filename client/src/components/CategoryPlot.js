import React from 'react';
import Plot from 'react-plotly.js';
import 'bootstrap/dist/css/bootstrap.min.css';
//import SplitPane from 'react-split-pane';
import PageNavbar from './PageNavbar';

export default class BestGenre extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rating:[]
		}
        this.status = this.props.match.params.category
        //this.loaddata = this.loaddata.bind(this);
        console.log(this.props.match.params.category)
	}

	componentDidMount() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/category/" + this.status, {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(data => {
        let tmpArray = []
        for (var i = 0; i < data.length; i++) {
            tmpArray.push(data[i].Rating)
        }
        // Set the state of 
        console.log("hello")
        this.setState({
          rating:tmpArray
        })
      })
      .catch(err => console.log(err))	// Print the error if there is one.
      return this.state.rating
  }


	render() {
		return (
            <div className="Panel">
                
                <div className="Category"><PageNavbar active="category" /> </div>
                <div>
            <Plot
        data={[
          {
            x: this.state.rating,//this.state.rating.map((key) => (key.Rating)),  
            type: 'histogram',
          },
        ]}
        layout={ {width: 1200, height: 700, title: 'Rating Distribution Plot'} }
      />
      </div>
               
            </div>
            
       
		);
	}
}
