import React, { Component, PropTypes } from 'react';
import { getLedetekst } from 'digisyfo-npm';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { Varselstripe } from 'digisyfo-npm';
import Checkbox from '../skjema/Checkbox';
import Tekstfelt from '../skjema/Tekstfelt';
import Tekstomraade from '../skjema/Tekstomraade';
import Radioknapper from '../skjema/Radioknapper';
import { KANGJENNOMFOERES, TILRETTELEGGING } from '../../enums/arbeidsoppgavesvar';

const LAGRE_ARBEIDSOPPGAVE_SKJEMANAVN = 'lagreArbeidsgiver';
export const FELTER = {
    arbeidsoppgavenavn: {
        navn: 'arbeidsoppgavenavn',
        spoersmaal: 'oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.skjema.navn',
    },
    kanGjennomfoeres: {
        navn: 'gjennomfoeringSvar',
        spoersmaal: 'oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.skjema.gjennomfoering.sporsmal',
        svar: [
            {
                tekst: 'oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.skjema.gjennomfoering.kan',
                verdi: KANGJENNOMFOERES.KAN,
            },
            {
                tekst: 'oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.skjema.gjennomfoering.tilrettelegging',
                verdi: KANGJENNOMFOERES.TILRETTELEGGING,
            },
            {
                tekst: 'oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.skjema.gjennomfoering.kanikke',
                verdi: KANGJENNOMFOERES.KAN_IKKE,
            },
        ],
    },
    tilrettelegging: {
        navn: 'tilrettelegging',
        spoersmaal: 'oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.skjema.tilrettelegging.sporsmal',
        svar: [
            {
                tekst: 'oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.skjema.tilrettelegging.paaAnnetSted',
                navn: TILRETTELEGGING.PAA_ANNET_STED,
            },
            {
                tekst: 'oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.skjema.tilrettelegging.medMerTid',
                navn: TILRETTELEGGING.MED_MER_TID,
            },
            {
                tekst: 'oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.skjema.tilrettelegging.medHjelp',
                navn: TILRETTELEGGING.MED_HJELP,
            },
        ],
    },
    beskrivelse: {
        navn: 'beskrivelse',
        spoersmaal: 'oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.tittel.skjema.forklaring',
    },
};

