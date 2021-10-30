import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class MatchedAppRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="appResults">
				<div className="app_name"><a href={this.props.href}>{this.props.name}</a></div>
				<div className="app_category">{this.props.category}</div>
				<div className="app_rating">{this.props.rating}</div>
				<div className="app_price">{this.props.price}</div>
			</div>
		);
	}
}
