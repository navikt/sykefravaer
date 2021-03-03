import React from 'react';
import { Sidetittel, Undertittel } from 'nav-frontend-typografi';
import { DineKoronaSykmeldingOpplysninger, Utvidbar, getLedetekst } from '../../digisyfoNpm';
import SykmeldingStatuspanel from '../statuspanel/SykmeldingStatuspanel';
import { sykmelding as sykmeldingPt } from '../../propTypes';

const KoronaSykmeldingAvbrutt = ({ sykmelding }) => {
    return (
        <div>
            <Sidetittel style={{ marginBottom: '1rem', textAlign: 'center' }}>Egenmelding</Sidetittel>
            <Undertittel style={{ marginBottom: '2.5rem', textAlign: 'center' }}>for selvstendig næringsdrivende og frilansere</Undertittel>
            <SykmeldingStatuspanel sykmelding={sykmelding} />
            <Utvidbar
                erApen
                tittel={getLedetekst('din-sykmelding.dine-opplysninger.tittel')}
                ikon="svg/person.svg"
                ikonHover="svg/person_hover.svg"
                ikonAltTekst="Du"
                className="blokk"
                variant="lysebla"
                Overskrift="h2">
                <DineKoronaSykmeldingOpplysninger sykmelding={sykmelding} />
            </Utvidbar>
        </div>
    );
};

KoronaSykmeldingAvbrutt.propTypes = {
    sykmelding: sykmeldingPt,
};

export default KoronaSykmeldingAvbrutt;
