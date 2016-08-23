import React, { PropTypes } from 'react';

const Checkboxgruppe = ({ spoersmaal, Overskrift = 'H3', children = [], feilmelding, erFeil }) => {
    return (<div className={erFeil ? 'skjema-feilomrade feil' : 'skjema-feilomrade'}>
        <Overskrift className="skjema-sporsmal js-sporsmal">{spoersmaal}</Overskrift>
        {children}
        <p className="skjema-feilmelding" aria-live="polite" role="alert">{erFeil ? feilmelding : null}</p>
    </div>);
};

Checkboxgruppe.propTypes = {
    spoersmaal: PropTypes.string.isRequired,
    Overskrift: PropTypes.string,
    children: PropTypes.array.isRequired,
    feilmelding: PropTypes.string,
    erFeil: PropTypes.bool,
};

export default Checkboxgruppe;
