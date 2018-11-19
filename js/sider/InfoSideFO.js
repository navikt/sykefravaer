import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst } from 'digisyfo-npm';
import Feilmelding from '../components/Feilmelding';
import Side from './Side';
import AppSpinner from '../components/AppSpinner';
import { brodsmule as brodsmulePt } from '../propTypes';

const InfoSideFO = ({ brodsmuler, henter, hentingFeilet }) => {
    return (
        <Side tittel={getLedetekst('infoside-fo.sidetittel')} brodsmuler={brodsmuler} laster={henter}>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    } else if (hentingFeilet) {
                        return (<Feilmelding />);
                    }
                    return (<ArbeidsrettetOppfolging />);
                })()
            }
        </Side>
    );
};

InfoSideFO.propTypes = {
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
};

export function mapStateToProps(state) {
    return {
        henter: state.ledetekster.henter || state.dineSykmeldinger.henter || !state.dineSykmeldinger.hentet,
        hentingFeilet: state.ledetekster.hentingFeilet || state.dineSykmeldinger.hentingFeilet,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('infoside-fo.sidetittel'),
            sti: '/arbeidsrettet-oppfolging',
        }],
    };
}

export default connect(mapStateToProps)(InfoSideFO);

const ArbeidsrettetOppfolging = () => {
    return (
        <div className="side__innhold">
            <div className="sidebanner">
                {getLedetekst('infoside-fo.sidetittel')}
            </div>
        </div>
    );
};
