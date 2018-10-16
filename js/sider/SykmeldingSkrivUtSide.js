import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSykmelding, getLedetekst } from 'digisyfo-npm';
import ArbeidsgiversSykmelding from '../components/sykmelding/ArbeidsgiversSykmelding';
import Side from './Side';
import AppSpinner from '../components/AppSpinner';
import { Feilmelding } from '../components/Feilmelding';
import { hentArbeidsgiversSykmeldinger } from '../actions/arbeidsgiversSykmeldinger_actions';
import { sykmelding as sykmeldingPt, brodsmule as brodsmulePt } from '../propTypes/index';

let printTrigget = false;

class Container extends Component {
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(hentArbeidsgiversSykmeldinger());
    }

    componentDidUpdate() {
        const { sykmelding, henter, hentingFeilet } = this.props;
        if (sykmelding && !hentingFeilet && !henter && !printTrigget) {
            setTimeout(() => {
                window.print();
            }, 1000);
            printTrigget = true;
        }
    }

    render() {
        const { sykmelding, brodsmuler, henter, hentingFeilet, hentet } = this.props;

        return (<Side tittel={getLedetekst('skriv-ut-sykmelding.sidetittel')} brodsmuler={brodsmuler} laster={henter || !hentet}>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    } else if (hentingFeilet || !sykmelding) {
                        return <Feilmelding />;
                    }
                    return (
                        <ArbeidsgiversSykmelding sykmelding={sykmelding} erApen />
                    );
                })()
            }
        </Side>);
    }
}

Container.propTypes = {
    sykmelding: sykmeldingPt,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    dispatch: PropTypes.func,
    hentet: PropTypes.bool,
};

export const mapStateToProps = (state, ownProps) => {
    const sykmeldingId = ownProps.params.sykmeldingId;
    const sykmelding = getSykmelding(state.arbeidsgiversSykmeldinger.data, sykmeldingId);

    return {
        sykmelding,
        henter: state.ledetekster.henter || state.arbeidsgiversSykmeldinger.henter,
        hentet: state.arbeidsgiversSykmeldinger.hentet,
        hentingFeilet: state.ledetekster.hentingFeilet || state.arbeidsgiversSykmeldinger.hentingFeilet,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('dine-sykmeldinger.sidetittel'),
            sti: '/sykmeldinger',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('din-sykmelding.sidetittel'),
            sti: `/sykmeldinger/${sykmeldingId}`,
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('skriv-ut-sykmelding.sidetittel'),
        }],
    };
};

const SykmeldingSkrivUtSide = connect(mapStateToProps)(Container);

export default SykmeldingSkrivUtSide;
