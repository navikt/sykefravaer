import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import {
    OppfolgingsdialogInfoboks,
    LeggTilElementKnapper,
    TiltakTabell,
    BRUKERTYPE,
    captitalizeFirstLetter,
    proptypes as oppfolgingProptypes,
    TiltakSkjema,
    TiltakInfoboks,
    sorterTiltakEtterNyeste,
    STATUS_TILTAK,
} from 'oppfolgingsdialog-npm';
import { getLedetekst, keyValue, scrollTo } from 'digisyfo-npm';
import { getContextRoot } from '../../../routers/paths';
import { isEmpty } from '../../../utils/oppfolgingsdialogUtils';

class Tiltak extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visTiltakSkjema: false,
            oppdatertTiltak: false,
            nyttTiltak: false,
            lagreNyTiltakFeilet: false,
            varselTekst: '',
            oppdaterTiltakFeilet: false,
        };
        this.sendLagreTiltak = this.sendLagreTiltak.bind(this);
        this.sendSlettTiltak = this.sendSlettTiltak.bind(this);
        this.sendLagreKommentar = this.sendLagreKommentar.bind(this);
        this.sendSlettKommentar = this.sendSlettKommentar.bind(this);
        this.toggleTiltakSkjema = this.toggleTiltakSkjema.bind(this);
        this.visOppdateringFeilet = this.visOppdateringFeilet.bind(this);
        this.skjulSkjema = this.skjulSkjema.bind(this);
    }

    componentWillMount() {
        window.location.hash = 'tiltak';
        window.sessionStorage.setItem('hash', 'tiltak');
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.tiltak.feiletTiltakId && nextProps.tiltak.lagringFeilet && this.props.tiltak.lagringFeilet !== nextProps.tiltak.lagringFeilet) {
            this.setState({
                lagreNyTiltakFeilet: true,
                visTiltakSkjema: true,
                varselTekst: getLedetekst('oppfolgingsdialog.oppdatering.feilmelding', this.props.ledetekster),
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.visTiltakSkjema && this.state.visTiltakSkjema && this.lagreSkjema) {
            const form = findDOMNode(this.lagreSkjema);
            scrollTo(form, 300);
        }
    }

    visOppdateringFeilet(feilet) {
        this.setState({
            oppdaterTiltakFeilet: feilet,
            lagreNyTiltakFeilet: false,
        });
    }

    sendLagreTiltak(values) {
        if (!values.tiltakId) {
            this.state.nyttTiltak = true;
            this.state.oppdatertTiltak = false;
        } else {
            this.state.nyttTiltak = false;
            this.state.oppdatertTiltak = true;
        }
        const nyeValues = {
            ...values,
            status: STATUS_TILTAK.FORSLAG,
            tiltaknavn: captitalizeFirstLetter(values.tiltaknavn),
        };
        this.props.lagreTiltak(this.props.oppfolgingsdialog.id, nyeValues);
        this.setState({
            visTiltakSkjema: false,
        });
    }

    sendSlettTiltak(tiltakId) {
        this.props.slettTiltak(this.props.oppfolgingsdialog.id, tiltakId);
        this.setState({
            sjekkLargingFeil: true,
        });
    }

    sendLagreKommentar(tiltakId, values) {
        this.props.lagreKommentar(this.props.oppfolgingsdialog.id, tiltakId, values);
    }

    sendSlettKommentar(tiltakId, kommentarId) {
        this.props.slettKommentar(this.props.oppfolgingsdialog.id, tiltakId, kommentarId);
    }

    toggleTiltakSkjema() {
        this.setState({
            visTiltakSkjema: !this.state.visTiltakSkjema,
        });
    }

    skjulSkjema() {
        this.setState({
            visTiltakSkjema: false,
            lagreNyTiltakFeilet: false,
        });
    }

    render() {
        const {
            ledetekster,
            oppfolgingsdialog,
            tiltak,
        } = this.props;
        return (
            (() => {
                return isEmpty(oppfolgingsdialog.tiltakListe) ?
                    <div>
                        {
                            !this.state.visTiltakSkjema ?
                                <OppfolgingsdialogInfoboks
                                    svgUrl={`${getContextRoot()}/img/svg/tiltak-onboarding.svg`}
                                    svgAlt="nyttTiltak"
                                    tittel={getLedetekst('oppfolgingsdialog.arbeidstaker.onboarding.tiltak.tittel')}
                                    tekst={getLedetekst('oppfolgingsdialog.arbeidstaker.onboarding.tiltak.tekst')}
                                    feilType={this.state.feilType}
                                    feilTekst={this.state.feilTekst}
                                >
                                    <LeggTilElementKnapper
                                        ledetekster={ledetekster}
                                        visSkjema={this.state.visTiltakSkjema}
                                        toggleSkjema={this.toggleTiltakSkjema}
                                    />
                                </OppfolgingsdialogInfoboks>
                                :
                                <div>
                                    <TiltakInfoboks
                                        ledetekster={ledetekster}
                                        visTiltakSkjema={this.state.visTiltakSkjema}
                                        toggleSkjema={this.toggleTiltakSkjema}
                                        tittel={getLedetekst('oppfolgingsdialog.tiltak.arbeidstaker.tittel')}
                                        feilTekst={this.state.feilTekst}
                                    />
                                    <TiltakSkjema
                                        ledetekster={ledetekster}
                                        sendLagre={this.sendLagreTiltak}
                                        avbryt={this.skjulSkjema}
                                        fnr={oppfolgingsdialog.arbeidstaker.fnr}
                                        brukerType={BRUKERTYPE.ARBEIDSTAKER}
                                        varselTekst={this.state.varselTekst}
                                        oppdateringFeilet={this.state.lagreNyTiltakFeilet}
                                        rootUrlImg={`${getContextRoot()}`}
                                        tiltakReducer={tiltak}
                                    />
                                </div>

                        }
                    </div>
                    :
                    <div>
                        <TiltakInfoboks
                            ledetekster={ledetekster}
                            visTiltakSkjema={this.state.visTiltakSkjema}
                            toggleSkjema={this.toggleTiltakSkjema}
                            tittel={getLedetekst('oppfolgingsdialog.tiltak.arbeidstaker.tittel')}
                            feilTekst={this.state.feilTekst}
                            feilType={this.state.feilType}
                        />
                        {
                            this.state.visTiltakSkjema &&
                            <TiltakSkjema
                                ledetekster={ledetekster}
                                sendLagre={this.sendLagreTiltak}
                                avbryt={this.skjulSkjema}
                                fnr={oppfolgingsdialog.arbeidstaker.fnr}
                                brukerType={BRUKERTYPE.ARBEIDSTAKER}
                                ref={(lagreSkjema) => {
                                    this.lagreSkjema = lagreSkjema;
                                }}
                                varselTekst={this.state.varselTekst}
                                oppdateringFeilet={this.state.lagreNyTiltakFeilet}
                                rootUrlImg={`${getContextRoot()}`}
                                tiltakReducer={tiltak}
                            />
                        }
                        <TiltakTabell
                            ledetekster={ledetekster}
                            liste={sorterTiltakEtterNyeste(oppfolgingsdialog.tiltakListe)}
                            urlImgVarsel={`${getContextRoot()}/img/svg/varseltrekant.svg`}
                            sendLagre={this.sendLagreTiltak}
                            sendSlett={this.sendSlettTiltak}
                            sendLagreKommentar={this.sendLagreKommentar}
                            sendSlettKommentar={this.sendSlettKommentar}
                            fnr={oppfolgingsdialog.arbeidstaker.fnr}
                            brukerType={BRUKERTYPE.ARBEIDSTAKER}
                            visFeilMelding={this.visOppdateringFeilet}
                            feilMelding={this.state.oppdaterTiltakFeilet}
                            rootUrlImg={`${getContextRoot()}`}
                        />
                    </div>;
            })()
        );
    }
}

Tiltak.propTypes = {
    ledetekster: keyValue,
    tiltak: oppfolgingProptypes.tiltakReducerPt,
    oppfolgingsdialog: oppfolgingProptypes.oppfolgingsdialogPt,
    lagreTiltak: PropTypes.func,
    slettTiltak: PropTypes.func,
    lagreKommentar: PropTypes.func,
    slettKommentar: PropTypes.func,
};

export default Tiltak;
