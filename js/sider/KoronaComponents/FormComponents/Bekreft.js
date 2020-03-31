/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

import './Bekreft.less';
import { Checkbox } from 'nav-frontend-skjema';

const Bekreft = ({ value, onChange, canUseEgenmelding }) => {
    return (
        <div className={!canUseEgenmelding ? 'bekreft-container-cannotuse' : value ? 'bekreft-container-bekreftet' : 'bekreft-container-ubekreftet'}>
            <p>Sjekk at opplysningene du har gitt er riktige.</p>
            <Checkbox
                checked={value}
                label="Jeg bekrefter at opplysningene jeg har oppgitt er riktige"
                onChange={onChange}
                name="opplysningeneRiktige" />
        </div>
    );
};

Bekreft.propTypes = {
    value: PropTypes.bool,
    onChange: PropTypes.func,
    canUseEgenmelding: PropTypes.bool,
};

export default Bekreft;
