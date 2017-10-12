import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst, keyValue } from 'digisyfo-npm';
import Artikkel from '../components/Artikkel';
import Side from '../sider/Side';
import AppSpinner from '../components/AppSpinner';
import { Feilmelding } from '../components/Feilmelding';

export const RollerSide = ({ henter, hentingFeilet, ledetekster }) => {
    const brodsmuler = [{
        tittel: getLedetekst('landingsside.sidetittel', ledetekster),
        sti: '/',
        erKlikkbar: true,
    }, {
        tittel: getLedetekst('roller.sidetittel', ledetekster),
    }];
    return (<Side brodsmuler={brodsmuler} tittel={getLedetekst('roller.sidetittel', ledetekster)} laster={henter}>
        {
            (() => {
                if (henter) {
                    return <AppSpinner />;
                }
                if (hentingFeilet) {
                    return <Feilmelding />;
                }
                return (<Artikkel
                    tittel={getLedetekst('roller.tittel', ledetekster)}
                    innhold={getLedetekst('roller.innhold', ledetekster)} />);
            })()
        }
    </Side>);
};

RollerSide.propTypes = {
    hentingFeilet: PropTypes.bool,
    henter: PropTypes.bool,
    ledetekster: keyValue,
};

export function mapStateToProps(state) {
    return {
        hentingFeilet: state.ledetekster.hentingFeilet,
        henter: state.ledetekster.henter,
        ledetekster: state.ledetekster.data,
    };
}

const RollerContainer = connect(mapStateToProps)(RollerSide);

export default RollerContainer;
