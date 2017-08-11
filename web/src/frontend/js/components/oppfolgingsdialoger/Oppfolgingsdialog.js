import React, { PropTypes } from 'react';
import Godkjenninger from './godkjenninger/Godkjenninger';
import Arbeidsoppgaver from './utfylling/Arbeidsoppgaver';
import ReleasetPlan from './releasetplan/ReleasetPlan';
import Tiltak from './utfylling/Tiltak';
import Godkjenn from './utfylling/Godkjenn';
import {
    NavigasjonsTopp,
    NavigasjonsBunn,
} from 'oppfolgingsdialog-npm';

const inneholderGodkjenninger = (oppfolgingsdialog) => {
    return oppfolgingsdialog.godkjenninger.length > 0;
};

const inneholderReleasetVersjon = (oppfolgingsdialog) => {
    return oppfolgingsdialog.versjoner.length > 0;
};

const erAvvistAvArbeidstaker = (oppfolgingsdialog) => {
    return !oppfolgingsdialog.godkjenninger[0].godkjent && oppfolgingsdialog.arbeidstaker.aktoerId === oppfolgingsdialog.godkjenninger[0].godkjentAvAktoerId;
};

const Oppfolgingsdialog = ({
                            lagrer,
                            lagret,
                            lagringFeilet,
                            lagretArbeidsoppgaveId,
                            lagretTiltakId,
                            sletter,
                            slettet,
                            slettingFeilet,
                            oppfolgingsdialogerHentet,
                            oppfolgingsdialog,
                            oppfolgingsdialogId,
                            ledetekster,
                            settAktivtSteg,
                            avvisDialog,
                            dokument,
                            godkjennDialog,
                            hentPdfurler,
                            giSamtykke,
                            navigasjontoggles,
                            toggleAvvisPlan,
                            nullstillGodkjenning,
                            lagreTiltak,
                            slettTiltak,
                            lagreArbeidsoppgave,
                            slettArbeidsoppgave,
                           }) => {
    let panel;
    let disableNavigation = false;
    if (inneholderGodkjenninger(oppfolgingsdialog) && !erAvvistAvArbeidstaker(oppfolgingsdialog)) {
        disableNavigation = true;
        panel = (<Godkjenninger
            avvisDialog={avvisDialog}
            oppfolgingsdialog={oppfolgingsdialog}
            godkjennPlan={godkjennDialog}
            ledetekster={ledetekster}
            toggleAvvisPlan={toggleAvvisPlan}
            nullstillGodkjenning={nullstillGodkjenning}
        />);
    } else if (inneholderReleasetVersjon(oppfolgingsdialog)) {
        disableNavigation = true;
        panel = (<ReleasetPlan
            ledetekster={ledetekster}
            oppfolgingsdialog={oppfolgingsdialog}
            hentPdfurler={hentPdfurler}
            dokument={dokument}
            giSamtykke={giSamtykke}
        />);
    } else {
        (() => {
            if (navigasjontoggles.steg === 1) {
                panel = (<Arbeidsoppgaver
                    lagrer={lagrer}
                    lagret={lagret}
                    lagretId={lagretArbeidsoppgaveId}
                    sletter={sletter}
                    slettet={slettet}
                    lagringFeilet={lagringFeilet}
                    slettingFeilet={slettingFeilet}
                    oppfolgingsdialogerHentet={oppfolgingsdialogerHentet}
                    ledetekster={ledetekster}
                    oppfolgingsdialog={oppfolgingsdialog}
                    oppfolgingsdialogId={oppfolgingsdialogId}
                    lagreArbeidsoppgave={lagreArbeidsoppgave}
                    slettArbeidsoppgave={slettArbeidsoppgave}
                />);
            } else if (navigasjontoggles.steg === 2) {
                panel = (<Tiltak
                    lagrer={lagrer}
                    lagret={lagret}
                    lagretId={lagretTiltakId}
                    sletter={sletter}
                    slettet={slettet}
                    lagringFeilet={lagringFeilet}
                    slettingFeilet={slettingFeilet}
                    oppfolgingsdialogerHentet={oppfolgingsdialogerHentet}
                    ledetekster={ledetekster}
                    oppfolgingsdialog={oppfolgingsdialog}
                    oppfolgingsdialogId={oppfolgingsdialogId}
                    lagreTiltak={lagreTiltak}
                    slettTiltak={slettTiltak}
                />);
            } else {
                panel = (<Godkjenn
                    ledetekster={ledetekster}
                    oppfolgingsdialog={oppfolgingsdialog}
                    godkjennPlan={godkjennDialog}
                />);
            }
        })();
    }

    return (
        <div>
            <NavigasjonsTopp
                disabled={disableNavigation}
                navn={oppfolgingsdialog.virksomhetsnavn}
                settAktivtSteg={settAktivtSteg}
                steg={navigasjontoggles.steg}
            />
            { panel }
            <NavigasjonsBunn
                disabled={disableNavigation}
                settAktivtSteg={settAktivtSteg}
                steg={navigasjontoggles.steg}
            />
        </div>
    );
};

Oppfolgingsdialog.propTypes = {
    lagrer: PropTypes.bool,
    lagret: PropTypes.bool,
    lagringFeilet: PropTypes.bool,
    lagretArbeidsoppgaveId: PropTypes.number,
    lagretTiltakId: PropTypes.number,
    sletter: PropTypes.bool,
    slettet: PropTypes.bool,
    slettingFeilet: PropTypes.bool,
    oppfolgingsdialogerHentet: PropTypes.bool,
    oppfolgingsdialog: PropTypes.object,
    oppfolgingsdialogId: PropTypes.string,
    steg: PropTypes.number,
    ledetekster: PropTypes.object,
    godkjennDialog: PropTypes.func,
    nullstillGodkjenning: PropTypes.func,
    toggleAvvisPlan: PropTypes.func,
    hentPdfurler: PropTypes.func,
    giSamtykke: PropTypes.func,
    lagreArbeidsoppgave: PropTypes.func,
    slettArbeidsoppgave: PropTypes.func,
    lagreTiltak: PropTypes.func,
    slettTiltak: PropTypes.func,
    settAktivtSteg: PropTypes.func,
    avvisDialog: PropTypes.func,
    navigasjontoggles: PropTypes.object,
    dokument: PropTypes.object,
};

export default Oppfolgingsdialog;
