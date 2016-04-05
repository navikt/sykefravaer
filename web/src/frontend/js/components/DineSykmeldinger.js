import React, { PropTypes } from 'react';
import SykmeldingTeasere from '../components/SykmeldingTeasere.js';
import { getLedetekst } from '../ledetekster';

const DineSykmeldinger = ({ sykmeldinger = [] }) => {
	return (<div>
				<h1 className="side-header typo-sidetittel">
					{getLedetekst('dine-sykmeldinger.tittel')}
				</h1>
				<SykmeldingTeasere
					sykmeldinger={sykmeldinger} 
					ingenSykmeldingerMelding="Du har ingen nye sykmeldinger."
					className="js-nye-sykmeldinger" />
			</div>);
};

DineSykmeldinger.propTypes = {
	sykmeldinger: PropTypes.array.isRequired,
};

export default DineSykmeldinger;
