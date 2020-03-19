import React from 'react';
import { Utvidbar, getLedetekst, DineKoronaSykmeldingOpplysninger } from '@navikt/digisyfo-npm';
import SykmeldingStatuspanel from '../statuspanel/SykmeldingStatuspanel';
import { sykmelding as sykmeldingPt } from '../../propTypes';

const KoronaSykmeldingUtgaatt = ({ sykmelding }) => {
    return (
        <div>
            <SykmeldingStatuspanel sykmelding={sykmelding} />
            <Utvidbar
                erApen
                tittel={getLedetekst('din-sykmelding.dine-opplysninger.tittel')}
                ikon="svg/doctor-2.svg"
                ikonHover="svg/doctor-2_hover.svg"
                ikonAltTekst="Lege"
                className="blokk"
                variant="lysebla">
                <DineKoronaSykmeldingOpplysninger sykmelding={sykmelding} />
            </Utvidbar>
        </div>
    );
};

KoronaSykmeldingUtgaatt.propTypes = {
    sykmelding: sykmeldingPt,
};

export default KoronaSykmeldingUtgaatt;
