import React, { PropTypes } from 'react';
import Artikkel from '../components/Artikkel';
import Side from '../sider/Side';
import AppSpinner from '../components/AppSpinner';
import { connect } from 'react-redux';
import { Feilmelding } from '../components/Feilmelding';
import { getLedetekst } from 'digisyfo-npm';
import { brodsmuler as brodsmulePt } from '../propTypes';

export const RollerSide = ({ brodsmuler, henter, hentingFeilet }) => {
    return (<Side brodsmuler={brodsmuler} tittel={getLedetekst('roller.sidetittel')}>
        {
            (() => {
                if (henter) {
                    return <AppSpinner />;
                }
                if (hentingFeilet) {
                    return <Feilmelding />;
                }
                return (<Artikkel tittel={getLedetekst('roller.tittel')}
                    innhold={getLedetekst('roller.innhold')} />);
            })()
        }
    </Side>);
};

RollerSide.propTypes = {
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    hentingFeilet: PropTypes.bool,
    henter: PropTypes.bool,
};

export function mapStateToProps(state) {
    return {
        hentingFeilet: state.ledetekster.hentingFeilet,
        henter: state.ledetekster.henter,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('roller.sidetittel'),
        }],
    };
}

const RollerContainer = connect(mapStateToProps)(RollerSide);

export default RollerContainer;
