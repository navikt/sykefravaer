import React, { Component } from 'react';
import Lenkeboks from "../components/Lenkeboks.js";
import { getContextRoot } from "../routers/paths.js";

class Dashboard extends Component {
	render() {
		return <div className="container">
					<ul className="lenkebokser">
						<Lenkeboks path={getContextRoot() + "/dine-sykmeldinger"} text="" title="Ditt sykefravær" />
					</ul>
				</div>
	}
}

export default Dashboard;