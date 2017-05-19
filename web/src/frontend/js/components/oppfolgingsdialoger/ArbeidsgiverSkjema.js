import React, { PropTypes } from 'react';
import { getLedetekst } from 'digisyfo-npm';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';

const VELG_ARBEIDSGIVER_SKJEMANAVN = 'velgArbeidsgiver';

const ArbeidsgiverSkjema = ({ ledetekster, arbeidsgivere, handleSubmit, avbrytHref }) => {
    return (
        <form onSubmit={handleSubmit}>
        <div className="inputgruppe">
            {
                arbeidsgivere.map((arbeidsgiver, index) => {
                    return (
                        <div className="skjema__input">
                            <Field
                                className="radioknapp radioknapp--mork"
                                name={`arbeidsgiver-${index}`}
                                component="input"
                                type="radio"
                                id={`arbeidsgiver-${index}`}
                                key={index}
                                value={arbeidsgiver.navn}
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
};

const ReduxSkjema = reduxForm({
    form: VELG_ARBEIDSGIVER_SKJEMANAVN,
})(ArbeidsgiverSkjema);

export default ReduxSkjema;
