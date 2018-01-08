import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { getLedetekst, Varselstripe, arbeidssituasjoner, feilaktigeOpplysninger as feilaktigeOpplysningerEnums } from 'digisyfo-npm';
import VelgArbeidssituasjon from './VelgArbeidssituasjon';
import ArbeidsgiversSykmeldingContainer from '../../containers/sykmelding/ArbeidsgiversSykmeldingContainer';
import ErOpplysningeneRiktige from './ErOpplysningeneRiktige';
import StrengtFortroligInfo from './StrengtFortroligInfo';
import AvbrytDialog from './AvbrytDialog';
import { sykmelding as sykmeldingPt } from '../../propTypes';
import FeiloppsummeringContainer, { onSubmitFail } from '../../containers/FeiloppsummeringContainer';

const { PERIODE, SYKMELDINGSGRAD } = feilaktigeOpplysningerEnums;

const modi = {
    GA_VIDERE: 'GA_VIDERE',
    AVBRYT: 'AVBRYT',
    SEND_MED_NAERMESTE_LEDER: 'SEND-MED-NAERMESTE-LEDER',
    SEND: 'SEND',
    BEKREFT: 'BEKREFT',
};

export const DIN_SYKMELDING_SKJEMANAVN = 'dinSykmeldingSkjema';

const { ARBEIDSTAKER, DEFAULT } = arbeidssituasjoner;

const harValgtAnnenArbeidsgiver = (values) => {
    return values.valgtArbeidsgiver && values.valgtArbeidsgiver.orgnummer === '0';
};

export const getSkjemaModus = (values, harStrengtFortroligAdresse) => {
    if (values === {}) {
        return modi.GA_VIDERE;
    }
    const { opplysningeneErRiktige, feilaktigeOpplysninger, valgtArbeidssituasjon } = values;
    let valgteFeilaktigeOpplysninger;
    try {
        valgteFeilaktigeOpplysninger = feilaktigeOpplysninger.filter((o) => {
            return o.avkrysset;
        }).map((o) => {
            return o.opplysning;
        });
    } catch (e) {
        valgteFeilaktigeOpplysninger = [];
    }
    if (opplysningeneErRiktige === false && feilaktigeOpplysninger &&
            (valgteFeilaktigeOpplysninger.indexOf(PERIODE) > -1 || valgteFeilaktigeOpplysninger.indexOf(SYKMELDINGSGRAD) > -1)) {
        return modi.AVBRYT;
    }
    if (!valgtArbeidssituasjon || valgtArbeidssituasjon === DEFAULT) {
        return modi.GA_VIDERE;
    }
    if (valgtArbeidssituasjon === ARBEIDSTAKER && !harStrengtFortroligAdresse && !harValgtAnnenArbeidsgiver(values) && values.beOmNyNaermesteLeder === false) {
        return modi.SEND_MED_NAERMESTE_LEDER;
    }
    if (valgtArbeidssituasjon === ARBEIDSTAKER && !harStrengtFortroligAdresse && !harValgtAnnenArbeidsgiver(values)) {
        return modi.SEND;
    }
    return modi.BEKREFT;
};

export class DinSykmeldingSkjemaComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.skjemaData && this.props.skjemaData && nextProps.skjemaData.values.opplysningeneErRiktige !== this.props.skjemaData.values.opplysningeneErRiktige) {
            this.setState({
                visAvbrytDialog: false,
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.sykmelding.id !== prevProps.sykmelding.id) {
            // Tilbakestiller data i skjema dersom man navigverer til en ny sykmelding
            this.props.reset();
        }
    }

    getFeilaktigeOpplysninger(_values) {
        const values = _values || this.props.skjemaData.values;
        const returverdi = {};
        if (values.opplysningeneErRiktige) {
            return returverdi;
        }
        values.feilaktigeOpplysninger.filter((o) => {
            return o.avkrysset;
        }).forEach((o) => {
            returverdi[o.opplysning] = true;
        });
        return returverdi;
    }

