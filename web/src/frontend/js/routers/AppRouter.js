import React, { PropTypes, Component } from 'react';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import Dashboard from "../containers/Dashboard.js";
import DineSykmeldingerSide from "../sider/DineSykmeldingerSide.js";
import { DinSykmeldingSide } from "../sider/DinSykmeldingSide.js";
import SideIkkeFunnet from "../components/SideIkkeFunnet.js";
import { SendTilArbeidsgiverSide } from "../sider/SendTilArbeidsgiverSide.js";
import paths, {getPathByKey} from "./paths.js";

class AppRouter extends Component {
	render() {
		return <Router history={this.props.history}>
			<Route path="/syfofront" component={Dashboard} />
			<Route path="/syfofront/dine-sykmeldinger" component={DineSykmeldingerSide} />
			<Route path={getPathByKey("sykmelding").fullPath} component={DinSykmeldingSide} />
			<Route path={getPathByKey("sykmelding").fullPath + "/send-til-arbeidsgiver"} component={SendTilArbeidsgiverSide} />
			<Route path={getPathByKey("sykmelding").fullPath + "/sendt"} component={DinSykmeldingSide} />
			<Route path="*" component={SideIkkeFunnet}/>
		</Router>
	}
}

export default AppRouter;