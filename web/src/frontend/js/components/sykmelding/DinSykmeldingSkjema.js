import React, { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';
import VelgArbeidssituasjonContainer from '../../containers/VelgArbeidssituasjonContainer';
import VelgArbeidsgiverContainer from '../../containers/VelgArbeidsgiverContainer';
import ArbeidsgiversSykmeldingContainer from '../../containers/ArbeidsgiversSykmeldingContainer';
import Varselstripe from '../../components/Varselstripe';
import ErOpplysningeneRiktige from './ErOpplysningeneRiktige';

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

    valider() {
        const { sykmelding } = this.props;
        this.setState({
            serverfeil: false,
        });
        switch (sykmelding.arbeidssituasjon) {
            case undefined: {
                this.setState({
                    forsoktBekreftet: true,
                    forsoktSendt: false,
                });
                return;
            }
            case 'arbeidstaker': {
                if (sykmelding.valgtArbeidsgiver) {
                    this.setState({
                        forsoktSendt: false,
                        forsoktBekreftet: false,
                    });
                    if (sykmelding.valgtArbeidsgiver.orgnummer !== '0') {
                        this.send(sykmelding);
                    }
                }
                this.setState({
                    forsoktSendt: true,
                });
                return;
            }
            default: {
                this.setState({
                    forsoktSendt: false,
                    forsoktBekreftet: true,
                });
                this.bekreft(sykmelding);
                return;
            }
        }
    }


    render() {
        const { sykmelding, sender } = this.props;
        const knappetekst = sykmelding.arbeidssituasjon === 'arbeidstaker' ? 'Send sykmelding' : 'Bekreft sykmelding';

        return (<form onSubmit={(e) => {
            if (e) {
                e.preventDefault();
            }
            this.valider();
        }}>
            <ErOpplysningeneRiktige sykmelding={sykmelding} />
            <VelgArbeidssituasjonContainer
                sykmeldingId={sykmelding.id}
                erFeil={this.state.forsoktBekreftet && sykmelding.arbeidssituasjon === undefined} />
            {
                sykmelding.arbeidssituasjon === 'arbeidstaker' &&
                    <div className="blokk">
                        <h2 className="typo-innholdstittel">Send til arbeidsgiveren din</h2>
                        <VelgArbeidsgiverContainer
                            sykmeldingId={sykmelding.id}
                            erFeil={this.state.forsoktSendt && (!sykmelding.valgtArbeidsgiver || sykmelding.valgtArbeidsgiver.orgnummer === '0')}
                            resetState={() => {
                                this.setState({
                                    forsoktSendt: false,
                                });
                            }} />
                        <ArbeidsgiversSykmeldingContainer sykmeldingId={sykmelding.id} Overskrift="H3" />
                    </div>
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
                    {knappetekst}
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
};

export default DinSykmeldingSkjema;
