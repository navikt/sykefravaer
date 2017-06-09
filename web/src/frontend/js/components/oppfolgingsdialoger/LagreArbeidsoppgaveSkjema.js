import React, { Component, PropTypes } from 'react';
import { getLedetekst } from 'digisyfo-npm';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { Varselstripe } from 'digisyfo-npm';
import Checkbox from '../skjema/Checkbox';
import Tekstfelt from '../skjema/Tekstfelt';
import Tekstomraade from '../skjema/Tekstomraade';
import Radioknapper from '../skjema/Radioknapper';

export const KANGJENNOMFOERES = {
    KAN: 'KAN',
    KAN_IKKE: 'KAN_IKKE',
    TILRETTELEGGING: 'TILRETTELEGGING',
};
export const TILRETTELEGGING = {
    PAA_ANNET_STED: 'PAA_ANNET_STED',
    MED_MER_TID: 'MED_MER_TID',
    MED_HJELP: 'MED_HJELP',
};

const LAGRE_ARBEIDSOPPGAVE_SKJEMANAVN = 'lagreArbeidsgiver';
export const FELTER = {
    arbeidsoppgavenavn: {
        navn: 'arbeidsoppgavenavn',
        tekst: 'oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.skjema.navn',
    },
    kanGjennomfoeres: {
        navn: 'gjennomfoeringSvar',
        tekst: 'oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.skjema.gjennomfoering',
        svar: [
            {
                tekst: 'Ja, den kan gjennomføres som normalt',
                verdi: KANGJENNOMFOERES.KAN,
            },
            {
                tekst: 'Ja, den kan gjennomføres med tilrettelegging',
                verdi: KANGJENNOMFOERES.TILRETTELEGGING,
            },
            {
                tekst: 'Nei, den kan ikke gjennomføres',
                verdi: KANGJENNOMFOERES.KAN_IKKE,
            },
        ],
    },
    tilrettelegging: {
        navn: 'tilrettelegging',
        tekst: 'oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.skjema.tilrettelegging',
        svar: [
            {
                tekst: 'Arbeide fra annet sted',
                navn: TILRETTELEGGING.PAA_ANNET_STED,
            },
            {
                tekst: 'Mer gitt tid',
                navn: TILRETTELEGGING.MED_MER_TID,
            },
            {
                tekst: 'Med hjelp/hjelpemidler',
                navn: TILRETTELEGGING.MED_HJELP,
            },
        ],
    },
    beskrivelse: {
        navn: 'beskrivelse',
        tekst: 'oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.tittel.skjema.forklaring',
    },
};

export const ArbeidsoppgaveNavn = ({ felt }) => {
    return (
        <div className="skjema__input">
            <h4 className="skjema__sporsmal">{getLedetekst(felt.tekst)}</h4>
            <Field
                className="input--l"
                name={felt.navn}
                component={Tekstfelt}
                placeholder="Skriv in tekst"
            />
        </div>
    );
};
ArbeidsoppgaveNavn.propTypes = {
    felt: PropTypes.object,
};

export const ArbeidsoppgaveBeskrivelse = ({ felt }) => {
    return (
        <div className="skjema__input">
            <h4 className="skjema__sporsmal">{getLedetekst(felt.tekst)}</h4>
            <Field
                className="input--l"
                name={felt.navn}
                component={Tekstomraade}
                placeholder="Skriv in tekst"
            />
        </div>
    );
};
ArbeidsoppgaveBeskrivelse.propTypes = {
    felt: PropTypes.object,
};

export const ArbeidsoppgaveKnapper = ({ avbrytHref, avbryt, gjennomfoeringSvarValgt, tilretteleggingerValgt }) => {
    const avbrytKnapp = avbryt ?
        <Link className="lenke lenke--avbryt" onClick={avbryt}>
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
                disabled={gjennomfoeringSvarValgt === KANGJENNOMFOERES.TILRETTELEGGING && tilretteleggingerValgt.size === 0}>
                {getLedetekst('oppfolgingsdialog.arbeidstaker.knapp.ny-arbeidsoppgave')}
            </button>
            { avbrytKnapp }
        </div>
    );
};
ArbeidsoppgaveKnapper.propTypes = {
    avbrytHref: PropTypes.string,
    avbryt: PropTypes.func,
    gjennomfoeringSvarValgt: PropTypes.string,
    tilretteleggingerValgt: PropTypes.any,
};

