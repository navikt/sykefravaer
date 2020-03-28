/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import Panel from 'nav-frontend-paneler';
import { Knapp } from 'nav-frontend-knapper';
import * as sykmeldingActions from '../../data/din-sykmelding/dinSykmeldingActions';
import { sykmelding as sykmeldingPt } from '../../../propTypes';

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
        };
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
                    erOpplysningeneRiktige: undefined,
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
                            ? true
                            : undefined,
                        arbeidssituasjon: !prevState.sporsmal.arbeidssituasjon
                            ? true
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

    render() {
        return (
            <div>
                <p>{JSON.stringify(this.state)}</p>
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
                                ? { feilmelding: 'Du må svare på om opplysningene er riktige' }
                                : null
                        }
                    />
                </Panel>
                <Panel>
                    <RadioPanelGruppe
                        name="arbeidssituasjon"
                        legend="Hva er du sykmeldt fra?"
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
                                ? { feilmelding: 'Du må svare på hva du er sykmeldt fra' }
                                : null
                        }
                    />
                </Panel>
                <Knapp
                    onClick={() => {
                        return this.handleSubmit();
                    }}
                >
          Bekreft
                </Knapp>
            </div>
        );
    }
}

KoronaSkjemaComponent.propTypes = {
    sykmelding: sykmeldingPt,
    bekreftSykmelding: PropTypes.func,
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
