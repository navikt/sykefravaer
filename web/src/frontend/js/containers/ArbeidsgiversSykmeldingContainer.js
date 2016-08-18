import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getSykmelding } from '../utils';
import ArbeidsgiversSykmelding from '../components/sykmelding/ArbeidsgiversSykmelding';

const ArbeidsgiversSykmeldingWrapper = ({ sykmelding, ledetekster, Overskrift }) => {
    if (sykmelding) {
        return <ArbeidsgiversSykmelding sykmelding={sykmelding} ledetekster={ledetekster} Overskrift={Overskrift} />;
    }
    return null;
};

ArbeidsgiversSykmeldingWrapper.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
    Overskrift: PropTypes.string,
};

export const mapStateToProps = (state, ownProps) => {
    let sykmelding;

    if (ownProps.sykmeldingId) {
        const _sykmelding = getSykmelding(state.arbeidsgiversSykmeldinger.data, ownProps.sykmeldingId);
        if (_sykmelding) {
            sykmelding = _sykmelding;
        }
    }

    return {
        sykmelding,
        ledetekster: state.ledetekster.data,
        Overskrift: ownProps.Overskrift,
    };
};

const ArbeidsgiversSykmeldingContainer = connect(mapStateToProps)(ArbeidsgiversSykmeldingWrapper);

export default ArbeidsgiversSykmeldingContainer;
