import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst } from '@navikt/digisyfo-npm';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import ArbeidsrettetOppfolging from './ArbeidsrettetOppfolging';
import SideStrippet from '../sider/SideStrippet';
import { hentLoginInfo, hentOppfolging, hentSykmeldtinfodata } from '../actions/brukerinfo_actions';
import { selectLedeteksterHenter, selectLedeteksterHentingFeilet } from '../selectors/ledeteksterSelectors';
import {
    selectLoginInfoHenter,
    selectLoginInfoHentingFeilet,
    selectLoginInfoNavn,
    selectOppfolgingErUnderOppfolging,
    selectOppfolgingHenter,
    selectOppfolgingHentingFeilet,
    selectSykmeldtinfodataHenter,
    selectSykmeldtinfodataHentingFeilet,
    selectSykmeldtinfodataMaksdatoString,
} from '../reducers/brukerinfo';

class ArbeidsrettetOppfolgingSide extends Component {
    componentDidMount() {
        this.props.doHentOppfolging();
        this.props.doHentSykmeldtinfodata();
        this.props.doHentLoginInfo();
    }

    render() {
        const { henter, hentingFeilet, underOppfolging, maksDatoString, brukernavn } = this.props;
        return (
            <SideStrippet tittel={getLedetekst('infoside-fo.sidetittel')} laster={henter}>
                {
                    (() => {
                        if (henter) {
                            return <AppSpinner />;
                        } else if (hentingFeilet) {
                            return <Feilmelding />;
                        }
                        return (
                            <ArbeidsrettetOppfolging
                                brukerNavn={brukernavn}
                                underOppfolging={underOppfolging}
                                maksDato={maksDatoString}
                            />
                        );
                    })()
                }
            </SideStrippet>
        );
    }
}

ArbeidsrettetOppfolgingSide.propTypes = {
    doHentOppfolging: PropTypes.func,
    doHentSykmeldtinfodata: PropTypes.func,
    doHentLoginInfo: PropTypes.func,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    underOppfolging: PropTypes.bool,
    maksDatoString: PropTypes.string,
    brukernavn: PropTypes.string,
};

const mapStateToProps = (state) => {
    return {
        henter: selectLedeteksterHenter(state)
            || selectOppfolgingHenter(state)
            || selectSykmeldtinfodataHenter(state)
            || selectLoginInfoHenter(state),
        hentingFeilet: selectLedeteksterHentingFeilet(state)
            || selectOppfolgingHentingFeilet(state)
            || selectSykmeldtinfodataHentingFeilet(state)
            || selectLoginInfoHentingFeilet(state),
        underOppfolging: selectOppfolgingErUnderOppfolging(state),
        maksDatoString: selectSykmeldtinfodataMaksdatoString(state),
        brukernavn: selectLoginInfoNavn(state),
    };
};

const actionCreators = {
    doHentOppfolging: hentOppfolging,
    doHentSykmeldtinfodata: hentSykmeldtinfodata,
    doHentLoginInfo: hentLoginInfo,
};

export default connect(mapStateToProps, actionCreators)(ArbeidsrettetOppfolgingSide);
