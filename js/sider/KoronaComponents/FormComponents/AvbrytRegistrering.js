import React from 'react';
import PropTypes from 'prop-types';
import { Fareknapp, Knapp } from 'nav-frontend-knapper';

import './AvbrytRegistrering.less';

const AvbrytRegistrering = ({ onAvbryt, onAngre }) => {
    return (
        <div className="avbryt-container">
            <p>Er du sikker på at du vil avbryte registreringen?</p>
            <p>Du kan velge å opprette ny egenmelding senere.</p>

            <Fareknapp className="avbryt-knapp" onClick={onAvbryt}>Ja, jeg er sikker</Fareknapp>

            <br />

            <Knapp onClick={onAngre}>Angre</Knapp>
        </div>
    );
};

AvbrytRegistrering.propTypes = {
    onAvbryt: PropTypes.func,
    onAngre: PropTypes.func,
};

export default AvbrytRegistrering;
