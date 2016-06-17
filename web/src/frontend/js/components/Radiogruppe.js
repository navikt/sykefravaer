import React, { PropTypes, Component } from 'react';
import Radioknapp from './Radioknapp.js';

class Radiogruppe extends Component {
    componentDidUpdate() {
        if (this.props.setFokus) {
            this.refs['js-feilomrade'].focus();
        }
    }

    render() {
        const { name, valgtVerdi, setFokus, erFeil, feilmelding, onChange, spoersmaal, Overskrift, children } = this.props;
        return (<div tabIndex={(setFokus ? '-1' : null)} ref="js-feilomrade" className={erFeil ? 'skjema-feilomrade feil' : 'skjema-feilomrade'}>
            <Overskrift className="skjema-sporsmal">{spoersmaal}</Overskrift>
            {
                children.map((knapp, index) => {
                    return (<Radioknapp {...knapp.props}
                        name={name}
                        key={index}
                        erValgt={valgtVerdi === knapp.props.value}
                        onChange={onChange}
                        id={knapp.props.value}>
                            {knapp.props.children}
                        </Radioknapp>);
                })
            }
            <span className="skjema-feilmelding" role="alert" aria-live="polite">
                {erFeil ? feilmelding : null}
            </span>
        </div>);
    }
}

Radiogruppe.propTypes = {
    name: PropTypes.string,
    valgtVerdi: PropTypes.string,
    erFeil: PropTypes.bool,
    feilmelding: PropTypes.string,
    onChange: PropTypes.func,
    spoersmaal: PropTypes.string,
    Overskrift: PropTypes.string,
    children: PropTypes.array,
    setFokus: PropTypes.bool,
};

Radiogruppe.defaultProps = {
    Overskrift: 'H3',
};

export default Radiogruppe;
