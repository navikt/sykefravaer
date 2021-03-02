import React from 'react';
import { sykmelding as sykmeldingPt, keyValue } from '../../propTypes';
import MulighetForArbeid from './MulighetForArbeid';
import Friskmelding from './Friskmelding';
import UtdypendeOpplysninger from './UtdypendeOpplysninger';
import BedreArbeidsevne from './BedreArbeidsevne';
import MeldingTilNAV from './MeldingTilNAV';
import Tilbakedatering from './Tilbakedatering';
import MeldingTilArbeidsgiver from './MeldingTilArbeidsgiver';
import AndreSykmeldingOpplysninger from './AndreSykmeldingOpplysninger';
import { getLedetekst } from '../../ledetekster';
import { tilLesbarDatoMedArstall, getSykmeldingOpplysning } from '../../utils';

const FlereOpplysninger = ({ sykmelding, ledetekster }) => {
    return (
        <div>
            <div className="sykmeldingSeksjon">
                {
                    getSykmeldingOpplysning(sykmelding.bekreftelse,
                        'utstedelsesdato',
                        getLedetekst('din-sykmelding.annet.utstedelsesdato', ledetekster),
                        tilLesbarDatoMedArstall(sykmelding.bekreftelse.utstedelsesdato), 'h4')
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
        </div>
    );
};

FlereOpplysninger.propTypes = {
    sykmelding: sykmeldingPt,
    ledetekster: keyValue,
};

export default FlereOpplysninger;
