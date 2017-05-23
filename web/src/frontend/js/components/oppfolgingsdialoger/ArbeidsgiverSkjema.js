import React, { PropTypes } from 'react';
import { getLedetekst } from 'digisyfo-npm';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { sykmeldtHarNaermestelederHosArbeidsgivere, sykmeldtHarManglendeNaermesteLeder } from '../../utils/sykmeldingUtils';
import { Varselstripe } from 'digisyfo-npm';

const VELG_ARBEIDSGIVER_SKJEMANAVN = 'velgArbeidsgiver';

const hentInputClassName = (harNaermesteLeder) => {
    return harNaermesteLeder ? 'skjema__input' : 'skjema__input--inaktiv';
};

const ArbeidsgiverSkjema = ({ ledetekster, arbeidsgivere, handleSubmit, avbrytHref, handleOptionChange, arbeidsgiverValg }) => {
    return (
        <form className="inngangspanel__innhold" onSubmit={handleSubmit}>
            <div className="inputgruppe">
                {
                    arbeidsgivere.map((arbeidsgiver, index) => {
                        return (
                            <div className={hentInputClassName(arbeidsgiver.harNaermesteLeder)} key={`input-${index}`}>
                                <Field
                                    className="radioknapp radioknapp--mork"
                                    name={`arbeidsgiver-${index}`}
                                    component="input"
                                    type="radio"
                                    id={`arbeidsgiver-${index}`}
                                    value={arbeidsgiver.virksomhetsnummer}
                                    onChange={handleOptionChange}
                                    checked={arbeidsgiver.virksomhetsnummer === arbeidsgiverValg}
                                    disabled={!arbeidsgiver.harNaermesteLeder}
                                />
                                <label htmlFor={`arbeidsgiver-${index}`}>
                                {arbeidsgiver.navn}
                                </label>
                                { !arbeidsgiver.harNaermesteLeder &&
                                    <div className="skjema__feilomrade">
                                        <img className="skjema__feilomrade__ikon" src="/sykefravaer/img/svg/varseltrekant.svg" alt="varsel" />
                                        <span className="skjema__feilomrade__tekst">{getLedetekst('oppfolgingsdialog.arbeidstaker.opprett.varsel.tekst', ledetekster)}</span>
                                    </div>}
                            </div>
                        );
                    })
                }
            </div>

            {sykmeldtHarManglendeNaermesteLeder(arbeidsgivere) &&
            <Varselstripe>
                <p>{getLedetekst('oppfolgingsdialog.arbeidstaker.opprett.varselstripe.tekst', ledetekster)}Les mer <Link className="lenke">her</Link></p>
            </Varselstripe>}

            <div className="knapperad">
                <button
                    type="submit"
                    className="knapp knapp--enten knapp__velgarbeidsgiver"
                    disabled={!sykmeldtHarNaermestelederHosArbeidsgivere(arbeidsgivere)}>
                    {getLedetekst('oppfolgingsdialog.arbeidstaker.knapp.velg-arbeidsgiver', ledetekster)}
                </button>
                <Link className="lenke lenke__avbryt" to={avbrytHref}>
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
