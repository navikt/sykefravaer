import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { hentAktuelleArbeidsgivere } from '../actions/dineArbeidsgivere_actions.js';
import { setArbeidsgiver } from '../actions/dinSykmelding_actions.js';
import VelgArbeidsgiver from '../components/VelgArbeidsgiver.js';

export class Velg extends Component {
    componentWillMount() {
        const { sykmelding, dispatch, arbeidsgivere } = this.props;
        if (arbeidsgivere.sykmeldingId !== sykmelding.id) {
            const action = hentAktuelleArbeidsgivere(sykmelding.id, sykmelding.id); 
            // Husk å endre andre parameter i hentAktuelleArbeidsgivere til en dato
            dispatch(action);
        }
    }

    onChange(orgnummer) {
        const { arbeidsgivere, dispatch, sykmelding } = this.props;
        const arbeidsgiver = arbeidsgivere.data.filter((arbgiv) => {
            return arbgiv.orgnummer === orgnummer;
        })[0];
        dispatch(setArbeidsgiver(sykmelding.id, arbeidsgiver));
    }

    render() {
        return (<VelgArbeidsgiver
            arbeidsgivere={this.props.arbeidsgivere.data}
            valgtArbeidsgiverOrgnummer={this.props.valgtArbeidsgiverOrgnummer}
            onChange={(orgnummer) => {
                this.onChange(orgnummer);
            }} />);
    }
}

Velg.propTypes = {
    sykmelding: PropTypes.object.isRequired,
    dispatch: PropTypes.func,
    ledetekster: PropTypes.object,
    arbeidsgivere: PropTypes.object,
    valgtArbeidsgiverOrgnummer: PropTypes.number,
};

export function mapStateToProps(state, ownProps) {
    const valgtArbeidsgiverOrgnummer = ownProps.sykmelding.valgtArbeidsgiver ? ownProps.sykmelding.valgtArbeidsgiver.orgnummer : undefined;
    const arbeidsgivereData = state.arbeidsgivere.data.concat([{
        orgnummer: null,
        navn: 'Arbeidsgiveren min er ikke her',
    }]);
    const arbeidsgivere = Object.assign({}, state.arbeidsgivere, {
        data: arbeidsgivereData,
    });

    return {
        sykmelding: ownProps.sykmelding,
        ledetekster: state.ledetekster,
        arbeidsgivere,
        valgtArbeidsgiverOrgnummer,
    };
}

const VelgArbeidsgiverContainer = connect(mapStateToProps)(Velg);

export default VelgArbeidsgiverContainer;
