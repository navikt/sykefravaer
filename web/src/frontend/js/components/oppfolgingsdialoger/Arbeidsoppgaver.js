import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { isEmpty } from '../../utils/oppfolgingsdialogUtils';
import {
    OppfolgingsdialogSide,
    finnArbeidsoppgaverIkkeVurdertAvSykmeldt,
    OppfolgingsdialogInfoboks,
    NotifikasjonBoks,
    OppfolgingsdialogTabell,
    LagreArbeidsoppgaveSkjema,
    BRUKERTYPE,
    OppfolgingsdialogFooter,
    SIDETYPE,
} from 'oppfolgingsdialog-npm';
import { getLedetekst } from 'digisyfo-npm';
import history from '../../history';

export const RenderNotifikasjonBoks = ({ virksomhetsnavn, antallIkkeVurderteArbeidsoppgaver }) => {
    return (<NotifikasjonBoks
        imgUrl={`${window.APP_SETTINGS.APP_ROOT}/img/svg/notifikasjon-illustrasjon.svg`}
        tekst={getLedetekst('oppfolgingsdialog.notifikasjonboks.ikke-vurderte-arbeidsoppgaver.tekst', {
            '%VIRKSOMHETSNAVN%': virksomhetsnavn,
            '%ANTALLARBEIDSOPPGAVER%': antallIkkeVurderteArbeidsoppgaver.toString(),
        })}
        classNames={'panel--advarsel'}
    />);
};
RenderNotifikasjonBoks.propTypes = {
    virksomhetsnavn: PropTypes.string,
    antallIkkeVurderteArbeidsoppgaver: PropTypes.number,
};
export const RenderNotifikasjonBoksSuksess = ({ tekst }) => {
    return (<NotifikasjonBoks
        imgUrl={`${window.APP_SETTINGS.APP_ROOT}/img/svg/notifikasjon-suksess-illustrasjon.svg`}
        tekst={tekst}
        classNames={'panel--suksess'}
    />);
};
RenderNotifikasjonBoksSuksess.propTypes = {
    tekst: PropTypes.string,
};

export const RenderOppfolgingsdialogArbeidsoppgaverTabell = ({ ledetekster, arbeidsoppgaveListe, sendLagreArbeidsoppgave, sendSlettArbeidsoppgave, aktoerId }) => {
    return (
        <OppfolgingsdialogTabell
            ledetekster={ledetekster}
            liste={arbeidsoppgaveListe}
            tabellType="arbeidsoppgaver"
            urlImgArrow={`${window.APP_SETTINGS.APP_ROOT}/img/svg/arrow-down.svg`}
            urlImgVarsel={`${window.APP_SETTINGS.APP_ROOT}/img/svg/varseltrekant.svg`}
            urlImgCheckboks={`${window.APP_SETTINGS.APP_ROOT}/img/svg/oppfolgingdialog-checkbox.svg`}
            sendLagre={sendLagreArbeidsoppgave}
            sendSlett={sendSlettArbeidsoppgave}
            aktoerId={aktoerId}
            brukerType={BRUKERTYPE.ARBEIDSTAKER}
        />
    );
};
RenderOppfolgingsdialogArbeidsoppgaverTabell.propTypes = {
    ledetekster: PropTypes.object,
    arbeidsoppgaveListe: PropTypes.array,
    sendLagreArbeidsoppgave: PropTypes.func,
    sendSlettArbeidsoppgave: PropTypes.func,
    aktoerId: PropTypes.string,
};

export const RenderArbeidsoppgaverKnapper = ({ toggleArbeidsoppgaveSkjema }) => {
    return (
        <div className="knapperad">
            <button
                className="knapp knapperad__element"
                onClick={toggleArbeidsoppgaveSkjema}>
                {getLedetekst('oppfolgingsdialog.arbeidstaker.knapp.leggtil-arbeidsoppgave')}
            </button>
        </div>
    );
};
RenderArbeidsoppgaverKnapper.propTypes = {
    toggleArbeidsoppgaveSkjema: PropTypes.func,
};

export const RenderOpprettArbeidsoppgave = ({ ledetekster, sendLagreArbeidsoppgave, toggleArbeidsoppgaveSkjema }) => {
    return (<div>
        <h2 className="typo-undertittel">{getLedetekst('oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.tittel')}</h2>
        <LagreArbeidsoppgaveSkjema
            ledetekster={ledetekster}
            sendLagre={sendLagreArbeidsoppgave}
            avbryt={toggleArbeidsoppgaveSkjema}
        />
    </div>);
};
RenderOpprettArbeidsoppgave.propTypes = {
    ledetekster: PropTypes.object,
    sendLagreArbeidsoppgave: PropTypes.func,
    toggleArbeidsoppgaveSkjema: PropTypes.func,
};

export class Arbeidsoppgaver extends Component {
    constructor(props) {
        super(props);
        this.scrollToForm = this.scrollToForm.bind(this);
    }

