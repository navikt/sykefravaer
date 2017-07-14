import React, { Component, PropTypes } from 'react';
import { isEmpty } from '../../utils/oppfolgingsdialogUtils';
import {
    OppfolgingsdialogSide,
    OppfolgingsdialogInfoboks,
    NotifikasjonBoks,
    OppfolgingsdialogTabell,
    LagreTiltakSkjema,
    finnTiltakIkkeLagtTilAvAktoer,
} from 'oppfolgingsdialog-npm';
import { getLedetekst } from 'digisyfo-npm';
import history from '../../history';

export const RenderNotifikasjonBoks = ({ virksomhetsnavn, antallTiltakLagtTilAvArbeidsgiver }) => {
    return (<NotifikasjonBoks
        imgUrl={"/sykefravaer/img/svg/notifikasjon-illustrasjon.svg"}
        tekst={getLedetekst('oppfolgingsdialog.notifikasjonboks.tiltak-lagt-til-av-arbeidsgiver.tekst', {
            '%VIRKSOMHETSNAVN%': virksomhetsnavn,
            '%ANTALLTILTAK%': antallTiltakLagtTilAvArbeidsgiver.toString(),
        })}
        classNames={'panel--advarsel'}
    />);
};
RenderNotifikasjonBoks.propTypes = {
    virksomhetsnavn: PropTypes.string,
    antallTiltakLagtTilAvArbeidsgiver: PropTypes.number,
};

export const RenderNotifikasjonBoksSuksess = () => {
    return (<NotifikasjonBoks
        imgUrl={"/sykefravaer/img/svg/notifikasjon-illustrasjon.svg"}
        tekst={getLedetekst('oppfolgingsdialog.notifikasjonboks.lagret-tiltak.tekst')}
        classNames={'panel--suksess'}
    />);
};

export const RenderOppfolgingsdialogTiltakTabell = ({ ledetekster, tiltakListe, sendLagreTiltak, sendSlettTiltak, aktoerId }) => {
    return (
        <OppfolgingsdialogTabell
            ledetekster={ledetekster}
            liste={tiltakListe}
            tabellType="tiltak"
            urlImgArrow="/sykefravaer/img/svg/arrow-down.svg"
            urlImgVarsel="/sykefravaer/img/svg/varseltrekant.svg"
            sendLagre={sendLagreTiltak}
            sendSlett={sendSlettTiltak}
            aktoerId={aktoerId}
        />
    );
};
RenderOppfolgingsdialogTiltakTabell.propTypes = {
    ledetekster: PropTypes.object,
    tiltakListe: PropTypes.array,
    sendLagreTiltak: PropTypes.func,
    sendSlettTiltak: PropTypes.func,
    aktoerId: PropTypes.string,
};

export const RenderTiltakKnapper = ({ toggleTiltakSkjema }) => {
    return (
        <div className="knapperad">
            <button
                className="knapp knapperad__element"
                onClick={toggleTiltakSkjema}>
                {getLedetekst('oppfolgingsdialog.arbeidstaker.knapp.leggtil-tiltak')}
            </button>
        </div>
    );
};
RenderTiltakKnapper.propTypes = {
    toggleTiltakSkjema: PropTypes.func,
};

export const RenderOpprettTiltak = ({ ledetekster, oppfolgingsdialogId, sendLagreTiltak, toggleTiltakSkjema }) => {
    return (<div>
        <h2 className="typo-undertittel">{getLedetekst('oppfolgingsdialog.arbeidstaker.tiltak.opprett.tittel')}</h2>
        <LagreTiltakSkjema
            ledetekster={ledetekster}
            avbrytHref={`/sykefravaer/oppfolgingsplaner/${oppfolgingsdialogId}/tiltak`}
            sendLagre={sendLagreTiltak}
            avbryt={toggleTiltakSkjema}
        />
    </div>);
};
RenderOpprettTiltak.propTypes = {
    ledetekster: PropTypes.object,
    oppfolgingsdialogId: PropTypes.string,
    sendLagreTiltak: PropTypes.func,
    toggleTiltakSkjema: PropTypes.func,
};

