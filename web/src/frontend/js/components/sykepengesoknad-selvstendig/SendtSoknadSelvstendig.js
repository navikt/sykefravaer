import React from 'react';
import { getLedetekst, Utvidbar, sykmelding as sykmeldingPt } from 'digisyfo-npm';
import SykmeldingUtdrag from './SykmeldingUtdrag';
import Oppsummeringsvisning from '../soknad-felles-oppsummering/Oppsummeringsvisning';
import { soknad as soknadPt } from '../../propTypes';
import Soknadtopp from './Soknadtopp';

const SendtSoknadSelvstendig = ({ sykmelding, soknad }) => {
    return (<div>
        <Soknadtopp soknad={soknad} />
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

