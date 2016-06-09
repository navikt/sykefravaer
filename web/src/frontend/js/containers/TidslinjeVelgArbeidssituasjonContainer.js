import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/brukerinfo_actions.js';
import Radiofaner from '../components/Radiofaner.js';
import history from '../history.js';
import { getLedetekst } from '../ledetekster';

const verdier = {
    MED_ARBEIDSGIVER: 'med-arbeidsgiver',
    UTEN_ARBEIDSGIVER: 'uten-arbeidsgiver',
};

export class VelgArbeidssituasjon extends Component {
    redirect(verdi) {
        history.replace(`/sykefravaer/app/tidslinjen/${verdi}`);
    }

    changeHandler(verdi) {
        this.redirect(verdier[verdi]);
        this.props.setArbeidssituasjon(verdi);
    }

    render() {
        return (<Radiofaner
            alternativer={this.props.arbeidssituasjoner}
            valgtAlternativ={this.props.valgtArbeidssituasjon}
            changeHandler={(v) => { this.changeHandler(v); }}
            radioName="tidslinje-arbeidssituasjon"
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
            tittel: getLedetekst('tidslinje.filter.med-arbeidsgiver', state.ledetekster.data),
            verdi: 'MED_ARBEIDSGIVER',
        }, {
            tittel: getLedetekst('tidslinje.filter.uten-arbeidsgiver', state.ledetekster.data),
            verdi: 'UTEN_ARBEIDSGIVER',
        }],
    };
}

const TidslinjeVelgArbeidssituasjonContainer = connect(mapStateToProps, actionCreators)(VelgArbeidssituasjon);

export default TidslinjeVelgArbeidssituasjonContainer;
