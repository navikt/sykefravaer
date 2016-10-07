import React, { PropTypes, Component } from 'react';
import VelgArbeidssituasjon from '../../components/sykmelding/VelgArbeidssituasjon';
import VelgArbeidsgiver from '../../components/sykmelding/VelgArbeidsgiver';
import ArbeidsgiversSykmeldingContainer from '../../containers/ArbeidsgiversSykmeldingContainer';
import Varselstripe from '../../components/Varselstripe';
import ErOpplysningeneRiktige from './ErOpplysningeneRiktige';
import StrengtFortroligInfo from './StrengtFortroligInfo';
import { getLedetekst, getHtmlLedetekst } from '../../ledetekster';
import { reduxForm } from 'redux-form';
import { filtrerObjektKeys } from '../../utils';

const AvbrytDialog = ({ ledetekster, avbryter, avbrytHandler, bekreftHandler }) => {
    return (<div className="panel panel-ekstra">
        <p className="blokk-s" dangerouslySetInnerHTML={getHtmlLedetekst('din-sykmelding.avbryt.spoersmal', ledetekster)} />
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

    componentDidUpdate(prevProps) {
        if (this.props.sykmelding.id !== prevProps.sykmelding.id) {
            // Tilbakestiller data i skjema dersom man navigverer til en ny sykmelding
            this.props.reset();
        }
    }

    getSkjemaModus(values, harStrengtFortroligAdresse) {
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
        if (valgtArbeidssituasjon === 'arbeidstaker' && !harStrengtFortroligAdresse && !this.harValgtAnnenArbeidsgiver(values)) {
            return 'SEND';
        }
        return 'BEKREFT';
    }

    bekreft(sykmeldingId, arbeidssituasjon, feilaktigeOpplysninger) {
        this.props.bekreftSykmelding(sykmeldingId, arbeidssituasjon, feilaktigeOpplysninger);
    }

    avbryt(sykmeldingId, feilaktigeOpplysninger) {
        this.props.avbrytSykmelding(sykmeldingId, feilaktigeOpplysninger);
    }

    harValgtAnnenArbeidsgiver(values) {
        return values.valgtArbeidsgiver && values.valgtArbeidsgiver.orgnummer === '0';
    }

    handleSubmit(values) {
        const modus = this.getSkjemaModus(values, this.props.harStrengtFortroligAdresse);
        const { setOpplysningeneErRiktige, setFeilaktigOpplysning, setArbeidssituasjon, setArbeidsgiver, sykmelding } = this.props;
        let feilaktigeOpplysninger = values.feilaktigeOpplysninger;
        for (const key in values.feilaktigeOpplysninger) {
            if (values.feilaktigeOpplysninger.hasOwnProperty(key)) {
                setFeilaktigOpplysning(sykmelding.id, key, values.feilaktigeOpplysninger[key]);
            }
        }
        setOpplysningeneErRiktige(sykmelding.id, values.opplysningeneErRiktige);
        if (values.opplysningeneErRiktige) {
            for (const key in values.feilaktigeOpplysninger) {
                if (values.feilaktigeOpplysninger.hasOwnProperty(key)) {
                    setFeilaktigOpplysning(sykmelding.id, key, false);
                }
            }
            feilaktigeOpplysninger = {};
        }
        setArbeidssituasjon(values.valgtArbeidssituasjon, sykmelding.id);
        setArbeidsgiver(sykmelding.id, values.valgtArbeidsgiver);

        switch (modus) {
            case 'SEND': {
                this.props.sendSykmeldingTilArbeidsgiver(sykmelding.id, values.valgtArbeidsgiver.orgnummer, feilaktigeOpplysninger, values.beOmNyNaermesteLeder);
                return;
            }
            case 'BEKREFT': {
                this.bekreft(sykmelding.id, values.valgtArbeidssituasjon, feilaktigeOpplysninger);
                return;
            }
            case 'AVBRYT': {
                this.setState({
                    visAvbrytDialog: !this.state.visAvbrytDialog,
                });
                return;
            }
            default: {
                return;
            }
        }
    }

    render() {
        const { skjemaData, ledetekster, harStrengtFortroligAdresse, sykmelding, sender, sendingFeilet, avbryter, avbrytFeilet, handleSubmit, untouch } = this.props;
        const values = skjemaData && skjemaData.values ? skjemaData.values : {};
        const modus = this.getSkjemaModus(values, harStrengtFortroligAdresse);

        return (<form id="dinSykmeldingSkjema" className="panel blokk" onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
            <h3 className="typo-innholdstittel">{getLedetekst('starte-sykmelding.tittel', ledetekster)}</h3>
            {
                skjemaData && <ErOpplysningeneRiktige skjemaData={skjemaData} ledetekster={ledetekster} untouch={untouch} />
            }
            {
                modus !== 'AVBRYT' && <VelgArbeidssituasjon skjemaData={skjemaData} ledetekster={ledetekster} untouch={untouch} />
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
                (sendingFeilet || avbrytFeilet) &&
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
                    <button ref={modus === 'AVBRYT' ? 'js-trigger-avbryt-sykmelding' : 'js-submit'} type="submit" id="dinSykmeldingSkjemaSubmit"
                        className={`js-submit knapp ${modus === 'AVBRYT' ? 'knapp-fare' : 'knapp-hoved'} ${(sender) ? 'er-inaktiv knapp-spinner js-spinner' : ''}`}>
                        {getLedetekst(`starte-sykmelding.knapp.${modus}`, ledetekster)}
                        <span className="spinner-knapp" />
                    </button>
                </p>
                <div className="dinSykmeldingSkjema__avbrytSykmeldingDialog">
                    {
                        modus !== 'AVBRYT' && <p className="blokk">
                            <a href="#" role="button" ref="js-trigger-avbryt-sykmelding" className="lenke-fremhevet" onClick={(e) => {
                                e.preventDefault();
                                this.setState({
                                    visAvbrytDialog: !this.state.visAvbrytDialog,
                                });
                            }}>{getLedetekst('starte-sykmelding.trigger-avbryt-dialog', ledetekster)}</a>
                        </p>
                    }
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
    sender: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
    avbryter: PropTypes.bool,
    avbrytFeilet: PropTypes.bool,
    ledetekster: PropTypes.object,
    handleSubmit: PropTypes.func,
    skjemaData: PropTypes.object,
    untouch: PropTypes.func,
    sendSykmeldingTilArbeidsgiver: PropTypes.func,
    bekreftHandler: PropTypes.func,
    avbrytSykmelding: PropTypes.func,
    harStrengtFortroligAdresse: PropTypes.bool,
    setOpplysningeneErRiktige: PropTypes.func,
    setArbeidssituasjon: PropTypes.func,
    setArbeidsgiver: PropTypes.func,
    bekreftSykmelding: PropTypes.func,
    setFeilaktigOpplysning: PropTypes.func,
    erEldsteNyeSykmelding: PropTypes.bool,
    eldsteSykmeldingId: PropTypes.string,
    reset: PropTypes.func,
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
    if (values.beOmNyNaermesteLeder === undefined) {
        feilmeldinger.beOmNyNaermesteLeder = 'Vennligst svar på dette spørsmålet';
    }
    return feilmeldinger;
};

const DinSykmeldingSkjema = reduxForm({
    form: 'dinSykmeldingSkjema',
    validate,
})(DinSykmeldingSkjemaComponent);

export default DinSykmeldingSkjema;
