import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, keyValue } from 'digisyfo-npm';
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
import Tiltak from './utfylling/Tiltak';
import {
    arbeidsforhold as arbeidsforholdPt,
} from '../../propTypes/index';

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
            visSamtykke: false,
            visAvvisPlanKvittering: false,
            begrunnelse: null,
        };
        this.visAvvisPlanKvittering = this.visAvvisPlanKvittering.bind(this);
    }

    componentWillMount() {
        this.props.settAktivtSteg(1);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.godkjenner && nextProps.godkjent) {
            this.setState({
                visSamtykke: true,
            });
        } else {
            this.setState({
                visSamtykke: false,
            });
        }
    }

    componentDidMount() {
        if (this.props.oppfolgingsdialogerHentet && !this.props.arbeidsforholdHentet && !this.props.arbeidsforholdHenter) {
            this.props.hentArbeidsforhold(this.props.oppfolgingsdialog.arbeidstaker.aktoerId, this.props.oppfolgingsdialog.oppfoelgingsdialogId, 'arbeidstaker');
        }
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
            avbrytDialog,
            lagreTiltak,
            slettTiltak,
            lagreArbeidsoppgave,
            slettArbeidsoppgave,
            oppfolgingsdialogAvbrutt,
            arbeidsforhold,
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
        } else if (this.state.visSamtykke && oppfolgingsdialog.arbeidstaker.samtykke === null) {
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
                oppfolgingsdialog={oppfolgingsdialog}
                hentPdfurler={hentPdfurler}
                dokument={dokument}
                giSamtykke={giSamtykke}
                arbeidsforhold={arbeidsforhold}
                avbrytDialog={avbrytDialog}
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
                        oppfolgingsdialogerHentet={oppfolgingsdialogerHentet}
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
    godkjenner: PropTypes.bool,
    godkjent: PropTypes.bool,
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
    oppfolgingsdialogerHentet: PropTypes.bool,
    oppfolgingsdialog: oppfolgingProptypes.oppfolgingsdialogPt,
    oppfolgingsdialogId: PropTypes.string,
    ledetekster: keyValue,
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
    avbrytDialog: PropTypes.func,
    oppfolgingsdialogAvbrutt: PropTypes.bool,
    hentArbeidsforhold: PropTypes.func,
    arbeidsforhold: PropTypes.arrayOf(arbeidsforholdPt),
    arbeidsforholdHenter: PropTypes.bool,
    arbeidsforholdHentet: PropTypes.bool,
    navigasjontoggles: oppfolgingProptypes.navigasjonstogglesReducerPt,
    dokument: oppfolgingProptypes.dokumentReducerPt,
};

export default Oppfolgingsdialog;
