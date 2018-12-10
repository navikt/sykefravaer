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
import { sykmeldtInfo as sykmeldtInfoPropTypes, oppfolging as oppfolgingPropTypes,
    loginInfo as loginInfoPropTypes } from '../propTypes';

class InfoSideFO extends Component {
    componentWillMount() {
        this.props.actions.hentOppfolging();
        this.props.actions.hentSykmeldtinfodata();
        this.props.actions.hentLoginInfo();
    }

    henter() {
        const { henterLedetekster, oppfolging, sykmeldtInfo, loginInfo } = this.props;
        return henterLedetekster || oppfolging.henter || sykmeldtInfo.henter || loginInfo.henter;
    }

    hentingFeilet() {
        const { hentingLedeteksterFeilet, oppfolging, sykmeldtInfo, loginInfo } = this.props;
        return hentingLedeteksterFeilet || oppfolging.hentingFeilet || sykmeldtInfo.hentingFeilet || loginInfo.hentingFeilet;
    }

    render() {
        const { oppfolging, sykmeldtInfo, loginInfo } = this.props;
        return (
            <SideStrippet tittel={getLedetekst('infoside-fo.sidetittel')} laster={this.henter()}>
                {
                    (() => {
                        if (this.henter()) {
                            return <AppSpinner />;
                        } else if (this.hentingFeilet()) {
                            return <Feilmelding />;
                        }
                        return (
                            <ArbeidsrettetOppfolging
                                brukerNavn={loginInfo.data.name}
                                underOppfolging={oppfolging.data.underOppfolging}
                                maksDato={sykmeldtInfo.data.maksDato}
                            />
                        );
                    })()
                }
            </SideStrippet>
        );
    }
}

InfoSideFO.propTypes = {
    henterLedetekster: PropTypes.bool,
    hentingLedeteksterFeilet: PropTypes.bool,
    oppfolging: oppfolgingPropTypes,
    sykmeldtInfo: sykmeldtInfoPropTypes,
    loginInfo: loginInfoPropTypes,
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
        oppfolging: {
            henter: oppfolging.henter,
            hentingFeilet: oppfolging.hentingFeilet,
            data: oppfolging.data,
        },
        sykmeldtInfo: {
            henter: sykmeldtinfodata.henter,
            hentingFeilet: sykmeldtinfodata.hentingFeilet,
            data: sykmeldtinfodata.data,
        },
        loginInfo: {
            henter: loginInfo.henter,
            hentingFeilet: loginInfo.hentingFeilet,
            data: loginInfo.data,
        },
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
