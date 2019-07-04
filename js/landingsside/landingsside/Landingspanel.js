import React from 'react';
import PropTypes from 'prop-types';

const Landingspanel = ({
    className = '', ikon, ikonAlt, tittel, children,
}) => {
    return (
        <div className={`landingspanel ${className}`}>
            <header className="landingspanel__header">
                <img className="landingspanel__ikon" src={ikon} alt={ikonAlt} />
                <h2 className="landingspanel__tittel">{tittel}</h2>
            </header>
            <div className="panel sist">
                {children}
            </div>
        </div>
    );
};

Landingspanel.propTypes = {
    className: PropTypes.string,
    ikon: PropTypes.string,
    ikonAlt: PropTypes.string,
    tittel: PropTypes.string,
    children: PropTypes.element,
};

export default Landingspanel;
