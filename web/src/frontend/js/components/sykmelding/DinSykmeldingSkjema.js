import React, { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';
import VelgArbeidssituasjonContainer from '../../containers/VelgArbeidssituasjonContainer';
import VelgArbeidsgiverContainer from '../../containers/VelgArbeidsgiverContainer';
import ArbeidsgiversSykmeldingContainer from '../../containers/ArbeidsgiversSykmeldingContainer';
import Varselstripe from '../../components/Varselstripe';
import ErOpplysningeneRiktige from './ErOpplysningeneRiktige';
import StrengtFortroligInfo from './StrengtFortroligInfo';

class DinSykmeldingSkjema extends Component {

    constructor(props) {
        super(props);
        this.state = {
            forsoktSendt: false,
        };
    }

    gaTilKvittering() {
        browserHistory.push(`/sykefravaer/sykmeldinger/${this.props.sykmelding.id}/kvittering`);
    }

    bekreft(sykmelding) {
        this.props.bekreftSykmelding(sykmelding.id, sykmelding.arbeidssituasjon).then((respons) => {
            if (respons.status > 400) {
                this.setState({
                    forsoktBekreftet: true,
                    serverfeil: true,
                });
            } else {
                this.gaTilKvittering();
            }
        });
    }

    send(sykmelding) {
        this.props.sendSykmeldingTilArbeidsgiver(sykmelding.id, sykmelding.valgtArbeidsgiver.orgnummer).then((respons) => {
            if (respons.status > 400) {
                this.setState({
                    forsoktSendt: true,
                    serverfeil: true,
                });
            } else {
                this.gaTilKvittering();
            }
        });
    }

    harValgtAnnenArbeidsgiver() {
        const { sykmelding } = this.props;
        return sykmelding.valgtArbeidsgiver && sykmelding.valgtArbeidsgiver.orgnummer === '0';
    }

    valider() {
        const { sykmelding, harStrengtFortroligAdresse } = this.props;
        this.setState({
            serverfeil: false,
        });
        if (!sykmelding.arbeidssituasjon) {
            this.setState({
                forsoktBekreftet: true,
                forsoktSendt: false,
            });
            return;
        } else if (harStrengtFortroligAdresse || this.harValgtAnnenArbeidsgiver()) {
            this.setState({
                forsoktSendt: false,
                forsoktBekreftet: true,
            });
            this.bekreft(sykmelding);
        } else {
            if (sykmelding.arbeidssituasjon === 'arbeidstaker') {
                if (sykmelding.valgtArbeidsgiver) {
                    this.setState({
                        forsoktSendt: false,
                        forsoktBekreftet: false,
                    });
                    if (!this.harValgtAnnenArbeidsgiver()) {
                        this.send(sykmelding);
                    }
                }
                this.setState({
                    forsoktSendt: true,
                });
            } else {
                this.setState({
                    forsoktSendt: false,
                    forsoktBekreftet: true,
                });
                this.bekreft(sykmelding);
            }
        }
    }

    render() {
        const { sykmelding, sender, ledetekster, harStrengtFortroligAdresse } = this.props;

        const knappetekster = {
            GA_VIDERE: 'Gå videre',
            BEKREFT: 'Bekreft sykmelding',
            SEND: 'Send sykmelding',
        };

        const modus = (() => {
            if (!sykmelding.arbeidssituasjon) {
                return 'GA_VIDERE';
            }
            if (sykmelding.arbeidssituasjon === 'arbeidstaker' && !harStrengtFortroligAdresse && !this.harValgtAnnenArbeidsgiver()) {
                return 'SEND';
            }
            return 'BEKREFT';
        })();

        return (<form onSubmit={(e) => {
            if (e) {
                e.preventDefault();
            }
            this.valider();
        }}>
            <ErOpplysningeneRiktige
                ledetekster={ledetekster}
                sykmelding={sykmelding}
                feilmelding="Vennligst svar på om opplysningene er riktige"
                erFeil={(this.state.forsoktSendt || this.state.forsoktBekreftet) && sykmelding.opplysningeneErRiktige === undefined}
                setOpplysningeneErRiktige={this.props.setOpplysningeneErRiktige}
                setFeilaktigOpplysning={this.props.setFeilaktigOpplysning} />
            <VelgArbeidssituasjonContainer
                sykmeldingId={sykmelding.id}
                erFeil={this.state.forsoktBekreftet && sykmelding.arbeidssituasjon === undefined} />
            {
                sykmelding.arbeidssituasjon === 'arbeidstaker' &&
                    <div className="blokk">
                        <h2 className="typo-innholdstittel">Send til arbeidsgiveren din</h2>
                        {
                            !harStrengtFortroligAdresse && <VelgArbeidsgiverContainer
                                sykmeldingId={sykmelding.id}
                                erFeil={this.state.forsoktSendt && (!sykmelding.valgtArbeidsgiver || sykmelding.valgtArbeidsgiver.orgnummer === '0')}
                                resetState={() => {
                                    this.setState({
                                        forsoktSendt: false,
                                    });
                                }} />
                        }
                        {
                            harStrengtFortroligAdresse && <StrengtFortroligInfo sykmeldingId={sykmelding.id} ledetekster={ledetekster} />
                        }
                        <ArbeidsgiversSykmeldingContainer sykmeldingId={sykmelding.id} Overskrift="H3" />
                    </div>
            }
            {
                modus === 'BEKREFT' && <p className="blokk">Å bekrefte sykmeldingen betyr at du er enig i innholdet, og at du ønsker å ta den i bruk.</p>
            }
            {
                modus === 'SEND' && <p className="blokk">Når du sender sykmeldingen vil den bli levert til din arbeidsgiver elektronisk.</p>
            }
            <div aria-live="polite" role="alert">
            {
                this.state.serverfeil && (this.state.forsoktSendt || this.state.forsoktBekreftet) &&
                <div className="panel panel-ramme js-varsel">
                    <Varselstripe type="feil">
                        <p className="sist">Beklager, det oppstod en feil! Prøv igjen litt senere.</p>
                    </Varselstripe>
                </div>
            }
            </div>
            <div className="knapperad knapperad-adskilt">
                <button type="button" className={`js-submit knapp knapp-hoved ${(sender) ? 'er-inaktiv knapp-spinner js-spinner' : ''}`} onClick={(e) => {
                    e.preventDefault();
                    this.valider();
                }}>
                    {knappetekster[modus]}
                    <span className="spinner-knapp" />
                </button>
            </div>
        </form>);
    }
}

DinSykmeldingSkjema.propTypes = {
    sykmelding: PropTypes.object,
    bekreftSykmelding: PropTypes.func,
    sendSykmeldingTilArbeidsgiver: PropTypes.func,
    sender: PropTypes.bool,
    ledetekster: PropTypes.object,
    feilaktigeOpplysninger: PropTypes.object,
    setOpplysningeneErRiktige: PropTypes.func,
    setFeilaktigOpplysning: PropTypes.func,
    harStrengtFortroligAdresse: PropTypes.bool,
};

export default DinSykmeldingSkjema;
