import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import {
    Arbeidsforhold,
    BRUKERTYPE,
    captitalizeFirstLetter,
    LagreArbeidsoppgaveSkjema,
    LeggTilElementKnapper,
    OppfolgingsdialogInfoboks,
    ArbeidsoppgaveTabell,
    sorterArbeidsoppgaverEtterOpprettet,
    proptypes as oppfolgingProptypes,
    NotifikasjonBoksVurderingOppgave,
    STATUS_FEIL,
} from 'oppfolgingsdialog-npm';
import { getLedetekst, keyValue, scrollTo } from 'digisyfo-npm';
import { getContextRoot } from '../../../routers/paths';
import { isEmpty } from '../../../utils/oppfolgingsdialogUtils';
import AppSpinner from '../../AppSpinner';
import Feilmelding from '../../Feilmelding';

export const OppfolgingsdialogArbeidsoppgaverTabell = ({ ledetekster, arbeidsoppgaveListe, sendLagreArbeidsoppgave, sendSlettArbeidsoppgave, fnr, oppfolgingsdialog, skjulFeilmelding,
                                                           feilType,
                                                           feilTekst,
                                                       }) => {
    return (
        <ArbeidsoppgaveTabell
            ledetekster={ledetekster}
            liste={arbeidsoppgaveListe}
            urlImgArrow={`${getContextRoot()}/img/svg/arrow-down.svg`}
            urlImgVarsel={`${getContextRoot()}/img/svg/varseltrekant.svg`}
            urlImgCheckboks={`${getContextRoot()}/img/svg/oppfolgingdialog-checkbox.svg`}
            sendLagre={sendLagreArbeidsoppgave}
            sendSlett={sendSlettArbeidsoppgave}
            fnr={fnr}
            brukerType={BRUKERTYPE.ARBEIDSTAKER}
            oppfolgingsdialog={oppfolgingsdialog}
            skjulFeilmelding={skjulFeilmelding}
            feilType={feilType}
            feilTekst={feilTekst}

        />
    );
};
OppfolgingsdialogArbeidsoppgaverTabell.propTypes = {
    ledetekster: keyValue,
    oppfolgingsdialog: oppfolgingProptypes.oppfolgingsdialogPt,
    arbeidsoppgaveListe: PropTypes.arrayOf(oppfolgingProptypes.arbeidsoppgavePt),
    sendLagreArbeidsoppgave: PropTypes.func,
    sendSlettArbeidsoppgave: PropTypes.func,
    fnr: PropTypes.string,
    skjulFeilmelding: PropTypes.func,
    feilType: PropTypes.string,
    feilTekst: PropTypes.string,
};

export const RenderOpprettArbeidsoppgave = ({ ledetekster, sendLagreArbeidsoppgave, toggleArbeidsoppgaveSkjema }) => {
    return (<div>
        <h2>{getLedetekst('oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.tittel')}</h2>
        <LagreArbeidsoppgaveSkjema
            ledetekster={ledetekster}
            sendLagre={sendLagreArbeidsoppgave}
            avbryt={toggleArbeidsoppgaveSkjema}
        />
    </div>);
};

RenderOpprettArbeidsoppgave.propTypes = {
    ledetekster: keyValue,
    sendLagreArbeidsoppgave: PropTypes.func,
    toggleArbeidsoppgaveSkjema: PropTypes.func,
};

