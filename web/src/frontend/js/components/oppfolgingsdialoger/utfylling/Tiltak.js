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
    finnTiltakIkkeLagtTilAvAktoer,
    BRUKERTYPE,
    input2RSTiltak,
    erTiltaketOpprettet,
    sorterTiltakEtterOpprettet,
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
            tiltak: [],
            lagretTiltak: {},
            slettetId: 0,
            visTiltakSkjema: false,
            tiltakOpprettet: false,
        };
        this.lagreTiltak = this.lagreTiltak.bind(this);
        this.slettTiltak = this.slettTiltak.bind(this);
        this.sendLagreTiltak = this.sendLagreTiltak.bind(this);
        this.sendSlettTiltak = this.sendSlettTiltak.bind(this);
        this.toggleTiltakSkjema = this.toggleTiltakSkjema.bind(this);
    }

    componentWillMount() {
        if (this.props.oppfolgingsdialogerHentet) {
            this.setState({
                tiltak: sorterTiltakEtterOpprettet(this.props.oppfolgingsdialog.tiltakListe),
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.lagrer && nextProps.lagret) {
            this.lagreTiltak(nextProps.lagretId);
        } else if (this.props.sletter && nextProps.slettet) {
            this.slettTiltak();
        }
    }


    componentDidUpdate(prevProps, prevState) {
        if (!prevState.visTiltakSkjema && this.state.visTiltakSkjema && this.lagreSkjema) {
            const form = findDOMNode(this.lagreSkjema);
            scrollTo(form, form.getBoundingClientRect().bottom);
        }
    }

    lagreTiltak(lagretId) {
        const nyttTiltak = Object.assign({}, this.state.lagretTiltak);
        nyttTiltak.tiltakId = lagretId;
        const nyTiltakListe = [...this.state.tiltak];

        if (erTiltaketOpprettet(this.state.tiltak, nyttTiltak)) {
            const index = nyTiltakListe.findIndex((tiltak) => {
                return tiltak.tiltakId === lagretId;
            });
            nyTiltakListe[index] = nyttTiltak;
            this.setState({
                tiltak: sorterTiltakEtterOpprettet(nyTiltakListe),
                visTiltakSkjema: false,
                tiltakOpprettet: false,
            });
        } else {
            this.setState({
                tiltak: sorterTiltakEtterOpprettet(nyTiltakListe.concat([nyttTiltak])),
                visTiltakSkjema: false,
                tiltakOpprettet: true,
            });
        }
    }

    slettTiltak() {
        if (this.state.slettetId > 0) {
            const nyTiltakListe = this.state.tiltak.filter((tiltak) => {
                return tiltak.tiltakId !== this.state.slettetId;
            });
            this.setState({
                tiltak: nyTiltakListe,
                visTiltakSkjema: false,
            });
        }
    }

    sendLagreTiltak(values) {
        this.props.lagreTiltak(this.props.oppfolgingsdialogId, values);
        const tiltak = input2RSTiltak(values);
        tiltak.opprettetAvAktoerId = this.props.oppfolgingsdialog.arbeidstaker.aktoerId;
        tiltak.opprettetDato = Date.now();
        tiltak.opprettetAv = {
            aktoerId: this.props.oppfolgingsdialog.arbeidstaker.aktoerId,
            navn: this.props.oppfolgingsdialog.arbeidstaker.navn,
        };
        this.setState({
            lagretTiltak: tiltak,
        });
    }
    sendSlettTiltak(tiltakId) {
        this.props.slettTiltak(tiltakId);
        this.setState({
            slettetId: tiltakId,
        });
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

        const antallTiltakLagtTilAvArbeidsgiver = finnTiltakIkkeLagtTilAvAktoer(oppfolgingsdialog.arbeidstaker.aktoerId, oppfolgingsdialog.tiltakListe).length;

        return (
            (() => {
                if (lagrer || sletter) {
                    return <AppSpinner />;
                } else if (lagringFeilet || slettingFeilet) {
                    return (<Feilmelding />);
                }
                return isEmpty(this.state.tiltak) ?
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
                            lagret && !this.state.tiltakOpprettet && <RenderNotifikasjonBoksSuksess
                                tekst={getLedetekst('oppfolgingsdialog.notifikasjonboks.lagret-tiltak.tekst')}
                            />
                        }
                        {
                            lagret && this.state.tiltakOpprettet && <RenderNotifikasjonBoksSuksess
                                tekst={getLedetekst('oppfolgingsdialog.notifikasjonboks.opprettet-tiltak.tekst')}
                            />
                        }
                        {
                            antallTiltakLagtTilAvArbeidsgiver > 0 &&
                            <RenderNotifikasjonBoks
                                motpartnavn={oppfolgingsdialog.arbeidsgiver.navn}
                                antallTiltakLagtTilAvArbeidsgiver={antallTiltakLagtTilAvArbeidsgiver}
                            />
                        }
                        {
                            <RenderOppfolgingsdialogTiltakTabell
                                ledetekster={ledetekster}
                                tiltakListe={this.state.tiltak}
                                sendLagreTiltak={this.sendLagreTiltak}
                                sendSlettTiltak={this.sendSlettTiltak}
                                aktoerId={oppfolgingsdialog.sykmeldtAktoerId}
                                arbeidstaker={oppfolgingsdialog.arbeidstaker}
                            />
                        }
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