    avbryt(sykmeldingId, feilaktigeOpplysninger) {
        this.props.avbrytSykmelding(sykmeldingId, feilaktigeOpplysninger);
    }

    handleSubmit(values) {
        const modus = getSkjemaModus(values, this.props.harStrengtFortroligAdresse);
        const { setOpplysningeneErRiktige, setFeilaktigOpplysning, setArbeidssituasjon, setArbeidsgiver, sykmelding } = this.props;

        const feilaktigeOpplysninger = values.feilaktigeOpplysninger;
        feilaktigeOpplysninger.forEach((o, i) => {
            setFeilaktigOpplysning(sykmelding.id, feilaktigeOpplysninger[i].opplysning, feilaktigeOpplysninger[i].avkrysset === true);
        });
        setOpplysningeneErRiktige(sykmelding.id, values.opplysningeneErRiktige);
        setArbeidssituasjon(values.valgtArbeidssituasjon, sykmelding.id);
        setArbeidsgiver(sykmelding.id, values.valgtArbeidsgiver);

        switch (modus) {
            case modi.SEND_MED_NAERMESTE_LEDER:
            case modi.SEND: {
                const feilaktigeOpplysningerParam = this.getFeilaktigeOpplysninger(values);
                this.props.sendSykmeldingTilArbeidsgiver(sykmelding.id,
                    values.valgtArbeidsgiver.orgnummer, feilaktigeOpplysningerParam, values.beOmNyNaermesteLeder);
                return;
            }
            case modi.BEKREFT: {
                const feilaktigeOpplysningerParam = this.getFeilaktigeOpplysninger(values);
                this.props.bekreftSykmelding(sykmelding.id, values.valgtArbeidssituasjon, feilaktigeOpplysningerParam);
                return;
            }
            case modi.AVBRYT: {
                this.setState({
                    visAvbrytDialog: !this.state.visAvbrytDialog,
                });
                break;
            }
            default: {
                break;
            }
        }
    }

    render() {
        const { skjemaData, harStrengtFortroligAdresse, sykmelding, sender, sendingFeilet, avbryter, avbrytFeilet, handleSubmit, untouch } = this.props;
        const values = skjemaData && skjemaData.values ? skjemaData.values : {};
        const modus = getSkjemaModus(values, harStrengtFortroligAdresse);

        return (<form
            id="dinSykmeldingSkjema"
            onSubmit={handleSubmit((v) => {
                this.handleSubmit(v);
            })}>
            <FeiloppsummeringContainer skjemanavn={DIN_SYKMELDING_SKJEMANAVN} />
            <h3 className="typo-innholdstittel">{getLedetekst('starte-sykmelding.tittel')}</h3>
            <ErOpplysningeneRiktige untouch={untouch} />
            {
                modus !== modi.AVBRYT && (<div className="blokk">
                    <VelgArbeidssituasjon {...this.props} />
                    {
                        values.valgtArbeidssituasjon === ARBEIDSTAKER && harStrengtFortroligAdresse && <StrengtFortroligInfo sykmeldingId={sykmelding.id} />
                    }
                </div>)
            }
            { values.valgtArbeidssituasjon === ARBEIDSTAKER && <ArbeidsgiversSykmeldingContainer sykmeldingId={sykmelding.id} Overskrift="h4" /> }
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
                modus !== modi.GA_VIDERE && <p className="dinSykmeldingSkjema__sendInfo">{getLedetekst(`starte-sykmelding.info.${modus.toLowerCase()}`)}</p>
            }
            <div className="knapperad">
                <p className="blokk--s">
                    <button
                        disabled={sender}
                        ref={(c) => {
                            this.submitknapp = c;
                        }}
                        type="submit"
                        id="dinSykmeldingSkjemaSubmit"
                        className={`js-submit knapp ${modus === modi.AVBRYT ? 'knapp--fare' : ''} ${(sender) ? 'js-spinner' : ''}`}>
                        {getLedetekst(`starte-sykmelding.knapp.${modus}`)}
                        { sender && <span className="knapp__spinner" /> }
                    </button>
                </p>
                <div className="avbrytDialog">
                    {
                        modus !== modi.AVBRYT && <p className="blokk">
                            <button
                                aria-pressed={this.state.visAvbrytDialog}
                                className="lenke"
                                ref={(c) => {
                                    this.triggAvbrytdialogKnapp = c;
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.setState({
                                        visAvbrytDialog: !this.state.visAvbrytDialog,
                                    });
                                }}>{getLedetekst('starte-sykmelding.trigger-avbryt-dialog')}</button>
                        </p>
                    }
                    <AvbrytDialog
                        vis={this.state.visAvbrytDialog}
                        avbryter={avbryter}
                        avbrytHandler={() => {
                            this.setState({
                                visAvbrytDialog: false,
                            });
                            if (this.triggAvbrytdialogKnapp) {
                                this.triggAvbrytdialogKnapp.focus();
                            } else if (this.submitknapp) {
                                this.submitknapp.focus();
                            }
                        }}
                        bekreftHandler={() => {
                            this.avbryt(sykmelding.id, this.getFeilaktigeOpplysninger());
                        }} />
                </div>
            </div>
        </form>);
    }
}

