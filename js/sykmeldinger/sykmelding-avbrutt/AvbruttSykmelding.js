import React from 'react';
import { DineSykmeldingOpplysninger, Utvidbar, getLedetekst } from '@navikt/digisyfo-npm';
import SykmeldingStatuspanel from '../statuspanel/SykmeldingStatuspanel';
import Sidetopp from '../../components/Sidetopp';
import { sykmelding as sykmeldingPt } from '../../propTypes';

const AvbruttSykmelding = ({ sykmelding }) => {
    return (<div>
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
            <DineSykmeldingOpplysninger sykmelding={sykmelding} />
        </Utvidbar>
    </div>);
};

AvbruttSykmelding.propTypes = {
    sykmelding: sykmeldingPt,
};

export default AvbruttSykmelding;
