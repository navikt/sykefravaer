import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst, Radiofaner } from 'digisyfo-npm';
import { hentTidslinjer } from '../../actions/tidslinjer_actions';
import history from '../../history';

const MED_ARBEIDSGIVER = 'MED_ARBEIDSGIVER';
const UTEN_ARBEIDSGIVER = 'UTEN_ARBEIDSGIVER';

const verdier = {};
verdier[MED_ARBEIDSGIVER] = 'med-arbeidsgiver';
verdier[UTEN_ARBEIDSGIVER] = 'uten-arbeidsgiver';

export class VelgArbeidssituasjon extends Component {
    changeHandler(verdi) {
        history.replace(`/sykefravaer/tidslinjen/${verdier[verdi]}`);
        this.props.hentTidslinjer([], verdi);
    }

    render() {
        return (<Radiofaner
            alternativer={this.props.arbeidssituasjoner}
            valgtAlternativ={this.props.valgtArbeidssituasjon}
            changeHandler={(v) => { this.changeHandler(v); }}
            radioName="tidslinje-arbeidssituasjon"
            className="tidslinje__faner" />);
    }
}

VelgArbeidssituasjon.propTypes = {
    arbeidssituasjoner: PropTypes.arrayOf(PropTypes.shape({
        tittel: PropTypes.string,
        verdi: PropTypes.oneOf([MED_ARBEIDSGIVER, UTEN_ARBEIDSGIVER]),
    })),
    valgtArbeidssituasjon: PropTypes.string,
    hentTidslinjer: PropTypes.func,
};

export function mapStateToProps(state, ownProps) {
    return {
        valgtArbeidssituasjon: state.brukerinfo.innstillinger.arbeidssituasjon || ownProps.arbeidssituasjon || MED_ARBEIDSGIVER,
        arbeidssituasjoner: [{
            tittel: getLedetekst('tidslinje.filter.med-arbeidsgiver'),
            verdi: MED_ARBEIDSGIVER,
        }, {
            tittel: getLedetekst('tidslinje.filter.uten-arbeidsgiver'),
            verdi: UTEN_ARBEIDSGIVER,
            hjelpetekst: {
                tittel: getLedetekst('tidslinje.filter.med-arbeidsgiver.hjelpetekst.tittel'),
                tekst: getLedetekst('tidslinje.filter.med-arbeidsgiver.hjelpetekst.tekst'),
            },
        }],
    };
}

const TidslinjeVelgArbeidssituasjonContainer = connect(mapStateToProps, { hentTidslinjer })(VelgArbeidssituasjon);

export default TidslinjeVelgArbeidssituasjonContainer;
