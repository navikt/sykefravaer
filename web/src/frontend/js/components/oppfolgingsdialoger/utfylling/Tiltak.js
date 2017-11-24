import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import {
    OppfolgingsdialogInfoboks,
    TiltakNotifikasjonBoksAdvarsel,
    NotifikasjonBoksLagretElement,
    LeggTilElementKnapper,
    LagreTiltakSkjema,
    OppfolgingsdialogTabell,
    BRUKERTYPE,
    captitalizeFirstLetter,
    proptypes as oppfolgingProptypes,
    TiltakSkjema,
    TiltakInfoboks,
    sorterTiltakEtterNyeste,
} from 'oppfolgingsdialog-npm';
import { getLedetekst, keyValue, scrollTo } from 'digisyfo-npm';
import { getContextRoot } from '../../../routers/paths';
import { isEmpty } from '../../../utils/oppfolgingsdialogUtils';
import AppSpinner from '../../AppSpinner';
import Feilmelding from '../../Feilmelding';

export const RenderOppfolgingsdialogTiltakTabell = (
    {
        ledetekster,
        tiltakListe,
        sendLagreTiltak,
        sendSlettTiltak,
        sendLagreKommentar,
        sendSlettKommentar,
        fnr,
    }) => {
    return (
        <OppfolgingsdialogTabell
            ledetekster={ledetekster}
            liste={tiltakListe}
            tabellType="tiltak"
            urlImgArrow={`${getContextRoot()}/img/svg/arrow-down.svg`}
            urlImgVarsel={`${getContextRoot()}/img/svg/varseltrekant.svg`}
            sendLagre={sendLagreTiltak}
            sendSlett={sendSlettTiltak}
            sendLagreKommentar={sendLagreKommentar}
            sendSlettKommentar={sendSlettKommentar}
            fnr={fnr}
            brukerType={BRUKERTYPE.ARBEIDSTAKER}
        />
    );
};
RenderOppfolgingsdialogTiltakTabell.propTypes = {
    ledetekster: keyValue,
    tiltakListe: PropTypes.arrayOf(oppfolgingProptypes.tiltakPt),
    sendLagreTiltak: PropTypes.func,
    sendSlettTiltak: PropTypes.func,
    sendLagreKommentar: PropTypes.func,
    sendSlettKommentar: PropTypes.func,
    fnr: PropTypes.string,
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
    ledetekster: keyValue,
    sendLagreTiltak: PropTypes.func,
    toggleTiltakSkjema: PropTypes.func,
};

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
    }

    componentWillMount() {
        window.location.hash = 'tiltak';
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
            tiltaknavn: captitalizeFirstLetter(values.tiltaknavn),
        };
        this.props.lagreTiltak(this.props.oppfolgingsdialog.id, nyeValues);
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

    render() {
        const {
            lagrer,
            lagret,
            sletter,
            lagringFeilet,
            slettingFeilet,
            ledetekster,
            oppfolgingsdialog,
            oppfolgingsdialogAvbrutt,
        } = this.props;

        const antallNyeTiltak = oppfolgingsdialog.tiltakListe.filter((tiltak) => {
            return tiltak.opprettetAv.fnr !== oppfolgingsdialog.arbeidstaker.fnr && new Date(tiltak.opprettetDato) > new Date(oppfolgingsdialog.arbeidstaker.sistInnlogget);
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
                                    svgUrl={`${getContextRoot()}/img/svg/tiltak-onboarding.svg`}
                                    svgAlt="nyttTiltak"
                                    tittel={getLedetekst('oppfolgingsdialog.arbeidstaker.onboarding.tiltak.tittel')}
                                    tekst={getLedetekst('oppfolgingsdialog.arbeidstaker.onboarding.tiltak.tekst')}
                                >
                                    <LeggTilElementKnapper
                                        ledetekster={ledetekster}
                                        visSkjema={this.state.visTiltakSkjema}
                                        toggleSkjema={this.toggleTiltakSkjema}
                                    />
                                </OppfolgingsdialogInfoboks> :
                                <TiltakSkjema
                                    ledetekster={ledetekster}
                                    sendLagre={this.sendLagreTiltak}
                                    avbryt={this.toggleTiltakSkjema}
                                    brukerType={BRUKERTYPE.ARBEIDSTAKER}
                                    fnr={oppfolgingsdialog.arbeidstaker.fnr}
                                    rootUrl={`${getContextRoot()}`}
                                />
                        }
                    </div>
                    :
                    <div>
                        <TiltakInfoboks
                            ledetekster={ledetekster}
                            visTiltakSkjema={this.state.visTiltakSkjema}
                            toggleSkjema={this.toggleTiltakSkjema}
                            brukerType={BRUKERTYPE.ARBEIDSTAKER}
                        />
                        {
                            this.state.visTiltakSkjema &&
                            <TiltakSkjema
                                ledetekster={ledetekster}
                                sendLagre={this.sendLagreTiltak}
                                avbryt={this.toggleTiltakSkjema}
                                fnr={oppfolgingsdialog.arbeidstaker.fnr}
                                rootUrl={`${getContextRoot()}`}
                                ref={(lagreSkjema) => {
                                    this.lagreSkjema = lagreSkjema;
                                }}
                                brukerType={BRUKERTYPE.ARBEIDSTAKER}
                            />
                        }
                        {
                            <RenderOppfolgingsdialogTiltakTabell
                                ledetekster={ledetekster}
                                tiltakListe={sorterTiltakEtterNyeste(oppfolgingsdialog.tiltakListe)}
                                sendLagreTiltak={this.sendLagreTiltak}
                                sendSlettTiltak={this.sendSlettTiltak}
                                fnr={oppfolgingsdialog.arbeidstaker.fnr}
                                rootUrl={`${getContextRoot()}`}
                                sendLagreKommentar={this.sendLagreKommentar}
                                sendSlettKommentar={this.sendSlettKommentar}
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
    sletter: PropTypes.bool,
    lagringFeilet: PropTypes.bool,
    slettingFeilet: PropTypes.bool,
    ledetekster: keyValue,
    oppfolgingsdialog: oppfolgingProptypes.oppfolgingsdialogPt,
    oppfolgingsdialogAvbrutt: PropTypes.bool,
    lagreTiltak: PropTypes.func,
    slettTiltak: PropTypes.func,
    lagreKommentar: PropTypes.func,
    slettKommentar: PropTypes.func,
};

export default Tiltak;
