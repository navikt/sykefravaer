import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import {

    BRUKERTYPE,
    captitalizeFirstLetter,
    LagreArbeidsoppgaveSkjema,
    LeggTilElementKnapper,
    OppfolgingsdialogInfoboks,
    ArbeidsoppgaverListe,
    sorterArbeidsoppgaverEtterOpprettet,
    proptypes as oppfolgingProptypes,
    NotifikasjonBoksVurderingOppgave,
    ArbeidsoppgaverInfoboks,
} from 'oppfolgingsdialog-npm';
import { getLedetekst, keyValue, scrollTo } from 'digisyfo-npm';
import { getContextRoot } from '../../../routers/paths';
import { isEmpty } from '../../../utils/oppfolgingsdialogUtils';
import AppSpinner from '../../AppSpinner';

export const RenderOpprettArbeidsoppgave = ({ ledetekster, sendLagreArbeidsoppgave, toggleArbeidsoppgaveSkjema, oppdateringFeilet, varselTekst }) => {
    return (<div>
        <LagreArbeidsoppgaveSkjema
            ledetekster={ledetekster}
            sendLagre={sendLagreArbeidsoppgave}
            avbryt={toggleArbeidsoppgaveSkjema}
            oppdateringFeilet={oppdateringFeilet}
            varselTekst={varselTekst}
        />
    </div>);
};

RenderOpprettArbeidsoppgave.propTypes = {
    ledetekster: keyValue,
    sendLagreArbeidsoppgave: PropTypes.func,
    toggleArbeidsoppgaveSkjema: PropTypes.func,
    oppdateringFeilet: PropTypes.bool,
    varselTekst: PropTypes.string,
};

