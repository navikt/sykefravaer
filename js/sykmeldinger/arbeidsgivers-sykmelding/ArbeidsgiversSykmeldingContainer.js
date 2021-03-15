import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSykmelding } from '../../digisyfoNpm';
import ArbeidsgiversSykmelding from './ArbeidsgiversSykmelding';
import { sykmelding as sykmeldingPt } from '../../propTypes';
import { hentArbeidsgiversSykmeldinger as hentArbeidsgiversSykmeldingerAction } from '../data/arbeidsgivers-sykmeldinger/arbeidsgiversSykmeldingerActions';

export class ArbeidsgiversSykmeldingWrapper extends Component {
    componentDidMount() {
        const { skalHenteArbeidsgiversSykmeldinger, hentArbeidsgiversSykmeldinger } = this.props;
        if (skalHenteArbeidsgiversSykmeldinger) {
            hentArbeidsgiversSykmeldinger();
        }
    }

    render() {
        const { sykmelding, Overskrift, henter, erApen } = this.props;
        return (
            <div className="blokk">
                <ArbeidsgiversSykmelding
                    sykmelding={sykmelding}
                    Overskrift={Overskrift}
                    henter={henter}
                    erApen={erApen} />
            </div>
        );
    }
}

ArbeidsgiversSykmeldingWrapper.propTypes = {
    sykmelding: sykmeldingPt,
    erApen: PropTypes.bool,
    Overskrift: PropTypes.string,
    henter: PropTypes.bool,
    skalHenteArbeidsgiversSykmeldinger: PropTypes.bool,
    hentArbeidsgiversSykmeldinger: PropTypes.func,
};

export const mapStateToProps = (state, ownProps) => {
    let sykmelding;
    const _sykmelding = getSykmelding(state.arbeidsgiversSykmeldinger.data, ownProps.sykmeldingId);

    if (_sykmelding) {
        sykmelding = _sykmelding;
    }

    return {
        henter: !state.arbeidsgiversSykmeldinger.hentet || state.arbeidsgiversSykmeldinger.henter,
        skalHenteArbeidsgiversSykmeldinger: !state.arbeidsgiversSykmeldinger.hentet && !state.arbeidsgiversSykmeldinger.henter,
        sykmelding,
        Overskrift: ownProps.Overskrift,
    };
};

const ArbeidsgiversSykmeldingContainer = connect(mapStateToProps, {
    hentArbeidsgiversSykmeldinger: hentArbeidsgiversSykmeldingerAction,
})(ArbeidsgiversSykmeldingWrapper);

export default ArbeidsgiversSykmeldingContainer;
