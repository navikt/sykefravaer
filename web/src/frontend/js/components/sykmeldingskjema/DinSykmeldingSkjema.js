import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, getFormValues } from 'redux-form';
import Knapp from 'nav-frontend-knapper';
import {
    tilDatePeriode,
    getLedetekst,
    arbeidssituasjoner,
    feilaktigeOpplysninger as feilaktigeOpplysningerEnums,
    getHtmlLedetekst,
    toDatePrettyPrint,
} from 'digisyfo-npm';
import ArbeidsgiversSykmeldingContainer from '../../containers/sykmelding/ArbeidsgiversSykmeldingContainer';
import ErOpplysningeneRiktige from './ErOpplysningeneRiktige';
import StrengtFortroligInfo from './StrengtFortroligInfo';
import AvbrytDialog from './AvbrytDialog';
import { sykmelding as sykmeldingPt } from '../../propTypes';
import FeiloppsummeringContainer, { onSubmitFail } from '../../containers/skjema/FeiloppsummeringContainer';
import validate from './validerSykmeldingskjema';
import * as sykmeldingActions from '../../actions/dinSykmelding_actions';
import { sykmeldingskjemamodi as modi } from '../../enums/sykmeldingskjemaenums';
import { getSkjemaModus } from './sykmeldingSkjemaUtils';
import SpoersmalForFrilanserOgNaeringsdrivende from './SpoersmalForFrilanserOgNaeringsdrivende';
import { Vis } from '../../utils';
import { getSykmeldingSkjemanavn } from '../../enums/skjemanavn';
import Feilstripe from '../Feilstripe';
import { utfyllingStartet } from '../../actions/metrikker_actions';
import VelgArbeidssituasjonContainer from '../../containers/sykmelding/VelgArbeidssituasjonContainer';

const { ARBEIDSTAKER, NAERINGSDRIVENDE, FRILANSER } = arbeidssituasjoner;

export class DinSykmeldingSkjemaComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.dispatch(utfyllingStartet(this.props.sykmelding.id));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.brukersSvarverdier
            && this.props.brukersSvarverdier
            && nextProps.brukersSvarverdier.opplysningeneErRiktige !== this.props.brukersSvarverdier.opplysningeneErRiktige) {
            this.setState({
                visAvbrytDialog: false,
            });
        }
    }

    getFeilaktigeOpplysninger() {
        const { brukersSvarverdier } = this.props;
        return brukersSvarverdier.feilaktigeOpplysninger
            .filter((opplysning) => {
                return opplysning.avkrysset && !brukersSvarverdier.opplysningeneErRiktige;
            })
            .reduce((acc, currentValue) => {
                return {
                    ...acc,
                    [currentValue.opplysning]: true,
                };
            }, {});
    }

    getDekningsgrad() {
        const { brukersSvarverdier } = this.props;
        return (!this.erFrilanser() || !brukersSvarverdier.harForsikring)
            ? null
            : brukersSvarverdier.dekningsgrad;
    }

    getEgenmeldingsperioder() {
        const { brukersSvarverdier } = this.props;
        return !this.erFrilanser() || !brukersSvarverdier.harAnnetFravaer
            ? null
            : brukersSvarverdier.fravaersperioder.map(tilDatePeriode);
    }

    erFrilanser() {
        const { brukersSvarverdier } = this.props;
        return [NAERINGSDRIVENDE, FRILANSER].indexOf(brukersSvarverdier.valgtArbeidssituasjon) > -1;
    }

    avbryt() {
        this.props.avbrytSykmelding(this.props.sykmelding.id, this.getFeilaktigeOpplysninger());
    }

    handleSubmit(values) {
        const { sykmelding, modus } = this.props;
        const feilaktigeOpplysninger = this.getFeilaktigeOpplysninger();

        switch (modus) {
            case modi.SEND_MED_NAERMESTE_LEDER:
            case modi.SEND: {
                this.props.sendSykmeldingTilArbeidsgiver(
                    sykmelding.id,
                    values.valgtArbeidsgiver.orgnummer,
                    feilaktigeOpplysninger,
                    values.beOmNyNaermesteLeder,
                );
                return;
            }
            case modi.BEKREFT: {
                this.props.bekreftSykmelding(
                    sykmelding.id,
                    {
                        arbeidssituasjon: values.valgtArbeidssituasjon,
                        feilaktigeOpplysninger,
                        egenmeldingsperioder: this.getEgenmeldingsperioder(),
                        harForsikring: values.harForsikring,
                        harAnnetFravaer: values.harAnnetFravaer,
                        dekningsgrad: this.getDekningsgrad(),
                    },
                );
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
        const {
            brukersSvarverdier,
            modus,
            harStrengtFortroligAdresse,
            sykmelding,
            sender,
            sendingFeilet,
            avbryter,
            avbrytFeilet,
            handleSubmit,
            visFrilansersporsmal,
            untouch } = this.props;

        return (<form
            id="dinSykmeldingSkjema"
            onSubmit={handleSubmit((v) => {
                this.handleSubmit(v);
            })}>
            <FeiloppsummeringContainer skjemanavn={getSykmeldingSkjemanavn(sykmelding.id)} />
            <h3 className="typo-innholdstittel blokk--xxs">{getLedetekst('starte-sykmelding.tittel')}</h3>
            <div className="redaksjonelt-innhold blokk" dangerouslySetInnerHTML={getHtmlLedetekst('din-sykmelding.gdpr.bruk-sykmeldingen')} />
            <ErOpplysningeneRiktige untouch={untouch} sykmelding={sykmelding} />
            <Vis
                hvis={modus !== modi.AVBRYT}
                render={() => {
                    return (<div className="blokk">
                        <VelgArbeidssituasjonContainer {...this.props} />
                        <Vis
                            hvis={brukersSvarverdier.valgtArbeidssituasjon === ARBEIDSTAKER && harStrengtFortroligAdresse}
                            render={() => {
                                return <StrengtFortroligInfo sykmeldingId={sykmelding.id} />;
                            }} />
                        <Vis
                            hvis={visFrilansersporsmal}
                            render={() => {
                                return <SpoersmalForFrilanserOgNaeringsdrivende sykmeldingId={sykmelding.id} />;
                            }} />
                    </div>);
                }}
            />
            <Vis
                hvis={brukersSvarverdier.valgtArbeidssituasjon === ARBEIDSTAKER}
                render={() => {
                    return <ArbeidsgiversSykmeldingContainer sykmeldingId={sykmelding.id} Overskrift="h4" />;
                }} />
            <Feilstripe vis={sendingFeilet || avbrytFeilet} className="blokk" />
            <Vis
                hvis={modus !== modi.SEND && modus !== modi.SEND_MED_NAERMESTE_LEDER}
                render={() => {
                    return <p className="dinSykmeldingSkjema__sendInfo">{getLedetekst(`starte-sykmelding.info.${modus.toLowerCase()}`)}</p>;
                }} />
            <div className="knapperad">
                <p className="blokk--s">
                    <Knapp
                        autoDisableVedSpinner
                        spinner={sender}
                        ref={(c) => {
                            this.submitknapp = c;
                        }}
                        id="dinSykmeldingSkjemaSubmit"
                        type={modus === modi.AVBRYT ? 'fare' : 'hoved'}>
                        {getLedetekst(`starte-sykmelding.knapp.${modus}`)}
                    </Knapp>
                </p>
                <div className="avbrytDialog">
                    <Vis
                        hvis={modus !== modi.AVBRYT}
                        render={() => {
                            return (<p className="blokk">
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
                            </p>);
                        }} />
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
    brukersSvarverdier: PropTypes.shape({
        opplysningeneErRiktige: PropTypes.bool,
    }),
    untouch: PropTypes.func,
    sendSykmeldingTilArbeidsgiver: PropTypes.func,
    bekreftHandler: PropTypes.func,
    avbrytSykmelding: PropTypes.func,
    harStrengtFortroligAdresse: PropTypes.bool,
    bekreftSykmelding: PropTypes.func,
    reset: PropTypes.func,
    modus: PropTypes.oneOf(Object.values(modi)),
    visFrilansersporsmal: PropTypes.bool,
    dispatch: PropTypes.func,
};

export const getFeilaktigeOpplysninger = () => {
    return Object.keys(feilaktigeOpplysningerEnums).map((key) => {
        return {
            opplysning: feilaktigeOpplysningerEnums[key],
        };
    });
};

export const mapStateToProps = (state, ownProps) => {
    const sykmelding = ownProps.sykmelding;
    const dinSykmelding = state.dineSykmeldinger.data.find((s) => {
        return s.id === sykmelding.id;
    });
    const sporsmal = dinSykmelding ? dinSykmelding.sporsmal : null;
    const harStrengtFortroligAdresse = state.brukerinfo.bruker.data.strengtFortroligAdresse;
    const skjemanavn = getSykmeldingSkjemanavn(sykmelding.id);
    const values = getFormValues(skjemanavn)(state) || {};

    const initialValues = {
        feilaktigeOpplysninger: getFeilaktigeOpplysninger(),
        valgtArbeidssituasjon: sporsmal
            ? sporsmal.arbeidssituasjon
            : dinSykmelding && dinSykmelding.valgtArbeidssituasjon
                ? dinSykmelding.valgtArbeidssituasjon
                : null,
    };

    if (sporsmal && sporsmal.harForsikring !== null) {
        initialValues.harForsikring = sporsmal.harForsikring;

        if (sporsmal.dekningsgrad) {
            initialValues.dekningsgrad = sporsmal.dekningsgrad;
        }
    }

    if (sporsmal && sporsmal.harAnnetFravaer !== null) {
        initialValues.harAnnetFravaer = sporsmal.harAnnetFravaer;

        if (initialValues.harAnnetFravaer) {
            initialValues.fravaersperioder = sporsmal.fravaersperioder.map((periode) => {
                const fom = new Date(periode.fom);
                const tom = new Date(periode.tom);
                return {
                    fom: toDatePrettyPrint(fom),
                    tom: toDatePrettyPrint(tom),
                };
            });
        }
    }

    const modus = getSkjemaModus(values, harStrengtFortroligAdresse);

    return {
        initialValues,
        brukersSvarverdier: values,
        harStrengtFortroligAdresse,
        modus,
        sender: state.arbeidsgiversSykmeldinger.sender,
        sendingFeilet: state.dineSykmeldinger.sendingFeilet,
        avbryter: state.dineSykmeldinger.avbryter,
        avbrytFeilet: state.dineSykmeldinger.avbrytFeilet,
    };
};

const ConnectedSkjema = compose(
    connect(mapStateToProps, sykmeldingActions),
    reduxForm({
        destroyOnUnmount: false,
        validate,
        initialValues: {
            valgtArbeidssituasjon: 'DEFAULT',
        },
        onSubmitFail: (error, dispatch, submitError, props) => {
            onSubmitFail(error, dispatch, getSykmeldingSkjemanavn(props.sykmelding.id));
        },
    }),
)(DinSykmeldingSkjemaComponent);

const DinSykmeldingSkjema = (props) => {
    return (<ConnectedSkjema
        {...props}
        form={getSykmeldingSkjemanavn(props.sykmelding.id)}
        key={getSykmeldingSkjemanavn(props.sykmelding.id)} />);
};

DinSykmeldingSkjema.propTypes = {
    sykmelding: sykmeldingPt,
};

export default DinSykmeldingSkjema;
