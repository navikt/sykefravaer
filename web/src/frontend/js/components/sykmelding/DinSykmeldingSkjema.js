import React, { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';
import VelgArbeidssituasjon from '../../components/sykmelding/VelgArbeidssituasjon';
import VelgArbeidsgiver from '../../components/sykmelding/VelgArbeidsgiver';
import ArbeidsgiversSykmeldingContainer from '../../containers/ArbeidsgiversSykmeldingContainer';
import Varselstripe from '../../components/Varselstripe';
import ErOpplysningeneRiktige from './ErOpplysningeneRiktige';
import StrengtFortroligInfo from './StrengtFortroligInfo';
import { getLedetekst } from '../../ledetekster';
import { reduxForm, Field } from 'redux-form';
import { filtrerObjektKeys } from '../../utils';

class DinSykmeldingSkjema extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         forsoktSendt: false,
    //     };
    //     this.handleSubmit = this.handleSubmit.bind(this);
    // }

    getValues() {
        const { skjemaData } = this.props;
        return skjemaData && skjemaData.values ? skjemaData.values : {};
    }

    getSkjemaModus() {
        const values = this.getValues();
        const { harStrengtFortroligAdresse } = this.props;
        if (values === {}) {
            return 'GA_VIDERE';
        }
        const { opplysningeneErRiktige, feilaktigeOpplysninger, valgtArbeidssituasjon } = values; 
        console.log("values", values)
        if (opplysningeneErRiktige === false && feilaktigeOpplysninger && (feilaktigeOpplysninger.periode || feilaktigeOpplysninger.sykmeldingsgrad)) {
            return 'AVBRYT';
        }
        if (!valgtArbeidssituasjon) {
            return 'GA_VIDERE';
        }
        if (valgtArbeidssituasjon === 'arbeidstaker' && !harStrengtFortroligAdresse && !this.harValgtAnnenArbeidsgiver()) {
            return 'SEND';
        }
        return 'BEKREFT';
    }

    // gaTilKvittering() {
    //     browserHistory.push(`/sykefravaer/sykmeldinger/${this.props.sykmelding.id}/kvittering`);
    // }

    // bekreft(sykmeldingId, arbeidssituasjon, feilaktigeOpplysninger) {
    //     this.props.bekreftSykmelding(sykmeldingId, arbeidssituasjon, feilaktigeOpplysninger).then((respons) => {
    //         if (respons.status > 400) {
    //             this.setState({
    //                 forsoktBekreftet: true,
    //                 serverfeil: true,
    //             });
    //         } else {
    //             this.gaTilKvittering();
    //         }
    //     });
    // }

    // send(sykmeldingId, orgnummer, feilaktigeOpplysninger) {
    //     this.props.sendSykmeldingTilArbeidsgiver(sykmeldingId, orgnummer, feilaktigeOpplysninger).then((respons) => {
    //         if (respons.status > 400) {
    //             this.setState({
    //                 forsoktSendt: true,
    //                 serverfeil: true,
    //             });
    //         } else {
    //             this.gaTilKvittering();
    //         }
    //     });
    // }

    // avbryt(sykmeldingId, feilaktigeOpplysninger) {
    //     this.props.avbrytSykmelding(sykmeldingId, feilaktigeOpplysninger).then((respons) => {
    //         if (respons.status > 400) {
    //             this.setState({
    //                 forsoktSendt: true,
    //                 serverfeil: true,
    //             });
    //         } else {
    //             this.gaTilKvittering();
    //         }
    //     });
    // }

    harValgtAnnenArbeidsgiver() {
        const values = this.getValues();
        return values.valgtArbeidsgiver && values.valgtArbeidsgiver.orgnummer === '0';
    }

    handleSubmit(fields) {
        console.log(fields);
        return false;
        // const { setOpplysningeneErRiktige, setFeilaktigOpplysning, setArbeidssituasjon, setArbeidsgiver, sykmelding } = this.props;
        // setOpplysningeneErRiktige(sykmelding.id, fields.opplysningeneErRiktige);
        // setArbeidssituasjon(fields.arbeidssituasjon, sykmelding.id);
        // setArbeidsgiver(sykmelding.id, fields.valgtArbeidsgiver);
        // for (const key in fields.feilaktigeOpplysninger) {
        //     if (fields.feilaktigeOpplysninger.hasOwnProperty(key)) {
        //         setFeilaktigOpplysning(sykmelding.id, key, fields.feilaktigeOpplysninger[key]);
        //     }
        // }
        // switch (this.getSkjemaModus()) {
        //     case 'BEKREFT': {
        //         this.bekreft(sykmelding.id, fields.arbeidssituasjon, fields.feilaktigeOpplysninger);
        //         return;
        //     }
        //     case 'SEND': {
        //         this.send(sykmelding.id, fields.valgtArbeidsgiver.orgnummer, fields.feilaktigeOpplysninger);
        //         return;
        //     }
        //     case 'AVBRYT': {
        //         this.avbryt(sykmelding.id, fields.feilaktigeOpplysninger);
        //         return;
        //     }
        //     default: {
        //         return;
        //     }
        // }
    }

    render() {
        const { skjemaData, ledetekster, harStrengtFortroligAdresse, sykmelding, sender, handleSubmit } = this.props;
        console.log("this.props", this.props);

        const values = skjemaData && skjemaData.values ? skjemaData.values : {};
        const knappetekster = {
            GA_VIDERE: 'Gå videre',
            BEKREFT: 'Bekreft sykmelding',
            SEND: 'Send sykmelding',
            AVBRYT: 'Avbryt sykmelding',
        };
        const modus = this.getSkjemaModus();

        return (<form id="dinSykmeldingSkjema" className="panel blokk" onSubmit={handleSubmit(this.handleSubmit)}>
            <h3 className="typo-innholdstittel">Starte sykmeldingen</h3>
            <ErOpplysningeneRiktige skjemaData={skjemaData} ledetekster={ledetekster} />
            {
                modus !== 'AVBRYT' && <VelgArbeidssituasjon {...this.props} />
            }
            {
                values.valgtArbeidssituasjon === 'arbeidstaker' && modus !== 'AVBRYT' &&
                    <div className="blokk">
                        {
                            !harStrengtFortroligAdresse && <VelgArbeidsgiver {...this.props} />
                        }
                        {
                            harStrengtFortroligAdresse && <StrengtFortroligInfo sykmeldingId={sykmelding.id} ledetekster={ledetekster} />
                        }
                        <ArbeidsgiversSykmeldingContainer sykmeldingId={sykmelding.id} Overskrift="H4" />
                    </div>
            }
            <div className="knapperad knapperad-adskilt">
                <button type="submit" id="dinSykmeldingSkjemaSubmit"
                    className={`js-submit knapp ${modus === 'AVBRYT' ? 'knapp-fare' : 'knapp-hoved'} ${(sender) ? 'er-inaktiv knapp-spinner js-spinner' : ''}`}>
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
    avbrytSykmelding: PropTypes.func,
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

export const validate = (values, props = {}) => {
    console.log("Nå validerer jeg.")
    const feilmeldinger = {};

    if (values.opplysningeneErRiktige === false && typeof values.feilaktigeOpplysninger === 'object' &&
        (values.feilaktigeOpplysninger.periode || values.feilaktigeOpplysninger.sykmeldingsgrad)) {
        return {};
    }
    if (values.opplysningeneErRiktige === undefined) {
        feilmeldinger.opplysningeneErRiktige = 'Vennligst svar på om opplysningene er riktige';
    }
    if (!values.valgtArbeidssituasjon) {
        feilmeldinger.arbeidssituasjon = 'Vennligst oppgi din arbeidssituasjon';
    }
    if (values.opplysningeneErRiktige === false && (!values.feilaktigeOpplysninger || !filtrerObjektKeys(values.feilaktigeOpplysninger).length)) {
        feilmeldinger.feilaktigeOpplysninger = 'Vennligst oppgi hvilke opplysninger som ikke er riktige';
    }
    if (values.arbeidssituasjon === 'arbeidstaker' && (!values.valgtArbeidsgiver || !values.valgtArbeidsgiver.orgnummer) && !props.harStrengtFortroligAdresse) {
        feilmeldinger.valgtArbeidsgiver = 'Vennligst velg arbeidsgiver';
    }
    console.log("feilmeldinger", feilmeldinger)
    return feilmeldinger;
};

DinSykmeldingSkjema = reduxForm({
    form: 'dinSykmeldingSkjema',
    validate,
})(DinSykmeldingSkjema);

export default DinSykmeldingSkjema;
