import React from 'react';
import PropTypes from 'prop-types';

const Arbeidssituasjon = ({
    className, ikonSrc, ikonAlt, situasjon,
}) => {
    return (
        <div className="situasjon__panel">
            <div className={`situasjon ${className}`}>
                <div className="situasjon__ikon">
                    <img src={ikonSrc} alt={ikonAlt} />
                </div>
                {situasjon}
            </div>
        </div>
    );
};

Arbeidssituasjon.propTypes = {
    className: PropTypes.string,
    ikonSrc: PropTypes.string,
    ikonAlt: PropTypes.string,
    situasjon: PropTypes.element,
};

export default Arbeidssituasjon;