class Arbeidsoppgaver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nyArbeidsoppgave: false,
            oppdatertArbeidsoppgave: false,
        };
        this.sendLagreArbeidsoppgave = this.sendLagreArbeidsoppgave.bind(this);
        this.sendSlettArbeidsoppgave = this.sendSlettArbeidsoppgave.bind(this);
        this.toggleArbeidsoppgaveSkjema = this.toggleArbeidsoppgaveSkjema.bind(this);
        this.scrollToForm = this.scrollToForm.bind(this);
        this.resetFeilmelding = this.resetFeilmelding.bind(this);
        this.setOppdateringStatus = this.setOppdateringStatus.bind(this);
    }

    setOppdateringStatus(type, tekst) {
        this.setState({
            feilType: type,
            feilTekst: tekst,
        });
    }

    componentWillReceiveProps(nextProps) {
      /*  console.log("------------------this.props---", this.props);
        console.log("------------------nextProps---", nextProps);*/
        if((nextProps.arbeidsoppgaver.lagringFeilet && nextProps.arbeidsoppgaver.lagringFeilet != this.props.arbeidsoppgaver.lagringFeilet) ||
            (nextProps.arbeidsoppgaver.slettingFeilet && nextProps.arbeidsoppgaver.slettingFeilet != this.props.arbeidsoppgaver.slettingFeilet)) {
            console.log("------------------found---");
            console.log("nextProps", nextProps.arbeidsoppgaver);
            //  console.log("props", this.props.kommentar);
            const oppdatereArbeidsoppgaveFeilet = nextProps.arbeidsoppgaver.lagringFeilet && nextProps.arbeidsoppgaver.lagringFeilet != this.props.arbeidsoppgaver.lagringFeilet
                && nextProps.arbeidsoppgaver.feiletArbeidsoppgaveId > 0;

            const slettArbeidsoppgaveFeilet =  nextProps.arbeidsoppgaver.slettingFeilet && nextProps.arbeidsoppgaver.slettingFeilet != this.props.arbeidsoppgaver.slettingFeilet
                && nextProps.arbeidsoppgaver.feiletArbeidsoppgaveId > 0;

            const lagNyArbeidsoppgaveFeilet =  nextProps.arbeidsoppgaver.lagringFeilet && nextProps.arbeidsoppgaver.lagringFeilet != this.props.arbeidsoppgaver.lagringFeilet
                && !nextProps.arbeidsoppgaver.feiletArbeidsoppgaveId;

            let feilTekst;
            let feilType;
            switch (true) {
            case oppdatereArbeidsoppgaveFeilet:
                // feilTekst = getLedetekst('oppfolgingsdialog.arbeidstaker.arbeidsoppgave.vis.gjennomfoering.kan', ledetekster);
                feilTekst = "oppdatere arbeidsoppgave Feilet--";
                feilType = STATUS_FEIL.OPPDATERE_ARBEIDSOPPGAVE_FEILET;
                this.setOppdateringStatus(feilType, feilTekst);
                break;
            case lagNyArbeidsoppgaveFeilet:
                feilTekst = "lagre ny arbeidsoppgave Feilet--";
                feilType = STATUS_FEIL.LAGRE_NY_ARBEIDSOPPGAVE_FEILET;
                this.setOppdateringStatus(feilType, feilTekst);
                break;
            case slettArbeidsoppgaveFeilet:
                feilTekst = "Sletting arbeidsoppgave feilet--";
                feilType = STATUS_FEIL.SLETT_ARBEIDSOPPGAVE_FEILET;
                this.setOppdateringStatus(feilType, feilTekst);
                break;
            default:
                this.setOppdateringStatus("", "");
                break;
            }
            console.log("tekst---------------------", feilTekst);
            console.log("feiltype", feilType);

        }
    }

    resetFeilmelding() {
        this.setOppdateringStatus("", "");
    }

    componentWillMount() {
        window.location.hash = 'arbeidsoppgaver';
        window.sessionStorage.setItem('hash', 'arbeidsoppgaver');
    }

    componentDidMount() {
        if (this.state.visArbeidsoppgaveSkjema && this.lagreSkjema) {
            this.scrollToForm();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.visArbeidsoppgaveSkjema && this.state.visArbeidsoppgaveSkjema && this.lagreSkjema) {
            this.scrollToForm();
        }
    }

    sendLagreArbeidsoppgave(values) {
        if (!values.arbeidsoppgaveId) {
            this.state.nyArbeidsoppgave = true;
            this.state.oppdatertArbeidsoppgave = false;
        } else {
            this.state.nyArbeidsoppgave = false;
            this.state.oppdatertArbeidsoppgave = true;
        }
        const nyeValues = {
            ...values,
            arbeidsoppgavenavn: captitalizeFirstLetter(values.arbeidsoppgavenavn),
        };
        this.props.lagreArbeidsoppgave(this.props.oppfolgingsdialog.id, nyeValues);
    }

    sendSlettArbeidsoppgave(arbeidsoppgaveId) {
        this.props.slettArbeidsoppgave(this.props.oppfolgingsdialog.id, arbeidsoppgaveId);
    }

    toggleArbeidsoppgaveSkjema() {
        this.setState({
            visArbeidsoppgaveSkjema: !this.state.visArbeidsoppgaveSkjema,
        });
    }

    scrollToForm() {
        const form = findDOMNode(this.lagreSkjema);
        scrollTo(form, 300);
    }

    render() {
        const {
            ledetekster,
            oppfolgingsdialog,
        } = this.props;
        const {
            lagrer,
            lagringFeilet,
            sletter,
            slettingFeilet,
        } = this.props.arbeidsoppgaver;
        const antallIkkeVurdererteArbOppgaver = oppfolgingsdialog.arbeidsoppgaveListe.filter((arbeidsoppgave) => {
            return !arbeidsoppgave.gjennomfoering;
        }).length;
        /*console.log("visOppdateringFeilet", this.state.visOppdateringFeilet);
        console.log("feilType", this.state.feilType);*/
        return (
            (() => {
                if (lagrer || sletter) {
                    return <AppSpinner />;
                } /*else if (lagringFeilet || slettingFeilet) {
                    return (<Feilmelding />);
                }*/
                return isEmpty(oppfolgingsdialog.arbeidsoppgaveListe) ?
                    <div>
                        <Arbeidsforhold
                            tekst={getLedetekst('oppfolgingsdialog.arbeidstaker.stilling.tekst')}
                            ledetekster={ledetekster}
                            arbeidsforhold={oppfolgingsdialog.arbeidstaker.stillinger}
                            rootUrl={getContextRoot()}
                        />
                        {
                            !this.state.visArbeidsoppgaveSkjema ?
                                <OppfolgingsdialogInfoboks
                                    svgUrl={`${getContextRoot()}/img/svg/arbeidsoppgave-onboarding.svg`}
                                    svgAlt="nyArbeidsoppgave"
                                    tittel={getLedetekst('oppfolgingsdialog.arbeidstaker.onboarding.arbeidsoppgave.tittel')}
                                    tekst={getLedetekst('oppfolgingsdialog.arbeidstaker.onboarding.arbeidsoppgave.tekst')}
                                    feilType={this.state.feilType}
                                    feilTekst={this.state.feilTekst}
                                >
                                    <LeggTilElementKnapper
                                        ledetekster={ledetekster}
                                        visSkjema={this.state.visArbeidsoppgaveSkjema}
                                        toggleSkjema={this.toggleArbeidsoppgaveSkjema}
                                    />
                                </OppfolgingsdialogInfoboks> :
                                <RenderOpprettArbeidsoppgave
                                    ledetekster={ledetekster}
                                    sendLagreArbeidsoppgave={this.sendLagreArbeidsoppgave}
                                    toggleArbeidsoppgaveSkjema={this.toggleArbeidsoppgaveSkjema}
                                />
                        }
                    </div>
                    :
                    <div>
                        <Arbeidsforhold
                            tekst={getLedetekst('oppfolgingsdialog.arbeidstaker.stilling.tekst')}
                            ledetekster={ledetekster}
                            arbeidsforhold={oppfolgingsdialog.arbeidstaker.stillinger}
                            rootUrl={getContextRoot()}
                        />

                        <h2>{getLedetekst('oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.tittel')}</h2>

                        {
                            antallIkkeVurdererteArbOppgaver > 0 && <NotifikasjonBoksVurderingOppgave
                                ledetekster={ledetekster}
                                navn={oppfolgingsdialog.arbeidsgiver.naermesteLeder.navn}
                                antallIkkeVurderte={antallIkkeVurdererteArbOppgaver}
                                rootUrl={`${getContextRoot()}`}
                                tekst="oppfolgingsdialog.notifikasjonboks.arbeidsoppgave.vurderes.tekst"
                            />
                        }

                        <OppfolgingsdialogArbeidsoppgaverTabell
                            ledetekster={ledetekster}
                            oppfolgingsdialog={oppfolgingsdialog}
                            arbeidsoppgaveListe={sorterArbeidsoppgaverEtterOpprettet(oppfolgingsdialog.arbeidsoppgaveListe)}
                            sendLagreArbeidsoppgave={this.sendLagreArbeidsoppgave}
                            sendSlettArbeidsoppgave={this.sendSlettArbeidsoppgave}
                            fnr={oppfolgingsdialog.arbeidstaker.fnr}
                            feilType={this.state.feilType}
                            feilTekst={this.state.feilTekst}
                            skjulFeilmelding={this.resetFeilmelding}

                        />
                        {
                            this.state.visArbeidsoppgaveSkjema ?
                                <LagreArbeidsoppgaveSkjema
                                    ledetekster={ledetekster}
                                    sendLagre={this.sendLagreArbeidsoppgave}
                                    avbryt={this.toggleArbeidsoppgaveSkjema}
                                    ref={(lagreSkjema) => {
                                        this.lagreSkjema = lagreSkjema;
                                    }}
                                    feilType={this.state.feilType}
                                    feilTekst={this.state.feilTekst}
                                /> :
                                <LeggTilElementKnapper
                                    ledetekster={ledetekster}
                                    visSkjema={this.state.visArbeidsoppgaveSkjema}
                                    toggleSkjema={this.toggleArbeidsoppgaveSkjema}
                                />
                        }
                    </div>;
            })()
        );
    }
}

Arbeidsoppgaver.propTypes = {
    ledetekster: keyValue,
    arbeidsoppgaver: oppfolgingProptypes.arbeidsoppgaverReducerPt,
    oppfolgingsdialog: oppfolgingProptypes.oppfolgingsdialogPt,
    lagreArbeidsoppgave: PropTypes.func,
    slettArbeidsoppgave: PropTypes.func,
};

export default Arbeidsoppgaver;
