import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst } from '../digisyfoNpm';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import ArbeidsrettetOppfolging from './ArbeidsrettetOppfolging';
import Side from '../sider/SideStrippet';
import { hentOppfolging, hentSykmeldtinfodata } from '../data/brukerinfo/brukerinfo_actions';
import { selectLedeteksterHenter, selectLedeteksterHentingFeilet } from '../data/ledetekster/ledeteksterSelectors';
import {
    selectOppfolgingErUnderOppfolging,
    selectOppfolgingHenter,
    selectOppfolgingHentingFeilet,
    selectSykmeldtinfodataHenter,
    selectSykmeldtinfodataHentingFeilet,
} from '../data/brukerinfo/brukerinfo';
import { hentDineSykmeldinger } from '../sykmeldinger/data/dine-sykmeldinger/dineSykmeldingerActions';
import { hentLedere } from '../landingsside/data/ledere/ledereActions';
import { selectArbeidsgivereTilDinSituasjon } from '../landingsside/din-situasjon/DinSituasjonContainer';

class ArbeidsrettetOppfolgingSide extends Component {
    componentDidMount() {
        const { doHentOppfolging, doHentSykmeldtinfodata, doHentLedere, doHentDineSykmeldinger } = this.props;
        doHentOppfolging();
        doHentSykmeldtinfodata();
        doHentLedere();
        doHentDineSykmeldinger();
    }

    render() {
        const {
            henter, hentingFeilet, underOppfolging, arbeidsgivere,
        } = this.props;
        return (
            <Side hvit tittel={getLedetekst('ao.sidetittel')} laster={henter}>
                {
                    (() => {
                        if (henter) {
                            return <AppSpinner />;
                        } if (hentingFeilet) {
                            return <Feilmelding />;
                        }
                        return (
                            <ArbeidsrettetOppfolging
                                underOppfolging={underOppfolging}
                                harArbeidsgiver={arbeidsgivere.length > 0}
                            />
                        );
                    })()
                }
            </Side>
        );
    }
}

ArbeidsrettetOppfolgingSide.propTypes = {
    doHentOppfolging: PropTypes.func,
    doHentSykmeldtinfodata: PropTypes.func,
    doHentLedere: PropTypes.func,
    doHentDineSykmeldinger: PropTypes.func,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    underOppfolging: PropTypes.bool,
    arbeidsgivere: PropTypes.arrayOf(PropTypes.string),
};

const mapStateToProps = (state) => {
    const arbeidsgivere = selectArbeidsgivereTilDinSituasjon(state);

    return {
        arbeidsgivere,
        henter: selectLedeteksterHenter(state)
            || selectOppfolgingHenter(state)
            || selectSykmeldtinfodataHenter(state),
        hentingFeilet: selectLedeteksterHentingFeilet(state)
            || selectOppfolgingHentingFeilet(state)
            || selectSykmeldtinfodataHentingFeilet(state),
        underOppfolging: selectOppfolgingErUnderOppfolging(state),
    };
};

const actionCreators = {
    doHentOppfolging: hentOppfolging,
    doHentSykmeldtinfodata: hentSykmeldtinfodata,
    doHentLedere: hentLedere,
    doHentDineSykmeldinger: hentDineSykmeldinger,
};

export default connect(mapStateToProps, actionCreators)(ArbeidsrettetOppfolgingSide);
