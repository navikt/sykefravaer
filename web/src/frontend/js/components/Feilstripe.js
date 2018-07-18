import React from 'react';
import PropTypes from 'prop-types';
import Alertstripe from 'nav-frontend-alertstriper';

const Feilstripe = ({ vis }) => {
    return (<div aria-live="polite">
        {
            vis
                ? (<Alertstripe type="advarsel">
                    <p className="sist">Beklager, det oppstod en feil! Vennligst prøv igjen senere.</p>
                </Alertstripe>)
                : null
        }
    </div>);
};

Feilstripe.propTypes = {
    vis: PropTypes.bool,
};

export default Feilstripe;
