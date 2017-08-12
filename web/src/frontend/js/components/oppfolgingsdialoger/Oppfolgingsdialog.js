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
    return oppfolgingsdialog.godkjenninger.length === 1 && !oppfolgingsdialog.godkjenninger[0].godkjent && oppfolgingsdialog.arbeidstaker.aktoerId === oppfolgingsdialog.godkjenninger[0].godkjentAvAktoerId;
};

const Oppfolgingsdialog = ({
                            lagrerArbeidsoppgave,
                            lagrerTiltak,
                            lagretArbeidsoppgave,
                            lagretTiltak,
                            lagringFeiletArbeidsoppgave,
                            lagringFeiletTiltak,
                            lagretArbeidsoppgaveId,
                            lagretTiltakId,
                            sletterArbeidsoppgave,
                            sletterTiltak,
                            slettetArbeidsoppgave,
                            slettetTiltak,
                            slettingFeiletArbeidsoppgave,
                            slettingFeiletTiltak,
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
                    lagrer={lagrerArbeidsoppgave}
                    lagret={lagretArbeidsoppgave}
                    lagretId={lagretArbeidsoppgaveId}
                    sletter={sletterArbeidsoppgave}
                    slettet={slettetArbeidsoppgave}
                    lagringFeilet={lagringFeiletArbeidsoppgave}
                    slettingFeilet={slettingFeiletArbeidsoppgave}
                    oppfolgingsdialogerHentet={oppfolgingsdialogerHentet}
                    ledetekster={ledetekster}
                    oppfolgingsdialog={oppfolgingsdialog}
                    oppfolgingsdialogId={oppfolgingsdialogId}
                    lagreArbeidsoppgave={lagreArbeidsoppgave}
                    slettArbeidsoppgave={slettArbeidsoppgave}
                />);
            } else if (navigasjontoggles.steg === 2) {
                panel = (<Tiltak
                    lagrer={lagrerTiltak}
                    lagret={lagretTiltak}
                    lagretId={lagretTiltakId}
                    sletter={sletterTiltak}
                    slettet={slettetTiltak}
                    lagringFeilet={lagringFeiletTiltak}
                    slettingFeilet={slettingFeiletTiltak}
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
    lagrerArbeidsoppgave: PropTypes.bool,
    lagrerTiltak: PropTypes.bool,
    lagretArbeidsoppgave: PropTypes.bool,
    lagretTiltak: PropTypes.bool,
    lagringFeiletArbeidsoppgave: PropTypes.bool,
    lagringFeiletTiltak: PropTypes.bool,
    lagretArbeidsoppgaveId: PropTypes.number,
    lagretTiltakId: PropTypes.number,
    sletterArbeidsoppgave: PropTypes.bool,
    sletterTiltak: PropTypes.bool,
    slettetArbeidsoppgave: PropTypes.bool,
    slettetTiltak: PropTypes.bool,
    slettingFeiletArbeidsoppgave: PropTypes.bool,
    slettingFeiletTiltak: PropTypes.bool,
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
