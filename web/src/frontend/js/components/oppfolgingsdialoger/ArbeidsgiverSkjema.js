import React, { PropTypes } from 'react';
import { getLedetekst } from 'digisyfo-npm';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { sykmeldtHarManglendeNaermesteLeder } from '../../utils/sykmeldingUtils';
import { Varselstripe } from 'digisyfo-npm';
import Radioknapper from '../skjema/Radioknapper';

const OPPFOLGINGSKJEMANAVN = 'OPPRETT_DIALOG';

export const renderArbeidsgiverFeilomrade = (arbeidsgiver) => {
    return !arbeidsgiver.harNaermesteLeder &&
        <div className="arbeidsgiverskjema__feilomrade">
            <img className="arbeidsgiverskjema__feilomrade__ikon" src="/sykefravaer/img/svg/varseltrekant.svg" alt="varsel" />
            <span className="arbeidsgiverskjema__feilomrade__tekst">{getLedetekst('oppfolgingsdialog.arbeidstaker.opprett.varsel.tekst')}</span>
        </div>;
};

const ArbeidsgiverSkjema = ({ arbeidsgivere, handleSubmit, avbrytHref }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="inputgruppe velgarbeidsgiver__inputgruppe">
                <Field
                    name="arbeidsgiver"
                    component={Radioknapper}>
                    {
                        arbeidsgivere.map((arbeidsgiver, index) => {
                            return (
                                <input
                                    key={index}
                                    value={arbeidsgiver.virksomhetsnummer}
                                    label={arbeidsgiver.navn}
                                    children={renderArbeidsgiverFeilomrade(arbeidsgiver)}
                                    disabled={!arbeidsgiver.harNaermesteLeder} />
                            );
                        })
                    }
                </Field>
            </div>

            {sykmeldtHarManglendeNaermesteLeder(arbeidsgivere) &&
            <Varselstripe>
                <p>{getLedetekst('oppfolgingsdialog.arbeidstaker.opprett.varselstripe.tekst')}</p>
            </Varselstripe>}

            <div className="knapperad">
                <button
                    type="submit"
                    className="knapp knapperad__element">
                    {getLedetekst('oppfolgingsdialog.arbeidstaker.knapp.velg-arbeidsgiver')}
                </button>
                <Link className="lenke lenke--avbryt" to={avbrytHref}>
                    {getLedetekst('oppfolgingsdialog.knapp.avbryt')}
                </Link>
            </div>
        </form>);
};

ArbeidsgiverSkjema.propTypes = {
    arbeidsgivere: PropTypes.array,
    avbrytHref: PropTypes.string,
    handleSubmit: PropTypes.func,
};

function validate(values) {
    const feilmeldinger = {};

    if (!values.arbeidsgiver) {
        feilmeldinger.arbeidsgiver = 'Velg arbeidsgiver';
    }

    return feilmeldinger;
}

export default reduxForm({
    form: OPPFOLGINGSKJEMANAVN,
    validate,
})(ArbeidsgiverSkjema);
