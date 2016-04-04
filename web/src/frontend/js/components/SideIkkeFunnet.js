import React from 'react';
import { getLedetekst } from '../ledetekster';
import Side from '../sider/Side.js';

const SideIkkeFunnet = () => {
	return (<Side>
				<div className="panel panel-stablet">
					<div className="container">
						<h2 className="typo-sidetittel">{getLedetekst('404.tittel')}</h2>
						<div className="typo-infotekst">
							<p>{getLedetekst('404.tekst')}</p>
						</div>
					</div>
				</div>
			</Side>);
};

export default SideIkkeFunnet;
