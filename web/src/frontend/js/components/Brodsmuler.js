import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import { getPathByKey } from "../routers/paths.js";
import { Link } from 'react-router';

function replaceParam(path, params) {
	var p = "";
	for(var key in params) {
		p = path.replace(":" + key, params[key]);
	}
	return p;
}

export function getSti(path, params) {
	var paths = path.split("/");
	paths = paths.map((path, idx) => {

		var p = getPathByKey(path);

		return {
			tittel: p.tittel,
			erKlikkbar: (idx + 1 < paths.length),
			sti: replaceParam(p.fullPath, params)
		}

	})

	return paths;
}

class Brodsmuler extends Component {

	render() { 
		return <nav role="navigation" className="brodsmuler">{getSti(this.props.routePath, this.props.routeParams).map((lnk, idx) => { 
			return (lnk.erKlikkbar ? <Link key={idx} to={lnk.sti}>{lnk.tittel}</Link> : <span key={idx}>{lnk.tittel}</span>)
		})}</nav>
	}
}

export default Brodsmuler;