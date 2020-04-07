/* eslint-disable react/destructuring-assignment */
import React, { Component, Element } from 'react';
import PropTypes from 'prop-types';
import {
    Undertittel,
    Element as ElementTekst,
    Normaltekst,
} from 'nav-frontend-typografi';
import { Radio } from 'nav-frontend-skjema';
import { scrollTo } from '@navikt/digisyfo-npm';
import { Knapp, Fareknapp } from 'nav-frontend-knapper';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Lenke from 'nav-frontend-lenker';
import * as sykmeldingActions from '../data/din-sykmelding/dinSykmeldingActions';
import { Vis } from '../../utils';
import { sykmelding as sykmeldingPt } from '../../propTypes';
import Feilstripe from '../../components/Feilstripe';

const TilUtfylling = ({ skjemaRef }) => {
    return (
        <div style={{ paddingTop: '2rem' }}>
            <ElementTekst>Da kan du sende sykmeldingen herfra</ElementTekst>
            <Normaltekst style={{ marginBottom: '1rem' }}>
        Under kan du sjekke opplysningene fra den som sykmeldte deg. Stemmer det
        med hva dere ble enige om?
            </Normaltekst>
            <Knapp
                mini
                onClick={(e) => {
                    e.preventDefault();
                    scrollTo(skjemaRef.current);
                    skjemaRef.current.focus();
                }}
            >
        Gå til utfyllingen
            </Knapp>
        </div>
    );
};

TilUtfylling.propTypes = {
    skjemaRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Object) }),
    ]),
};

const MedArbeidsgiver = ({ skjemaRef, setVisAvbryt }) => {
    return (
        <div style={{ paddingTop: '2rem' }}>
            <Normaltekst style={{ marginBottom: '1rem' }}>
        Hør med arbeidsgiveren din om det er greit at du sender sykmeldingen
        herfra i stedet. Det er en fordel for begge: Da får dere alt her, både
        sykepengesøknaden og andre meldinger som handler om sykefraværet.
        Papirsykmeldingen kan du legge bort. Det du gjør her erstatter papiret.
            </Normaltekst>
            <div style={{ marginBottom: '2rem' }}>
                <ElementTekst style={{ marginBottom: '0.5rem' }}>
          Hvis du får ja fra arbeidsgiveren din
                </ElementTekst>
                <Knapp
                    mini
                    onClick={(e) => {
                        e.preventDefault();
                        scrollTo(skjemaRef.current);
                        skjemaRef.current.focus();
                    }}
                >
          Gå til utfyllingen
                </Knapp>
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <ElementTekst style={{ marginBottom: '0.5rem' }}>
          Hvis du i stedet skal fortsette med papiret:
                </ElementTekst>
                <Knapp
                    mini
                    onClick={(e) => {
                        e.preventDefault();
                        setVisAvbryt();
                    }}
                >
          Avbryt den digitale sykmeldingen
                </Knapp>
            </div>
        </div>
    );
};

MedArbeidsgiver.propTypes = {
    skjemaRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Object) }),
    ]),
    setVisAvbryt: PropTypes.func,
};

class PapirsykmeldingPanelComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            harGittPapirsykmelding: undefined,
            visAvbryt: undefined,
        };
        this.setVisAvbryt = this.setVisAvbryt.bind(this);
    }

    setVisAvbryt() {
        this.setState({ visAvbryt: true });
    }

    handleRadioChange(event) {
        this.setState({ harGittPapirsykmelding: event.target.value });
    }

    handleCancel() {
        this.props.avbrytSykmelding(this.props.sykmelding.id);
    }

    render() {
        return (
            <React.Fragment>
                <div className="panel blokk">
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginBottom: '1rem',
                        }}
                    >
                        <img
                            style={{
                                textAlign: 'center',
                                width: '3rem',
                                height: '3rem',
                                marginBottom: '1rem',
                            }}
                            src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/blue-info.svg`}
                            alt="informasjon"
                        />
                        <Undertittel>Før du bruker sykmeldingen</Undertittel>
                        <hr style={{ width: '12rem' }} />
                    </div>
                    <Normaltekst style={{ marginBottom: '2rem' }}>
            Du har allerede fått sykmeldingen på papir av den som sykmeldte deg.
            Nå har vi skannet den slik at du kan gjøre resten digitalt.
                    </Normaltekst>

                    <div>
                        <ElementTekst style={{ marginBottom: '0.5rem' }}>
              Har du allerede gitt papirsykmeldingen videre?
                        </ElementTekst>
                        <Radio
                            label="Ja"
                            name="gittVidere"
                            value="ja"
                            checked={this.state.harGittPapirsykmelding === 'ja'}
                            onChange={(event) => {
                                event.persist();
                                return this.handleRadioChange(event);
                            }}
                        />
                        <Radio
                            label="Nei"
                            name="gittVidere"
                            value="nei"
                            checked={this.state.harGittPapirsykmelding === 'nei'}
                            onChange={(event) => {
                                event.persist();
                                return this.handleRadioChange(event);
                            }}
                        />
                    </div>
                    {this.state.harGittPapirsykmelding === 'ja' && (
                        <TilUtfylling skjemaRef={this.props.skjemaRef} />
                    )}
                    {this.state.harGittPapirsykmelding === 'nei' && (
                        <MedArbeidsgiver
                            skjemaRef={this.props.skjemaRef}
                            setVisAvbryt={this.setVisAvbryt}
                        />
                    )}
                </div>
                <div ref={this.feilstripeRef} style={{ marginBottom: '1rem' }}>
                    <Feilstripe vis={this.props.avbrytFeilet} />
                </div>
                <Vis hvis={this.state.visAvbryt}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginBottom: '4rem',
                        }}
                    >
                        <Normaltekst style={{ marginBottom: '0.5rem' }}>
              Er du sikker på at du skal fortsette med papir?
                        </Normaltekst>
                        <Normaltekst>
              Du avbryter kun den digitale sykmeldingen.
                        </Normaltekst>
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
                        <Lenke
                            onClick={() => {
                                return this.setState({ visAvbryt: false });
                            }}
                        >
              Angre
                        </Lenke>
                    </div>
                </Vis>
            </React.Fragment>
        );
    }
}

PapirsykmeldingPanelComponent.propTypes = {
    sykmelding: sykmeldingPt,
    skjemaRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ]),
    avbrytSykmelding: PropTypes.func,
    avbryter: PropTypes.bool,
    avbrytFeilet: PropTypes.bool,
};

const mapStateToProps = (state) => {
    return {
        avbryter: state.dineSykmeldinger.avbryter,
        avbrytFeilet: state.dineSykmeldinger.avbrytFeilet,
    };
};

const ConnectedPanel = compose(connect(mapStateToProps, sykmeldingActions))(
    PapirsykmeldingPanelComponent,
);

const PapirsykmeldingPanel = (props) => {
    return <ConnectedPanel {...props} />;
};

PapirsykmeldingPanel.propTypes = {
    sykmelding: sykmeldingPt,
    skjemaRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Object) }),
    ]),
};

export default PapirsykmeldingPanel;