class Arbeidsoppgaver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nyArbeidsoppgave: false,
            oppdatertArbeidsoppgave: false,
            visArbeidsoppgaveSkjema: false,
            lagreNyOppgaveFeilet: false,
            varselTekst: '',
            oppdaterOppgaveFeilet: false,
        };
        this.sendLagreArbeidsoppgave = this.sendLagreArbeidsoppgave.bind(this);
        this.sendSlettArbeidsoppgave = this.sendSlettArbeidsoppgave.bind(this);
        this.toggleArbeidsoppgaveSkjema = this.toggleArbeidsoppgaveSkjema.bind(this);
        this.scrollToForm = this.scrollToForm.bind(this);
        this.visFeilMelding = this.visFeilMelding.bind(this);
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

    componentWillReceiveProps(nextProps) {
        if (!nextProps.arbeidsoppgaver.feiletOppgaveId && nextProps.arbeidsoppgaver.lagringFeilet && this.props.arbeidsoppgaver.lagringFeilet !== nextProps.arbeidsoppgaver.lagringFeilet) {
            console.log('lagring new AO feilet');
            this.setState({
                lagreNyOppgaveFeilet: true,
                varselTekst:  getLedetekst('oppfolgingsdialog.oppdatering.feilmelding', this.props.ledetekster),
                oppdaterOppgaveFeilet: false,
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.visArbeidsoppgaveSkjema && this.state.visArbeidsoppgaveSkjema && this.lagreSkjema) {
            this.scrollToForm();
        }
    }

    visFeilMelding(feilet) {
        this.setState({
            oppdaterOppgaveFeilet: feilet,
            lagreNyOppgaveFeilet: false,
        });
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
        this.setState({
            lagreNyOppgaveFeilet: false,
            oppdaterOppgaveFeilet: true,
            varselTekst: '',
        });
    }

    sendSlettArbeidsoppgave(arbeidsoppgaveId) {
        this.props.slettArbeidsoppgave(this.props.oppfolgingsdialog.id, arbeidsoppgaveId);
        this.setState({
            lagreNyOppgaveFeilet: false,
            oppdaterOppgaveFeilet: false,
        });
    }

    toggleArbeidsoppgaveSkjema() {
        this.setState({
            visArbeidsoppgaveSkjema: !this.state.visArbeidsoppgaveSkjema,
            lagreNyOppgaveFeilet: false,
            oppdaterOppgaveFeilet: false,
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
            sletter,
        } = this.props.arbeidsoppgaver;
        const antallIkkeVurdererteArbOppgaver = oppfolgingsdialog.arbeidsoppgaveListe.filter((arbeidsoppgave) => {
            return !arbeidsoppgave.gjennomfoering;
        }).length;
        return (
            (() => {
                if (lagrer || sletter) {
                    return <AppSpinner />;
                }
                return isEmpty(oppfolgingsdialog.arbeidsoppgaveListe) ?
                    <div>
                        { this.state.visArbeidsoppgaveSkjema &&
                        <ArbeidsoppgaverInfoboks
                            ledetekster={ledetekster}
                            tittel={getLedetekst('oppfolgingsdialog.arbeidsoppgaverInfoboks.tittel.arbeidstaker')}
                            visSkjema={this.state.visArbeidsoppgaveSkjema}
                            toggleSkjema={this.toggleArbeidsoppgaveSkjema}
                            feilType={this.state.feilType}
                            feilTekst={this.state.feilTekst}
                        >
                            { oppfolgingsdialog.arbeidstaker.stillinger.length > 0 &&
                            <div>
                                { oppfolgingsdialog.arbeidstaker.stillinger.map((stilling, idx) => {
                                    return (<p key={idx}>
                                        {getLedetekst('oppfolgingsdialog.arbeidsoppgaverInfoboks.arbeidstaker.stilling', {
                                            '%YRKE%': stilling.yrke.toLowerCase(),
                                            '%PROSENT%': stilling.prosent,
                                        })}
                                    </p>);
                                })
                                }
                            </div>
                            }
                        </ArbeidsoppgaverInfoboks>
                        }
                        {
                            !this.state.visArbeidsoppgaveSkjema ?
                                <OppfolgingsdialogInfoboks
                                    svgUrl={`${getContextRoot()}/img/svg/arbeidsoppgave-onboarding.svg`}
                                    svgAlt="nyArbeidsoppgave"
                                    tittel={getLedetekst('oppfolgingsdialog.arbeidstaker.onboarding.arbeidsoppgave.tittel')}
                                    tekst={getLedetekst('oppfolgingsdialog.arbeidstaker.onboarding.arbeidsoppgave.tekst')}
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
                                    varselTekst={this.state.varselTekst}
                                    oppdateringFeilet={this.state.lagreNyOppgaveFeilet}
                                />
                        }
                    </div>
                    :
                    <div>
                        {
                            antallIkkeVurdererteArbOppgaver > 0 && <NotifikasjonBoksVurderingOppgave
                                ledetekster={ledetekster}
                                antallIkkeVurderte={antallIkkeVurdererteArbOppgaver}
                                rootUrl={getContextRoot()}
                                tekst="oppfolgingsdialog.notifikasjonBoksVurderingOppgave.arbeidstaker.tekst"
                            />
                        }
                        <ArbeidsoppgaverInfoboks
                            ledetekster={ledetekster}
                            tittel={getLedetekst('oppfolgingsdialog.arbeidsoppgaverInfoboks.tittel.arbeidstaker')}
                            visSkjema={this.state.visArbeidsoppgaveSkjema}
                            toggleSkjema={this.toggleArbeidsoppgaveSkjema}
                            feilType={this.state.feilType}
                            feilTekst={this.state.feilTekst}
                        >
                            { oppfolgingsdialog.arbeidstaker.stillinger.length > 0 &&
                                <div>
                                    { oppfolgingsdialog.arbeidstaker.stillinger.map((stilling, idx) => {
                                        return (<p key={idx}>
                                            {getLedetekst('oppfolgingsdialog.arbeidsoppgaverInfoboks.arbeidstaker.stilling', {
                                                '%YRKE%': stilling.yrke.toLowerCase(),
                                                '%PROSENT%': stilling.prosent,
                                            })}
                                        </p>);
                                    })
                                    }
                                </div>
                            }
                        </ArbeidsoppgaverInfoboks>
                        {
                            this.state.visArbeidsoppgaveSkjema && <LagreArbeidsoppgaveSkjema
                                ledetekster={ledetekster}
                                sendLagre={this.sendLagreArbeidsoppgave}
                                avbryt={this.toggleArbeidsoppgaveSkjema}
                                ref={(lagreSkjema) => {
                                    this.lagreSkjema = lagreSkjema;
                                }}
                                varselTekst={this.state.varselTekst}
                                oppdateringFeilet={this.state.lagreNyOppgaveFeilet}
                            />
                        }
                        <ArbeidsoppgaverListe
                            ledetekster={ledetekster}
                            liste={sorterArbeidsoppgaverEtterOpprettet(oppfolgingsdialog.arbeidsoppgaveListe)}
                            sendLagre={this.sendLagreArbeidsoppgave}
                            sendSlett={this.sendSlettArbeidsoppgave}
                            fnr={oppfolgingsdialog.arbeidstaker.fnr}
                            brukerType={BRUKERTYPE.ARBEIDSTAKER}
                            rootUrlImg={getContextRoot()}
                            visFeilMelding={this.visFeilMelding}
                            feilMelding={this.state.oppdaterOppgaveFeilet}
                        />
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
