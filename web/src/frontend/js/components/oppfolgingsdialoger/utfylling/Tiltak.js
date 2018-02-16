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
    STATUS_FEIL,
} from 'oppfolgingsdialog-npm';
import { getLedetekst, keyValue, scrollTo } from 'digisyfo-npm';
import { getContextRoot } from '../../../routers/paths';
import { isEmpty } from '../../../utils/oppfolgingsdialogUtils';
import AppSpinner from '../../AppSpinner';
import Feilmelding from '../../Feilmelding';

class Tiltak extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visTiltakSkjema: false,
            oppdatertTiltak: false,
            nyttTiltak: false,
        };
        this.sendLagreTiltak = this.sendLagreTiltak.bind(this);
        this.sendSlettTiltak = this.sendSlettTiltak.bind(this);
        this.sendLagreKommentar = this.sendLagreKommentar.bind(this);
        this.sendSlettKommentar = this.sendSlettKommentar.bind(this);
        this.toggleTiltakSkjema = this.toggleTiltakSkjema.bind(this);
        this.resetFeilmelding = this.resetFeilmelding.bind(this);
        this.setOppdateringStatus = this.setOppdateringStatus.bind(this);
    }

    componentWillMount() {
        window.location.hash = 'tiltak';
        window.sessionStorage.setItem('hash', 'tiltak');
    }

    setOppdateringStatus(type, tekst) {
        this.setState({
            feilType: type,
            feilTekst: tekst,
        });
    }

    componentWillReceiveProps(nextProps) {
         /* console.log("------------------this.props---", this.props);
         console.log("------------------nextProps---", nextProps);*/
        if((nextProps.tiltak.lagringFeilet && nextProps.tiltak.lagringFeilet != this.props.tiltak.lagringFeilet) ||
            (nextProps.tiltak.slettingFeilet && nextProps.tiltak.slettingFeilet != this.props.tiltak.slettingFeilet) ||
            (nextProps.kommentar.lagringFeilet && nextProps.kommentar.lagringFeilet != this.props.kommentar.lagringFeilet) ||
            (nextProps.kommentar.slettingFeilet && nextProps.kommentar.slettingFeilet != this.props.kommentar.slettingFeilet)) {
            console.log("------------------found---");

            const oppdatereTiltakFeilet = nextProps.tiltak.lagringFeilet && nextProps.tiltak.lagringFeilet != this.props.tiltak.lagringFeilet &&
                 nextProps.tiltak.feiletTiltakId > 0;

            const slettTiltakFeilet =  nextProps.tiltak.slettingFeilet && nextProps.tiltak.slettingFeilet != this.props.tiltak.slettingFeilet &&
                nextProps.tiltak.feiletTiltakId > 0;

            const lagNyTiltakFeilet =  nextProps.tiltak.lagringFeilet && nextProps.tiltak.lagringFeilet != this.props.tiltak.lagringFeilet && !nextProps.tiltak.feiletTiltakId;

            const slettKommentarFeilet =  nextProps.kommentar.slettingFeilet && nextProps.kommentar.slettingFeilet != this.props.kommentar.slettingFeilet &&
                nextProps.kommentar.feiletTiltakId > 0;

            const lageNyKommentarFeilet =  nextProps.kommentar.lagringFeilet && nextProps.kommentar.lagringFeilet != this.props.kommentar.lagringFeilet && nextProps.kommentar.feiletTiltakId > 0;

            let feilTekst;
            let feilType;
            switch (true) {
            case oppdatereTiltakFeilet:
                // feilTekst = getLedetekst('oppfolgingsdialog.arbeidstaker.arbeidsoppgave.vis.gjennomfoering.kan', ledetekster);
                feilTekst = "oppdatere Tiltak Feilet--";
                feilType = STATUS_FEIL.OPPDATERE_TILTAK_FEILET;
                this.setOppdateringStatus(feilType, feilTekst);
                break;
           case lagNyTiltakFeilet:
                feilTekst = "lagre ny Tiltak Feilet--";
                feilType = STATUS_FEIL.LAGRE_NY_TILTAK_FEILET;
                this.setOppdateringStatus(feilType, feilTekst);
                break;
            case slettTiltakFeilet:
                feilTekst = "Sletting tiltak feilet--";
                feilType = STATUS_FEIL.SLETT_TILTAK_FEILET;
                this.setOppdateringStatus(feilType, feilTekst);
                break;
            case lageNyKommentarFeilet:
                feilTekst = "lagre kommentar feilet--";
                feilType = STATUS_FEIL.LAGRE_KOMMENTAR_FEILET;
                this.setOppdateringStatus(feilType, feilTekst);
                break;

            case slettKommentarFeilet:
                feilTekst = "Sletting kommentar feilet--";
                feilType = STATUS_FEIL.SLETT_KOMMENTAR_FEILET;
                this.setOppdateringStatus(feilType, feilTekst);
                break;
            default:
                this.setOppdateringStatus("", "");
                break;
            }
          /*  console.log("tekst---------------------", feilTekst);
            console.log("feiltype", feilType);*/
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.visTiltakSkjema && this.state.visTiltakSkjema && this.lagreSkjema) {
            const form = findDOMNode(this.lagreSkjema);
            scrollTo(form, 300);
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

    resetFeilmelding() {
      this.setOppdateringStatus("", "");
    }


    render() {
        const {
            ledetekster,
            oppfolgingsdialog,
        } = this.props;
        const {
            lagrer,
            lagringFeilet,
            sletter,
            slettingFeilet,
        } = this.props.tiltak;

        return (
            (() => {
                if (lagrer || sletter) {
                    return <AppSpinner />;
                } /*else if (lagringFeilet || slettingFeilet) {
                    return (<Feilmelding />);
                }*/
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
                                        avbryt={this.toggleTiltakSkjema}
                                        fnr={oppfolgingsdialog.arbeidstaker.fnr}
                                        brukerType={BRUKERTYPE.ARBEIDSTAKER}
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
                                avbryt={this.toggleTiltakSkjema}
                                fnr={oppfolgingsdialog.arbeidstaker.fnr}
                                brukerType={BRUKERTYPE.ARBEIDSTAKER}
                                ref={(lagreSkjema) => {
                                    this.lagreSkjema = lagreSkjema;
                                }}
                            />
                        }
                        <TiltakTabell
                            ledetekster={ledetekster}
                            liste={sorterTiltakEtterNyeste(oppfolgingsdialog.tiltakListe)}
                            urlImgArrow={`${getContextRoot()}/img/svg/arrow-down.svg`}
                            urlImgVarsel={`${getContextRoot()}/img/svg/varseltrekant.svg`}
                            sendLagre={this.sendLagreTiltak}
                            sendSlett={this.sendSlettTiltak}
                            sendLagreKommentar={this.sendLagreKommentar}
                            sendSlettKommentar={this.sendSlettKommentar}
                            fnr={oppfolgingsdialog.arbeidstaker.fnr}
                            brukerType={BRUKERTYPE.ARBEIDSTAKER}
                            feilType={this.state.feilType}
                            feilTekst={this.state.feilTekst}
                            skjulFeilmelding={this.resetFeilmelding}
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
    kommentar: oppfolgingProptypes.kommentarReducerPt,
    lagreTiltak: PropTypes.func,
    slettTiltak: PropTypes.func,
    lagreKommentar: PropTypes.func,
    slettKommentar: PropTypes.func,
};

export default Tiltak;
