import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import {
    ArbeidsoppgaverNotifikasjonBoksAdvarsel,
    BRUKERTYPE,
    captitalizeFirstLetter,
    LagreArbeidsoppgaveSkjema,
    LeggTilElementKnapper,
    NotifikasjonBoksLagretElement,
    OppfolgingsdialogInfoboks,
    OppfolgingsdialogTabell,
    sorterArbeidsoppgaverEtterOpprettet,
    proptypes as oppfolgingProptypes,
} from 'oppfolgingsdialog-npm';
import { getLedetekst, keyValue } from 'digisyfo-npm';
import { getContextRoot } from '../../../routers/paths';
import { isEmpty } from '../../../utils/oppfolgingsdialogUtils';
import AppSpinner from '../../AppSpinner';
import Feilmelding from '../../Feilmelding';
import {
    arbeidsforhold as arbeidsforholdPt,
} from '../../../propTypes/index';


export const OppfolgingsdialogArbeidsoppgaverTabell = ({ ledetekster, arbeidsoppgaveListe, sendLagreArbeidsoppgave, sendSlettArbeidsoppgave, aktoerId, oppfolgingsdialog }) => {
    return (
        <OppfolgingsdialogTabell
            ledetekster={ledetekster}
            liste={arbeidsoppgaveListe}
            tabellType="arbeidsoppgaver"
            urlImgArrow={`${getContextRoot()}/img/svg/arrow-down.svg`}
            urlImgVarsel={`${getContextRoot()}/img/svg/varseltrekant.svg`}
            urlImgCheckboks={`${getContextRoot()}/img/svg/oppfolgingdialog-checkbox.svg`}
            sendLagre={sendLagreArbeidsoppgave}
            sendSlett={sendSlettArbeidsoppgave}
            aktoerId={aktoerId}
            brukerType={BRUKERTYPE.ARBEIDSTAKER}
            oppfolgingsdialog={oppfolgingsdialog}
        />
    );
};
OppfolgingsdialogArbeidsoppgaverTabell.propTypes = {
    ledetekster: keyValue,
    oppfolgingsdialog: oppfolgingProptypes.oppfolgingsdialogPt,
    arbeidsoppgaveListe: PropTypes.arrayOf(oppfolgingProptypes.arbeidsoppgavePt),
    sendLagreArbeidsoppgave: PropTypes.func,
    sendSlettArbeidsoppgave: PropTypes.func,
    aktoerId: PropTypes.string,
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

export const RenderArbeidsforhold = ({ arbeidsforhold }) => {
    return (<div>{arbeidsforhold.yrke.toLowerCase()}: {arbeidsforhold.prosent}%</div>);
};
RenderArbeidsforhold.propTypes = {
    arbeidsforhold: arbeidsforholdPt,
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
    }

    componentWillMount() {
        window.location.hash = 'arbeidsoppgaver';
    }

    componentDidMount() {
        if (this.state.visArbeidsoppgaveSkjema && this.lagreSkjema) {
            this.scrollToForm();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.visArbeidsoppgaveSkjema && this.state.visArbeidsoppgaveSkjema && this.lagreSkjema) {
            const form = findDOMNode(this.lagreSkjema);
            window.scrollTo(form, form.getBoundingClientRect().bottom);
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
        const nyeValues = Object.assign({}, values, {
            arbeidsoppgavenavn: captitalizeFirstLetter(values.arbeidsoppgavenavn),
        });
        this.props.lagreArbeidsoppgave(this.props.oppfolgingsdialogId, nyeValues);
    }

    sendSlettArbeidsoppgave(arbeidsoppgaveId) {
        this.props.slettArbeidsoppgave(this.props.oppfolgingsdialogId, arbeidsoppgaveId);
    }

    toggleArbeidsoppgaveSkjema() {
        this.setState({
            visArbeidsoppgaveSkjema: !this.state.visArbeidsoppgaveSkjema,
        });
    }

    scrollToForm() {
        const form = findDOMNode(this.lagreSkjema);
        window.scrollTo(form, form.getBoundingClientRect().bottom);
    }

    render() {
        const {
            lagrer,
            lagret,
            sletter,
            lagringFeilet,
            slettingFeilet,
            ledetekster,
            oppfolgingsdialog,
            oppfolgingsdialogId,
            arbeidsforhold,
        } = this.props;
        const antallNyeArbeidsoppgaver = oppfolgingsdialog.arbeidsoppgaveListe.filter((arbeidsoppgave) => {
            return !arbeidsoppgave.erVurdertAvSykmeldt && (!oppfolgingsdialog.arbeidstaker.sistInnlogget || new Date(arbeidsoppgave.opprettetDato) > new Date(oppfolgingsdialog.arbeidstaker.sistInnlogget));
        }).length;
        return (
            (() => {
                if (lagrer || sletter) {
                    return <AppSpinner />;
                } else if (lagringFeilet || slettingFeilet) {
                    return (<Feilmelding />);
                }
                return isEmpty(oppfolgingsdialog.arbeidsoppgaveListe) ?
                    <div>
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
                                    oppfolgingsdialogId={oppfolgingsdialogId}
                                    sendLagreArbeidsoppgave={this.sendLagreArbeidsoppgave}
                                    toggleArbeidsoppgaveSkjema={this.toggleArbeidsoppgaveSkjema}
                                />
                        }
                    </div>
                    :
                    <div>

                        { arbeidsforhold.length > 0 &&
                        <div className="panel oppfolgingsdialogStilling notifikasjonboks" role="alert">
                            <img src="/sykefravaer/img/svg/oppfolgingsdialog-stilling.svg" alt="ikon" className="oppfolgingsdialogStilling__img" />
                            <span className="oppfolgingsdialogStilling__tekst">
                                <h3>{getLedetekst('oppfolgingsdialog.arbeidstaker.stilling.tekst')}</h3>
                                { arbeidsforhold.map((forhold, idx) => {
                                    if (forhold.prosent > 0) {
                                        return (<RenderArbeidsforhold arbeidsforhold={forhold} key={idx} />);
                                    } return (null);
                                })
                                }
                            </span>
                        </div>
                        }

                        <h2>{getLedetekst('oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.tittel')}</h2>

                        {
                            lagret && this.state.oppdatertArbeidsoppgave &&
                                <NotifikasjonBoksLagretElement
                                    tekst={getLedetekst('oppfolgingsdialog.notifikasjonboks.lagret-arbeidsoppgave.tekst')}
                                    rootUrl={`${getContextRoot()}`}
                                />
                        }
                        {
                            lagret && this.state.nyArbeidsoppgave &&
                                <NotifikasjonBoksLagretElement
                                    tekst={getLedetekst('oppfolgingsdialog.notifikasjonboks.opprettet-arbeidsoppgave.tekst')}
                                    rootUrl={`${getContextRoot()}`}
                                />
                        }
                        {
                            antallNyeArbeidsoppgaver > 0 && <ArbeidsoppgaverNotifikasjonBoksAdvarsel
                                ledetekster={ledetekster}
                                motpartnavn={oppfolgingsdialog.arbeidsgiver.navn}
                                antallIkkeVurderteArbeidsoppgaver={antallNyeArbeidsoppgaver}
                                rootUrl={`${getContextRoot()}`}
                            />
                        }
                        <OppfolgingsdialogArbeidsoppgaverTabell
                            ledetekster={ledetekster}
                            oppfolgingsdialog={oppfolgingsdialog}
                            arbeidsoppgaveListe={sorterArbeidsoppgaverEtterOpprettet(oppfolgingsdialog.arbeidsoppgaveListe)}
                            sendLagreArbeidsoppgave={this.sendLagreArbeidsoppgave}
                            sendSlettArbeidsoppgave={this.sendSlettArbeidsoppgave}
                            aktoerId={oppfolgingsdialog.arbeidstaker.aktoerId}
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
    lagrer: PropTypes.bool,
    lagret: PropTypes.bool,
    sletter: PropTypes.bool,
    lagringFeilet: PropTypes.bool,
    slettingFeilet: PropTypes.bool,
    ledetekster: keyValue,
    oppfolgingsdialog: oppfolgingProptypes.oppfolgingsdialogPt,
    oppfolgingsdialogId: PropTypes.string,
    lagreArbeidsoppgave: PropTypes.func,
    slettArbeidsoppgave: PropTypes.func,
    arbeidsforhold: PropTypes.arrayOf(arbeidsforholdPt),
  };

export default Arbeidsoppgaver;
