import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setArbeidsgiver } from '../actions/dinSykmelding_actions';
import VelgArbeidsgiver from '../components/sykmeldingskjema/VelgArbeidsgiver';
import { getLedetekst, getSykmelding } from 'digisyfo-npm';
import { sykmelding as sykmeldingPt, arbeidsgiver as arbeidsgiverPt } from '../propTypes';

export class VelgArbeidsgiverWrapper extends Component {
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

VelgArbeidsgiverWrapper.propTypes = {
    sykmelding: sykmeldingPt.isRequired,
    dispatch: PropTypes.func,
    arbeidsgivere: PropTypes.arrayOf(arbeidsgiverPt),
    valgtArbeidsgiverOrgnummer: PropTypes.string,
    resetState: PropTypes.func,
};

export function mapStateToProps(state, ownProps) {
    let sykmelding = {};
    if (ownProps.sykmeldingId) {
        const _sykmelding = getSykmelding(state.arbeidsgiversSykmeldinger.data, ownProps.sykmeldingId);
        if (_sykmelding) {
            sykmelding = _sykmelding;
        }
    }

    const valgtArbeidsgiverOrgnummer = sykmelding && sykmelding.valgtArbeidsgiver ? sykmelding.valgtArbeidsgiver.orgnummer : undefined;
    const arbeidsgivereData = state.arbeidsgivere.data.concat([{
        orgnummer: '0',
        navn: getLedetekst('send-til-arbeidsgiver.annen-arbeidsgiver.label'),
    }]);
    const arbeidsgivere = Object.assign({}, state.arbeidsgivere, {
        data: arbeidsgivereData,
    });
    const feilmelding = sykmelding.valgtArbeidsgiver ? 'Du må sende sykmeldingen til arbeidsgiveren din manuelt' : 'Vennligst velg en arbeidsgiver';

    return {
        arbeidsgivere: arbeidsgivere.data,
        valgtArbeidsgiverOrgnummer,
        sykmelding,
        feilmelding,
        resetState: ownProps.resetState,
    };
}

const VelgArbeidsgiverContainer = connect(mapStateToProps)(VelgArbeidsgiverWrapper);

export default VelgArbeidsgiverContainer;
