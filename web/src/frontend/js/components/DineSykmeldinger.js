import React, { PropTypes } from 'react';
import SykmeldingTeasere from '../components/SykmeldingTeasere.js';
import { getLedetekst } from '../ledetekster';

const DineSykmeldinger = ({ sykmeldinger = [] }) => {
	return (<div>
				<h1 className="side-header typo-sidetittel">
					{getLedetekst('dine-sykmeldinger.tittel')}
				</h1>
				<SykmeldingTeasere
					sykmeldinger={sykmeldinger.filter((sykmld) => {
						return sykmld.status === 'UBEKREFTET';
					})}
					tittel="Nye sykmeldinger"
					ingenSykmeldingerMelding="Du har ingen nye sykmeldinger."
					className="js-nye-sykmeldinger" />
				<SykmeldingTeasere
					sykmeldinger={sykmeldinger.filter((sykmld) => {
						return sykmld.status !== 'UBEKREFTET';
					})}
					tittel="Behandlede sykmeldinger"
					ingenSykmeldingerMelding="Du har ingen behandlede sykmeldinger."
					className="js-behandlede" />
			</div>);
};

DineSykmeldinger.propTypes = {
	sykmeldinger: PropTypes.array.isRequired,
};

export default DineSykmeldinger;
