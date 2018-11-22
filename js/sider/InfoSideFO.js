import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst } from 'digisyfo-npm';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import ArbeidsrettetOppfolging from '../components/ArbeidsrettetOppfolging';
import SideStrippet from './SideStrippet';

const InfoSideFO = ({ henter, hentingFeilet }) => {
    return (
        <SideStrippet tittel={getLedetekst('infoside-fo.sidetittel')} laster={henter} fullBredde>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    } else if (hentingFeilet) {
                        return <Feilmelding />;
                    }
                    return (<ArbeidsrettetOppfolging />);
                })()
            }
        </SideStrippet>
    );
};

InfoSideFO.propTypes = {
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
};

export function mapStateToProps(state) {
    return {
        henter: state.ledetekster.henter,
        hentingFeilet: state.ledetekster.hentingFeilet,
    };
}

export default connect(mapStateToProps)(InfoSideFO);
