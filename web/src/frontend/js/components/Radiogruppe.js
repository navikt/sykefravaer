import React, { PropTypes } from 'react';
import Radioknapp from './Radioknapp.js';

const Radiogruppe = ({ name, valgtVerdi, erFeil, feilmelding, onChange, spoersmaal, Overskrift, children }) => {
    return (<div className={erFeil ? 'skjema-feilomrade feil' : 'skjema-feilomrade'}>
        <Overskrift className="skjema-sporsmal">{spoersmaal}</Overskrift>
        {
            children.map((knapp, index) => {
                return <Radioknapp {...knapp.props} name={name} key={index} erValgt={valgtVerdi === knapp.props.value} onChange={onChange} id={knapp.props.value} />;
            })
        }
        <span className="skjema-feilmelding" role="alert" aria-live="polite">
            {erFeil ? feilmelding : null}
        </span>
    </div>);
};

Radiogruppe.propTypes = {
    name: PropTypes.string,
    valgtVerdi: PropTypes.string,
    erFeil: PropTypes.bool,
    feilmelding: PropTypes.string,
    onChange: PropTypes.func,
    spoersmaal: PropTypes.string,
    Overskrift: PropTypes.string,
    children: PropTypes.array,
};

Radiogruppe.defaultProps = {
    Overskrift: 'H3',
};

export default Radiogruppe;
