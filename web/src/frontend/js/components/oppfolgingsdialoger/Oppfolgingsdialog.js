import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, keyValue, togglesPt } from 'digisyfo-npm';
import {
    NavigasjonsTopp,
    NavigasjonsBunn,
    AvvistPlanKvittering,
    BRUKERTYPE,
    Godkjenn,
    Godkjenninger,
    Samtykke,
    AvbruttGodkjentPlanVarsel,
    proptypes as oppfolgingProptypes,
} from 'oppfolgingsdialog-npm';
import { getContextRoot } from '../../routers/paths';
import Arbeidsoppgaver from './utfylling/Arbeidsoppgaver';
import ReleasetPlanAT from './releasetplan/ReleasetPlanAT';
import IngenlederInfoboks from './IngenlederInfoboks';
import Tiltak from './utfylling/Tiltak';

const inneholderGodkjenninger = (oppfolgingsdialog) => {
    return oppfolgingsdialog.godkjenninger.length > 0;
};

const inneholderGodkjentPlan = (oppfolgingsdialog) => {
    return oppfolgingsdialog.godkjentPlan;
};

const erAvvistAvArbeidstaker = (oppfolgingsdialog) => {
    return oppfolgingsdialog.godkjenninger.length === 1 && !oppfolgingsdialog.godkjenninger[0].godkjent && oppfolgingsdialog.arbeidstaker.aktoerId === oppfolgingsdialog.godkjenninger[0].godkjentAvAktoerId;
};

class Oppfolgingsdialog extends Component {
    constructor() {
        super();
        this.state = {
            visAvvisPlanKvittering: false,
            begrunnelse: null,
        };
        this.visAvvisPlanKvittering = this.visAvvisPlanKvittering.bind(this);
    }

    componentWillMount() {
        this.props.settAktivtSteg(1);
    }

    visAvvisPlanKvittering(vis, begrunnelse) {
        this.setState({
            visAvvisPlanKvittering: vis,
            begrunnelse,
        });
    }

    render() {
        const {
            lagrerArbeidsoppgave,
            lagrerTiltak,
            lagretArbeidsoppgave,
            lagretTiltak,
            lagringFeiletArbeidsoppgave,
            lagringFeiletTiltak,
            sletterArbeidsoppgave,
            sletterTiltak,
            slettetArbeidsoppgave,
            slettetTiltak,
            slettingFeiletArbeidsoppgave,
            slettingFeiletTiltak,
            oppfolgingsdialog,
            oppfolgingsdialogId,
            ledetekster,
            settAktivtSteg,
            avvisDialog,
            dokument,
            godkjennDialog,
            hentPdfurler,
            giSamtykke,
            visSamtykkeSkjema,
            navigasjontoggles,
            toggleAvvisPlan,
            nullstillGodkjenning,
            avbrytDialog,
            lagreTiltak,
            slettTiltak,
            lagreArbeidsoppgave,
            slettArbeidsoppgave,
            oppfolgingsdialogAvbrutt,
            arbeidsforhold,
            toggles,
            delMedNavFunc,
            delmednav,
            oppfolgingsdialoger,
        } = this.props;
        let panel;
        let disableNavigation = false;
        if (this.state.visAvvisPlanKvittering) {
            disableNavigation = true;
            panel = (<AvvistPlanKvittering
                ledetekster={ledetekster}
                rootUrl={`${window.APP_SETTINGS.APP_ROOT}`}
                begrunnelse={this.state.begrunnelse}
                visAvvisPlanKvittering={this.visAvvisPlanKvittering}
                arbeidsforhold={arbeidsforhold}
            />);
        } else if (visSamtykkeSkjema && oppfolgingsdialog.arbeidstaker.samtykke === null) {
            disableNavigation = true;
            panel = (<Samtykke
                sendSamtykke={giSamtykke}
                oppfolgingsdialog={oppfolgingsdialog}
                ledetekster={ledetekster}
                rootUrl={`${getContextRoot()}`}
            />);
        } else if (inneholderGodkjenninger(oppfolgingsdialog) && !erAvvistAvArbeidstaker(oppfolgingsdialog)) {
            disableNavigation = true;
            panel = (<Godkjenninger
                avvisDialog={avvisDialog}
                oppfolgingsdialog={oppfolgingsdialog}
                godkjennPlan={godkjennDialog}
                ledetekster={ledetekster}
                toggleAvvisPlan={toggleAvvisPlan}
                visAvvisPlanKvittering={this.visAvvisPlanKvittering}
                nullstillGodkjenning={nullstillGodkjenning}
                brukerType={BRUKERTYPE.ARBEIDSTAKER}
                rootUrl={`${getContextRoot()}`}
                arbeidsforhold={arbeidsforhold}
            />);
        } else if (inneholderGodkjentPlan(oppfolgingsdialog)) {
            disableNavigation = true;
            panel = (<ReleasetPlanAT
                ledetekster={ledetekster}
                toggles={toggles}
                oppfolgingsdialog={oppfolgingsdialog}
                hentPdfurler={hentPdfurler}
                dokument={dokument}
                giSamtykke={giSamtykke}
                arbeidsforhold={arbeidsforhold}
                avbrytDialog={avbrytDialog}
                delMedNavFunc={delMedNavFunc}
                delmednav={delmednav}
                oppfolgingsdialoger={oppfolgingsdialoger}
            />);
        } else {
            (() => {
                if (navigasjontoggles.steg === 1) {
                    panel = (<Arbeidsoppgaver
                        lagrer={lagrerArbeidsoppgave}
                        lagret={lagretArbeidsoppgave}
                        sletter={sletterArbeidsoppgave}
                        slettet={slettetArbeidsoppgave}
                        lagringFeilet={lagringFeiletArbeidsoppgave}
                        slettingFeilet={slettingFeiletArbeidsoppgave}
                        ledetekster={ledetekster}
                        oppfolgingsdialog={oppfolgingsdialog}
                        oppfolgingsdialogId={oppfolgingsdialogId}
                        lagreArbeidsoppgave={lagreArbeidsoppgave}
                        slettArbeidsoppgave={slettArbeidsoppgave}
                        arbeidsforhold={arbeidsforhold}
                    />);
                } else if (navigasjontoggles.steg === 2) {
                    panel = (<Tiltak
                        lagrer={lagrerTiltak}
                        lagret={lagretTiltak}
                        sletter={sletterTiltak}
                        slettet={slettetTiltak}
                        lagringFeilet={lagringFeiletTiltak}
                        slettingFeilet={slettingFeiletTiltak}
                        ledetekster={ledetekster}
                        oppfolgingsdialog={oppfolgingsdialog}
                        oppfolgingsdialogId={oppfolgingsdialogId}
                        lagreTiltak={lagreTiltak}
                        slettTiltak={slettTiltak}
                    />);
                } else if (oppfolgingsdialog.arbeidsgiver.naermesteLeder === null) {
                    panel = (<IngenlederInfoboks />);
                } else {
                    panel = (<Godkjenn
                        ledetekster={ledetekster}
                        oppfolgingsdialog={oppfolgingsdialog}
                        settAktivtSteg={settAktivtSteg}
                        godkjennPlan={godkjennDialog}
                        brukerType={BRUKERTYPE.ARBEIDSTAKER}
                        rootUrl={`${getContextRoot()}`}
                        arbeidsforhold={arbeidsforhold}
                    />);
                }
            })();
        }

        return (
            <div>
                { oppfolgingsdialogAvbrutt &&
                    <AvbruttGodkjentPlanVarsel
                        tekst={getLedetekst('oppfolgingdialog.avbruttGodkjentPlanVarsel.opprettet-plan')}
                        rootUrl={`${getContextRoot()}`}
                    />
                }
                <NavigasjonsTopp
                    ledetekster={ledetekster}
                    disabled={disableNavigation}
                    navn={oppfolgingsdialog.virksomhetsnavn}
                    settAktivtSteg={settAktivtSteg}
                    steg={navigasjontoggles.steg}
                />
                <div id="oppfolgingsdialogpanel">
                    { panel }
                </div>
                <NavigasjonsBunn
                    disabled={disableNavigation}
                    settAktivtSteg={settAktivtSteg}
                    steg={navigasjontoggles.steg}
                />
            </div>
        );
    }
}