export class Tiltak extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visTiltakSkjema: false,
        };
        this.toggleTiltakSkjema = this.toggleTiltakSkjema.bind(this);
    }

    toggleTiltakSkjema() {
        this.setState({
            visTiltakSkjema: !this.state.visTiltakSkjema,
        });
    }

    render() {
        const { ledetekster, oppfolgingsdialog, oppfolgingsdialogId, sendLagreTiltak, sendSlettTiltak, tiltakLagret } = this.props;

        const antallTiltakLagtTilAvArbeidsgiver = finnTiltakIkkeLagtTilAvAktoer(oppfolgingsdialog.sykmeldtAktoerId, oppfolgingsdialog.tiltakListe).length;

        return (
            <OppfolgingsdialogSide
                brukernavn={oppfolgingsdialog.virksomhetsnavn}
                oppfolgingsdialog={oppfolgingsdialog}
                aktivUrl={history.getCurrentLocation().pathname}
                ledetekster={ledetekster}
                rootUrl={`/sykefravaer/oppfolgingsplaner/${oppfolgingsdialogId}`}>
                {
                    isEmpty(oppfolgingsdialog.tiltakListe) ?
                    <div>
                        {
                            !this.state.visTiltakSkjema ?
                                <OppfolgingsdialogInfoboks
                                    svgUrl="/sykefravaer/img/svg/tiltak-onboarding.svg"
                                    svgAlt="nyttTiltak"
                                    tittel={getLedetekst('oppfolgingsdialog.arbeidstaker.onboarding.tiltak.tittel')}
                                    tekst={getLedetekst('oppfolgingsdialog.arbeidstaker.onboarding.tiltak.tekst')}
                                >
                                    <RenderTiltakKnapper toggleTiltakSkjema={this.toggleTiltakSkjema} />
                                </OppfolgingsdialogInfoboks> :
                                <RenderOpprettTiltak
                                    ledetekster={ledetekster}
                                    oppfolgingsdialogId={oppfolgingsdialogId}
                                    sendLagreTiltak={sendLagreTiltak}
                                    toggleTiltakSkjema={this.toggleTiltakSkjema}
                                />
                        }

                    </div>
                    :
                    <div>
                        <h2 className="typo-undertittel">{getLedetekst('oppfolgingsdialog.arbeidstaker.tiltak.opprett.tittel')}</h2>
                        {
                            tiltakLagret && <RenderNotifikasjonBoksSuksess />
                        }
                        {
                            antallTiltakLagtTilAvArbeidsgiver > 0 &&
                            <RenderNotifikasjonBoks
                                virksomhetsnavn={oppfolgingsdialog.virksomhetsnavn}
                                antallTiltakLagtTilAvArbeidsgiver={antallTiltakLagtTilAvArbeidsgiver}
                            />
                        }
                        {
                            <RenderOppfolgingsdialogTiltakTabell
                                ledetekster={ledetekster}
                                tiltakListe={oppfolgingsdialog.tiltakListe}
                                sendLagreTiltak={sendLagreTiltak}
                                sendSlettTiltak={sendSlettTiltak}
                                aktoerId={oppfolgingsdialog.sykmeldtAktoerId}
                            />
                        }
                        {
                            this.state.visTiltakSkjema ?
                                <LagreTiltakSkjema
                                    ledetekster={ledetekster}
                                    avbrytHref={`/sykefravaer/oppfolgingsplaner/${oppfolgingsdialogId}/tiltak`}
                                    sendLagre={sendLagreTiltak}
                                    avbryt={this.toggleTiltakSkjema}
                                /> :
                                <RenderTiltakKnapper toggleTiltakSkjema={this.toggleTiltakSkjema} />
                        }
                    </div>
                }
            </OppfolgingsdialogSide>
        );
    }
}

Tiltak.propTypes = {
    ledetekster: PropTypes.object,
    oppfolgingsdialog: PropTypes.object,
    oppfolgingsdialogId: PropTypes.string,
    sendLagreTiltak: PropTypes.func,
    sendSlettTiltak: PropTypes.func,
    tiltakLagret: PropTypes.bool,
};

export default Tiltak;
