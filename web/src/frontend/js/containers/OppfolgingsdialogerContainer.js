import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getLedetekst } from 'digisyfo-npm';
import Side from '../sider/Side';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import { brodsmule as brodsmulePt } from '../propTypes';
import Oppfolgingsdialoger from '../components/oppfolgingsdialoger/Oppfolgingsdialoger';
import { OppfolgingsdialogInfoboks } from 'oppfolgingsdialog-npm';

const hentFeilmelding = ({ ledetekster, begrensning }) => {
    if (begrensning.aldersbegrensning) {
        return getLedetekst('oppfolgingsdialog.infoboks.ikke-tilgang.aldersbegrensning.tekst', ledetekster);
    } else if (begrensning.kodebegrensning) {
        return getLedetekst('oppfolgingsdialog.infoboks.ikke-tilgang.kodebegrensning.tekst', ledetekster);
    }
    return '';
};
hentFeilmelding.propTyopes = {
    ledetekster: PropTypes.object,
    aldersbegrensning: PropTypes.bool,
    begrensning: PropTypes.object,
};

export const OppfolgingsdialogerSide = ({ brodsmuler, oppfolgingsdialoger, ledetekster, henter, hentingFeilet, brukerHarTilgang, begrensning }) => {
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
                    svgAlt="ikkeTilgangIllustrasjon"
                    tittel={getLedetekst('oppfolgingsdialog.infoboks.ikke-tilgang.tittel', ledetekster)}
                    tekst={hentFeilmelding({ ledetekster, begrensning })}
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
    begrensning: PropTypes.object,
};

export const mapStateToProps = (state) => {
    const aldersbegrensning = false;
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
            sti: '/oppfolgingsdialoger',
        }],
        begrensning: { aldersbegrensning, kodebegrensning },
        brukerHarTilgang: !aldersbegrensning && !kodebegrensning,
    };
};

const OppfolgingsdialogerContainer = connect(mapStateToProps)(OppfolgingsdialogerSide);

export default OppfolgingsdialogerContainer;
