/* eslint arrow-body-style: ["error", "as-needed"] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getFormValues, reduxForm } from 'redux-form';
import Knapp from 'nav-frontend-knapper';
import {
    arbeidssituasjoner,
    Bjorn,
    feilaktigeOpplysninger as feilaktigeOpplysningerEnums,
    tilDatePeriode,
    toDatePrettyPrint,
} from '@navikt/digisyfo-npm';
import ArbeidsgiversSykmeldingContainer from '../../../arbeidsgivers-sykmelding/ArbeidsgiversSykmeldingContainer';
import ErOpplysningeneRiktige from '../er-opplysningene-riktige/ErOpplysningeneRiktige';
import StrengtFortroligInfo from '../strengt-fortroliginfo/StrengtFortroligInfo';
import AvbrytDialog from '../avbryt/AvbrytDialog';
import { sykmelding as sykmeldingPt } from '../../../../propTypes';
import FeiloppsummeringContainer, { onSubmitFail } from '../../../../containers/skjema/FeiloppsummeringContainer';
import validate from './validerSykmeldingskjema';
import * as sykmeldingActions from '../../../data/din-sykmelding/dinSykmeldingActions';
import { sykmeldingskjemamodi as modi } from '../../../enums/sykmeldingskjemaenums';
import { getSkjemaModus } from './sykmeldingSkjemaUtils';
import SpoersmalForFrilanserOgNaeringsdrivende from '../sporsmal-for-frilansere/SpoersmalForFrilanserOgNaeringsdrivende';
import { Vis } from '../../../../utils/index';
import { getSykmeldingSkjemanavn } from '../../../../enums/skjemanavn';
import Feilstripe from '../../../../components/Feilstripe';
import { utfyllingStartet } from '../../../../data/metrikker/metrikker_actions';
import VelgArbeidssituasjonContainer from '../velg-arbeidssituasjon/VelgArbeidssituasjonContainer';
import * as brukerinfoSelectors from '../../../../data/brukerinfo/brukerinfoSelectors';

const { ARBEIDSTAKER, NAERINGSDRIVENDE, FRILANSER, ARBEIDSLEDIG } = arbeidssituasjoner;

export class DinSykmeldingSkjemaComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { dispatch, sykmelding } = this.props;
        dispatch(utfyllingStartet(sykmelding.id));
    }

    componentWillReceiveProps(nextProps) {
        const { brukersSvarverdier } = this.props;
        if (nextProps.brukersSvarverdier
            && brukersSvarverdier
            && nextProps.brukersSvarverdier.opplysningeneErRiktige !== brukersSvarverdier.opplysningeneErRiktige) {
            this.setState({
                visAvbrytDialog: false,
            });
        }
    }

    getFeilaktigeOpplysninger() {
        const { brukersSvarverdier } = this.props;
        return brukersSvarverdier.feilaktigeOpplysninger
            .filter(opplysning => opplysning.avkrysset && !brukersSvarverdier.opplysningeneErRiktige)
            .reduce((acc, currentValue) => ({ ...acc, [currentValue.opplysning]: true }), {});
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
        const { avbrytSykmelding, sykmelding } = this.props;
        avbrytSykmelding(sykmelding.id, this.getFeilaktigeOpplysninger());
    }

    handleSubmit(values) {
        const {
            sykmelding, modus, sendSykmeldingTilArbeidsgiver, bekreftSykmelding,
        } = this.props;
        const feilaktigeOpplysninger = this.getFeilaktigeOpplysninger();

        switch (modus) {
            case modi.SEND_MED_NAERMESTE_LEDER:
            case modi.SEND: {
                sendSykmeldingTilArbeidsgiver(
                    sykmelding.id,
                    values.valgtArbeidsgiver.orgnummer,
                    feilaktigeOpplysninger,
                    values.beOmNyNaermesteLeder,
                );
                return;
            }
            case modi.BEKREFT: {
                bekreftSykmelding(
                    sykmelding.id,
                    {
                        arbeidssituasjon: values.valgtArbeidssituasjon,
                        feilaktigeOpplysninger,
                        egenmeldingsperioder: this.getEgenmeldingsperioder(),
                        harForsikring: values.harForsikring,
                        harAnnetFravaer: values.harAnnetFravaer,
                    },
                );
                return;
            }
            case modi.AVBRYT: {
                this.setState(prevState => ({
                    visAvbrytDialog: !prevState.visAvbrytDialog,
                }));
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
            untouch,
        } = this.props;

        const { visAvbrytDialog } = this.state;

        return (
            <form
                id="dinSykmeldingSkjema"
                onSubmit={handleSubmit((v) => {
                    this.handleSubmit(v);
                })}>
                <FeiloppsummeringContainer skjemanavn={getSykmeldingSkjemanavn(sykmelding.id)} />
                <ErOpplysningeneRiktige untouch={untouch} sykmelding={sykmelding} />
                <Vis
                    hvis={modus !== modi.AVBRYT}
                    render={() => (
                        <div className="blokk">
                            <VelgArbeidssituasjonContainer {...this.props} />
                            <Vis
                                hvis={brukersSvarverdier.valgtArbeidssituasjon === ARBEIDSTAKER && harStrengtFortroligAdresse}
                                render={() => <StrengtFortroligInfo sykmeldingId={sykmelding.id} />} />
                            <Vis
                                hvis={visFrilansersporsmal}
                                render={() => <SpoersmalForFrilanserOgNaeringsdrivende sykmeldingId={sykmelding.id} />} />
                        </div>
                    )}
                />
                <Vis
                    hvis={sykmelding.mulighetForArbeid.perioder.some(periode => periode.behandlingsdager !== null)}
                    render={() => {
                        if (brukersSvarverdier.valgtArbeidssituasjon === ARBEIDSLEDIG) {
                            return <Bjorn className="blokk" hvit stor nokkel="sykmelding.behandlingsdager-arbeidsledig.bjorn" />;
                        }
                        if (brukersSvarverdier.valgtArbeidssituasjon === ARBEIDSTAKER
                            || brukersSvarverdier.valgtArbeidssituasjon === FRILANSER
                            || brukersSvarverdier.valgtArbeidssituasjon === NAERINGSDRIVENDE) {
                            return <Bjorn className="blokk" hvit stor nokkel="sykmelding.behandlingsdager.bjorn" />;
                        }
                        return null;
                    }}
                />
                <Vis
                    hvis={brukersSvarverdier.valgtArbeidssituasjon === ARBEIDSTAKER}
                    render={() => <ArbeidsgiversSykmeldingContainer sykmeldingId={sykmelding.id} Overskrift="h4" />} />
                <Feilstripe vis={sendingFeilet || avbrytFeilet} className="blokk" />
                <Vis
                    hvis={modus !== modi.SEND && modus !== modi.SEND_MED_NAERMESTE_LEDER}
                    render={() => (
                        <p className="dinSykmeldingSkjema__sendInfo">
                            {`Å ${modus.toLowerCase()}e sykmeldingen betyr at du er enig i innholdet, og at du ønsker å ta den i bruk`}
                        </p>
                    )} />
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
                            {`${modus === modi.SEND_MED_NAERMESTE_LEDER ? 'SEND' : modus} egenerklæringen`}
                        </Knapp>
                    </p>
                    <div className="avbrytDialog">
                        <Vis
                            hvis={modus !== modi.AVBRYT}
                            render={() => (
                                <p className="blokk">
                                    {/* TODO: Bruk knappelenkestyling i stedet for <a/> som knapp */}
                                    {/* eslint-disable-next-line */}
                                    <a
                                        href="#"
                                        role="button"
                                        tabIndex="0"
                                        aria-pressed={visAvbrytDialog}
                                        className="lenke"
                                        ref={(c) => {
                                            this.triggAvbrytdialogKnapp = c;
                                        }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            this.setState({
                                                visAvbrytDialog: !visAvbrytDialog,
                                            });
                                        }}
                                    >
                                        Jeg ønsker ikke å bruke denne egenerklæringen
                                    </a>
                                </p>
                            )} />
                        <AvbrytDialog
                            vis={visAvbrytDialog}
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
            </form>
        );
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
        feilaktigeOpplysninger: PropTypes.arrayOf(PropTypes.shape()),
        valgtArbeidssituasjon: PropTypes.string,
        fravaersperioder: PropTypes.arrayOf(PropTypes.shape()),
        harAnnetFravaer: PropTypes.bool,
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
    visAvbrytDialog: PropTypes.bool,
};

