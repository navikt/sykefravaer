import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { isEmpty } from '../../utils/oppfolgingsdialogUtils';
import AppSpinner from '../../components/AppSpinner';
import Feilmelding from '../../components/Feilmelding';
import {
    OppfolgingsdialogSide,
    OppfolgingsdialogInfoboks,
    NotifikasjonBoks,
    OppfolgingsdialogTabell,
    LagreTiltakSkjema,
    finnTiltakIkkeLagtTilAvAktoer,
    BRUKERTYPE,
    OppfolgingsdialogFooter,
    SIDETYPE,
} from 'oppfolgingsdialog-npm';
import { getLedetekst } from 'digisyfo-npm';
import history from '../../history';

export const RenderNotifikasjonBoks = ({ motpartnavn, antallTiltakLagtTilAvArbeidsgiver }) => {
    return (<NotifikasjonBoks
        imgUrl={`${window.APP_SETTINGS.APP_ROOT}/img/svg/notifikasjon-illustrasjon.svg`}
        tekst={getLedetekst('oppfolgingsdialog.notifikasjonboks.tiltak-lagt-til-av-motpart.tekst', {
            '%MOTPARTNAVN%': motpartnavn,
            '%ANTALLTILTAK%': antallTiltakLagtTilAvArbeidsgiver.toString(),
        })}
        classNames={'panel--advarsel'}
    />);
};
RenderNotifikasjonBoks.propTypes = {
    motpartnavn: PropTypes.string,
    antallTiltakLagtTilAvArbeidsgiver: PropTypes.number,
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

export const RenderOppfolgingsdialogTiltakTabell = ({ ledetekster, tiltakListe, sendLagreTiltak, sendSlettTiltak, aktoerId }) => {
    return (
        <OppfolgingsdialogTabell
            ledetekster={ledetekster}
            liste={tiltakListe}
            tabellType="tiltak"
            urlImgArrow={`${window.APP_SETTINGS.APP_ROOT}/img/svg/arrow-down.svg`}
            urlImgVarsel={`${window.APP_SETTINGS.APP_ROOT}/img/svg/varseltrekant.svg`}
            sendLagre={sendLagreTiltak}
            sendSlett={sendSlettTiltak}
            aktoerId={aktoerId}
            brukerType={BRUKERTYPE.ARBEIDSTAKER}
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

export const RenderOpprettTiltak = ({ ledetekster, sendLagreTiltak, toggleTiltakSkjema }) => {
    return (<div>
        <h2>{getLedetekst('oppfolgingsdialog.arbeidstaker.tiltak.opprett.tittel')}</h2>
        <LagreTiltakSkjema
            ledetekster={ledetekster}
            sendLagre={sendLagreTiltak}
            avbryt={toggleTiltakSkjema}
        />
    </div>);
};
RenderOpprettTiltak.propTypes = {
    ledetekster: PropTypes.object,
    sendLagreTiltak: PropTypes.func,
    toggleTiltakSkjema: PropTypes.func,
};

export class Tiltak extends Component {

    componentDidUpdate(prevProps) {
        if (!prevProps.visTiltakSkjema && this.props.visTiltakSkjema && this.lagreSkjema) {
            const form = findDOMNode(this.lagreSkjema);
            scrollTo(form, form.getBoundingClientRect().bottom);
        }
    }

    render() {
        const {
            lagrer,
            sletter,
            lagringFeilet,
            slettingFeilet,
            ledetekster,
            tiltakListe,
            oppfolgingsdialog,
            oppfolgingsdialogId,
            sendLagreTiltak,
            sendSlettTiltak,
            tiltakLagret,
            toggleTiltakSkjema,
            visTiltakSkjema,
            tiltakOpprettet,
        } = this.props;

        const antallTiltakLagtTilAvArbeidsgiver = finnTiltakIkkeLagtTilAvAktoer(oppfolgingsdialog.arbeidstaker.aktoerId, oppfolgingsdialog.tiltakListe).length;

        return (
            <OppfolgingsdialogSide
                brukernavn={oppfolgingsdialog.virksomhetsnavn}
                oppfolgingsdialog={oppfolgingsdialog}
                aktivUrl={history.getCurrentLocation().pathname}
                ledetekster={ledetekster}
                rootUrl={`${window.APP_SETTINGS.APP_ROOT}/oppfolgingsplaner/${oppfolgingsdialogId}`}>
                { (() => {
                    if (lagrer || sletter) {
                        return <AppSpinner />;
                    } else if (lagringFeilet || slettingFeilet) {
                        return (<Feilmelding />);
                    }
                    return isEmpty(tiltakListe) ?
                        <div>
                            {
                                !visTiltakSkjema ?
                                    <OppfolgingsdialogInfoboks
                                        svgUrl={`${window.APP_SETTINGS.APP_ROOT}/img/svg/tiltak-onboarding.svg`}
                                        svgAlt="nyttTiltak"
                                        tittel={getLedetekst('oppfolgingsdialog.arbeidstaker.onboarding.tiltak.tittel')}
                                        tekst={getLedetekst('oppfolgingsdialog.arbeidstaker.onboarding.tiltak.tekst')}
                                    >
                                        <RenderTiltakKnapper toggleTiltakSkjema={toggleTiltakSkjema} />
                                    </OppfolgingsdialogInfoboks> :
                                    <RenderOpprettTiltak
                                        ledetekster={ledetekster}
                                        oppfolgingsdialogId={oppfolgingsdialogId}
                                        sendLagreTiltak={sendLagreTiltak}
                                        toggleTiltakSkjema={toggleTiltakSkjema}
                                    />
                            }

                        </div>
                        :
                        <div>
                            <h2>{getLedetekst('oppfolgingsdialog.arbeidstaker.tiltak.opprett.tittel')}</h2>
                            {
                                tiltakLagret && !tiltakOpprettet && <RenderNotifikasjonBoksSuksess
                                    tekst={getLedetekst('oppfolgingsdialog.notifikasjonboks.lagret-tiltak.tekst')}
                                />
                            }
                            {
                                tiltakLagret && tiltakOpprettet && <RenderNotifikasjonBoksSuksess
                                    tekst={getLedetekst('oppfolgingsdialog.notifikasjonboks.opprettet-tiltak.tekst')}
                                />
                            }
                            {
                                antallTiltakLagtTilAvArbeidsgiver > 0 &&
                                <RenderNotifikasjonBoks
                                    motpartnavn={oppfolgingsdialog.virksomhetsnavn}
                                    antallTiltakLagtTilAvArbeidsgiver={antallTiltakLagtTilAvArbeidsgiver}
                                />
                            }
                            {
                                <RenderOppfolgingsdialogTiltakTabell
                                    ledetekster={ledetekster}
                                    tiltakListe={tiltakListe}
                                    sendLagreTiltak={sendLagreTiltak}
                                    sendSlettTiltak={sendSlettTiltak}
                                    aktoerId={oppfolgingsdialog.sykmeldtAktoerId}
                                    arbeidstaker={oppfolgingsdialog.arbeidstaker}
                                />
                            }
                            {
                                visTiltakSkjema ?
                                    <LagreTiltakSkjema
                                        ledetekster={ledetekster}
                                        sendLagre={sendLagreTiltak}
                                        avbryt={toggleTiltakSkjema}
                                        ref={(lagreSkjema) => { this.lagreSkjema = lagreSkjema; }}
                                    /> :
                                    <RenderTiltakKnapper toggleTiltakSkjema={toggleTiltakSkjema} />
                            }
                        </div>;
                })()
                }
                <OppfolgingsdialogFooter
                    ledetekster={ledetekster}
                    oppfolgingsdialog={oppfolgingsdialog}
                    sideType={SIDETYPE.TILTAK}
                    rootUrl={`${window.APP_SETTINGS.APP_ROOT}/oppfolgingsplaner/${oppfolgingsdialogId}`}
                />
            </OppfolgingsdialogSide>
        );
    }
}

Tiltak.propTypes = {
    lagrer: PropTypes.bool,
    sletter: PropTypes.bool,
    lagringFeilet: PropTypes.bool,
    slettingFeilet: PropTypes.bool,
    ledetekster: PropTypes.object,
    tiltakListe: PropTypes.array,
    oppfolgingsdialog: PropTypes.object,
    oppfolgingsdialogId: PropTypes.string,
    toggleTiltakSkjema: PropTypes.func,
    visTiltakSkjema: PropTypes.bool,
    sendLagreTiltak: PropTypes.func,
    sendSlettTiltak: PropTypes.func,
    tiltakLagret: PropTypes.bool,
    tiltakOpprettet: PropTypes.bool,
};

export default Tiltak;