    componentDidMount() {
        if (this.props.visArbeidsoppgaveSkjema && this.lagreSkjema) {
            this.scrollToForm();
        }
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.visArbeidsoppgaveSkjema && this.props.visArbeidsoppgaveSkjema && this.lagreSkjema) {
            const form = findDOMNode(this.lagreSkjema);
            scrollTo(form, form.getBoundingClientRect().bottom);
        }
    }

    scrollToForm() {
        const form = findDOMNode(this.lagreSkjema);
        scrollTo(form, form.getBoundingClientRect().bottom);
    }

    render() {
        const {
            ledetekster,
            arbeidsoppgaveListe,
            oppfolgingsdialog,
            oppfolgingsdialogId,
            sendLagreArbeidsoppgave,
            toggleArbeidsoppgaveSkjema,
            visArbeidsoppgaveSkjema,
            sendSlettArbeidsoppgave,
            arbeidsoppgaveLagret,
            arbeidsoppgaveOpprettet,
        } = this.props;

        const antallIkkeVurderteArbeidsoppgaver = oppfolgingsdialog ? finnArbeidsoppgaverIkkeVurdertAvSykmeldt(oppfolgingsdialog.arbeidsoppgaveListe).length : 0;

        return (
            <OppfolgingsdialogSide
                brukernavn={oppfolgingsdialog.virksomhetsnavn}
                oppfolgingsdialog={oppfolgingsdialog}
                aktivUrl={history.getCurrentLocation().pathname}
                ledetekster={ledetekster}
                rootUrl={`${window.APP_SETTINGS.APP_ROOT}/oppfolgingsplaner/${oppfolgingsdialogId}`}>
                {
                    isEmpty(arbeidsoppgaveListe) ?
                        <div>
                            {
                                !visArbeidsoppgaveSkjema ?
                                    <OppfolgingsdialogInfoboks
                                        svgUrl={`${window.APP_SETTINGS.APP_ROOT}/img/svg/arbeidsoppgave-onboarding.svg`}
                                        svgAlt="nyArbeidsoppgave"
                                        tittel={getLedetekst('oppfolgingsdialog.arbeidstaker.onboarding.arbeidsoppgave.tittel')}
                                        tekst={getLedetekst('oppfolgingsdialog.arbeidstaker.onboarding.arbeidsoppgave.tekst')}
                                    >
                                        <RenderArbeidsoppgaverKnapper
                                            toggleArbeidsoppgaveSkjema={toggleArbeidsoppgaveSkjema} />
                                    </OppfolgingsdialogInfoboks> :
                                    <RenderOpprettArbeidsoppgave
                                        ledetekster={ledetekster}
                                        oppfolgingsdialogId={oppfolgingsdialogId}
                                        sendLagreArbeidsoppgave={sendLagreArbeidsoppgave}
                                        toggleArbeidsoppgaveSkjema={toggleArbeidsoppgaveSkjema}
                                    />
                            }

                        </div>
                        :
                        <div>
                            <h2 className="typo-undertittel">{getLedetekst('oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.tittel')}</h2>
                            {
                                arbeidsoppgaveLagret && !arbeidsoppgaveOpprettet &&
                                <RenderNotifikasjonBoksSuksess
                                    tekst={getLedetekst('oppfolgingsdialog.notifikasjonboks.lagret-arbeidsoppgave.tekst')}
                                />
                            }
                            {
                                arbeidsoppgaveLagret && arbeidsoppgaveOpprettet &&
                                <RenderNotifikasjonBoksSuksess
                                    tekst={getLedetekst('oppfolgingsdialog.notifikasjonboks.opprettet-arbeidsoppgave.tekst')}
                                />
                            }
                            {
                                antallIkkeVurderteArbeidsoppgaver > 0 &&
                                <RenderNotifikasjonBoks
                                    virksomhetsnavn={oppfolgingsdialog.virksomhetsnavn}
                                    antallIkkeVurderteArbeidsoppgaver={antallIkkeVurderteArbeidsoppgaver}
                                />
                            }
                            {
                                <RenderOppfolgingsdialogArbeidsoppgaverTabell
                                    ledetekster={ledetekster}
                                    arbeidsoppgaveListe={arbeidsoppgaveListe}
                                    sendLagreArbeidsoppgave={sendLagreArbeidsoppgave}
                                    sendSlettArbeidsoppgave={sendSlettArbeidsoppgave}
                                    aktoerId={oppfolgingsdialog.sykmeldtAktoerId}
                                />
                            }
                            {
                                visArbeidsoppgaveSkjema ?
                                    <LagreArbeidsoppgaveSkjema
                                        ledetekster={ledetekster}
                                        sendLagre={sendLagreArbeidsoppgave}
                                        avbryt={toggleArbeidsoppgaveSkjema}
                                        ref={(lagreSkjema) => {
                                            this.lagreSkjema = lagreSkjema;
                                        }}
                                    /> :
                                    <RenderArbeidsoppgaverKnapper toggleArbeidsoppgaveSkjema={toggleArbeidsoppgaveSkjema} />
                            }
                        </div>
                }
                <OppfolgingsdialogFooter
                    ledetekster={ledetekster}
                    oppfolgingsdialog={oppfolgingsdialog}
                    sideType={SIDETYPE.ARBEIDSOPPGAVER}
                    rootUrl={`${window.APP_SETTINGS.APP_ROOT}/oppfolgingsplaner/${oppfolgingsdialogId}`}
                />
            </OppfolgingsdialogSide>
        );
    }
}

Arbeidsoppgaver.propTypes = {
    ledetekster: PropTypes.object,
    arbeidsoppgaveListe: PropTypes.array,
    oppfolgingsdialog: PropTypes.object,
    oppfolgingsdialogId: PropTypes.string,
    toggleArbeidsoppgaveSkjema: PropTypes.func,
    visArbeidsoppgaveSkjema: PropTypes.bool,
    sendLagreArbeidsoppgave: PropTypes.func,
    sendSlettArbeidsoppgave: PropTypes.func,
    arbeidsoppgaveLagret: PropTypes.bool,
    arbeidsoppgaveOpprettet: PropTypes.bool,
};

export default Arbeidsoppgaver;
