import React, { Component, PropTypes } from 'react';
import { isEmpty } from '../../utils/oppfolgingsdialogUtils';
import {
    OppfolgingsdialogSide,
    finnArbeidsoppgaverIkkeVurdertAvSykmeldt,
    OppfolgingsdialogInfoboks,
    NotifikasjonBoks,
    ArbeidsoppgaverTabell,
    LagreArbeidsoppgaveSkjema,
} from 'oppfolgingsdialog-npm';
import { getLedetekst } from 'digisyfo-npm';

export const RenderNotifikasjonBoks = ({ virksomhetsnavn, antallIkkeVurderteArbeidsoppgaver }) => {
    return (<NotifikasjonBoks
        imgUrl={"/sykefravaer/img/svg/notifikasjon-illustrasjon.svg"}
        tekst={getLedetekst('oppfolgingsdialog.notifikasjonboks.lagret-arbeidsoppgave.tekst', {
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

export const RenderOppfolgingsdialogOppgaveTabell = ({ ledetekster, arbeidsoppgaveListe, sendArbeidsoppgave, sendSlettArbeidsoppgave }) => {
    return (
        <ArbeidsoppgaverTabell
            ledetekster={ledetekster}
            arbeidsoppgaveListe={arbeidsoppgaveListe}
            urlImgArrow="/sykefravaer/img/svg/arrow-down.svg"
            urlImgVarsel="/sykefravaer/img/svg/varseltrekant.svg"
            sendArbeidsoppgave={sendArbeidsoppgave}
            sendSlettArbeidsoppgave={sendSlettArbeidsoppgave}
        />
    );
};
RenderOppfolgingsdialogOppgaveTabell.propTypes = {
    ledetekster: PropTypes.object,
    arbeidsoppgaveListe: PropTypes.array,
    sendArbeidsoppgave: PropTypes.func,
    sendSlettArbeidsoppgave: PropTypes.func,
};

export const RenderKnapper = ({ toggleArbeidsoppgaveSkjema }) => {
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
RenderKnapper.propTypes = {
    toggleArbeidsoppgaveSkjema: PropTypes.func,
};

export const RenderOpprettArbeidsoppgave = ({ ledetekster, oppfolgingsdialogId, sendArbeidsoppgave, toggleArbeidsoppgaveSkjema }) => {
    return (<div>
        <h2 className="typo-undertittel">{getLedetekst('oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.tittel')}</h2>
        <LagreArbeidsoppgaveSkjema
            ledetekster={ledetekster}
            avbrytHref={`/sykefravaer/oppfolgingsplaner/${oppfolgingsdialogId}/arbeidsoppgaver`}
            sendArbeidsoppgave={sendArbeidsoppgave}
            avbryt={toggleArbeidsoppgaveSkjema}
        />
    </div>);
};
RenderOpprettArbeidsoppgave.propTypes = {
    ledetekster: PropTypes.object,
    oppfolgingsdialogId: PropTypes.string,
    sendArbeidsoppgave: PropTypes.func,
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

    toggleArbeidsoppgaveSkjema() {
        this.setState({
            visArbeidsoppgaveSkjema: !this.state.visArbeidsoppgaveSkjema,
        });
    }

    render() {
        const { ledetekster, oppfolgingsdialog, oppfolgingsdialogId, sendArbeidsoppgave, sendSlettArbeidsoppgave, arbeidsoppgaveLagret } = this.props;

        const antallIkkeVurderteArbeidsoppgaver = oppfolgingsdialog ? finnArbeidsoppgaverIkkeVurdertAvSykmeldt(oppfolgingsdialog.arbeidsoppgaveListe).length : 0;

        return (
            <OppfolgingsdialogSide
                brukernavn={oppfolgingsdialog.virksomhetsnavn}
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
                                    <RenderKnapper toggleArbeidsoppgaveSkjema={this.toggleArbeidsoppgaveSkjema} />
                                </OppfolgingsdialogInfoboks> :
                                <RenderOpprettArbeidsoppgave
                                    ledetekster={ledetekster}
                                    oppfolgingsdialogId={oppfolgingsdialogId}
                                    sendArbeidsoppgave={sendArbeidsoppgave}
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
                            <RenderOppfolgingsdialogOppgaveTabell
                                ledetekster={ledetekster}
                                arbeidsoppgaveListe={oppfolgingsdialog.arbeidsoppgaveListe}
                                sendArbeidsoppgave={sendArbeidsoppgave}
                                sendSlettArbeidsoppgave={sendSlettArbeidsoppgave}
                            />
                        }
                        {
                            this.state.visArbeidsoppgaveSkjema ?
                                <LagreArbeidsoppgaveSkjema
                                    ledetekster={ledetekster}
                                    avbrytHref={`/sykefravaer/oppfolgingsplaner/${oppfolgingsdialogId}/arbeidsoppgaver`}
                                    sendArbeidsoppgave={sendArbeidsoppgave}
                                    avbryt={this.toggleArbeidsoppgaveSkjema}
                                /> :
                                <RenderKnapper toggleArbeidsoppgaveSkjema={this.toggleArbeidsoppgaveSkjema} />
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
    sendArbeidsoppgave: PropTypes.func,
    sendSlettArbeidsoppgave: PropTypes.func,
    arbeidsoppgaveLagret: PropTypes.bool,
};

export default Arbeidsoppgaver;
