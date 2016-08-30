import React, { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';
import VelgArbeidssituasjon from '../../components/sykmelding/VelgArbeidssituasjon';
import VelgArbeidsgiver from '../../components/sykmelding/VelgArbeidsgiver';
import ArbeidsgiversSykmeldingContainer from '../../containers/ArbeidsgiversSykmeldingContainer';
import Varselstripe from '../../components/Varselstripe';
import ErOpplysningeneRiktige from './ErOpplysningeneRiktige';
import StrengtFortroligInfo from './StrengtFortroligInfo';
import { getLedetekst } from '../../ledetekster';

class DinSykmeldingSkjema extends Component {

    constructor(props) {
        super(props);
        this.state = {
            forsoktSendt: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getSkjemaModus() {
        const { fields: { opplysningeneErRiktige, feilaktigeOpplysninger, arbeidssituasjon }, harStrengtFortroligAdresse } = this.props;
        if (opplysningeneErRiktige.value === false && feilaktigeOpplysninger.value && (feilaktigeOpplysninger.value.periode || feilaktigeOpplysninger.value.sykmeldingsgrad)) {
            return 'AVBRYT';
        }
        if (!arbeidssituasjon.value || arbeidssituasjon.value === '') {
            return 'GA_VIDERE';
        }
        if (arbeidssituasjon.value === 'arbeidstaker' && !harStrengtFortroligAdresse && !this.harValgtAnnenArbeidsgiver()) {
            return 'SEND';
        }
        return 'BEKREFT';
    }

    gaTilKvittering() {
        browserHistory.push(`/sykefravaer/sykmeldinger/${this.props.sykmelding.id}/kvittering`);
    }

    bekreft(sykmeldingId, arbeidssituasjon) {
        this.props.bekreftSykmelding(sykmeldingId, arbeidssituasjon).then((respons) => {
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

    send(sykmeldingId, orgnummer) {
        this.props.sendSykmeldingTilArbeidsgiver(sykmeldingId, orgnummer).then((respons) => {
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

    avbryt() {
        window.alert('Avbryter sykmelding - denne funksjonen er ikke laget enda!');
    }

    harValgtAnnenArbeidsgiver() {
        const { fields: { valgtArbeidsgiver } } = this.props;
        return valgtArbeidsgiver.value !== '' && valgtArbeidsgiver.value.orgnummer === '0';
    }

    handleSubmit(fields) {
        const { setOpplysningeneErRiktige, setFeilaktigOpplysning, setArbeidssituasjon, setArbeidsgiver, sykmelding } = this.props;
        setOpplysningeneErRiktige(sykmelding.id, fields.opplysningeneErRiktige);
        setArbeidssituasjon(fields.arbeidssituasjon, sykmelding.id);
        setArbeidsgiver(sykmelding.id, fields.valgtArbeidsgiver);
        for (const key in fields.feilaktigeOpplysninger) {
            if (fields.feilaktigeOpplysninger.hasOwnProperty(key)) {
                setFeilaktigOpplysning(sykmelding.id, key, fields.feilaktigeOpplysninger[key]);
            }
        }
        switch (this.getSkjemaModus()) {
            case 'BEKREFT': {
                this.bekreft(sykmelding.id, fields.arbeidssituasjon);
                return;
            }
            case 'SEND': {
                this.send(sykmelding.id, fields.valgtArbeidsgiver.orgnummer);
                return;
            }
            case 'AVBRYT': {
                this.avbryt();
                return;
            }
            default: {
                return;
            }
        }
    }

    render() {
        const { fields: { arbeidssituasjon },
            sykmelding, sender, ledetekster, harStrengtFortroligAdresse, handleSubmit } = this.props;

        const knappetekster = {
            GA_VIDERE: 'Gå videre',
            BEKREFT: 'Bekreft sykmelding',
            SEND: 'Send sykmelding',
            AVBRYT: 'Avbryt sykmelding',
        };

        const modus = this.getSkjemaModus();

        return (<form className="panel blokk" onSubmit={handleSubmit(this.handleSubmit)}>
            <ErOpplysningeneRiktige {...this.props} />
            {
                modus !== 'AVBRYT' && <VelgArbeidssituasjon {...this.props} />
            }
            {
                arbeidssituasjon.value === 'arbeidstaker' && modus !== 'AVBRYT' &&
                    <div className="blokk">
                        <h3 className="typo-innholdstittel">{getLedetekst('send-til-arbeidsgiver.tittel', ledetekster)}</h3>
                        {
                            <VelgArbeidsgiver {...this.props} />
                        }
                        {
                            harStrengtFortroligAdresse && <StrengtFortroligInfo sykmeldingId={sykmelding.id} ledetekster={ledetekster} />
                        }
                        <ArbeidsgiversSykmeldingContainer sykmeldingId={sykmelding.id} Overskrift="H4" />
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
            {
                modus === 'BEKREFT' && <p className="blokk">Å bekrefte sykmeldingen betyr at du er enig i innholdet, og at du ønsker å ta den i bruk.</p>
            }
            {
                modus === 'SEND' && <p className="blokk">Når du sender sykmeldingen vil den bli levert til din arbeidsgiver elektronisk.</p>
            }
            {
                modus === 'AVBRYT' && <p className="blokk">Når du avbryter sykmeldingen, blablabla...</p>
            }
                <button type="submit" className={`js-submit knapp knapp-hoved ${(sender) ? 'er-inaktiv knapp-spinner js-spinner' : ''}`}>
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
    fields: PropTypes.object,
    setArbeidssituasjon: PropTypes.func,
    setArbeidsgiver: PropTypes.func,
    handleSubmit: PropTypes.func,
};

export default DinSykmeldingSkjema;
