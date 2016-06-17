import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { hentAktuelleArbeidsgivere } from '../actions/dineArbeidsgivere_actions.js';
import { setArbeidsgiver } from '../actions/dinSykmelding_actions.js';
import VelgArbeidsgiver from '../components/VelgArbeidsgiver.js';

export class Velg extends Component {
    componentWillMount() {
        const { sykmelding, dispatch } = this.props;
        const action = hentAktuelleArbeidsgivere(sykmelding.id);
        dispatch(action);
    }

    onChange(orgnummer) {
        const { arbeidsgivere, dispatch, sykmelding } = this.props;
        const arbeidsgiver = arbeidsgivere.filter((arbgiver) => {
            return arbgiver.orgnummer === orgnummer;
        })[0];
        dispatch(setArbeidsgiver(sykmelding.id, arbeidsgiver));
    }

    render() {
        return (<VelgArbeidsgiver
            {...this.props}
            onChange={(orgnummer) => {
                this.props.resetState();
                this.onChange(orgnummer);
            }} />);
    }
}

Velg.propTypes = {
    sykmelding: PropTypes.object.isRequired,
    dispatch: PropTypes.func,
    ledetekster: PropTypes.object,
    arbeidsgivere: PropTypes.array,
    valgtArbeidsgiverOrgnummer: PropTypes.string,
    resetState: PropTypes.func,
};

export function mapStateToProps(state, ownProps) {
    const valgtArbeidsgiverOrgnummer = ownProps.sykmelding.valgtArbeidsgiver ? ownProps.sykmelding.valgtArbeidsgiver.orgnummer : undefined;
    const arbeidsgivereData = state.arbeidsgivere.data.concat([{
        orgnummer: '0',
        navn: 'Annen arbeidsgiver',
    }]);
    const arbeidsgivere = Object.assign({}, state.arbeidsgivere, {
        data: arbeidsgivereData,
    });

    return {
        ledetekster: state.ledetekster.data,
        arbeidsgivere: arbeidsgivere.data,
        valgtArbeidsgiverOrgnummer,
    };
}

const VelgArbeidsgiverContainer = connect(mapStateToProps)(Velg);

export default VelgArbeidsgiverContainer;
