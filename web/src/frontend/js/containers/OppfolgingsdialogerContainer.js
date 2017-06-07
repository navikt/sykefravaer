import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getLedetekst } from 'digisyfo-npm';
import Side from '../sider/Side';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import { brodsmule as brodsmulePt } from '../propTypes';
import Oppfolgingsdialoger from '../components/oppfolgingsdialoger/Oppfolgingsdialoger';
import { OppfolgingsdialogInfoboks } from 'oppfolgingsdialog-npm';

export const OppfolgingsdialogerSide = ({ brodsmuler, oppfolgingsdialoger, ledetekster, henter, hentingFeilet, brukerHarTilgang }) => {
    return (<Side tittel={getLedetekst('oppfolgingsdialoger.sidetittel', ledetekster)} brodsmuler={brodsmuler}>
        {
            (() => {
                if (henter) {
                    return <AppSpinner />;
                } else if (hentingFeilet) {
                    return (<Feilmelding />);
                } else if (brukerHarTilgang) {
                    return (<Oppfolgingsdialoger
                        oppfolgingsdialoger={oppfolgingsdialoger}
                        ledetekster={ledetekster}
                    />);
                }
                return (<OppfolgingsdialogInfoboks
                    svgUrl="/sykefravaer/img/svg/oppfolgingsdialog-infoboks-ikkeTilgang.svg"
                    svgAlt="ikkeTilgang"
                    tittel={getLedetekst('oppfolgingsdialog.infoboks.ikke-tilgang.tittel')}
                    tekst={getLedetekst('oppfolgingsdialog.infoboks.ikke-tilgang.kodebegrensning.tekst')}
                    />
                );
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
    brukerHarTilgang: PropTypes.bool,
};

export const mapStateToProps = (state) => {
    const kodebegrensning = false;

    return {
        ledetekster: state.ledetekster.data,
        oppfolgingsdialoger: state.oppfolgingsdialoger.data,
        henter: state.ledetekster.henter || state.oppfolgingsdialoger.henter,
        hentingFeilet: state.ledetekster.hentingFeilet || state.oppfolgingsdialoger.hentingFeilet,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('oppfolgingsdialoger.sidetittel'),
            sti: '/oppfolgingsplaner',
        }],
        brukerHarTilgang: !kodebegrensning,
    };
};

const OppfolgingsdialogerContainer = connect(mapStateToProps)(OppfolgingsdialogerSide);

export default OppfolgingsdialogerContainer;
