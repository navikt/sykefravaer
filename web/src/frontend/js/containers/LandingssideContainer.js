import React, { PropTypes } from 'react';
import Landingsside from '../components/landingsside/Landingsside';
import { connect } from 'react-redux';
import StrippetSide from '../sider/StrippetSide';
import Side from '../sider/Side';
import { getLedetekst } from 'digisyfo-npm';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import { brodsmule as brodsmulePt, sykepengesoknad as sykepengesoknadPt } from '../propTypes';
import { proptypes as motePropTypes } from 'moter-npm';

export const LandingssideSide = (props) => {
    const {
        brodsmuler,
        skjulVarsel,
        henter,
        hentingFeilet,
        sykepengesoknader,
        harDialogmote } = props;

    if (henter || hentingFeilet) {
        return (<Side tittel={getLedetekst('landingsside.sidetittel')} brodsmuler={brodsmuler}>
        {
            (() => {
                if (henter) {
                    return <AppSpinner />;
                }
                return <Feilmelding />;
            })()
        }
        </Side>);
    }
    return (
        <StrippetSide tittel={getLedetekst('landingsside.sidetittel')}>
            <Landingsside
                brodsmuler={brodsmuler}
                skjulVarsel={skjulVarsel}
                sykepengesoknader={sykepengesoknader}
                harDialogmote={harDialogmote} />
        </StrippetSide>
    );
};

LandingssideSide.propTypes = {
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    skjulVarsel: PropTypes.bool,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
    dialogmoter: PropTypes.arrayOf(motePropTypes.mote),
    harDialogmote: PropTypes.bool,
};

export function mapStateToProps(state) {
    const sykepengesoknader = state.sykepengesoknader.data;

    return {
        henter: state.ledetekster.henter || state.sykepengesoknader.henter,
        hentingFeilet: state.ledetekster.hentingFeilet || state.sykepengesoknader.hentingFeilet,
        skjulVarsel: (state.brukerinfo && state.brukerinfo.innstillinger) ? (state.brukerinfo.innstillinger.skjulUnderUtviklingVarsel === true) : false,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
        }],
        sykepengesoknader,
        harDialogmote: state.mote.data !== null,
    };
}

const LandingssideContainer = connect(mapStateToProps)(LandingssideSide);

export default LandingssideContainer;
