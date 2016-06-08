import React, { PropTypes } from 'react';
import Radioknapp from './Radioknapp.js';

const Radiogruppe = ({ name, valgtVerdi, erFeil, feilmelding, onChange, spoersmaal, Overskrift }) => {
    return (<div className={this.props.erFeil ? 'skjema-feilomrade feil' : 'skjema-feilomrade'}>
        <Overskrift className="skjema-sporsmal">{spoersmaal}</Overskrift>
        {
            this.props.children.map((knapp, index) => {
                return <Radioknapp {...knapp.props} name={name} key={index} erValgt={valgtVerdi === knapp.props.value} onChange={onChange} />;
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
};

Radiogruppe.defaultProps = {
    Overskrift: 'H3',
};

export default Radiogruppe;
