import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class RecommendationsRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="appResults">
				<div className="app_pic"><img src="https://play-lh.googleusercontent.com/7J4jAmS69Lhdc0y_CQ5LX3mWQWbTGB70P8r1YHKiYL9gQhlD0y31RzCzy0VL94WKWm4=s180-rw" /></div>
				<div className="app_appname">{this.props.name}</div>
				<div className="app_ccategory">{this.props.category}</div>
				<div className="app_rrating">{this.props.rating}</div>
				<div className="app_pprice">{this.props.price}</div>
			</div>
		);
	}
}
