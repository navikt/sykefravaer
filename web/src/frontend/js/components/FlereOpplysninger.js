import React, { PropTypes } from 'react';
import MulighetForArbeid from './MulighetForArbeid.js';
import Friskmelding from './Friskmelding.js';
import UtdypendeOpplysninger from './UtdypendeOpplysninger.js';
import BedreArbeidsevne from './BedreArbeidsevne.js';
import MeldingTilNAV from './MeldingTilNAV.js';
import Tilbakedatering from './Tilbakedatering.js';
import MeldingTilArbeidsgiver from './MeldingTilArbeidsgiver.js';
import AndreSykmeldingOpplysninger from './AndreSykmeldingOpplysninger.js';
import { getLedetekst } from '../ledetekster/index';
import { toDatePrettyPrint } from '../utils/datoUtils';
import { getSykmeldingOpplysning } from '../utils/dinSykmeldingUtils.js';

const FlereOpplysninger = ({ sykmelding, ledetekster }) => {
    return (<div>
        <div className="sykmelding-seksjon">
        {
            getSykmeldingOpplysning(sykmelding.bekreftelse,
                'utstedelsesdato',
                getLedetekst('din-sykmelding.annet.utstedelsesdato', ledetekster),
                toDatePrettyPrint(sykmelding.bekreftelse.utstedelsesdato))
        }
        {
            getSykmeldingOpplysning(sykmelding, 'startLegemeldtFravaer',
                getLedetekst('din-sykmelding.mulighet.for.arbeid.start.legemeldt.fravaer.tittel', ledetekster), toDatePrettyPrint(sykmelding.startLegemeldtFravaer))
        }
        </div>
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
