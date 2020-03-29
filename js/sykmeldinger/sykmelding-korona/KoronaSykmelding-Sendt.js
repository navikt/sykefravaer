import React from 'react';
import { getLedetekst, Utvidbar, DineKoronaSykmeldingOpplysninger } from '@navikt/digisyfo-npm';
import { Sidetittel, Undertittel } from 'nav-frontend-typografi';
import SykmeldingStatuspanel from '../statuspanel/SykmeldingStatuspanel';
import ArbeidsgiversSykmeldingContainer from '../arbeidsgivers-sykmelding/ArbeidsgiversSykmeldingContainer';
import { sykmelding as sykmeldingPt } from '../../propTypes';

const KoronaSykmeldingSendt = ({ dinSykmelding }) => {
    return (
        <div>
            <Sidetittel style={{ marginBottom: '1rem', textAlign: 'center' }}>Egenmelding</Sidetittel>
            <Undertittel style={{ marginBottom: '2.5rem', textAlign: 'center' }}>for selvstendig næringsdrivende og frilansere</Undertittel>
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
