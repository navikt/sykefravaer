import React from 'react';
import { getLedetekst } from 'digisyfo-npm';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

const Knapperad = ({ children, variant }) => {
    return (<div className={`knapperad ${variant}`}>
        {
            children.map((child, index) => {
                return <div key={index} className="knapperad__element">{child}</div>;
            })
        }
    </div>);
};

Knapperad.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element),
    variant: PropTypes.string,
};

export const KnapperadTilbake = ({ forrigeUrl }) => {
    return (<Knapperad variant="knapperad--forrigeNeste knapperad--medAvbryt">
        <Link to={forrigeUrl} className="knapp">{getLedetekst('sykepengesoknad.tilbake')}</Link>
        <button type="submit" className="knapp knapp--hoved js-ga-videre">{getLedetekst('sykepengesoknad.ga-videre')}</button>
    </Knapperad>);
};

KnapperadTilbake.propTypes = {
    forrigeUrl: PropTypes.string,
};

export default Knapperad;
