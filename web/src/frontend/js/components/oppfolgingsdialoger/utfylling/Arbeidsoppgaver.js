import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import {
    ArbeidsoppgaverNotifikasjonBoksAdvarsel,
    Arbeidsforhold,
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
import { getLedetekst, keyValue, scrollTo } from 'digisyfo-npm';
import { getContextRoot } from '../../../routers/paths';
import { isEmpty } from '../../../utils/oppfolgingsdialogUtils';
import AppSpinner from '../../AppSpinner';
import Feilmelding from '../../Feilmelding';

export const OppfolgingsdialogArbeidsoppgaverTabell = ({ ledetekster, arbeidsoppgaveListe, sendLagreArbeidsoppgave, sendSlettArbeidsoppgave, fnr, oppfolgingsdialog }) => {
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
            fnr={fnr}
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
    fnr: PropTypes.string,
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
            oppfolgingsdialogAvbrutt,
        } = this.props;
        const {
            lagrer,
            lagret,
            lagringFeilet,
            sletter,
            slettingFeilet,
        } = this.props.arbeidsoppgaver;
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
                            antallNyeArbeidsoppgaver > 0 && !oppfolgingsdialogAvbrutt && <ArbeidsoppgaverNotifikasjonBoksAdvarsel
                                ledetekster={ledetekster}
                                motpartnavn={'Lederen din'}
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
                            fnr={oppfolgingsdialog.arbeidstaker.fnr}
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
    ledetekster: keyValue,
    arbeidsoppgaver: oppfolgingProptypes.arbeidsoppgaverReducerPt,
    oppfolgingsdialog: oppfolgingProptypes.oppfolgingsdialogPt,
    oppfolgingsdialogAvbrutt: PropTypes.bool,
    lagreArbeidsoppgave: PropTypes.func,
    slettArbeidsoppgave: PropTypes.func,
};

export default Arbeidsoppgaver;
