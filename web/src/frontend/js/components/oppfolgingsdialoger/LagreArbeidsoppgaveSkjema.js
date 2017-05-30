import React, { Component, PropTypes } from 'react';
import { getLedetekst } from 'digisyfo-npm';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { Varselstripe } from 'digisyfo-npm';
import Checkbox from '../skjema/Checkbox';
import Tekstfelt from '../skjema/Tekstfelt';
import Tekstarea from '../skjema/Tekstarea';

const LAGRE_ARBEIDSOPPGAVE_SKJEMANAVN = 'velgArbeidsgiver';
const FELTER = {
    arbeidsoppgavenavn: {
        navn: 'arbeidsoppgavenavn',
        tekst: 'oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.skjema.navn',
    },
    kanGjennomfoeres: {
        navn: 'kanGjennomfoeres',
        tekst: 'oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.skjema.gjennomfoering',
        svar: [
            'Ja, den kan gjennomføres som normalt',
            'Ja, den kan gjennomføres med tilrettelegging',
            'Nei, den kan ikke gjennomføres',
        ],
    },
    gjennomfoering: {
        navn: 'gjennomfoering',
        tekst: 'oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.skjema.tilrettelegging',
        svar: [
            'Arbeide fra annet sted',
            'Mer gitt tid',
            'Med hjelp/hjelpemidler',
        ],
    },
    beskrivelse: {
        navn: 'beskrivelse',
        tekst: 'oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.tittel.skjema.forklaring',
    },
};

export class LagreArbeidsoppgaveSkjema extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gjennomfoeringSvarValgt: FELTER.kanGjennomfoeres.svar[0],
            selectedCheckboxes: new Set(),
        };
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
    }

    handleOptionChange(e) {
        this.setState({
            gjennomfoeringSvarValgt: e.target.value,
            gjennomfoeringIkkeValgt: true,
        });
    }

    toggleCheckbox(e) {
        const set = new Set(this.state.selectedCheckboxes);
        if (set.has(e.target.name)) {
            set.delete(e.target.name);
        } else {
            set.add(e.target.name);
        }
        this.setState({
            selectedCheckboxes: set,
        });
    }

    renderTextfelt(felt, ledetekster) {
        return (
            <div className="skjema__input">
                <h3>{getLedetekst(felt.tekst, ledetekster)}</h3>
                <Field
                    className="input--l"
                    name={felt.navn}
                    component={Tekstfelt}
                    placeholder="Skriv in tekst"
                />
            </div>
        );
    }

    renderTextArea(felt, ledetekster) {
        return (
            <div className="skjema__input">
                <h3>{getLedetekst(felt.tekst, ledetekster)}</h3>
                <Field
                    className="input--l"
                    name={felt.navn}
                    component={Tekstarea}
                    placeholder="Skriv in tekst"
                />
            </div>
        );
    }

    renderKnapper(avbrytHref, cancel, ledetekster) {
        const avbrytKnapp = cancel ?
            <Link className="lenke lenke__avbryt" onClick={cancel}>
                {getLedetekst('oppfolgingsdialog.knapp.avbryt', ledetekster)}
            </Link>
            :
            <Link className="lenke lenke__avbryt" to={avbrytHref}>
                {getLedetekst('oppfolgingsdialog.knapp.avbryt', ledetekster)}
            </Link>;

        return (
            <div className="knapperad">
                <button
                    type="submit"
                    className="knapp knapp__opprettarbeidsoppgave"
                    disabled={this.state.gjennomfoeringSvarValgt === FELTER.kanGjennomfoeres.svar[1] && this.state.selectedCheckboxes.size === 0}>
                    {getLedetekst('oppfolgingsdialog.arbeidstaker.knapp.ny-arbeidsoppgave', ledetekster)}
                </button>
                { avbrytKnapp }
            </div>
        );
    }


    render() {
        const { ledetekster, avbrytHref, handleSubmit, sendArbeidsoppgave, cancel } = this.props;

        return (
            <form onSubmit={handleSubmit(sendArbeidsoppgave)} className="panel panel--lysblaa">

                {this.renderTextfelt(FELTER.arbeidsoppgavenavn, ledetekster)}

                <div className="inputgruppe">
                    <h3>{getLedetekst('oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.skjema.gjennomfoering', ledetekster)}</h3>
                    {
                        FELTER.kanGjennomfoeres.svar.map((svar, index) => {
                            return (
                                <div className="skjema__input" key={`kanGjennomfoeres-${index}`}>
                                    <Field
                                        className="radioknapp radioknapp--mork"
                                        name={`radiosvar${index}`}
                                        component={"input"}
                                        type="radio"
                                        id={`radiosvar-${index}`}
                                        value={svar}
                                        onChange={this.handleOptionChange}
                                        checked={svar === this.state.gjennomfoeringSvarValgt}
                                    />
                                    <label htmlFor={`radiosvar-${index}`}>
                                        {svar}
                                    </label>
                                </div>
                            );
                        })
                    }
                </div>

                {
                    this.state.gjennomfoeringSvarValgt === FELTER.kanGjennomfoeres.svar[1] &&

                    <div className="inputgruppe">
                        <h3>{getLedetekst('oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.skjema.tilrettelegging', ledetekster)}</h3>
                        {
                            FELTER.gjennomfoering.svar.map((svar, index) => {
                                return (
                                        <Field
                                            key={`gjennomfoering-${index}`}
                                            name={`checkboks${index}`}
                                            component={Checkbox}
                                            label={svar}
                                            id={`checkbox-${index}`}
                                            value={svar}
                                            onChange={this.toggleCheckbox}
                                        />
                                );
                            })
                        }
                    </div>
                }

                {
                    this.state.gjennomfoeringSvarValgt === FELTER.kanGjennomfoeres.svar[1] && this.renderTextArea(FELTER.beskrivelse, ledetekster)
                }

                {
                    this.state.gjennomfoeringSvarValgt === FELTER.kanGjennomfoeres.svar[1] && <Varselstripe>
                        <p>{getLedetekst('oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.varselstripe.tekst', ledetekster)}</p>
                    </Varselstripe>
                }

                { this.renderKnapper(avbrytHref, cancel, ledetekster) }
            </form>
        );
    }
}

LagreArbeidsoppgaveSkjema.propTypes = {
    ledetekster: PropTypes.object,
    avbrytHref: PropTypes.string,
    handleOptionChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    sendArbeidsoppgave: PropTypes.func,
    cancel: PropTypes.func,
};

function validate(values) {
    const feilmeldinger = {};

    if (!values.arbeidsoppgavenavn) {
        feilmeldinger.arbeidsoppgavenavn = 'Fyll inn navn';
    }
    if (!values.beskrivelse) {
        feilmeldinger.beskrivelse = 'Fyll inn beskrivelse';
    }

    return feilmeldinger;
}


const ReduxSkjema = reduxForm({
    form: LAGRE_ARBEIDSOPPGAVE_SKJEMANAVN,
    felter: Object.keys(FELTER),
    validate,
})(LagreArbeidsoppgaveSkjema);

export default ReduxSkjema;
