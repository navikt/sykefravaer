import React, { PropTypes } from 'react';
import DineSykmeldinger from '../components/DineSykmeldinger.js';
import { connect } from 'react-redux';
import Side from '../sider/Side.js';
import AppSpinner from '../components/AppSpinner.js';

const DineSykmldSide = (sykmeldinger) => {
	return (<Side>
		{
			(() => {
				if(sykmeldinger.henter) {
					return <AppSpinner />
				} else if(sykmeldinger.hentingFeilet) {
					return (<div className="panel typo-infotekst panel-melding">
							<h1 className="hode hode-feil hode-innholdstittel hode-dekorert blokk">Det oppstod en feil</h1>
							<p>Vennligst prøv igjen litt senere.</p>
						</div>);
				} else {
					return <DineSykmeldinger sykmeldinger={sykmeldinger.data} />;
				}
			})()
		}
	</Side>);
};

DineSykmldSide.propTypes = {
	router: PropTypes.object,
	props: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
	return Object.assign({}, state.sykmeldinger, {
		router: ownProps,
	});
}

const DineSykmeldingerContainer = connect(mapStateToProps)(DineSykmldSide);

export default DineSykmeldingerContainer;
