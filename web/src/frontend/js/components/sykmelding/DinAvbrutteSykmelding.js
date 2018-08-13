import React from 'react';
import { DineSykmeldingOpplysninger, Utvidbar, getLedetekst } from 'digisyfo-npm';
import SykmeldingStatuspanel from '../sykmeldingstatuspanel/SykmeldingStatuspanel';
import Sidetopp from '../Sidetopp';
import { sykmelding as sykmeldingPt } from '../../propTypes';

const DinAvbrutteSykmelding = ({ sykmelding }) => {
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

DinAvbrutteSykmelding.propTypes = {
    sykmelding: sykmeldingPt,
};

export default DinAvbrutteSykmelding;
