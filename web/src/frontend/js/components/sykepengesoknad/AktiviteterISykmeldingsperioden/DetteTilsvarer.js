import React from 'react';
import PropTypes from 'prop-types';
import { getHtmlLedetekst } from 'digisyfo-npm';
import { antallVirkedagerIPeriode, antallVirkedagerIPerioder } from '../../../utils/periodeUtils';

const tilInt = (streng) => {
    return !streng ? undefined : parseFloat(streng.replace(',', '.'));
};

export const getStillingsprosent = (antallTimerIArbeid, normalArbeidstid, periode, ferieOgPermisjonPerioder = []) => {
    const ANTALL_VIRKEDAGER_I_EN_UKE = 5;
    const virkedager = antallVirkedagerIPeriode(periode) - antallVirkedagerIPerioder(ferieOgPermisjonPerioder);
    const _antallTimerIArbeid = tilInt(antallTimerIArbeid);
    const _normalArbeidstid = tilInt(normalArbeidstid);
    const desimaltall = _antallTimerIArbeid / ((_normalArbeidstid / ANTALL_VIRKEDAGER_I_EN_UKE) * virkedager);
    if (!_antallTimerIArbeid || !_normalArbeidstid || virkedager === 0) {
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
