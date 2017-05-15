import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getLedetekst } from 'digisyfo-npm';
import Side from '../sider/Side';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import { brodsmule as brodsmulePt } from '../propTypes';
import Oppfolgingsdialoger from '../components/oppfolgingsdialoger/Oppfolgingsdialoger';

export const OppfolgingsdialogerSide = ({ brodsmuler, oppfolgingsdialoger, ledetekster, henter, hentingFeilet }) => {
    return (<Side tittel={getLedetekst('oppfolgingsdialoger.sidetittel')} brodsmuler={brodsmuler}>
        {
            (() => {
                if (henter) {
                    return <AppSpinner />;
                } else if (hentingFeilet) {
                    return (<Feilmelding />);
                }
                return (<Oppfolgingsdialoger
                    oppfolgingsdialoger={oppfolgingsdialoger}
                    ledetekster={ledetekster} />);
            })()
        }
    </Side>);
};

OppfolgingsdialogerSide.propTypes = {
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    oppfolgingsdialoger: PropTypes.array,
    ledetekster: PropTypes.object,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
};

export const mapStateToProps = (state) => {
    return {
        oppfolgingsdialoger: state.oppfolgingsdialoger.data,
        henter: state.ledetekster.henter || state.oppfolgingsdialoger.henter,
        hentingFeilet: state.ledetekster.hentingFeilet || state.oppfolgingsdialoger.hentingFeilet,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('oppfolgingsdialoger.sidetittel'),
            sti: '/oppfolgingsdialoger',
        }],
    };
};

const OppfolgingsdialogerContainer = connect(mapStateToProps)(OppfolgingsdialogerSide);

export default OppfolgingsdialogerContainer;
