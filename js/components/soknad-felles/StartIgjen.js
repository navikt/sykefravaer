import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { sykepengesoknad as sykepengesoknadPt, soknadPt } from '../../propTypes';

const StartIgjen = ({ soknad }) => {
    return (<div className="panel">
        <div className="hode hode--informasjon">
            <h1 className="hode__tittel">Oops, nå har vi mistet dataene dine</h1>
            <p className="hode__melding">
                Derfor må du dessverre <Link
                    className="lenke"
                    to={`${process.env.REACT_APP_CONTEXT_ROOT}/soknader/${soknad.id}`}>fylle ut søknaden på nytt</Link>.
            </p>
        </div>
    </div>);
};

StartIgjen.propTypes = {
    soknad: PropTypes.oneOfType([sykepengesoknadPt, soknadPt]),
};

export default StartIgjen;
