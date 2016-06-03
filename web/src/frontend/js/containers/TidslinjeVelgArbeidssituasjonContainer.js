import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/brukerinfo_actions.js';
import Faner from '../components/Faner.js';

export const VelgArbeidssituasjon = (props) => {
    const clickHandler = (e, verdi) => {
        e.preventDefault();
        props.setArbeidssituasjon(verdi);
    };

    return (<Faner alternativer={props.arbeidssituasjoner}
                   valgtAlternativ={props.valgtArbeidssituasjon}
                   clickHandler={clickHandler}
                   className="tidslinje-faner"/>);
};

VelgArbeidssituasjon.propTypes = {
    arbeidssituasjoner: PropTypes.array,
    valgtArbeidssituasjon: PropTypes.string,
    setArbeidssituasjon: PropTypes.func,
};

export function mapStateToProps(state) {
    return {
        valgtArbeidssituasjon: state.brukerinfo.innstillinger.arbeidssituasjon || 'MED_ARBEIDSGIVER',
        arbeidssituasjoner: [{
            tittel: 'Jeg har arbeidsgiver',
            verdi: 'MED_ARBEIDSGIVER',
        }, {
            tittel: 'Jeg har ikke arbeidsgiver',
            verdi: 'UTEN_ARBEIDSGIVER',
        }],
    };
}

const TidslinjeVelgArbeidssituasjonContainer = connect(mapStateToProps, actionCreators)(VelgArbeidssituasjon);

export default TidslinjeVelgArbeidssituasjonContainer;
