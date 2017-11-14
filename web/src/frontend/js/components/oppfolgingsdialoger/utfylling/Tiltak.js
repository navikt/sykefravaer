import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import {
    OppfolgingsdialogInfoboks,
    TiltakNotifikasjonBoksAdvarsel,
    NotifikasjonBoksLagretElement,
    OppfolgingsdialogTabell,
    LeggTilElementKnapper,
    LagreTiltakSkjema,
    BRUKERTYPE,
    captitalizeFirstLetter,
    proptypes as oppfolgingProptypes,
} from 'oppfolgingsdialog-npm';
import { getLedetekst, keyValue, scrollTo } from 'digisyfo-npm';
import { getContextRoot } from '../../../routers/paths';
import { isEmpty } from '../../../utils/oppfolgingsdialogUtils';
import AppSpinner from '../../AppSpinner';
import Feilmelding from '../../Feilmelding';

export const RenderOppfolgingsdialogTiltakTabell = ({ ledetekster, tiltakListe, sendLagreTiltak, sendSlettTiltak, fnr }) => {
    return (
        <OppfolgingsdialogTabell
            ledetekster={ledetekster}
            liste={tiltakListe}
            tabellType="tiltak"
            urlImgArrow={`${getContextRoot()}/img/svg/arrow-down.svg`}
            urlImgVarsel={`${getContextRoot()}/img/svg/varseltrekant.svg`}
            sendLagre={sendLagreTiltak}
            sendSlett={sendSlettTiltak}
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
        const nyeValues = Object.assign({}, values, {
            tiltaknavn: captitalizeFirstLetter(values.tiltaknavn),
        });
        this.props.lagreTiltak(this.props.oppfolgingsdialog.id, nyeValues);
    }

    sendSlettTiltak(tiltakId) {
        this.props.slettTiltak(this.props.oppfolgingsdialog.id, tiltakId);
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
                                <RenderOpprettTiltak
                                    ledetekster={ledetekster}
                                    sendLagreTiltak={this.sendLagreTiltak}
                                    toggleTiltakSkjema={this.toggleTiltakSkjema}
                                />
                        }
                    </div>
                    :
                    <div>
                        <h2>{getLedetekst('oppfolgingsdialog.arbeidstaker.tiltak.opprett.tittel')}</h2>
                        {
                            lagret && this.state.oppdatertTiltak && <NotifikasjonBoksLagretElement
                                tekst={getLedetekst('oppfolgingsdialog.notifikasjonboks.lagret-tiltak.tekst')}
                                rootUrl={`${getContextRoot()}`}
                            />
                        }
                        {
                            lagret && this.state.nyttTiltak && <NotifikasjonBoksLagretElement
                                tekst={getLedetekst('oppfolgingsdialog.notifikasjonboks.opprettet-tiltak.tekst')}
                                rootUrl={`${getContextRoot()}`}
                            />
                        }
                        {
                            antallNyeTiltak > 0 && !oppfolgingsdialogAvbrutt && <TiltakNotifikasjonBoksAdvarsel
                                ledetekster={ledetekster}
                                motpartnavn={'Lederen din'}
                                antallTiltakLagtTilAvMotpart={antallNyeTiltak}
                                rootUrl={`${getContextRoot()}`}
                            />
                        }
                        <RenderOppfolgingsdialogTiltakTabell
                            ledetekster={ledetekster}
                            tiltakListe={oppfolgingsdialog.tiltakListe}
                            sendLagreTiltak={this.sendLagreTiltak}
                            sendSlettTiltak={this.sendSlettTiltak}
                            fnr={oppfolgingsdialog.arbeidstaker.fnr}
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
                                <LeggTilElementKnapper
                                    ledetekster={ledetekster}
                                    visSkjema={this.state.visTiltakSkjema}
                                    toggleSkjema={this.toggleTiltakSkjema}
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
};

export default Tiltak;
