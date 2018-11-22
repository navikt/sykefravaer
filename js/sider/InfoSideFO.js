import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst } from 'digisyfo-npm';
import Feilmelding from '../components/Feilmelding';
import Side from './Side';
import AppSpinner from '../components/AppSpinner';
import ArbeidsrettetOppfolging from '../components/ArbeidsrettetOppfolging';

const InfoSideFO = ({ henter, hentingFeilet }) => {
    const brodsmuler = [{
        tittel: getLedetekst('landingsside.sidetittel'),
        sti: '/',
        erKlikkbar: true,
    }, {
        tittel: getLedetekst('infoside-fo.sidetittel'),
        sti: '/oppfolgingsplaner',
    }];
    return (
        <Side tittel={getLedetekst('infoside-fo.sidetittel')} laster={henter} brodsmuler={brodsmuler} className="infoside-fo" fullBredde>
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
        </Side>
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
