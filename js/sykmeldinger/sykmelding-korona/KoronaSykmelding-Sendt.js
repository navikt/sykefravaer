import React from 'react';
import { getLedetekst, Utvidbar, DineKoronaSykmeldingOpplysninger } from '@navikt/digisyfo-npm';
import SykmeldingStatuspanel from '../statuspanel/SykmeldingStatuspanel';
import ArbeidsgiversSykmeldingContainer from '../arbeidsgivers-sykmelding/ArbeidsgiversSykmeldingContainer';
import Sidetopp from '../../components/Sidetopp';
import { sykmelding as sykmeldingPt } from '../../propTypes';

const KoronaSykmeldingSendt = ({ dinSykmelding }) => {
    return (
        <div>
            <Sidetopp tittel="14-dagers egenerklæring" />
            <SykmeldingStatuspanel sykmelding={dinSykmelding} />
            <Utvidbar
                tittel={getLedetekst('din-sykmelding.dine-opplysninger.tittel')}
                erApen
                ikon="svg/person.svg"
                ikonHover="svg/person_hover.svg"
                ikonAltTekst="Du"
                className="blokk"
                variant="lysebla"
                Overskrift="h2">
                <DineKoronaSykmeldingOpplysninger sykmelding={dinSykmelding} />
            </Utvidbar>
            <div className="blokk--l">
                <ArbeidsgiversSykmeldingContainer sykmeldingId={dinSykmelding.id} />
            </div>
        </div>
    );
};

KoronaSykmeldingSendt.propTypes = {
    dinSykmelding: sykmeldingPt,
};

export default KoronaSykmeldingSendt;
