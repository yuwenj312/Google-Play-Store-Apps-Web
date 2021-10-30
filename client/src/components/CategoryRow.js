import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class MatchedAppRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="genre" id={this.props.id}>
                <a href={this.props.href}>
				{this.props.genre}
                </a>
			</div>
		);
	}
}
