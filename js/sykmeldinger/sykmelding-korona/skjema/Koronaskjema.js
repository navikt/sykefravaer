/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import Panel from 'nav-frontend-paneler';
import { Hovedknapp, Fareknapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst } from 'nav-frontend-typografi';
import * as sykmeldingActions from '../../data/din-sykmelding/dinSykmeldingActions';
import { sykmelding as sykmeldingPt } from '../../../propTypes';
import { Vis } from '../../../utils';
import Feilstripe from '../../../components/Feilstripe';

class KoronaSkjemaComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sporsmal: {
                erOpplysningeneRiktige: undefined,
                arbeidssituasjon: undefined,
            },
            errors: {
                erOpplysningeneRiktige: undefined,
                arbeidssituasjon: undefined,
            },
            visAvbryt: false,
        };
    }

    componentDidUpdate() {
        // TODO: scrollto & focus feilmelding
    }

    handleErOpplysningeneRiktigeChange(event) {
        this.setState((prevState) => {
            return {
                sporsmal: {
                    ...prevState.sporsmal,
                    erOpplysningeneRiktige: event.target.value,
                },
                errors: {
                    ...prevState.errors,
                    erOpplysningeneRiktige: event.target.value === 'nei' ? 'Hvis opplysningene ikke stemmer, avbryter du egenmeldingen. Da kan du starte utfyllingen på nytt igjen.' : undefined,
                },
            };
        });
    }

    handleArbeidssituasjonChange(event) {
        this.setState((prevState) => {
            return {
                sporsmal: {
                    ...prevState.sporsmal,
                    arbeidssituasjon: event.target.value,
                },
                errors: {
                    ...prevState.errors,
                    arbeidssituasjon: undefined,
                },
            };
        });
    }

    handleSubmit() {
        if (
            this.state.sporsmal.erOpplysningeneRiktige === undefined
      || this.state.sporsmal.arbeidssituasjon === undefined
        ) {
            this.setState((prevState) => {
                return {
                    errors: {
                        ...prevState.errors,
                        erOpplysningeneRiktige: !prevState.sporsmal.erOpplysningeneRiktige
                            ? 'Du må svare på om opplysningene er riktige.'
                            : undefined,
                        arbeidssituasjon: !prevState.sporsmal.arbeidssituasjon
                            ? 'Du må svare på hvilket arbeid egenmeldingen gjelder.'
                            : undefined,
                    },
                };
            });
        } else {
            // Good to send :)
            // console.log(this.props.sykmelding);
            const verdier = {
                feilaktigeOpplysninger: {},
                arbeidssituasjon: this.state.sporsmal.arbeidssituasjon,
                egenmeldingsperioder: null,
            };
            this.props.bekreftSykmelding(this.props.sykmelding.id, verdier);
        }
    }

    handleCancel() {
        this.props.avbrytSykmelding(this.props.sykmelding.id, {});
    }

    render() {
        return (
            <div>
                <Panel>
                    <RadioPanelGruppe
                        name="erOpplysningeneRiktige"
                        legend="Er opplysningene riktige?"
                        radios={[
                            { label: 'Ja', value: 'ja', id: 'ja' },
                            { label: 'Nei', value: 'nei', id: 'nei' },
                        ]}
                        checked={this.state.sporsmal.erOpplysningeneRiktige}
                        onChange={(event) => {
                            event.persist();
                            return this.handleErOpplysningeneRiktigeChange(event);
                        }}
                        feil={
                            this.state.errors.erOpplysningeneRiktige
                                ? { feilmelding: this.state.errors.erOpplysningeneRiktige }
                                : null
                        }
                    />
                    <Vis hvis={this.state.sporsmal.erOpplysningeneRiktige === 'nei'}>
                        <div className="pekeboble" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Normaltekst>Er du sikker på at du vil avbryte denne egenmeldingen?</Normaltekst>
                            <Fareknapp
                                htmlType="button"
                                onClick={() => {
                                    this.handleCancel();
                                }}
                                spinner={this.props.avbryter}
                                style={{ marginTop: '1rem', marginBottom: '1rem' }}
                            >
                            Ja, jeg er sikkker
                            </Fareknapp>
                        </div>
                    </Vis>
                </Panel>
                <Panel>
                    <RadioPanelGruppe
                        name="arbeidssituasjon"
                        legend="Hvilket arbeid gjelder egenmeldingen? Har du begge roller, velger du bare en av dem."
                        radios={[
                            {
                                label: 'Selvstendig næringsdrivende',
                                value: 'NAERINGSDRIVENDE',
                                id: 'naringsdrivende',
                            },
                            { label: 'Frilanser', value: 'FRILANSER', id: 'frilanser' },
                        ]}
                        checked={this.state.sporsmal.arbeidssituasjon}
                        onChange={(event) => {
                            event.persist();
                            return this.handleArbeidssituasjonChange(event);
                        }}
                        feil={
                            this.state.errors.arbeidssituasjon
                                ? { feilmelding: this.state.errors.arbeidssituasjon }
                                : null
                        }
                    />
                </Panel>
                <Feilstripe vis={this.props.sendingFeilet || this.props.avbrytFeilet} className="blokk" />
                <div
                    style={{
                        textAlign: 'center',
                        paddingTop: '2rem',
                        paddingBottom: '2rem',
                    }}
                >
                    <Hovedknapp
                        htmlType="submit"
                        onClick={() => {
                            this.handleSubmit();
                        }}
                        spinner={this.props.sender}
                        disabled={this.state.sporsmal.erOpplysningeneRiktige === 'nei'}
                    >
                        Bekreft egenmeldingen
                    </Hovedknapp>
                    <div style={{ paddingTop: '1rem' }}>
                        <Lenke
                            onClick={(e) => {
                                e.preventDefault();
                                this.setState((prevState) => {
                                    return { ...prevState, visAvbryt: !prevState.visAvbryt };
                                });
                            }}
                        >
                            Jeg ønsker ikke å bruke denne egenmeldingen
                        </Lenke>
                    </div>
                    <Vis hvis={this.state.visAvbryt}>
                        <div className="pekeboble" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Normaltekst>Er du sikker på at du vil avbryte denne egenmeldingen?</Normaltekst>
                            <Fareknapp
                                htmlType="button"
                                onClick={() => {
                                    this.handleCancel();
                                }}
                                spinner={this.props.avbryter}
                                style={{ marginTop: '1rem', marginBottom: '1rem' }}
                            >
                            Ja, jeg er sikkker
                            </Fareknapp>
                        </div>
                    </Vis>
                </div>
            </div>
        );
    }
}

KoronaSkjemaComponent.propTypes = {
    sykmelding: sykmeldingPt,
    bekreftSykmelding: PropTypes.func,
    avbrytSykmelding: PropTypes.func,
    sender: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
    avbryter: PropTypes.bool,
    avbrytFeilet: PropTypes.bool,
};

const mapStateToProps = (state) => {
    return {
        sender: state.arbeidsgiversSykmeldinger.sender,
        sendingFeilet: state.dineSykmeldinger.sendingFeilet,
        avbryter: state.dineSykmeldinger.avbryter,
        avbrytFeilet: state.dineSykmeldinger.avbrytFeilet,
    };
};

const ConnectedSkjema = compose(connect(mapStateToProps, sykmeldingActions))(
    KoronaSkjemaComponent,
);

const KoronaSkjema = (props) => {
    return <ConnectedSkjema {...props} />;
};

KoronaSkjema.propTypes = {
    sykmelding: sykmeldingPt,
};

export default KoronaSkjema;
