import React, { PropTypes } from 'react';
import DineSykmeldinger from '../components/DineSykmeldinger.js';
import { connect } from 'react-redux';
import Side from '../sider/Side.js';
import AppSpinner from '../components/AppSpinner.js';
import { getLedetekst, getHtmlLedetekst } from '../ledetekster';

const DineSykmldSide = (state) => {
	return (<Side tittel={getLedetekst('dine-sykmeldinger.sidetittel', state.ledetekster.data)}>
		{
			(() => {
				if (state.sykmeldinger.henter) {
					return <AppSpinner ledetekster={state.ledetekster.data} />;
				} else if (state.sykmeldinger.hentingFeilet) {
					return (<div className="panel typo-infotekst panel-melding">
							<h1 className="hode hode-feil hode-innholdstittel hode-dekorert blokk">Det oppstod en feil</h1>
							<p>Vennligst prøv igjen litt senere.</p>
						</div>);
				} else {
					return <DineSykmeldinger sykmeldinger={state.sykmeldinger.data} ledetekster={state.ledetekster.data} />;
				}
			})()
		}
	</Side>);
};

DineSykmldSide.propTypes = {
	router: PropTypes.object,
	props: PropTypes.object,
};

function mapStateToProps(state) {
	return {
		sykmeldinger: state.sykmeldinger,
		ledetekster: state.ledetekster,
	};
}

const DineSykmeldingerContainer = connect(mapStateToProps)(DineSykmldSide);

export default DineSykmeldingerContainer;
