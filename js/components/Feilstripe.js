import React from 'react';
import PropTypes from 'prop-types';
import Alertstripe from 'nav-frontend-alertstriper';

const Feilstripe = ({ vis, className }) => {
    return (<div aria-live="polite" role="alert">
        {
            vis
                ? (<Alertstripe type="advarsel" className={className}>
                    <p className="sist">Beklager, det oppstod en feil! Vennligst prøv igjen senere.</p>
                </Alertstripe>)
                : null
        }
    </div>);
};

Feilstripe.propTypes = {
    vis: PropTypes.bool,
    className: PropTypes.string,
};

export default Feilstripe;