export const getFeilaktigeOpplysninger = () => Object.keys(feilaktigeOpplysningerEnums)
    .map(key => ({
        opplysning: feilaktigeOpplysningerEnums[key],
    }));

export const mapStateToProps = (state, ownProps) => {
    const { sykmelding } = ownProps;
    const dinSykmelding = state.dineSykmeldinger.data.find(s => s.id === sykmelding.id);
    const sporsmal = dinSykmelding ? dinSykmelding.sporsmal : null;
    const harStrengtFortroligAdresse = brukerinfoSelectors.harStrengtFortroligAdresseSelector(state);
    const values = getFormValues(getSykmeldingSkjemanavn(sykmelding.id))(state) || {};
    const valgtArbeidssituasjon = sporsmal
        ? sporsmal.arbeidssituasjon
        : dinSykmelding && dinSykmelding.valgtArbeidssituasjon
            ? dinSykmelding.valgtArbeidssituasjon
            : null;
    const initialValues = {
        feilaktigeOpplysninger: getFeilaktigeOpplysninger(),
        valgtArbeidssituasjon,
        valgtArbeidssituasjonShadow: valgtArbeidssituasjon,
    };

    if (sporsmal && sporsmal.harForsikring !== null) {
        initialValues.harForsikring = sporsmal.harForsikring;
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
        arbeidsgivere: state.arbeidsgivere.data,
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
        onSubmitFail: (error, dispatch, submitError, props) => {
            onSubmitFail(error, dispatch, getSykmeldingSkjemanavn(props.sykmelding.id));
        },
    }),
)(DinSykmeldingSkjemaComponent);

const DinSykmeldingSkjema = (props) => {
    const { sykmelding } = props;
    return (
        <ConnectedSkjema
            {...props}
            form={getSykmeldingSkjemanavn(sykmelding.id)}
            key={getSykmeldingSkjemanavn(sykmelding.id)} />
    );
};

DinSykmeldingSkjema.propTypes = {
    sykmelding: sykmeldingPt,
};

export default DinSykmeldingSkjema;
