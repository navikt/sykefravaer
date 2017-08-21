import React, { PropTypes } from 'react';
import { antallVirkedagerIPeriode } from '../../../utils/periodeUtils';
import { getHtmlLedetekst } from 'digisyfo-npm';

const tilInt = (streng) => {
    return !streng ? undefined : parseFloat(streng.replace(',', '.'));
};

export const getStillingsprosent = (antallTimerIArbeid, normalArbeidstid, periode) => {
    const ANTALL_VIRKEDAGER_I_EN_UKE = 5;
    const virkerdager = antallVirkedagerIPeriode(periode);
    const _antallTimerIArbeid = tilInt(antallTimerIArbeid);
    const _normalArbeidstid = tilInt(normalArbeidstid);
    const desimaltall = _antallTimerIArbeid / ((_normalArbeidstid / ANTALL_VIRKEDAGER_I_EN_UKE) * virkerdager);
    if (!_antallTimerIArbeid || !_normalArbeidstid || virkerdager === 0) {
        return undefined;
    }
    return Math.round(desimaltall * 100);
};

const DetteTilsvarer = ({ stillingsprosent }) => {
    return (<p dangerouslySetInnerHTML={getHtmlLedetekst('sykepengesoknad.angi-tid.dette-tilsvarer', {
        '%STILLINGSPROSENT%': stillingsprosent,
    })} />);
};

DetteTilsvarer.propTypes = {
    stillingsprosent: PropTypes.number,
};

export default DetteTilsvarer;
