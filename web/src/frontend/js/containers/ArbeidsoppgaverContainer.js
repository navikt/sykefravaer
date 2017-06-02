import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import { getOppfolgingsdialog, isEmpty } from '../utils/oppfolgingsdialogUtils';
import { hentOppfolgingsdialogerAt as hentOppfolgingsdialoger } from 'oppfolgingsdialog-npm';
import {
    lagreArbeidsoppgave,
    OppfolgingsdialogSide,
    OppfolgingsdialogOppgaveTabell,
    finnArbeidsoppgaverIkkeVurdertAvSykmeldt,
    NotifikasjonBoks,
} from 'oppfolgingsdialog-npm';
import { getLedetekst } from 'digisyfo-npm';
import { brodsmule as brodsmulePt } from '../propTypes';
import LagreArbeidsoppgaveSkjema from '../components/oppfolgingsdialoger/LagreArbeidsoppgaveSkjema';

export class ArbeidsoppgaverSide extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visArbeidsoppgaveSkjema: false,
        };
        this.toggleArbeidsoppgaveSkjema = this.toggleArbeidsoppgaveSkjema.bind(this);
        this.sendArbeidsoppgave = this.sendArbeidsoppgave.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.lagrer && this.props.lagret) {
            this.props.hentOppfolgingsdialoger();
        }
    }

    toggleArbeidsoppgaveSkjema() {
        this.setState({
            visArbeidsoppgaveSkjema: !this.state.visArbeidsoppgaveSkjema,
        });
    }

    sendArbeidsoppgave(values) {
        this.props.lagreArbeidsoppgave(this.props.oppfolgingsdialogId, values);
    }

    render() {
        const { brodsmuler, ledetekster, oppfolgingsdialog, oppfolgingsdialogId, henter, hentingFeilet, lagrer, lagringFeilet } = this.props;

        const antallIkkeVurderteArbeidsoppgaver = oppfolgingsdialog ? finnArbeidsoppgaverIkkeVurdertAvSykmeldt(oppfolgingsdialog.arbeidsoppgaveListe).length : 0;

        return (<Side tittel={getLedetekst('oppfolgingsdialog.sidetittel')} brodsmuler={brodsmuler}>
            { (() => {
                if (henter || lagrer) {
                    return <AppSpinner />;
                } else if (hentingFeilet || lagringFeilet) {
                    return (<Feilmelding />);
                }
                return (
                    <OppfolgingsdialogSide
                        brukernavn={oppfolgingsdialog.virksomhetsnavn}
                        ledetekster={ledetekster}
                        rootUrl={`/sykefravaer/oppfolgingsdialoger/${oppfolgingsdialogId}`}>
                        {
                            isEmpty(oppfolgingsdialog.arbeidsoppgaveListe) ?
                                <div>
                                    <h2>{getLedetekst('oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.tittel', ledetekster)}</h2>
                                    <LagreArbeidsoppgaveSkjema
                                        ledetekster={ledetekster}
                                        avbrytHref={`/sykefravaer/oppfolgingsdialoger/${oppfolgingsdialogId}`}
                                        sendArbeidsoppgave={this.sendArbeidsoppgave}
                                    />
                                </div>
                                :
                                <div>
                                    {
                                        antallIkkeVurderteArbeidsoppgaver > 0 &&
                                        <NotifikasjonBoks
                                            imgUrl={"/sykefravaer/img/svg/informasjonsboks.svg"}
                                            tekst={getLedetekst('oppfolgingsdialog.notifikasjonboks.ikke-vurderte-arbeidsoppgaver.tekst', {
                                                '%VIRKSOMHETSNAVN%': oppfolgingsdialog.virksomhetsnavn,
                                                '%ANTALLARBEIDSOPPGAVER%': antallIkkeVurderteArbeidsoppgaver,
                                            })}
                                        />
                                    }
                                    <OppfolgingsdialogOppgaveTabell
                                        arbeidsoppgaveListe={oppfolgingsdialog.arbeidsoppgaveListe}
                                        urlImgArrow="/sykefravaer/img/svg/arrow-down.svg"
                                        urlImgVarsel="/sykefravaer/img/svg/varseltrekant.svg"
                                    />
                                    {
                                        this.state.visArbeidsoppgaveSkjema ?
                                            <LagreArbeidsoppgaveSkjema
                                                ledetekster={ledetekster}
                                                avbrytHref={`/sykefravaer/oppfolgingsdialoger/${oppfolgingsdialogId}/arbeidsoppgaver`}
                                                sendArbeidsoppgave={this.sendArbeidsoppgave}
                                                cancel={this.toggleArbeidsoppgaveSkjema}
                                            /> :
                                            <div className="knapperad">
                                                <button
                                                    className="knapp knapp__opprettarbeidsoppgave"
                                                    onClick={this.toggleArbeidsoppgaveSkjema}>
                                                    {getLedetekst('oppfolgingsdialog.arbeidstaker.knapp.leggtil-arbeidsoppgave')}
                                                </button>
                                            </div>
                                    }
                                </div>
                        }
                    </OppfolgingsdialogSide>
                );
            })()
            }
        </Side>);
    }
}

ArbeidsoppgaverSide.propTypes = {
    dispatch: PropTypes.func,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    ledetekster: PropTypes.object,
    oppfolgingsdialog: PropTypes.object,
    oppfolgingsdialogId: PropTypes.string,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    lagrer: PropTypes.bool,
    lagret: PropTypes.bool,
    lagringFeilet: PropTypes.bool,
    lagreArbeidsoppgave: PropTypes.func,
    hentOppfolgingsdialoger: PropTypes.func,
};

export function mapStateToProps(state, ownProps) {
    const oppfolgingsdialogId = ownProps.params.oppfolgingsdialogId;
    const oppfolgingsdialog = getOppfolgingsdialog(state.oppfolgingsdialoger.data, oppfolgingsdialogId);
    const virksomhetsnavn = oppfolgingsdialog ? oppfolgingsdialog.virksomhetsnavn : '';

    return {
        ledetekster: state.ledetekster.data,
        henter: state.oppfolgingsdialoger.henter || state.ledetekster.henter,
        hentingFeilet: state.oppfolgingsdialoger.hentingFeilet || state.ledetekster.hentingFeilet,
        lagrer: state.arbeidsoppgaver.lagrer,
        lagret: state.arbeidsoppgaver.lagret,
        lagringFeilet: state.arbeidsoppgaver.lagringFeilet,
        oppfolgingsdialog,
        oppfolgingsdialogId,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('oppfolgingsdialoger.sidetittel'),
            sti: '/oppfolgingsdialoger',
            erKlikkbar: true,
        }, {
            tittel: virksomhetsnavn,
        }],
    };
}

const ArbeidsoppgaverContainer = connect(mapStateToProps, { lagreArbeidsoppgave, hentOppfolgingsdialoger })(ArbeidsoppgaverSide);

export default ArbeidsoppgaverContainer;
