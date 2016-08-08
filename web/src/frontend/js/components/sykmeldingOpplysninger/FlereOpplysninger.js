import React, { PropTypes } from 'react';
import MulighetForArbeid from './MulighetForArbeid';
import Friskmelding from './Friskmelding';
import UtdypendeOpplysninger from './UtdypendeOpplysninger';
import BedreArbeidsevne from './BedreArbeidsevne';
import MeldingTilNAV from './MeldingTilNAV';
import Tilbakedatering from './Tilbakedatering';
import MeldingTilArbeidsgiver from './MeldingTilArbeidsgiver';
import AndreSykmeldingOpplysninger from './AndreSykmeldingOpplysninger';
import { getLedetekst } from '../../ledetekster';
import { toDatePrettyPrint } from '../../utils/datoUtils';
import { getSykmeldingOpplysning } from '../../utils/dinSykmeldingUtils';

const FlereOpplysninger = ({ sykmelding, ledetekster }) => {
    return (<div>
        <div className="sykmelding-seksjon">
        {
            getSykmeldingOpplysning(sykmelding.bekreftelse,
                'utstedelsesdato',
                getLedetekst('din-sykmelding.annet.utstedelsesdato', ledetekster),
                toDatePrettyPrint(sykmelding.bekreftelse.utstedelsesdato), 'H4')
        }
        {
            getSykmeldingOpplysning(sykmelding, 'startLegemeldtFravaer',
                getLedetekst('din-sykmelding.mulighet.for.arbeid.start.legemeldt.fravaer.tittel', ledetekster),
                toDatePrettyPrint(sykmelding.startLegemeldtFravaer), 'H4')
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
