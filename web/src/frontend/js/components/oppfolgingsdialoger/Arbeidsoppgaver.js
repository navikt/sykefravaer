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
} from 'oppfolgingsdialog-npm';
import { getLedetekst } from 'digisyfo-npm';
import history from '../../history';

export const RenderNotifikasjonBoks = ({ virksomhetsnavn, antallIkkeVurderteArbeidsoppgaver }) => {
    return (<NotifikasjonBoks
        imgUrl={"/sykefravaer/img/svg/notifikasjon-illustrasjon.svg"}
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
export const RenderNotifikasjonBoksSuksess = () => {
    return (<NotifikasjonBoks
        imgUrl={"/sykefravaer/img/svg/notifikasjon-illustrasjon.svg"}
        tekst={getLedetekst('oppfolgingsdialog.notifikasjonboks.lagret-arbeidsoppgave.tekst')}
        classNames={'panel--suksess'}
    />);
};

export const RenderOppfolgingsdialogArbeidsoppgaverTabell = ({ ledetekster, arbeidsoppgaveListe, sendLagreArbeidsoppgave, sendSlettArbeidsoppgave, aktoerId }) => {
    return (
        <OppfolgingsdialogTabell
            ledetekster={ledetekster}
            liste={arbeidsoppgaveListe}
            tabellType="arbeidsoppgaver"
            urlImgArrow="/sykefravaer/img/svg/arrow-down.svg"
            urlImgVarsel="/sykefravaer/img/svg/varseltrekant.svg"
            urlImgCheckboks="/sykefravaer/img/svg/oppfolgingdialog-checkbox.svg"
            sendLagre={sendLagreArbeidsoppgave}
            sendSlett={sendSlettArbeidsoppgave}
            aktoerId={aktoerId}
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

export const RenderOpprettArbeidsoppgave = ({ ledetekster, oppfolgingsdialogId, sendLagreArbeidsoppgave, toggleArbeidsoppgaveSkjema }) => {
    return (<div>
        <h2 className="typo-undertittel">{getLedetekst('oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.tittel')}</h2>
        <LagreArbeidsoppgaveSkjema
            ledetekster={ledetekster}
            avbrytHref={`/sykefravaer/oppfolgingsplaner/${oppfolgingsdialogId}/arbeidsoppgaver`}
            sendLagre={sendLagreArbeidsoppgave}
            avbryt={toggleArbeidsoppgaveSkjema}
        />
    </div>);
};
RenderOpprettArbeidsoppgave.propTypes = {
    ledetekster: PropTypes.object,
    oppfolgingsdialogId: PropTypes.string,
    sendLagreArbeidsoppgave: PropTypes.func,
    toggleArbeidsoppgaveSkjema: PropTypes.func,
};

export class Arbeidsoppgaver extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visArbeidsoppgaveSkjema: false,
        };
        this.toggleArbeidsoppgaveSkjema = this.toggleArbeidsoppgaveSkjema.bind(this);
    }
    componentDidUpdate(prevProps, prevState) {
        if (!prevState.visArbeidsoppgaveSkjema && this.state.visArbeidsoppgaveSkjema && this.lagreSkjema) {
            const form = findDOMNode(this.lagreSkjema);
            scrollTo(form, form.getBoundingClientRect().bottom);
        }
    }

    toggleArbeidsoppgaveSkjema() {
        this.setState({
            visArbeidsoppgaveSkjema: !this.state.visArbeidsoppgaveSkjema,
        });
    }

    render() {
        const { ledetekster, oppfolgingsdialog, oppfolgingsdialogId, sendLagreArbeidsoppgave, sendSlettArbeidsoppgave, arbeidsoppgaveLagret } = this.props;

        const antallIkkeVurderteArbeidsoppgaver = oppfolgingsdialog ? finnArbeidsoppgaverIkkeVurdertAvSykmeldt(oppfolgingsdialog.arbeidsoppgaveListe).length : 0;

        return (
            <OppfolgingsdialogSide
                brukernavn={oppfolgingsdialog.virksomhetsnavn}
                oppfolgingsdialog={oppfolgingsdialog}
                aktivUrl={history.getCurrentLocation().pathname}
                ledetekster={ledetekster}
                rootUrl={`/sykefravaer/oppfolgingsplaner/${oppfolgingsdialogId}`}>
                {
                    isEmpty(oppfolgingsdialog.arbeidsoppgaveListe) ?
                    <div>
                        {
                            !this.state.visArbeidsoppgaveSkjema ?
                                <OppfolgingsdialogInfoboks
                                    svgUrl="/sykefravaer/img/svg/arbeidsoppgave-onboarding.svg"
                                    svgAlt="nyArbeidsoppgave"
                                    tittel={getLedetekst('oppfolgingsdialog.arbeidstaker.onboarding.arbeidsoppgave.tittel')}
                                    tekst={getLedetekst('oppfolgingsdialog.arbeidstaker.onboarding.arbeidsoppgave.tekst')}
                                >
                                    <RenderArbeidsoppgaverKnapper toggleArbeidsoppgaveSkjema={this.toggleArbeidsoppgaveSkjema} />
                                </OppfolgingsdialogInfoboks> :
                                <RenderOpprettArbeidsoppgave
                                    ledetekster={ledetekster}
                                    oppfolgingsdialogId={oppfolgingsdialogId}
                                    sendLagreArbeidsoppgave={sendLagreArbeidsoppgave}
                                    toggleArbeidsoppgaveSkjema={this.toggleArbeidsoppgaveSkjema}
                                />
                        }

                    </div>
                    :
                    <div>
                        <h2 className="typo-undertittel">{getLedetekst('oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.tittel')}</h2>
                        {
                            arbeidsoppgaveLagret && <RenderNotifikasjonBoksSuksess />
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
                                arbeidsoppgaveListe={oppfolgingsdialog.arbeidsoppgaveListe}
                                sendLagreArbeidsoppgave={sendLagreArbeidsoppgave}
                                sendSlettArbeidsoppgave={sendSlettArbeidsoppgave}
                                aktoerId={oppfolgingsdialog.sykmeldtAktoerId}
                            />
                        }
                        {
                            this.state.visArbeidsoppgaveSkjema ?
                                <LagreArbeidsoppgaveSkjema
                                    ledetekster={ledetekster}
                                    avbrytHref={`/sykefravaer/oppfolgingsplaner/${oppfolgingsdialogId}/arbeidsoppgaver`}
                                    sendLagre={sendLagreArbeidsoppgave}
                                    avbryt={this.toggleArbeidsoppgaveSkjema}
                                    ref={(lagreSkjema) => { this.lagreSkjema = lagreSkjema; }}
                                /> :
                                <RenderArbeidsoppgaverKnapper toggleArbeidsoppgaveSkjema={this.toggleArbeidsoppgaveSkjema} />
                        }
                    </div>
                }
            </OppfolgingsdialogSide>
        );
    }
}

Arbeidsoppgaver.propTypes = {
    ledetekster: PropTypes.object,
    oppfolgingsdialog: PropTypes.object,
    oppfolgingsdialogId: PropTypes.string,
    sendLagreArbeidsoppgave: PropTypes.func,
    sendSlettArbeidsoppgave: PropTypes.func,
    arbeidsoppgaveLagret: PropTypes.bool,
};

export default Arbeidsoppgaver;
