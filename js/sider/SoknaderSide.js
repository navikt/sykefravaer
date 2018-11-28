import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst } from 'digisyfo-npm';
import { bindActionCreators } from 'redux';
import Soknader from '../components/sykepengesoknader/Soknader';
import Side from './Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import { sykepengesoknad as sykepengesoknadPt, brodsmule as brodsmulePt, soknad as soknadPt } from '../propTypes';
import { hentSykepengesoknader } from '../actions/sykepengesoknader_actions';
import { hentSoknader } from '../actions/soknader_actions';
import { skalHenteSykepengesoknader } from '../selectors/sykepengesoknaderSelectors';
import { skalHenteSoknader } from '../selectors/soknaderSelectors';
import { skalHenteDineSykmeldingerSelector } from '../selectors/dineSykmeldingerSelectors';
import { hentDineSykmeldinger } from '../actions/dineSykmeldinger_actions';
import { ARBEIDSTAKERE } from '../enums/soknadtyper';
import { toggleNyArbeidstakerSoknad } from '../selectors/unleashTogglesSelectors';

export class Container extends Component {
    componentWillMount() {
        this.props.actions.hentSykepengesoknader();
        this.props.actions.hentSoknader();
        this.props.actions.hentDineSykmeldinger();
    }

    render() {
        const {
            brodsmuler,
            henter,
            hentingFeilet,
            sykepengesoknader,
            soknader,
            visFeil } = this.props;

        return (
            <Side tittel={getLedetekst('soknader.sidetittel')} brodsmuler={brodsmuler} laster={henter}>
                {
                    (() => {
                        if (henter) {
                            return <AppSpinner />;
                        }
                        if (hentingFeilet) {
                            return <Feilmelding />;
                        }
                        return (<Soknader sykepengesoknader={sykepengesoknader} soknader={soknader} visFeil={visFeil} />);
                    })()
                }
            </Side>
        );
    }
}

Container.propTypes = {
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
    soknader: PropTypes.arrayOf(soknadPt),

    actions: PropTypes.shape({
        hentDineSykmeldinger: PropTypes.func,
        hentSykepengesoknader: PropTypes.func,
        hentSoknader: PropTypes.func,
    }),
    visFeil: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ hentSykepengesoknader, hentSoknader, hentDineSykmeldinger }, dispatch),
    };
}

export function mapStateToProps(state) {
    const sykepengesoknader = state.sykepengesoknader.data;
    const dineSykmeldinger = state.dineSykmeldinger.data;
    const soknader = toggleNyArbeidstakerSoknad(state)
        ? state.soknader.data.map((soknad) => {
            const sykmelding = dineSykmeldinger.find((sykmld) => {
                return sykmld.id === soknad.sykmeldingId;
            });
            return soknad.soknadstype === ARBEIDSTAKERE
                ? {
                    ...soknad,
                    sykmelding,
                }
                : soknad;
        })
        : state.soknader.data.filter((s) => {
            return s.soknadstype !== ARBEIDSTAKERE;
        });

    return {
        sykepengesoknader,
        soknader,
        henter: state.ledetekster.henter
            || state.sykepengesoknader.henter
            || state.soknader.henter
            || skalHenteSoknader(state)
            || skalHenteSykepengesoknader(state)
            || skalHenteDineSykmeldingerSelector(state),
        hentingFeilet: state.ledetekster.hentingFeilet
            || (state.sykepengesoknader.hentingFeilet && state.soknader.hentingFeilet),
        visFeil: [state.soknader.hentingFeilet, state.sykepengesoknader.hentingFeilet].some((s) => {
            return s;
        }),
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('soknader.sidetittel'),
        }],
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
