import React, { PropTypes } from 'react';

const DropdownWrapper = ({ erFeil, feilmelding, children }) => {
    const maybeFeilmelding = erFeil ? feilmelding : '';
    return (
        <div>
            {children}
            <p className="skjema__feilmelding" aria-live="polite">{maybeFeilmelding}</p>
        </div>
    );
};

DropdownWrapper.propTypes = {
    erFeil: PropTypes.bool,
    feilmelding: PropTypes.string,
    children: PropTypes.object,
};

export default DropdownWrapper;
