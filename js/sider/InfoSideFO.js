import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLedetekst } from 'digisyfo-npm';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import ArbeidsrettetOppfolging from '../components/arbeidsrettet-oppfolging/ArbeidsrettetOppfolging';
import SideStrippet from './SideStrippet';
import { hentOppfolging, hentSykmeldtinfodata } from '../actions/brukerinfo_actions';

class InfoSideFO extends Component {
    componentWillMount() {
        this.props.actions.hentOppfolging();
        this.props.actions.hentSykmeldtinfodata();

        this.henter = this.henter.bind(this);
    }

    henter() {
        const { henterLedetekster, henterOppfolging, henterSykmeldtInfo } = this.props;
        return henterLedetekster || henterOppfolging || henterSykmeldtInfo;
    }

    hentingFeilet() {
        const { hentingLedeteksterFeilet, hentingOppfolgingFeilet, hentingSykmeldtInfoFeilet } = this.props;
        return hentingLedeteksterFeilet || hentingOppfolgingFeilet || hentingSykmeldtInfoFeilet;
    }

    render() {
        const { underOppfolging, sykmeldtInfo } = this.props;
        return (
            <SideStrippet tittel={getLedetekst('infoside-fo.sidetittel')} laster={this.henter()} fullBredde>
                {
                    (() => {
                        if (this.henter()) {
                            return <AppSpinner />;
                        } else if (this.hentingFeilet()) {
                            return <Feilmelding />;
                        }
                        return (<ArbeidsrettetOppfolging underOppfolging={underOppfolging} sykmeldtInfo={sykmeldtInfo} />);
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
    actions: PropTypes.shape({
        hentOppfolging: PropTypes.func,
        hentSykmeldtinfodata: PropTypes.func,
    }),
};

export function mapStateToProps(state) {
    return {
        henterLedetekster: state.ledetekster.henter,
        hentingLedeteksterFeilet: state.ledetekster.hentingFeilet,
        henterOppfolging: state.brukerinfo.oppfolging.henter,
        hentingOppfolgingFeilet: state.brukerinfo.oppfolging.hentingFeilet,
        underOppfolging: state.brukerinfo.oppfolging.data.underOppfolging,
        henterSykmeldtInfo: state.brukerinfo.sykmeldtinfodata.henter,
        hentingSykmeldtInfoFeilet: state.brukerinfo.sykmeldtinfodata.hentingFeilet,
        sykmeldtInfo: state.brukerinfo.sykmeldtinfodata.data,
    };
}

const mapDispatchToProps = (dispatch) => {
    const actions = bindActionCreators({
        hentOppfolging,
        hentSykmeldtinfodata,
    }, dispatch);
    return { actions };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoSideFO);
