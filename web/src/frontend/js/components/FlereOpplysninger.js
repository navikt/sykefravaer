import React, { PropTypes } from 'react';
import MulighetForArbeid from './MulighetForArbeid.js';
import Friskmelding from './Friskmelding.js';
import UtdypendeOpplysninger from './UtdypendeOpplysninger.js';
import BedreArbeidsevne from './BedreArbeidsevne.js';
import MeldingTilNAV from './MeldingTilNAV.js';
import Tilbakedatering from './Tilbakedatering.js';
import MeldingTilArbeidsgiver from './MeldingTilArbeidsgiver.js';
import AndreSykmeldingOpplysninger from './AndreSykmeldingOpplysninger.js';

const FlereOpplysninger = ({ sykmelding, ledetekster }) => {
    return (<div>
        <MulighetForArbeid sykmelding={sykmelding} ledetekster={ledetekster} />
        <Friskmelding sykmelding={sykmelding} ledetekster={ledetekster} />
        <UtdypendeOpplysninger sykmelding={sykmelding} ledetekster={ledetekster} />
        <BedreArbeidsevne sykmelding={sykmelding} ledetekster={ledetekster} />
        <MeldingTilNAV sykmelding={sykmelding} ledetekster={ledetekster} />
        <MeldingTilArbeidsgiver sykmelding={sykmelding} ledetekster={ledetekster} />
        <Tilbakedatering sykmelding={sykmelding} ledetekster={ledetekster} />
        <AndreSykmeldingOpplysninger sykmelding={sykmelding} ledetekster={ledetekster} />
    </div>);
};

FlereOpplysninger.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default FlereOpplysninger;
