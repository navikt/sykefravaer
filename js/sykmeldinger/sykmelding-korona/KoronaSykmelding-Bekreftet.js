import React from 'react';
import {
    getLedetekst, DineKoronaSykmeldingOpplysninger, Utvidbar, arbeidssituasjoner,
} from '@navikt/digisyfo-npm';
import { Sidetittel, Undertittel } from 'nav-frontend-typografi';
import ArbeidsgiversSykmeldingContainer from '../arbeidsgivers-sykmelding/ArbeidsgiversSykmeldingContainer';
import { sykmelding as sykmeldingPt } from '../../propTypes';
import { Vis } from '../../utils/index';
import BekreftetSykmeldingStatuspanel from './BekreftetSykmeldingStatuspanel';

const KoronaSykmeldingBekreftet = ({ dinSykmelding }) => {
    return (
        <div>
            <Sidetittel style={{ marginBottom: '1rem', textAlign: 'center' }}>Egenmelding</Sidetittel>
            <Undertittel style={{ marginBottom: '2.5rem', textAlign: 'center' }}>for selvstendig næringsdrivende og frilansere</Undertittel>
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
                <DineKoronaSykmeldingOpplysninger sykmelding={dinSykmelding} />
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

KoronaSykmeldingBekreftet.propTypes = {
    dinSykmelding: sykmeldingPt,
};

export default KoronaSykmeldingBekreftet;
