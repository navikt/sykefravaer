import React, { PropTypes } from 'react';
import { getLedetekst } from 'digisyfo-npm';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';

const VELG_ARBEIDSGIVER_SKJEMANAVN = 'velgArbeidsgiver';

const ArbeidsgiverSkjema = ({ ledetekster, arbeidsgivere, handleSubmit, avbrytHref, handleOptionChange, arbeidsgiverValg }) => {
    return (
        <form onSubmit={handleSubmit}>
        <div className="inputgruppe">
            {
                arbeidsgivere.map((arbeidsgiver, index) => {
                    return (
                        <div className="skjema__input" key={`input-${index}`}>
                            <Field
                                className="radioknapp radioknapp--mork"
                                name={`arbeidsgiver-${index}`}
                                component="input"
                                type="radio"
                                id={`arbeidsgiver-${index}`}
                                value={arbeidsgiver.virksomhetsnummer}
                                onChange={handleOptionChange}
                                checked={arbeidsgiver.virksomhetsnummer === arbeidsgiverValg}
                            />
                            <label htmlFor={`arbeidsgiver-${index}`}>
                            {arbeidsgiver.navn}
                            </label>
                        </div>
                    );
                })
            }
        </div>
        <div className="knapperad">
            <button
                type="submit"
                className="knapp knapp--enten knapp__velgarbeidsgiver">
                {getLedetekst('oppfolgingsdialog.arbeidstaker.knapp.velg-arbeidsgiver', ledetekster)}
            </button>
            <Link className="lenke" to={avbrytHref}>
                {getLedetekst('oppfolgingsdialog.knapp.avbryt', ledetekster)}
            </Link>
        </div>
    </form>);
};

ArbeidsgiverSkjema.propTypes = {
    ledetekster: PropTypes.object,
    arbeidsgivere: PropTypes.array,
    avbrytHref: PropTypes.string,
    handleSubmit: PropTypes.func,
    handleOptionChange: PropTypes.func,
    arbeidsgiverValg: PropTypes.string,
};

const ReduxSkjema = reduxForm({
    form: VELG_ARBEIDSGIVER_SKJEMANAVN,
})(ArbeidsgiverSkjema);

export default ReduxSkjema;