export const ArbeidsoppgaveGjennomfoeringSvar = ({ handleOptionChange }) => {
    return (
        <div className="inputgruppe">
            <h4 className="skjema__sporsmal">{getLedetekst('oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.skjema.gjennomfoering')}</h4>
            <Field
                name={ FELTER.kanGjennomfoeres.navn}
                component={Radioknapper}
                onChange={handleOptionChange}>
                {
                    FELTER.kanGjennomfoeres.svar.map((svar, index) => {
                        return (
                            <input
                                key={index}
                                value={svar.verdi}
                                label={svar.tekst}
                            />
                        );
                    })
                }
            </Field>
        </div>
    );
};
ArbeidsoppgaveGjennomfoeringSvar.propTypes = {
    handleOptionChange: PropTypes.func,
};

export const ArbeidsoppgaveTilrettelegging = ({ toggleCheckbox }) => {
    return (
        <div className="inputgruppe">
            <h4 className="skjema__sporsmal">{getLedetekst('oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.skjema.tilrettelegging')}</h4>
            {
                FELTER.tilrettelegging.svar.map((svar, index) => {
                    return (
                        <Field
                            key={`tilrettelegging-${index}`}
                            name={svar.navn}
                            component={Checkbox}
                            label={svar.tekst}
                            id={`checkbox-${index}`}
                            value={svar.tekst}
                            onChange={toggleCheckbox}
                        />
                    );
                })
            }
        </div>
    );
};
ArbeidsoppgaveTilrettelegging.propTypes = {
    toggleCheckbox: PropTypes.func,
};

export class LagreArbeidsoppgaveSkjema extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gjennomfoeringSvarValgt: KANGJENNOMFOERES.KAN,
            tilretteleggingerValgt: new Set(),
        };
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
    }
    componentDidMount() {
        this.handleInitialize();
    }
    handleInitialize() {
        const initData = {
            gjennomfoeringSvar: KANGJENNOMFOERES.KAN,
        };
        this.props.initialize(initData);
    }

    handleOptionChange(e) {
        this.setState({
            gjennomfoeringSvarValgt: e.target.value,
        });
    }

    toggleCheckbox(e) {
        const set = new Set(this.state.tilretteleggingerValgt);
        if (set.has(e.target.name)) {
            set.delete(e.target.name);
        } else {
            set.add(e.target.name);
        }
        this.setState({
            tilretteleggingerValgt: set,
        });
    }

    render() {
        const { avbrytHref, handleSubmit, avbryt } = this.props;

        return (
            <form onSubmit={handleSubmit} className="panel panel--lysblaa">

                <ArbeidsoppgaveNavn felt={FELTER.arbeidsoppgavenavn} />

                <ArbeidsoppgaveGjennomfoeringSvar
                    handleOptionChange={this.handleOptionChange}
                    gjennomfoeringSvarValgt={this.state.gjennomfoeringSvarValgt}
                />

                {
                    this.state.gjennomfoeringSvarValgt === KANGJENNOMFOERES.TILRETTELEGGING &&
                    <ArbeidsoppgaveTilrettelegging
                        toggleCheckbox={this.toggleCheckbox}
                    />
                }

                {
                    this.state.gjennomfoeringSvarValgt !== KANGJENNOMFOERES.KAN && <ArbeidsoppgaveBeskrivelse felt={FELTER.beskrivelse} />
                }

                {
                    this.state.gjennomfoeringSvarValgt === KANGJENNOMFOERES.TILRETTELEGGING && <Varselstripe>
                        <p>{getLedetekst('oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.varselstripe.tekst')}</p>
                    </Varselstripe>
                }

                <ArbeidsoppgaveKnapper
                    avbrytHref={avbrytHref}
                    avbryt={avbryt}
                    gjennomfoeringSvarValgt={this.state.gjennomfoeringSvarValgt}
                    tilretteleggingerValgt={this.state.tilretteleggingerValgt}
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
    avbryt: PropTypes.func,
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
