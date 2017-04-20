import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { getSykmelding, getLedetekst } from 'digisyfo-npm';
import ArbeidsgiversSykmelding from '../components/sykmelding/ArbeidsgiversSykmelding';
import Side from '../sider/Side';
import AppSpinner from '../components/AppSpinner';
import { Feilmelding } from '../components/Feilmelding';
import { hentArbeidsgiversSykmeldinger } from '../actions/arbeidsgiversSykmeldinger_actions';
import { sykmelding as sykmeldingPt, brodsmule as brodsmulePt } from '../propTypes';

let printTrigget = false;

class SkrivUt extends Component {

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
        const { sykmelding, ledetekster, brodsmuler, henter, hentingFeilet } = this.props;

        return (<Side tittel={getLedetekst('skriv-ut-sykmelding.sidetittel', ledetekster)} brodsmuler={brodsmuler}>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    } else if (hentingFeilet || !sykmelding) {
                        return <Feilmelding />;
                    }
                    return (
                        <ArbeidsgiversSykmelding sykmelding={sykmelding} ledetekster={ledetekster} erApen />
                    );
                })()
            }
        </Side>);
    }

}

SkrivUt.propTypes = {
    sykmelding: sykmeldingPt,
    ledetekster: PropTypes.object,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    dispatch: PropTypes.func,
};

export const mapStateToProps = (state, ownProps) => {
    const sykmeldingId = ownProps.params.sykmeldingId;
    const sykmelding = getSykmelding(state.arbeidsgiversSykmeldinger.data, sykmeldingId);
    const ledetekster = state.ledetekster.data;

    return {
        sykmelding,
        henter: state.ledetekster.henter || state.arbeidsgiversSykmeldinger.henter,
        hentingFeilet: state.ledetekster.hentingFeilet || state.arbeidsgiversSykmeldinger.hentingFeilet,
        ledetekster,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel', ledetekster),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('dine-sykmeldinger.sidetittel', ledetekster),
            sti: '/sykmeldinger',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('din-sykmelding.sidetittel', ledetekster),
            sti: `/sykmeldinger/${sykmeldingId}`,
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('skriv-ut-sykmelding.sidetittel', ledetekster),
        }],
    };
};

const SkrivUtSykmeldingContainer = connect(mapStateToProps)(SkrivUt);

export default SkrivUtSykmeldingContainer;