Oppfolgingsdialog.propTypes = {
    lagrerArbeidsoppgave: PropTypes.bool,
    lagrerTiltak: PropTypes.bool,
    lagretArbeidsoppgave: PropTypes.bool,
    lagretTiltak: PropTypes.bool,
    lagringFeiletArbeidsoppgave: PropTypes.bool,
    lagringFeiletTiltak: PropTypes.bool,
    sletterArbeidsoppgave: PropTypes.bool,
    sletterTiltak: PropTypes.bool,
    slettetArbeidsoppgave: PropTypes.bool,
    slettetTiltak: PropTypes.bool,
    slettingFeiletArbeidsoppgave: PropTypes.bool,
    slettingFeiletTiltak: PropTypes.bool,
    oppfolgingsdialog: oppfolgingProptypes.oppfolgingsdialogPt,
    oppfolgingsdialogId: PropTypes.string,
    ledetekster: keyValue,
    toggles: togglesPt,
    delMedNavFunc: PropTypes.func,
    delmednav: oppfolgingProptypes.delmednavPt,
    godkjennDialog: PropTypes.func,
    nullstillGodkjenning: PropTypes.func,
    toggleAvvisPlan: PropTypes.func,
    hentPdfurler: PropTypes.func,
    giSamtykke: PropTypes.func,
    visSamtykkeSkjema: PropTypes.bool,
    lagreArbeidsoppgave: PropTypes.func,
    slettArbeidsoppgave: PropTypes.func,
    lagreTiltak: PropTypes.func,
    slettTiltak: PropTypes.func,
    settAktivtSteg: PropTypes.func,
    avvisDialog: PropTypes.func,
    avbrytDialog: PropTypes.func,
    oppfolgingsdialogAvbrutt: PropTypes.bool,
    arbeidsforhold: PropTypes.arrayOf(oppfolgingProptypes.stillingPt),
    navigasjontoggles: oppfolgingProptypes.navigasjonstogglesReducerPt,
    dokument: oppfolgingProptypes.dokumentReducerPt,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingProptypes.oppfolgingsdialogPt),
};

export default Oppfolgingsdialog;
