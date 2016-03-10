import React, { Component } from 'react';
import Lenkeboks from "../components/Lenkeboks.js";
import { getPathByKey } from "../routers/paths.js";

class Dashboard extends Component {
	render() {
		return <div className="container">
					<ul className="lenkebokser">
						<Lenkeboks path={"/syfofront/" + getPathByKey("dine-sykmeldinger").path} text="" title="Ditt sykefravær" />
					</ul>
				</div>
	}
}

export default Dashboard;