import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import {
    proptypes as motebehovProptypes,
    svarMotebehovSender,
} from 'moter-npm';
import Tekstomraade from '../../skjema/Tekstomraade';
import Radioknapper from '../../skjema/Radioknapper';

export const tekstfeltRegex = new RegExp('.*<[^ ][^>]+[^ ]>.*');

export const felterPt = PropTypes.shape({});

const SVAR_MOTEBEHOV_SKJEMANAVN = 'svarMotebehov';

/* eslint-disable max-len */
export const TEKSTER_INFORMASJON = {
    knappSend: 'Send svar',
    sensitiv: 'Ikke skriv sensitiv informasjon, for eksempel om helsen din.',
    opplysning: 'Vi bruker opplysningene også til å gjøre selve tjenesten bedre.  Les mer om hvordan NAV behandler personopplysninger.',
};
/* eslint-enable max-len */

export const FELTER = {
    harMotebehov: {
        navn: 'harMotebehov',
        spoersmaal: 'Har du behov for et møte med NAV?',
        svar: [
            {
                tekst: 'Ja, jeg vil gjerne ha et møte',
                verdi: true,
            },
            {
                tekst: 'Nei, jeg har ikke behov for møte',
                verdi: false,
            },
        ],
    },
    forklaring: {
        navn: 'forklaring',
        spoersmaal: 'Begrunnelse',
    },
};

export const VilHaMoteSvarKnapper = (
    {
        felt,
        handleOptionChange,
    }) => {
    return (<div className="skjemaelement">
        <h3
            className="skjemaelement__sporsmal"
            id={felt.navn}
        >
            {felt.spoersmaal}
        </h3>
        <Field
            id={felt.navn}
            name={felt.navn}
            component={Radioknapper}
            onChange={(event) => {
                handleOptionChange(event.target.value);
            }}
        >
            {
                felt.svar.map((svar, index) => {
                    return (<input
                        key={`vilHaMote-${index}`}
                        value={svar.verdi}
                        label={svar.tekst}
                        id={`${felt.navn}-${index}`}
                        aria-labelledby={felt.navn}
                    />);
                })
            }
        </Field>
    </div>);
};
VilHaMoteSvarKnapper.propTypes = {
    felt: felterPt,
    handleOptionChange: PropTypes.func,
};

export const MotebehovSkjemaTekstomraade = (
    {
        felt,
    }) => {
    return (<div className="skjema_element motebehovSkjemaTekstomraade">
        <h3
            className="skjemaelement__sporsmal"
            id={felt.navn}
        >
            {felt.spoersmaal}
        </h3>
        <TekstSensitiv />
        <Field
            className="input--fullbredde"
            name={felt.navn}
            id={`${felt.navn}-input`}
            aria-labelledby={felt.navn}
            component={Tekstomraade}
            placeholder={'Skriv her'}
            rows="5"
        />
    </div>);
};
MotebehovSkjemaTekstomraade.propTypes = {
    felt: felterPt,
};

export const TekstSensitiv = () => {
    return (<p className="svarMotebehovSkjema__tekstSensitiv">
        {TEKSTER_INFORMASJON.sensitiv}
    </p>);
};
export const TekstOpplysning = () => {
    const TEKSTER = {
        tekstOpplysning: {
            tekst: 'Vi bruker opplysningene du gir oss til å forbedre tjenestene våre. ',
            lenke: 'Les mer om hvordan NAV behandler personopplysninger.',
        },
    };
    return (<div className="svarMotebehovSkjema__tekstOpplysning">
        <p>
            {TEKSTER.tekstOpplysning.tekst}<a
                className="lenke"
                href="http://www.nav.no/personvern"
                title="Følg lenke">{TEKSTER.tekstOpplysning.lenke}</a>
        </p>
    </div>);
};

export class SvarMotebehovSkjemaKomponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            harBehov: null,
        };
        this.setHarBehovSvar = this.setHarBehovSvar.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    setHarBehovSvar(harBehov) {
        this.setState({
            harBehov,
        });
    }

    handleSubmit(values) {
        const {
            svarMotebehov,
            virksomhetsnrListe,
        } = this.props;
        virksomhetsnrListe.forEach((virksomhetsnr) => {
            svarMotebehov(values, virksomhetsnr);
        });
    }

    render() {
        const {
            motebehovSvarReducerListe,
            handleSubmit,
        } = this.props;
        return (<form
            className="svarMotebehovSkjema"
            onSubmit={handleSubmit(this.handleSubmit)}>
            <div className="panel">

                <VilHaMoteSvarKnapper
                    felt={FELTER.harMotebehov}
                    handleOptionChange={this.setHarBehovSvar}
                />
                {
                    this.state.harBehov === 'false' &&
                    <MotebehovSkjemaTekstomraade
                        felt={FELTER.forklaring}
                    />
                }

            </div>
            <TekstOpplysning />
            <div className="knapperad">
                <Hovedknapp
                    type="submit"
                    spinner={svarMotebehovSender(motebehovSvarReducerListe)}
                >
                    {TEKSTER_INFORMASJON.knappSend}
                </Hovedknapp>
            </div>
            <div className="knapperad">
                <Link className="lenke" to="/sykefravaer/dialogmoter">
                    Avbryt
                </Link>
            </div>
        </form>);
    }
}

SvarMotebehovSkjemaKomponent.propTypes = {
    handleSubmit: PropTypes.func,
    virksomhetsnrListe: PropTypes.arrayOf(PropTypes.string),
    motebehovSvarReducerListe: PropTypes.arrayOf(motebehovProptypes.motebehovSvarReducerPt),
    svarMotebehov: PropTypes.func,
};

const validate = (values) => {
    const feilmeldinger = {};
    const maksTekstLengde = 1000;

    if (!values.harMotebehov) {
        feilmeldinger.harMotebehov = 'Velg alternativ';
    }

    if (!values.forklaring || values.forklaring.trim().length === 0) {
        feilmeldinger.forklaring = 'Fyll inn tekst';
    } else if (values.forklaring.match(tekstfeltRegex)) {
        feilmeldinger.forklaring = 'Ugyldig spesialtegn er oppgitt';
    }
    const forklaringLengde = values.forklaring ? values.forklaring.length : 0;
    if (forklaringLengde > maksTekstLengde) {
        feilmeldinger.forklaring = `Maks ${maksTekstLengde} tegn tillatt`;
    }
    return feilmeldinger;
};

const ReduxSkjema = reduxForm({
    form: SVAR_MOTEBEHOV_SKJEMANAVN,
    validate,
})(SvarMotebehovSkjemaKomponent);

export default ReduxSkjema;
