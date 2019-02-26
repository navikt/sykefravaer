import React from 'react';
import { getLedetekst, Utvidbar, DineSykmeldingOpplysninger } from '@navikt/digisyfo-npm';
import SykmeldingStatuspanel from '../sykmeldingstatuspanel/SykmeldingStatuspanel';
import ArbeidsgiversSykmeldingContainer from '../../containers/sykmelding/ArbeidsgiversSykmeldingContainer';
import Sidetopp from '../Sidetopp';
import { sykmelding as sykmeldingPt } from '../../propTypes';

const SendtSykmelding = ({ dinSykmelding }) => {
    return (<div>
        <Sidetopp tittel={getLedetekst('din-sykmelding.tittel')} />
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
            <DineSykmeldingOpplysninger sykmelding={dinSykmelding} />
        </Utvidbar>
        <div className="blokk--l">
            <ArbeidsgiversSykmeldingContainer sykmeldingId={dinSykmelding.id} />
        </div>
    </div>);
};

SendtSykmelding.propTypes = {
    dinSykmelding: sykmeldingPt,
};

export default SendtSykmelding;