DinSykmeldingSkjemaComponent.propTypes = {
    sykmelding: sykmeldingPt,
    sender: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
    avbryter: PropTypes.bool,
    avbrytFeilet: PropTypes.bool,
    handleSubmit: PropTypes.func,
    skjemaData: PropTypes.shape({
        values: PropTypes.shape({
            opplysningeneErRiktige: PropTypes.bool,
        }),
    }),
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
    const feilaktigeOpplysninger = values.feilaktigeOpplysninger || [];
    const avkryssedeFeilaktigeOpplysninger = feilaktigeOpplysninger.filter((o) => {
        return o.avkrysset;
    }).map((o) => {
        return o.opplysning;
    });

    if (values.opplysningeneErRiktige === false && (avkryssedeFeilaktigeOpplysninger.indexOf(PERIODE) > -1 || avkryssedeFeilaktigeOpplysninger.indexOf(SYKMELDINGSGRAD) > -1)) {
        return {};
    }
    if (values.opplysningeneErRiktige === undefined) {
        feilmeldinger.opplysningeneErRiktige = 'Vennligst svar på om opplysningene i sykmeldingen er riktige';
    }
    if (!values.valgtArbeidssituasjon || values.valgtArbeidssituasjon === DEFAULT) {
        feilmeldinger.valgtArbeidssituasjon = 'Vennligst oppgi din arbeidssituasjon for denne sykmeldingen';
    }

    if (values.opplysningeneErRiktige === false && avkryssedeFeilaktigeOpplysninger.length === 0) {
        feilmeldinger.feilaktigeOpplysninger = {
            _error: 'Vennligst oppgi hvilke opplysninger som ikke er riktige',
        };
    }

    if (values.valgtArbeidssituasjon === ARBEIDSTAKER && (!values.valgtArbeidsgiver || !values.valgtArbeidsgiver.orgnummer) && !props.harStrengtFortroligAdresse) {
        feilmeldinger.valgtArbeidsgiver = 'Vennligst velg arbeidsgiver for denne sykmeldingen';
    }
    if (values.valgtArbeidssituasjon === ARBEIDSTAKER && values.valgtArbeidsgiver && values.valgtArbeidsgiver.orgnummer !== '0') {
        if (values.valgtArbeidsgiver.naermesteLeder && values.beOmNyNaermesteLeder === undefined) {
            feilmeldinger.beOmNyNaermesteLeder = `Vennligst svar på om ${values.valgtArbeidsgiver.naermesteLeder.navn} er din nærmeste leder med personalansvar`;
        }
    }

    return feilmeldinger;
};

const DinSykmeldingSkjema = reduxForm({
    form: DIN_SYKMELDING_SKJEMANAVN,
    validate,
    onSubmitFail: (error, dispatch) => {
        onSubmitFail(error, dispatch, DIN_SYKMELDING_SKJEMANAVN);
    },
})(DinSykmeldingSkjemaComponent);

export default DinSykmeldingSkjema;
