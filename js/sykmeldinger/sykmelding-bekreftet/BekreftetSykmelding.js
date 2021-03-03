import React from 'react';
import {
    getLedetekst, DineSykmeldingOpplysninger, Utvidbar, arbeidssituasjoner,
} from '../../digisyfoNpm';
import ArbeidsgiversSykmeldingContainer from '../arbeidsgivers-sykmelding/ArbeidsgiversSykmeldingContainer';
import Sidetopp from '../../components/Sidetopp';
import { sykmelding as sykmeldingPt } from '../../propTypes';
import { Vis } from '../../utils/index';
import BekreftetSykmeldingStatuspanel from './BekreftetSykmeldingStatuspanel';

const BekreftetSykmelding = ({ dinSykmelding }) => {
    return (
        <div>
            <Sidetopp tittel={getLedetekst('din-sykmelding.tittel')} />
            <BekreftetSykmeldingStatuspanel sykmelding={dinSykmelding} />
            <Utvidbar
                erApen
                tittel={getLedetekst('din-sykmelding.dine-opplysninger.tittel')}
                ikon="svg/person.svg"
                ikonHover="svg/person_hover.svg"
                ikonAltTekst="Du"
                className="blokk"
                variant="lysebla"
                Overskrift="h2">
                <DineSykmeldingOpplysninger sykmelding={dinSykmelding} />
            </Utvidbar>
            <Vis
                hvis={dinSykmelding.valgtArbeidssituasjon === arbeidssituasjoner.ARBEIDSTAKER}
                render={() => {
                    return (
                        <div className="blokk">
                            <ArbeidsgiversSykmeldingContainer sykmeldingId={dinSykmelding.id} />
                        </div>
                    );
                }} />
        </div>
    );
};

BekreftetSykmelding.propTypes = {
    dinSykmelding: sykmeldingPt,
};

export default BekreftetSykmelding;
