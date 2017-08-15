import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { isEmpty } from '../../../utils/oppfolgingsdialogUtils';
import AppSpinner from '../../AppSpinner';
import Feilmelding from '../../Feilmelding';
import {
    OppfolgingsdialogInfoboks,
    NotifikasjonBoks,
    OppfolgingsdialogTabell,
    LagreTiltakSkjema,
    BRUKERTYPE,
} from 'oppfolgingsdialog-npm';
import { getLedetekst } from 'digisyfo-npm';

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

export const RenderTiltakKnapper = ({ visTiltakSkjema, toggleTiltakSkjema }) => {
    return (
        <div className="knapperad">
            <button
                className="knapp knapperad__element"
                aria-pressed={visTiltakSkjema}
                onClick={toggleTiltakSkjema}>
                {getLedetekst('oppfolgingsdialog.arbeidstaker.knapp.leggtil-tiltak')}
            </button>
        </div>
    );
};
RenderTiltakKnapper.propTypes = {
    visTiltakSkjema: PropTypes.bool,
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

    constructor(props) {
        super(props);
        this.state = {
            visTiltakSkjema: false,
            oppdatertTiltak: false,
            nyttTiltak: false,
        };
        this.sendLagreTiltak = this.sendLagreTiltak.bind(this);
        this.sendSlettTiltak = this.sendSlettTiltak.bind(this);
        this.toggleTiltakSkjema = this.toggleTiltakSkjema.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.visTiltakSkjema && this.state.visTiltakSkjema && this.lagreSkjema) {
            const form = findDOMNode(this.lagreSkjema);
            scrollTo(form, form.getBoundingClientRect().bottom);
        }
    }

    sendLagreTiltak(values) {
        if (!values.tiltakId) {
            this.state.nyttTiltak = true;
            this.state.oppdatertTiltak = false;
        } else {
            this.state.nyttTiltak = false;
            this.state.oppdatertTiltak = true;
        }
        this.props.lagreTiltak(this.props.oppfolgingsdialogId, values);
    }

    sendSlettTiltak(tiltakId) {
        this.props.slettTiltak(this.props.oppfolgingsdialogId, tiltakId);
    }

    toggleTiltakSkjema() {
        this.setState({
            visTiltakSkjema: !this.state.visTiltakSkjema,
        });
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
        } = this.props;

        const antallNyeTiltak = oppfolgingsdialog.tiltakListe.filter((tiltak) => {
            return tiltak.opprettetAv.aktoerId !== oppfolgingsdialog.arbeidstaker.aktoerId && new Date(tiltak.opprettetDato) > new Date(oppfolgingsdialog.arbeidstaker.sistInnlogget);
        }).length;

        return (
            (() => {
                if (lagrer || sletter) {
                    return <AppSpinner />;
                } else if (lagringFeilet || slettingFeilet) {
                    return (<Feilmelding />);
                }
                return isEmpty(oppfolgingsdialog.tiltakListe) ?
                    <div>
                        {
                            !this.state.visTiltakSkjema ?
                                <OppfolgingsdialogInfoboks
                                    svgUrl={`${window.APP_SETTINGS.APP_ROOT}/img/svg/tiltak-onboarding.svg`}
                                    svgAlt="nyttTiltak"
                                    tittel={getLedetekst('oppfolgingsdialog.arbeidstaker.onboarding.tiltak.tittel')}
                                    tekst={getLedetekst('oppfolgingsdialog.arbeidstaker.onboarding.tiltak.tekst')}
                                >
                                    <RenderTiltakKnapper toggleTiltakSkjema={this.toggleTiltakSkjema} />
                                </OppfolgingsdialogInfoboks> :
                                <RenderOpprettTiltak
                                    ledetekster={ledetekster}
                                    oppfolgingsdialogId={oppfolgingsdialogId}
                                    sendLagreTiltak={this.sendLagreTiltak}
                                    toggleTiltakSkjema={this.toggleTiltakSkjema}
                                />
                        }

                    </div>
                    :
                    <div>
                        <h2>{getLedetekst('oppfolgingsdialog.arbeidstaker.tiltak.opprett.tittel')}</h2>
                        {
                            lagret && this.state.oppdatertTiltak && <RenderNotifikasjonBoksSuksess
                                tekst={getLedetekst('oppfolgingsdialog.notifikasjonboks.lagret-tiltak.tekst')}
                            />
                        }
                        {
                            lagret && this.state.nyttTiltak && <RenderNotifikasjonBoksSuksess
                                tekst={getLedetekst('oppfolgingsdialog.notifikasjonboks.opprettet-tiltak.tekst')}
                            />
                        }
                        {
                            antallNyeTiltak > 0 &&
                            <RenderNotifikasjonBoks
                                motpartnavn={oppfolgingsdialog.arbeidsgiver.navn}
                                antallTiltakLagtTilAvArbeidsgiver={antallNyeTiltak}
                            />
                        }
                        <RenderOppfolgingsdialogTiltakTabell
                            ledetekster={ledetekster}
                            tiltakListe={oppfolgingsdialog.tiltakListe}
                            sendLagreTiltak={this.sendLagreTiltak}
                            sendSlettTiltak={this.sendSlettTiltak}
                            aktoerId={oppfolgingsdialog.arbeidstaker.aktoerId}
                            arbeidstaker={oppfolgingsdialog.arbeidstaker}
                        />
                        {
                            this.state.visTiltakSkjema ?
                                <LagreTiltakSkjema
                                    ledetekster={ledetekster}
                                    sendLagre={this.sendLagreTiltak}
                                    avbryt={this.toggleTiltakSkjema}
                                    ref={(lagreSkjema) => { this.lagreSkjema = lagreSkjema; }}
                                /> :
                                <RenderTiltakKnapper
                                    visTiltakSkjema={this.state.visTiltakSkjema}
                                    toggleTiltakSkjema={this.toggleTiltakSkjema}
                                />
                        }
                    </div>;
            })()
        );
    }
}

Tiltak.propTypes = {
    lagrer: PropTypes.bool,
    lagret: PropTypes.bool,
    lagretId: PropTypes.number,
    sletter: PropTypes.bool,
    slettet: PropTypes.bool,
    lagringFeilet: PropTypes.bool,
    slettingFeilet: PropTypes.bool,
    oppfolgingsdialogerHentet: PropTypes.bool,
    ledetekster: PropTypes.object,
    oppfolgingsdialog: PropTypes.object,
    oppfolgingsdialogId: PropTypes.string,
    lagreTiltak: PropTypes.func,
    slettTiltak: PropTypes.func,
    tiltakOpprettet: PropTypes.bool,
};

export default Tiltak;
