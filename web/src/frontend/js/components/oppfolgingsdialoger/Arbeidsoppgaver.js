import React, { Component, PropTypes } from 'react';
import { isEmpty } from '../../utils/oppfolgingsdialogUtils';
import {
    OppfolgingsdialogSide,
    OppfolgingsdialogOppgaveTabell,
    finnArbeidsoppgaverIkkeVurdertAvSykmeldt,
    NotifikasjonBoks,
} from 'oppfolgingsdialog-npm';
import { getLedetekst } from 'digisyfo-npm';
import LagreArbeidsoppgaveSkjema from './LagreArbeidsoppgaveSkjema';

export const RenderNotifikasjonBoks = ({ virksomhetsnavn, antallIkkeVurderteArbeidsoppgaver }) => {
    return (<NotifikasjonBoks
        imgUrl={"/sykefravaer/img/svg/notifikasjon-illustrasjon.svg"}
        tekst={getLedetekst('oppfolgingsdialog.notifikasjonboks.ikke-vurderte-arbeidsoppgaver.tekst', {
            '%VIRKSOMHETSNAVN%': virksomhetsnavn,
            '%ANTALLARBEIDSOPPGAVER%': antallIkkeVurderteArbeidsoppgaver.toString(),
        })}
        classNames={'panel--oransje'}
    />);
};
RenderNotifikasjonBoks.propTypes = {
    virksomhetsnavn: PropTypes.string,
    antallIkkeVurderteArbeidsoppgaver: PropTypes.number,
};

export const RenderOppfolgingsdialogOppgaveTabell = ({ arbeidsoppgaveListe }) => {
    return (
        <OppfolgingsdialogOppgaveTabell
            arbeidsoppgaveListe={arbeidsoppgaveListe}
            urlImgArrow="/sykefravaer/img/svg/arrow-down.svg"
            urlImgVarsel="/sykefravaer/img/svg/varseltrekant.svg"
        />
    );
};
RenderOppfolgingsdialogOppgaveTabell.propTypes = {
    arbeidsoppgaveListe: PropTypes.array,
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
        const { ledetekster, oppfolgingsdialog, oppfolgingsdialogId, sendArbeidsoppgave } = this.props;

        const antallIkkeVurderteArbeidsoppgaver = oppfolgingsdialog ? finnArbeidsoppgaverIkkeVurdertAvSykmeldt(oppfolgingsdialog.arbeidsoppgaveListe).length : 0;

        return (
            <OppfolgingsdialogSide
                brukernavn={oppfolgingsdialog.virksomhetsnavn}
                ledetekster={ledetekster}
                rootUrl={`/sykefravaer/oppfolgingsplaner/${oppfolgingsdialogId}`}>
                {
                    isEmpty(oppfolgingsdialog.arbeidsoppgaveListe) ?
                        <div>
                            <h2 className="typo-undertittel">{getLedetekst('oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.tittel')}</h2>
                            <LagreArbeidsoppgaveSkjema
                                avbrytHref={'/sykefravaer/oppfolgingsplaner'}
                                onSubmit={sendArbeidsoppgave}
                            />
                        </div>
                        :
                        <div>
                            <h2 className="typo-undertittel">{getLedetekst('oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.tittel')}</h2>
                            {
                                antallIkkeVurderteArbeidsoppgaver > 0 &&
                                <RenderNotifikasjonBoks
                                    virksomhetsnavn={oppfolgingsdialog.virksomhetsnavn}
                                    antallIkkeVurderteArbeidsoppgaver={antallIkkeVurderteArbeidsoppgaver} />
                            }
                            {
                                <RenderOppfolgingsdialogOppgaveTabell
                                    arbeidsoppgaveListe={oppfolgingsdialog.arbeidsoppgaveListe} />
                            }
                            {
                                this.state.visArbeidsoppgaveSkjema ?
                                    <LagreArbeidsoppgaveSkjema
                                        avbrytHref={`/sykefravaer/oppfolgingsplaner/${oppfolgingsdialogId}/arbeidsoppgaver`}
                                        onSubmit={sendArbeidsoppgave}
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
};

export default Arbeidsoppgaver;
