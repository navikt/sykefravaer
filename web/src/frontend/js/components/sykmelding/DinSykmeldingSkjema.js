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

const AvbrytDialog = ({ ledetekster, avbryter, avbrytHandler, bekreftHandler }) => {
    return (<div className="panel panel-ekstra">
        <p className="blokk-s">{getLedetekst('din-sykmelding.avbryt.spoersmal', ledetekster)}</p>
        <div className="blokk-xs">
            <button className={`knapp knapp-fare ${avbryter ? 'er-inaktiv knapp-spinner' : ''}`} type="button" onClick={(e) => {
                e.preventDefault();
                bekreftHandler();
            }}>{getLedetekst('din-sykmelding.avbryt.ja', ledetekster)}
                <span className="spinner-knapp" />
            </button>
        </div>
        <p className="sist">
            <a href="#" role="button" className="lenke-fremhevet" onClick={(e) => {
                e.preventDefault();
                avbrytHandler();
            }}>{getLedetekst('din-sykmelding.avbryt.angre', ledetekster)}
            </a>
        </p>
    </div>);
};

AvbrytDialog.propTypes = {
    ledetekster: PropTypes.object,
    avbryter: PropTypes.bool,
    avbrytHandler: PropTypes.func,
    bekreftHandler: PropTypes.func,
};

export class DinSykmeldingSkjemaComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

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

    gaTilKvittering() {
        browserHistory.push(`/sykefravaer/sykmeldinger/${this.props.sykmelding.id}/kvittering`);
    }

    bekreft(sykmeldingId, arbeidssituasjon, feilaktigeOpplysninger) {
        this.props.bekreftSykmelding(sykmeldingId, arbeidssituasjon, feilaktigeOpplysninger).then((respons) => {
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

    send(sykmeldingId, orgnummer, feilaktigeOpplysninger) {
        this.props.sendSykmeldingTilArbeidsgiver(sykmeldingId, orgnummer, feilaktigeOpplysninger).then((respons) => {
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

    avbryt(sykmeldingId, feilaktigeOpplysninger) {
        this.props.avbrytSykmelding(sykmeldingId, feilaktigeOpplysninger).then((respons) => {
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
        const values = this.getValues();
        return values.valgtArbeidsgiver && values.valgtArbeidsgiver.orgnummer === '0';
    }

    handleSubmit(fields) {
        const { setOpplysningeneErRiktige, setFeilaktigOpplysning, setArbeidssituasjon, setArbeidsgiver, sykmelding, skjemaData } = this.props;
        setOpplysningeneErRiktige(sykmelding.id, fields.opplysningeneErRiktige);
        setArbeidssituasjon(fields.valgtArbeidssituasjon, sykmelding.id);
        setArbeidsgiver(sykmelding.id, fields.valgtArbeidsgiver);
        for (const key in fields.feilaktigeOpplysninger) {
            if (fields.feilaktigeOpplysninger.hasOwnProperty(key)) {
                setFeilaktigOpplysning(sykmelding.id, key, fields.feilaktigeOpplysninger[key]);
            }
        }
        switch (this.getSkjemaModus()) {
            case 'BEKREFT': {
                this.bekreft(sykmelding.id, fields.valgtArbeidssituasjon, fields.feilaktigeOpplysninger);
                return;
            }
            case 'SEND': {
                this.send(sykmelding.id, fields.valgtArbeidsgiver.orgnummer, fields.feilaktigeOpplysninger);
                return;
            }
            case 'AVBRYT': {
                this.avbryt(sykmelding.id, fields.feilaktigeOpplysninger);
                return;
            }
            default: {
                return;
            }
        }
    }

    render() {
        const { skjemaData, ledetekster, harStrengtFortroligAdresse, sykmelding, sender, avbryter, handleSubmit, untouch } = this.props;

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
            {
                skjemaData && <ErOpplysningeneRiktige skjemaData={skjemaData} ledetekster={ledetekster} untouch={untouch} />
            }
            {
                modus !== 'AVBRYT' && <VelgArbeidssituasjon skjemaData={skjemaData} ledetekster={ledetekster} />
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
            {
                modus === 'GA_VIDERE' ? null : <p className="blokk">{getLedetekst(`starte-sykmelding.info.${modus.toLowerCase()}`, ledetekster)}</p>
            }
            <div className="knapperad knapperad-adskilt">
                <p className="blokk-s">
                    <button type="submit" id="dinSykmeldingSkjemaSubmit"
                        className={`js-submit knapp ${modus === 'AVBRYT' ? 'knapp-fare' : 'knapp-hoved'} ${(sender) ? 'er-inaktiv knapp-spinner js-spinner' : ''}`}>
                        {knappetekster[modus]}
                        <span className="spinner-knapp" />
                    </button>
                </p>
                <div className="avbryt-sykmelding-dialog">
                    <p className="blokk">
                        <a href="#" role="button" ref="js-trigger-avbryt-sykmelding" className="lenke-fremhevet" onClick={(e) => {
                            e.preventDefault();
                            this.setState({
                                visAvbrytDialog: !this.state.visAvbrytDialog,
                            });
                        }}>Jeg ønsker ikke å bruke denne sykmeldingen</a>
                    </p>
                    {
                        this.state.visAvbrytDialog && <AvbrytDialog avbryter={avbryter} ledetekster={ledetekster} avbrytHandler={() => {
                            this.setState({
                                visAvbrytDialog: false,
                            });
                            this.refs['js-trigger-avbryt-sykmelding'].focus();
                        }} bekreftHandler={() => {
                            this.avbryt(sykmelding.id);
                        }} />
                    }
                </div>
            </div>
        </form>);
    }
}

DinSykmeldingSkjemaComponent.propTypes = {
    sykmelding: PropTypes.object,
    bekreftSykmelding: PropTypes.func,
    sendSykmeldingTilArbeidsgiver: PropTypes.func,
    avbrytSykmelding: PropTypes.func,
    sender: PropTypes.bool,
    avbryter: PropTypes.bool,
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
    const feilmeldinger = {};

    if (values.opplysningeneErRiktige === false && typeof values.feilaktigeOpplysninger === 'object' &&
        (values.feilaktigeOpplysninger.periode || values.feilaktigeOpplysninger.sykmeldingsgrad)) {
        return {};
    }
    if (values.opplysningeneErRiktige === undefined) {
        feilmeldinger.opplysningeneErRiktige = 'Vennligst svar på om opplysningene er riktige';
    }
    if (!values.valgtArbeidssituasjon) {
        feilmeldinger.valgtArbeidssituasjon = 'Vennligst oppgi din arbeidssituasjon';
    }
    if (values.opplysningeneErRiktige === false && (!values.feilaktigeOpplysninger || !filtrerObjektKeys(values.feilaktigeOpplysninger).length)) {
        feilmeldinger.feilaktigeOpplysninger = 'Vennligst oppgi hvilke opplysninger som ikke er riktige';
    }
    if (values.valgtArbeidssituasjon === 'arbeidstaker' && (!values.valgtArbeidsgiver || !values.valgtArbeidsgiver.orgnummer) && !props.harStrengtFortroligAdresse) {
        feilmeldinger.valgtArbeidsgiver = 'Vennligst velg arbeidsgiver';
    }
    return feilmeldinger;
};

const DinSykmeldingSkjema = reduxForm({
    form: 'dinSykmeldingSkjema',
    validate,
})(DinSykmeldingSkjemaComponent);

export default DinSykmeldingSkjema;
