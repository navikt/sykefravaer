import React from 'react';
import PropTypes from 'prop-types';
import { infoSvg } from '../svg/infoSvg';

const HjemmefraInfo = ({ show }) => {
    if (!show) {
        return null;
    }

    return (
        <div style={{ display: 'flex', marginTop: '-1rem' }}>
            <img width={45} height={45} src={infoSvg} alt="Info" />
            <div style={{ marginLeft: '1rem' }}>
Kan du jobbe hjemmefra, men mindre enn 100 prosent?
Det går fint, du oppgir bare hvor mye det ble når du senere fyller ut søknaden om sykepenger.
            </div>
        </div>
    );
};

HjemmefraInfo.propTypes = {
    show: PropTypes.bool,
};

export default HjemmefraInfo;
