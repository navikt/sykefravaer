import React, { PropTypes } from 'react';
import { getLedetekst, Varselstripe } from 'digisyfo-npm';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { sykmeldtHarManglendeNaermesteLeder } from '../../utils/sykmeldingUtils';
import { erOppfolgingsdialogOpprettetMedArbeidsgiver } from '../../utils/oppfolgingsdialogUtils';
import Radioknapper from '../skjema/Radioknapper';

const OPPFOLGINGSKJEMANAVN = 'OPPRETT_DIALOG';

export const VelgArbeidsgiverFeilmelding = ({ oppfolgingsdialoger, arbeidsgiver }) => {
    if (erOppfolgingsdialogOpprettetMedArbeidsgiver(oppfolgingsdialoger, arbeidsgiver.virksomhetsnummer)) {
        return (<div className="velgArbeidsgiverFeilmelding">
            <img className="VelgArbeidsgiverFeilmelding__ikon" src="/sykefravaer/img/svg/varseltrekant.svg" alt="varsel" />
            <span className="VelgArbeidsgiverFeilmelding__tekst">{getLedetekst('oppfolgingsdialog.arbeidstaker.opprett.varsel.allerede-oppretettet.tekst')}</span>
        </div>);
    } else if (!arbeidsgiver.harNaermesteLeder) {
        return (<div className="velgArbeidsgiverFeilmelding">
            <img className="velgArbeidsgiverFeilmelding__ikon" src="/sykefravaer/img/svg/varseltrekant.svg" alt="varsel" />
            <span className="velgArbeidsgiverFeilmelding__tekst">{getLedetekst('oppfolgingsdialog.arbeidstaker.opprett.varsel.ingen-naermesteleder.tekst')}</span>
        </div>);
    }
    return (null);
};
VelgArbeidsgiverFeilmelding.propTypes = {
    oppfolgingsdialoger: PropTypes.array,
    arbeidsgiver: PropTypes.object,
};

export const ArbeidsgiverSkjema = ({ arbeidsgivere, oppfolgingsdialoger, handleSubmit, avbrytHref }) => {
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
                                    disabled={!arbeidsgiver.harNaermesteLeder || erOppfolgingsdialogOpprettetMedArbeidsgiver(oppfolgingsdialoger, arbeidsgiver.virksomhetsnummer)}>
                                    <VelgArbeidsgiverFeilmelding
                                        oppfolgingsdialoger={oppfolgingsdialoger}
                                        arbeidsgiver={arbeidsgiver}
                                    />
                                </input>
                            );
                        })
                    }
                </Field>
            </div>

            {
                sykmeldtHarManglendeNaermesteLeder(arbeidsgivere) &&
                <Varselstripe>
                    <p>{getLedetekst('oppfolgingsdialog.arbeidstaker.opprett.varselstripe.tekst')}</p>
                </Varselstripe>
            }

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
    oppfolgingsdialoger: PropTypes.array,
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
