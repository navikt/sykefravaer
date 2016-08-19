import React, { PropTypes } from 'react';
import Checkbox from './Checkbox';

const Checkboxgruppe = ({ spoersmaal, Overskrift = 'H3', children = [], feilmelding, erFeil }) => {
    return (<div className={erFeil ? 'skjema-feilomrade feil' : 'skjema-feilomrade'}>
        <Overskrift className="skjema-sporsmal js-sporsmal">{spoersmaal}</Overskrift>
        {
            children.map((input, index) => {
                return <Checkbox {...input.props} key={index} />;
            })
        }
        <p className="skjema-feilmeding" aria-live="polite" role="alert">{erFeil ? feilmelding : null}</p>
    </div>);
};

Checkboxgruppe.propTypes = {
    spoersmaal: PropTypes.string.isRequired,
    Overskrift: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
    feilmelding: PropTypes.string,
    erFeil: PropTypes.bool,
};

export default Checkboxgruppe;
