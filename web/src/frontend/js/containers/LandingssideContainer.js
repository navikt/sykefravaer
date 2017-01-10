import React, { PropTypes } from 'react';
import Landingsside from '../components/Landingsside';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import { getLedetekst } from 'digisyfo-npm';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';

export const LandingssideSide = ({ ledetekster, brodsmuler, skjulVarsel, henter, hentingFeilet, soknader, dialogmoter }) => {
    return (
        <Side tittel={getLedetekst('landingsside.sidetittel', ledetekster)} brodsmuler={brodsmuler}>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    }
                    if (hentingFeilet) {
                        return <Feilmelding />;
                    }
                    return (<Landingsside skjulVarsel={skjulVarsel} ledetekster={ledetekster} soknader={soknader} dialogmoter={dialogmoter} />);
                })()
            }
        </Side>
    );
};

LandingssideSide.propTypes = {
    ledetekster: PropTypes.object,
    brodsmuler: PropTypes.array,
    skjulVarsel: PropTypes.bool,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    soknader: PropTypes.array,
    dialogmoter: PropTypes.array,
};

export function mapStateToProps(state) {
    const ledetekster = state.ledetekster.data;
    return {
        ledetekster,
        henter: state.ledetekster.henter,
        hentingFeilet: state.ledetekster.hentingFeilet,
        skjulVarsel: (state.brukerinfo && state.brukerinfo.innstillinger) ? (state.brukerinfo.innstillinger.skjulUnderUtviklingVarsel === true) : false,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel', ledetekster),
            sti: '/',
        }],
        soknader: [],
        dialogmoter: [],
    };
}

const LandingssideContainer = connect(mapStateToProps)(LandingssideSide);

export default LandingssideContainer;