export const ArbeidsoppgaveNavn = ({ felt }) => {
    return (
        <div className="lagrearbeidsoppgaveskjema__inputgruppe">
            <h4 className="skjema__sporsmal">{getLedetekst(felt.spoersmaal)}</h4>
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
        <div className="lagrearbeidsoppgaveskjema__inputgruppe">
            <h4 className="skjema__sporsmal">{getLedetekst(felt.spoersmaal)}</h4>
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

export const ArbeidsoppgaveGjennomfoeringSvar = ({ handleOptionChange, arbeidsoppgave }) => {
    const feltId = arbeidsoppgave ? `kanGjennomfoeres-${arbeidsoppgave.arbeidsoppgaveId}` : 'kanGjennomfoeres';

    return (
        <div className="lagrearbeidsoppgaveskjema__inputgruppe">
            <h4 className="skjema__sporsmal">{getLedetekst(FELTER.kanGjennomfoeres.spoersmaal)}</h4>
            <Field
                name={FELTER.kanGjennomfoeres.navn}
                component={Radioknapper}
                onChange={handleOptionChange}>
                {
                    FELTER.kanGjennomfoeres.svar.map((svar, index) => {
                        return (
                            <input
                                key={`kanGjennomfoeres-${index}`}
                                value={svar.verdi}
                                label={getLedetekst(svar.tekst)}
                                id={`${feltId}-${index}`}
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
    arbeidsoppgave: PropTypes.object,
};

export const ArbeidsoppgaveTilrettelegging = ({ toggleCheckbox, arbeidsoppgave }) => {
    const feltId = arbeidsoppgave ? `tilrettelegging-${arbeidsoppgave.arbeidsoppgaveId}` : 'tilrettelegging';

    return (
        <div className="lagrearbeidsoppgaveskjema__inputgruppe">
            <h4 className="skjema__sporsmal">{getLedetekst(FELTER.tilrettelegging.spoersmaal)}</h4>
            {
                FELTER.tilrettelegging.svar.map((svar, index) => {
                    return (
                        <Field
                            key={`tilrettelegging-${index}`}
                            name={svar.navn}
                            component={Checkbox}
                            label={getLedetekst(svar.tekst)}
                            id={`${feltId}-${index}`}
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
    arbeidsoppgave: PropTypes.object,
};


export const ArbeidsoppgaveKnapper = ({ arbeidsoppgave, avbrytHref, avbryt, gjennomfoeringSvarValgt, tilretteleggingerValgt }) => {
    const avbrytKnapp = avbryt ?
        <Link className="lenke lenke--avbryt" onClick={avbryt}>
            {getLedetekst('oppfolgingsdialog.knapp.avbryt')}
        </Link>
        :
        <Link className="lenke lenke--avbryt" to={avbrytHref}>
            {getLedetekst('oppfolgingsdialog.knapp.avbryt')}
        </Link>;

    if (arbeidsoppgave) {
        return (
            <div className="knapperad knapperad--justervenstre">
                <button
                    type="submit"
                    className="rammeknapp knapperad__element"
                    disabled={gjennomfoeringSvarValgt === KANGJENNOMFOERES.TILRETTELEGGING && tilretteleggingerValgt.size === 0}>
                    {getLedetekst('oppfolgingsdialog.arbeidstaker.knapp.lagre-arbeidsoppgave')}
                </button>
            </div>
        );
    }
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
    arbeidsoppgave: PropTypes.object,
    avbrytHref: PropTypes.string,
    avbryt: PropTypes.func,
    gjennomfoeringSvarValgt: PropTypes.string,
    tilretteleggingerValgt: PropTypes.any,
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
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.handleInitialize();
    }
    handleInitialize() {
        const arbeidsoppgave = this.props.arbeidsoppgave;
        const initData = {};

        if (arbeidsoppgave) {
            initData.gjennomfoeringSvar = arbeidsoppgave.gjennomfoering.kanGjennomfoeres;

            switch (arbeidsoppgave.gjennomfoering.kanGjennomfoeres) {
                case KANGJENNOMFOERES.TILRETTELEGGING: {
                    const set = new Set();
                    if (arbeidsoppgave.gjennomfoering.paaAnnetSted) {
                        initData.PAA_ANNET_STED = arbeidsoppgave.gjennomfoering.paaAnnetSted;
                        set.add(TILRETTELEGGING.PAA_ANNET_STED);
                    }
                    if (arbeidsoppgave.gjennomfoering.medMerTid) {
                        initData.MED_MER_TID = arbeidsoppgave.gjennomfoering.medMerTid;
                        set.add(TILRETTELEGGING.MED_MER_TID);
                    }
                    if (arbeidsoppgave.gjennomfoering.medHjelp) {
                        initData.MED_HJELP = arbeidsoppgave.gjennomfoering.medHjelp;
                        set.add(TILRETTELEGGING.MED_HJELP);
                    }
                    initData.beskrivelse = arbeidsoppgave.gjennomfoering.kanBeskrivelse;
                    this.setState({
                        gjennomfoeringSvarValgt: KANGJENNOMFOERES.TILRETTELEGGING,
                        tilretteleggingerValgt: set,
                    });
                    break;
                }
                case KANGJENNOMFOERES.KAN_IKKE: {
                    initData.beskrivelse = arbeidsoppgave.gjennomfoering.kanIkkeBeskrivelse;
                    this.setState({
                        gjennomfoeringSvarValgt: KANGJENNOMFOERES.KAN_IKKE,
                    });
                    break;
                }
                default: {
                    break;
                }
            }
        } else {
            initData.gjennomfoeringSvar = KANGJENNOMFOERES.KAN;
        }
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

    hentSkjemaClassName() {
        return this.props.arbeidsoppgave ? 'arbeidsgivertabell__rad__utvidbar' : 'panel panel--lysblaa';
    }
    handleSubmit(values) {
        const nyeVerdier = Object.assign(values);
        if (this.props.arbeidsoppgave) {
            nyeVerdier.arbeidsoppgavenavn = this.props.arbeidsoppgave.arbeidsoppgavenavn;
            nyeVerdier.arbeidsoppgaveId = this.props.arbeidsoppgave.arbeidsoppgaveId;
        }
        this.props.sendArbeidsoppgave(nyeVerdier);
    }

    render() {
        const { arbeidsoppgave, avbrytHref, handleSubmit, avbryt } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleSubmit)} className={this.hentSkjemaClassName()}>

                {
                    !arbeidsoppgave && <ArbeidsoppgaveNavn felt={FELTER.arbeidsoppgavenavn} />
                }

                <ArbeidsoppgaveGjennomfoeringSvar
                    handleOptionChange={this.handleOptionChange}
                    gjennomfoeringSvarValgt={this.state.gjennomfoeringSvarValgt}
                    arbeidsoppgave={arbeidsoppgave}
                />

                {
                    this.state.gjennomfoeringSvarValgt === KANGJENNOMFOERES.TILRETTELEGGING &&
                    <ArbeidsoppgaveTilrettelegging
                        toggleCheckbox={this.toggleCheckbox}
                        arbeidsoppgave={arbeidsoppgave}
                    />
                }

                {
                    this.state.gjennomfoeringSvarValgt !== KANGJENNOMFOERES.KAN && <ArbeidsoppgaveBeskrivelse felt={FELTER.beskrivelse} />
                }

                {
                    !arbeidsoppgave && this.state.gjennomfoeringSvarValgt !== KANGJENNOMFOERES.KAN && <Varselstripe>
                        <p>{getLedetekst('oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.varselstripe.tekst')}</p>
                    </Varselstripe>
                }

                <ArbeidsoppgaveKnapper
                    avbrytHref={avbrytHref}
                    avbryt={avbryt}
                    gjennomfoeringSvarValgt={this.state.gjennomfoeringSvarValgt}
                    tilretteleggingerValgt={this.state.tilretteleggingerValgt}
                    arbeidsoppgave={arbeidsoppgave}
                />
            </form>
        );
    }
}

LagreArbeidsoppgaveSkjema.propTypes = {
    arbeidsoppgave: PropTypes.object,
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
