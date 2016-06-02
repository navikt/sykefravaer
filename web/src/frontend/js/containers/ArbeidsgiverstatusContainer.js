import React from 'react';
import { connect } from 'react-redux';

const Arbeidsgiverstatus = (props) => {
    const valideringsklasse = props.erFeil ? "har-valideringsfeil" : "";
    const maybeFeilmelding = props.erFeil ? props.feilmelding : "";
    console.log(props);

    return (
        <div className={valideringsklasse}>
            {props.children}
            <p className="skjema-feilmelding" aria-live="polite">{maybeFeilmelding}</p>
        </div>
    );
};

function mapStateToProps(state) {
    console.log(state);
    return {
        erFeil: state.dineSykmeldinger.erFeil,
    };
}

const ArbeidsgiverstatusContainer = connect(mapStateToProps)(Arbeidsgiverstatus);

export default ArbeidsgiverstatusContainer;

