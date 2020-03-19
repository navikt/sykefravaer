import React from 'react';
import { DineKoronaSykmeldingOpplysninger, Utvidbar, getLedetekst } from '@navikt/digisyfo-npm';
import SykmeldingStatuspanel from '../statuspanel/SykmeldingStatuspanel';
import Sidetopp from '../../components/Sidetopp';
import { sykmelding as sykmeldingPt } from '../../propTypes';

const KoronaSykmeldingAvbrutt = ({ sykmelding }) => {
    return (
        <div>
            <Sidetopp tittel={getLedetekst('din-sykmelding.tittel')} />
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
