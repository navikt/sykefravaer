import React from 'react';
import { Utvidbar, getLedetekst, DineSykmeldingOpplysninger } from '@navikt/digisyfo-npm';
import SykmeldingStatuspanel from '../statuspanel/SykmeldingStatuspanel';
import { sykmelding as sykmeldingPt } from '../../propTypes';

const UtgaattSykmelding = ({ sykmelding }) => {
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
                <DineSykmeldingOpplysninger sykmelding={sykmelding} />
            </Utvidbar>
        </div>
    );
};

UtgaattSykmelding.propTypes = {
    sykmelding: sykmeldingPt,
};

export default UtgaattSykmelding;
