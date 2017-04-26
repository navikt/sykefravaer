import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getSykmelding } from 'digisyfo-npm';
import ArbeidsgiversSykmelding from '../components/sykmelding/ArbeidsgiversSykmelding';
import { sykmelding as sykmeldingPt } from '../propTypes';

const ArbeidsgiversSykmeldingWrapper = ({ sykmelding, Overskrift }) => {
    if (sykmelding) {
        return (<div className="blokk">
            <ArbeidsgiversSykmelding sykmelding={sykmelding} Overskrift={Overskrift} />
        </div>);
    }
    return null;
};

ArbeidsgiversSykmeldingWrapper.propTypes = {
    sykmelding: sykmeldingPt,
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
        Overskrift: ownProps.Overskrift,
    };
};

const ArbeidsgiversSykmeldingContainer = connect(mapStateToProps)(ArbeidsgiversSykmeldingWrapper);

export default ArbeidsgiversSykmeldingContainer;
