import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Hovedknapp } from 'nav-frontend-knapper';
import { connect } from 'react-redux';
import { Field, reduxForm, getFormValues } from 'redux-form';
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

export const Knapper = ({ motebehovSvarReducerListe }) => {
    return (<Fragment>
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
    </Fragment>);
};
Knapper.propTypes = {
    motebehovSvarReducerListe: PropTypes.arrayOf(motebehovProptypes.motebehovSvarReducerPt),
};


export class SvarMotebehovSkjemaKomponent extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            harMotebehov,
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
                { harMotebehov === 'false' &&
                    <MotebehovSkjemaTekstomraade felt={FELTER.forklaring} />
                }
            </div>

            <TekstOpplysning />

            <Knapper motebehovSvarReducerListe={motebehovSvarReducerListe} />
        </form>);
    }
}

SvarMotebehovSkjemaKomponent.propTypes = {
    harMotebehov: PropTypes.string,
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

const mapStateToProps = (state) => {
    const values = getFormValues(SVAR_MOTEBEHOV_SKJEMANAVN)(state) || {};
    return {
        harMotebehov: values.harMotebehov,
    };
};

const SvarMotebehovSkjema = reduxForm({
    form: SVAR_MOTEBEHOV_SKJEMANAVN,
    validate,
})(SvarMotebehovSkjemaKomponent);

const Skjema = connect(mapStateToProps)(SvarMotebehovSkjema);

export default Skjema;
