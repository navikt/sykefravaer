import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/brukerinfo_actions.js';
import Faner from '../components/Faner.js';
import history from '../history.js';

const verdier = {
    MED_ARBEIDSGIVER: 'med-arbeidsgiver',
    UTEN_ARBEIDSGIVER: 'uten-arbeidsgiver',
};

export class VelgArbeidssituasjon extends Component {
    redirect(verdi) {
        history.replace(`/sykefravaer/app/tidslinjen/${verdi}`);
    }

    clickHandler(e, verdi) {
        e.preventDefault();
        this.redirect(verdier[verdi]);
        this.props.setArbeidssituasjon(verdi);
    }

    render() {
        return (<Faner
            alternativer={this.props.arbeidssituasjoner}
            valgtAlternativ={this.props.valgtArbeidssituasjon}
            clickHandler={(e, v) => { this.clickHandler(e, v); }}
            className="tidslinje-faner" />);
    }
}

VelgArbeidssituasjon.propTypes = {
    arbeidssituasjoner: PropTypes.array,
    valgtArbeidssituasjon: PropTypes.string,
    setArbeidssituasjon: PropTypes.func,
};

export function mapStateToProps(state, ownProps) {
    return {
        valgtArbeidssituasjon: state.brukerinfo.innstillinger.arbeidssituasjon || ownProps.arbeidssituasjon || 'MED_ARBEIDSGIVER',
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
