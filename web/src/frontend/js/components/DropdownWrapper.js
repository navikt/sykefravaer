import React, { PropTypes } from 'react';


const DropdownWrapper = ({ erFeil, feilmelding, children }) => {
    const valideringsklasse = erFeil ? "har-valideringsfeil" : "";
    const maybeFeilmelding = erFeil ? feilmelding : "";
    return (
        <div className={valideringsklasse}>
            {children}
            <p className="skjema-feilmelding" aria-live="polite">{maybeFeilmelding}</p>
        </div>
    );
};

DropdownWrapper.propTypes = {
    erFeil: PropTypes.bool,
    feilmelding: PropTypes.string,
};

export default DropdownWrapper;
