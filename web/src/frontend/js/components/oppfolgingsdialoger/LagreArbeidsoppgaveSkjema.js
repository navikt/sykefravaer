import React, { Component, PropTypes } from 'react';
import { getLedetekst } from 'digisyfo-npm';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { Varselstripe } from 'digisyfo-npm';
import Checkbox from '../skjema/Checkbox';
import Tekstfelt from '../skjema/Tekstfelt';
import Tekstomraade from '../skjema/Tekstomraade';

const LAGRE_ARBEIDSOPPGAVE_SKJEMANAVN = 'velgArbeidsgiver';
export const FELTER = {
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
        knapper: [
            'radiosvar0',
            'radiosvar1',
            'radiosvar2',
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


export const RenderTekstfelt = ({ felt }) => {
    return (
        <div className="skjema__input">
            <h3>{getLedetekst(felt.tekst)}</h3>
            <Field
                className="input--l"
                name={felt.navn}
                component={Tekstfelt}
                placeholder="Skriv in tekst"
            />
        </div>
    );
};
RenderTekstfelt.propTypes = {
    felt: PropTypes.object,
};

export const RenderTekstOmraade = ({ felt }) => {
    return (
        <div className="skjema__input">
            <h3>{getLedetekst(felt.tekst)}</h3>
            <Field
                className="input--l"
                name={felt.navn}
                component={Tekstomraade}
                placeholder="Skriv in tekst"
            />
        </div>
    );
};
RenderTekstOmraade.propTypes = {
    felt: PropTypes.object,
};

export const RenderKnapper = ({ avbrytHref, cancel, gjennomfoeringSvarValgt, selectedCheckboxes }) => {
    const avbrytKnapp = cancel ?
        <Link className="lenke lenke--avbryt" onClick={cancel}>
            {getLedetekst('oppfolgingsdialog.knapp.avbryt')}
        </Link>
        :
        <Link className="lenke lenke--avbryt" to={avbrytHref}>
            {getLedetekst('oppfolgingsdialog.knapp.avbryt')}
        </Link>;

    return (
        <div className="knapperad">
            <button
                type="submit"
                className="knapp knapperad__element"
                disabled={gjennomfoeringSvarValgt === FELTER.kanGjennomfoeres.knapper[1] && selectedCheckboxes.size === 0}>
                {getLedetekst('oppfolgingsdialog.arbeidstaker.knapp.ny-arbeidsoppgave')}
            </button>
            { avbrytKnapp }
        </div>
    );
};
RenderKnapper.propTypes = {
    avbrytHref: PropTypes.string,
    cancel: PropTypes.func,
    gjennomfoeringSvarValgt: PropTypes.string,
    selectedCheckboxes: PropTypes.any,
};

export const RenderRadioknapper = ({ gjennomfoeringSvarValgt, handleOptionChange }) => {
    return (
        <div className="inputgruppe">
            <h3>{getLedetekst('oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.skjema.gjennomfoering')}</h3>
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
                                value={FELTER.kanGjennomfoeres.knapper[index] === gjennomfoeringSvarValgt}
                                onChange={handleOptionChange}
                                checked={FELTER.kanGjennomfoeres.knapper[index] === gjennomfoeringSvarValgt}
                            />
                            <label htmlFor={`radiosvar-${index}`}>
                                {svar}
                            </label>
                        </div>
                    );
                })
            }
        </div>
    );
};
RenderRadioknapper.propTypes = {
    gjennomfoeringSvarValgt: PropTypes.string,
    handleOptionChange: PropTypes.func,
};

export const RenderCheckoxer = ({ toggleCheckbox }) => {
    return (
        <div className="inputgruppe">
            <h3>{getLedetekst('oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.skjema.tilrettelegging')}</h3>
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
                            onChange={toggleCheckbox}
                        />
                    );
                })
            }
        </div>
    );
};
RenderCheckoxer.propTypes = {
    toggleCheckbox: PropTypes.func,
};

export class LagreArbeidsoppgaveSkjema extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gjennomfoeringSvarValgt: FELTER.kanGjennomfoeres.knapper[0],
            selectedCheckboxes: new Set(),
        };
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
        this.submitArbeidsoppgave = this.submitArbeidsoppgave.bind(this);
    }
    componentDidMount() {
        this.handleInitialize();
    }
    handleInitialize() {
        const initData = {
            radiosvar0: 'true',
        };
        this.props.initialize(initData);
    }

    handleOptionChange(e) {
        this.setState({
            gjennomfoeringSvarValgt: e.target.name,
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

    submitArbeidsoppgave(values) {
        Object.assign(values, { gjennomfoeringSvarValgt: this.state.gjennomfoeringSvarValgt });
        this.props.sendArbeidsoppgave(values);
    }

    render() {
        const { avbrytHref, handleSubmit, cancel } = this.props;

        return (
            <form onSubmit={handleSubmit(this.submitArbeidsoppgave)} className="panel panel--lysblaa">

                <RenderTekstfelt felt={FELTER.arbeidsoppgavenavn} />

                <RenderRadioknapper
                    handleOptionChange={this.handleOptionChange}
                    gjennomfoeringSvarValgt={this.state.gjennomfoeringSvarValgt}
                />

                {
                    this.state.gjennomfoeringSvarValgt === FELTER.kanGjennomfoeres.knapper[1] &&
                    <RenderCheckoxer
                        toggleCheckbox={this.toggleCheckbox}
                    />
                }

                {
                    this.state.gjennomfoeringSvarValgt !== FELTER.kanGjennomfoeres.knapper[0] && <RenderTekstOmraade felt={FELTER.beskrivelse} />
                }

                {
                    this.state.gjennomfoeringSvarValgt === FELTER.kanGjennomfoeres.knapper[1] && <Varselstripe>
                        <p>{getLedetekst('oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.varselstripe.tekst')}</p>
                    </Varselstripe>
                }

                <RenderKnapper
                    avbrytHref={avbrytHref}
                    cancel={cancel}
                    gjennomfoeringSvarValgt={this.state.gjennomfoeringSvarValgt}
                    selectedCheckboxes={this.state.selectedCheckboxes}
                />
            </form>
        );
    }
}

LagreArbeidsoppgaveSkjema.propTypes = {
    avbrytHref: PropTypes.string,
    handleOptionChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    sendArbeidsoppgave: PropTypes.func,
    cancel: PropTypes.func,
    initialize: PropTypes.func,
};

function validate(values) {
    const feilmeldinger = {};

    if (!values.arbeidsoppgavenavn) {
        feilmeldinger.arbeidsoppgavenavn = 'Fyll inn navn';
    }
    const navnLengde = values.arbeidsoppgavenavn ? values.arbeidsoppgavenavn.length : 0;
    const navnMaksLengde = 120;
    if (navnLengde > navnMaksLengde) {
        feilmeldinger.arbeidsoppgavenavn = 'Maks 120 tegn tillatt';
    }
    if (!values.beskrivelse) {
        feilmeldinger.beskrivelse = 'Fyll inn beskrivelse';
    }
    const beskrivelseLengde = values.beskrivelse ? values.beskrivelse.length : 0;
    const beskrivelseMaksLengde = 2000;
    if (beskrivelseLengde > beskrivelseMaksLengde) {
        feilmeldinger.beskrivelse = 'Maks 2000 tegn tillatt';
    }
    return feilmeldinger;
}


const ReduxSkjema = reduxForm({
    form: LAGRE_ARBEIDSOPPGAVE_SKJEMANAVN,
    felter: Object.keys(FELTER),
    validate,
})(LagreArbeidsoppgaveSkjema);

export default ReduxSkjema;
