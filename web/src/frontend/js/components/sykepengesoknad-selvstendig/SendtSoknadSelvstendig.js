import React from 'react';
import { getLedetekst, Utvidbar, sykmelding as sykmeldingPt } from 'digisyfo-npm';
import Sidetopp from '../Sidetopp';
import SykmeldingUtdrag from './SykmeldingUtdrag';
import Oppsummeringsvisning from '../soknad-felles-oppsummering/Oppsummeringsvisning';
import { soknad as soknadPt } from '../../propTypes';

const SendtSoknadSelvstendig = ({ sykmelding, soknad }) => {
    return (<div>
        <Sidetopp tittel={getLedetekst('sykepengesoknad.sidetittel')} />
        { sykmelding && <SykmeldingUtdrag sykmelding={sykmelding} /> }
        <Utvidbar tittel={getLedetekst('sykepengesoknad.oppsummering.tittel')} className="blokk" erApen>
            <Oppsummeringsvisning soknad={soknad} />
        </Utvidbar>
    </div>);
};

SendtSoknadSelvstendig.propTypes = {
    sykmelding: sykmeldingPt,
    soknad: soknadPt,
};

export default SendtSoknadSelvstendig;

