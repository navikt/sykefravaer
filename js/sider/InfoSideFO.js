import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLedetekst } from 'digisyfo-npm';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import ArbeidsrettetOppfolging from '../components/arbeidsrettet-oppfolging/ArbeidsrettetOppfolging';
import SideStrippet from './SideStrippet';
import { hentLoginInfo, hentOppfolging, hentSykmeldtinfodata } from '../actions/brukerinfo_actions';

class InfoSideFO extends Component {
    componentWillMount() {
        this.props.actions.hentOppfolging();
        this.props.actions.hentSykmeldtinfodata();
        this.props.actions.hentLoginInfo();
    }

    henter() {
        const { henterLedetekster, henterOppfolging, henterSykmeldtInfo, henterLoginInfo } = this.props;
        return henterLedetekster || henterOppfolging || henterSykmeldtInfo || henterLoginInfo;
    }

    hentingFeilet() {
        const { hentingLedeteksterFeilet, hentingOppfolgingFeilet, hentingSykmeldtInfoFeilet, hentingLoginInfoFeilet } = this.props;
        return hentingLedeteksterFeilet || hentingOppfolgingFeilet || hentingSykmeldtInfoFeilet || hentingLoginInfoFeilet;
    }

    render() {
        const { underOppfolging, sykmeldtInfo, brukerNavn } = this.props;
        return (
            <SideStrippet tittel={getLedetekst('infoside-fo.sidetittel')} laster={this.henter()} fullBredde>
                {
                    (() => {
                        if (this.henter()) {
                            return <AppSpinner />;
                        } else if (this.hentingFeilet()) {
                            return <Feilmelding />;
                        }
                        return (<ArbeidsrettetOppfolging brukerNavn={brukerNavn} underOppfolging={underOppfolging} sykmeldtInfo={sykmeldtInfo} />);
                    })()
                }
            </SideStrippet>
        );
    }
}

InfoSideFO.propTypes = {
    henterLedetekster: PropTypes.bool,
    hentingLedeteksterFeilet: PropTypes.bool,
    henterOppfolging: PropTypes.bool,
    hentingOppfolgingFeilet: PropTypes.bool,
    underOppfolging: PropTypes.bool,
    henterSykmeldtInfo: PropTypes.bool,
    hentingSykmeldtInfoFeilet: PropTypes.bool,
    sykmeldtInfo: PropTypes.shape({
        maksDato: PropTypes.string,
    }),
    henterLoginInfo: PropTypes.bool,
    hentingLoginInfoFeilet: PropTypes.bool,
    brukerNavn: PropTypes.string,
    actions: PropTypes.shape({
        hentOppfolging: PropTypes.func,
        hentSykmeldtinfodata: PropTypes.func,
        hentLoginInfo: PropTypes.func,
    }),
};

export function mapStateToProps(state) {
    const { ledetekster, brukerinfo: { oppfolging, sykmeldtinfodata, loginInfo } } = state;
    return {
        henterLedetekster: ledetekster.henter,
        hentingLedeteksterFeilet: ledetekster.hentingFeilet,
        henterOppfolging: oppfolging.henter,
        hentingOppfolgingFeilet: oppfolging.hentingFeilet,
        underOppfolging: oppfolging.data.underOppfolging,
        henterSykmeldtInfo: sykmeldtinfodata.henter,
        hentingSykmeldtInfoFeilet: sykmeldtinfodata.hentingFeilet,
        sykmeldtInfo: sykmeldtinfodata.data,
        henterLoginInfo: loginInfo.henter,
        hentingLoginInfoFeilet: loginInfo.hentingFeilet,
        brukerNavn: loginInfo.data.name,
    };
}

const mapDispatchToProps = (dispatch) => {
    const actions = bindActionCreators({
        hentOppfolging,
        hentSykmeldtinfodata,
        hentLoginInfo,
    }, dispatch);
    return { actions };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoSideFO);
