import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLedetekst } from 'digisyfo-npm';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import ArbeidsrettetOppfolging from '../components/ArbeidsrettetOppfolging';
import SideStrippet from './SideStrippet';
import { hentOppfolging } from '../actions/brukerinfo_actions';

class InfoSideFO extends Component {
    componentWillMount() {
        if (!this.props.hentetOppfolging) {
            this.props.actions.hentOppfolging();
        }
    }
    render() {
        const {
            henterLedetekster,
            hentingLedeteksterFeilet,
            henterOppfolging,
            hentingOppfolgingFeilet,
            underOppfolging,
        } = this.props;
        return (
            <SideStrippet tittel={getLedetekst('infoside-fo.sidetittel')} laster={henterLedetekster || henterOppfolging} fullBredde>
                {
                    (() => {
                        if (henterLedetekster || henterOppfolging) {
                            return <AppSpinner />;
                        } else if (hentingLedeteksterFeilet || hentingOppfolgingFeilet) {
                            return <Feilmelding />;
                        }
                        return (<ArbeidsrettetOppfolging underOppfolging={underOppfolging} />);
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
    hentetOppfolging: PropTypes.bool,
    underOppfolging: PropTypes.bool,
    actions: PropTypes.shape({
        hentOppfolging: PropTypes.func,
    }),
};

export function mapStateToProps(state) {
    return {
        henterLedetekster: state.ledetekster.henter,
        hentingLedeteksterFeilet: state.ledetekster.hentingFeilet,
        henterOppfolging: state.brukerinfo.oppfolging.henter,
        hentingOppfolgingFeilet: state.brukerinfo.oppfolging.hentingFeilet,
        hentetOppfolging: state.brukerinfo.oppfolging.hentet,
        underOppfolging: state.brukerinfo.oppfolging.data.underOppfolging,
    };
}

const mapDispatchToProps = (dispatch) => {
    const actions = bindActionCreators({
        hentOppfolging,
    }, dispatch);
    return { actions };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoSideFO);
