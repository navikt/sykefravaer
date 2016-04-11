import React, { PropTypes } from 'react';
import { getLedetekst } from '../ledetekster';

const AppSpinner = ({ ledetekster }) => {
    return <div className="app-spinner" aria-label={getLedetekst('applikasjon.siden-laster', ledetekster)}></div>;
};

AppSpinner.propTypes = {
    ledetekster: PropTypes.object,
};

export default AppSpinner;
