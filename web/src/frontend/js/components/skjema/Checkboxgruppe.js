import React, { PropTypes } from 'react';

const Checkboxgruppe = ({ spoersmaal, Overskrift = 'H3', children = [], feilmelding, erFeil }) => {
    return (<div className={erFeil ? 'skjema__feilomrade skjema__feilomrade--feil' : 'skjema__feilomrade'}>
        <Overskrift className="skjema__sporsmal js-sporsmal">{spoersmaal}</Overskrift>
        {children}
        <p className="skjema__feilmelding" aria-live="polite" role="alert">{erFeil ? feilmelding : null}</p>
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
