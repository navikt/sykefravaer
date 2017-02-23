import React, { PropTypes, Component } from 'react';
import VelgArbeidssituasjon from './VelgArbeidssituasjon';
import VelgArbeidsgiver from './VelgArbeidsgiver';
import ArbeidsgiversSykmeldingContainer from '../../containers/ArbeidsgiversSykmeldingContainer';
import ErOpplysningeneRiktige from './ErOpplysningeneRiktige';
import StrengtFortroligInfo from './StrengtFortroligInfo';
import { reduxForm } from 'redux-form';
import { getLedetekst, Varselstripe } from 'digisyfo-npm';
import AvbrytDialog from './AvbrytDialog';

const modi = {
    GA_VIDERE: 'GA_VIDERE',
    AVBRYT: 'AVBRYT',
    SEND_MED_NAERMESTE_LEDER: 'SEND-MED-NAERMESTE-LEDER',
    SEND: 'SEND',
    BEKREFT: 'BEKREFT',
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
            return modi.GA_VIDERE;
        }
        const { opplysningeneErRiktige, feilaktigeOpplysninger, valgtArbeidssituasjon } = values;
        if (opplysningeneErRiktige === false && feilaktigeOpplysninger && (feilaktigeOpplysninger.periode || feilaktigeOpplysninger.sykmeldingsgrad)) {
            return modi.AVBRYT;
        }
        if (!valgtArbeidssituasjon || valgtArbeidssituasjon === 'default') {
            return modi.GA_VIDERE;
        }
        if (valgtArbeidssituasjon === 'arbeidstaker' && !harStrengtFortroligAdresse && !this.harValgtAnnenArbeidsgiver(values) && values.beOmNyNaermesteLeder === false) {
            return modi.SEND_MED_NAERMESTE_LEDER;
        }
        if (valgtArbeidssituasjon === 'arbeidstaker' && !harStrengtFortroligAdresse && !this.harValgtAnnenArbeidsgiver(values)) {
            return modi.SEND;
        }
        return modi.BEKREFT;
    }


    getFeilaktigeOpplysninger() {
        const { skjemaData } = this.props;
        const feilaktigeOpplysninger = skjemaData.values.feilaktigeOpplysninger;
        const opplysningeneErRiktige = skjemaData.values.opplysningeneErRiktige;
        if (opplysningeneErRiktige) {
            return {};
        }
        return feilaktigeOpplysninger;
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

        const arbeidsgiverForskutterer = values.arbeidsgiverForskutterer === 'JA';

        switch (modus) {
            case modi.SEND_MED_NAERMESTE_LEDER:
            case modi.SEND: {
                this.props.sendSykmeldingTilArbeidsgiver(sykmelding.id,
                    values.valgtArbeidsgiver.orgnummer, feilaktigeOpplysninger, values.beOmNyNaermesteLeder, arbeidsgiverForskutterer);
                return;
            }
            case modi.BEKREFT: {
                this.props.bekreftSykmelding(sykmelding.id, values.valgtArbeidssituasjon, feilaktigeOpplysninger);
                return;
            }
            case modi.AVBRYT: {
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

        return (<form id="dinSykmeldingSkjema" className="" onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
            <h3 className="typo-innholdstittel">{getLedetekst('starte-sykmelding.tittel', ledetekster)}</h3>
            {
                skjemaData && <ErOpplysningeneRiktige skjemaData={skjemaData} ledetekster={ledetekster} untouch={untouch} />
            }
            {
                modus !== modi.AVBRYT && (<div className="blokk">
                {
                    <VelgArbeidssituasjon ledetekster={ledetekster} untouch={untouch} modus={modus} />
                }
                {
                    values.valgtArbeidssituasjon === 'arbeidstaker' &&
                        <div className="blokk">
                            {
                                !harStrengtFortroligAdresse && <VelgArbeidsgiver {...this.props} />
                            }
                            {
                                harStrengtFortroligAdresse && <StrengtFortroligInfo sykmeldingId={sykmelding.id} ledetekster={ledetekster} />
                            }
                        </div>
                }
            </div>)
            }
            { values.valgtArbeidssituasjon === 'arbeidstaker' && <ArbeidsgiversSykmeldingContainer sykmeldingId={sykmelding.id} Overskrift="H4" /> }

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
                    modus !== modi.GA_VIDERE && <p className="dinSykmeldingSkjema__sendInfo">{getLedetekst(`starte-sykmelding.info.${modus.toLowerCase()}`, ledetekster)}</p>
                }
                <div className="knapperad knapperad-adskilt">
                    <p className="blokk--s">
                        <button disabled={sender} ref={modus === modi.AVBRYT ? 'js-trigger-avbryt-sykmelding' : 'js-submit'} type="submit" id="dinSykmeldingSkjemaSubmit"
                            className={`js-submit knapp ${modus === modi.AVBRYT ? 'knapp--fare' : ''} ${(sender) ? 'js-spinner' : ''}`}>
                            {getLedetekst(`starte-sykmelding.knapp.${modus}`, ledetekster)}
                            { sender && <span className="knapp__spinner" /> }
                        </button>
                    </p>
                    <div className="dinSykmeldingSkjema__avbrytSykmeldingDialog">
                        {
                            modus !== modi.AVBRYT && <p className="blokk">
                                <a href="#" role="button" ref="js-trigger-avbryt-sykmelding" onClick={(e) => {
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
                                this.avbryt(sykmelding.id, this.getFeilaktigeOpplysninger());
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
    pilotSykepenger: PropTypes.bool,
};

const ingenFeilaktigeOpplysningerOppgitt = (feilaktigeOpplysninger) => {
    const v = [
        feilaktigeOpplysninger.periode,
        feilaktigeOpplysninger.sykmeldingsgrad,
        feilaktigeOpplysninger.arbeidsgiver,
        feilaktigeOpplysninger.diagnose,
        feilaktigeOpplysninger.perioder,
    ];
    return v.filter((a) => { return a; }).length === 0;
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
    if (!values.valgtArbeidssituasjon || values.valgtArbeidssituasjon === 'default') {
        feilmeldinger.valgtArbeidssituasjon = 'Vennligst oppgi din arbeidssituasjon';
    }

    if (!values.opplysningeneErRiktige) {
        if (!values.feilaktigeOpplysninger || (values.feilaktigeOpplysninger && ingenFeilaktigeOpplysningerOppgitt(values.feilaktigeOpplysninger))) {
            feilmeldinger.feilaktigeOpplysninger = {
                _error: 'Vennligst oppgi hvilke opplysninger som ikke er riktige',
            };
        }
    }

    if (values.valgtArbeidssituasjon === 'arbeidstaker' && (!values.valgtArbeidsgiver || !values.valgtArbeidsgiver.orgnummer) && !props.harStrengtFortroligAdresse) {
        feilmeldinger.valgtArbeidsgiver = 'Vennligst velg arbeidsgiver';
    }
    if (values.beOmNyNaermesteLeder === undefined) {
        feilmeldinger.beOmNyNaermesteLeder = 'Vennligst svar på dette spørsmålet';
    }
    if (props.pilotSykepenger && values.arbeidsgiverForskutterer === undefined) {
        feilmeldinger.arbeidsgiverForskutterer = 'Vennligst svar på dette spørsmålet';
    }
    return feilmeldinger;
};

const DinSykmeldingSkjema = reduxForm({
    form: 'dinSykmeldingSkjema',
    validate,
})(DinSykmeldingSkjemaComponent);

export default DinSykmeldingSkjema;
