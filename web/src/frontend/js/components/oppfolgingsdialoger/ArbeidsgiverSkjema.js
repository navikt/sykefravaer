import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from 'digisyfo-npm';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { getContextRoot } from '../../routers/paths';
import {
    erAktivOppfolgingsdialogOpprettetMedArbeidsgiver,
    erOppfolgingsdialogOpprettbarMedArbeidsgiver,
    erOppfolgingsdialogOpprettbarMedMinstEnArbeidsgiver,
    hentAktivOppfolgingsdialogOpprettetMedArbeidsgiver,
} from '../../utils/oppfolgingsdialogUtils';
import { fieldPropTypes } from '../../propTypes';
import Radioknapper from '../skjema/Radioknapper';

const OPPFOLGINGSKJEMANAVN = 'OPPRETT_DIALOG';

export const VelgArbeidsgiverUndertekst = ({ oppfolgingsdialoger, arbeidsgiver }) => {
    if (erAktivOppfolgingsdialogOpprettetMedArbeidsgiver(oppfolgingsdialoger, arbeidsgiver.virksomhetsnummer)) {
        const oppfolgingsdialog = hentAktivOppfolgingsdialogOpprettetMedArbeidsgiver(oppfolgingsdialoger, arbeidsgiver.virksomhetsnummer);
        return (<div className="velgArbeidsgiverUndertekst">
            <span className="velgArbeidsgiverUndertekst__tekst">
                {getLedetekst('oppfolgingsdialog.arbeidstaker.opprett.varsel.allerede-oppretettet.tekst')}
            </span>
            <div className="velgArbeidsgiverUndertekst__lenke">
                <Link className="lenke" to={`${getContextRoot()}/oppfolgingsplaner/${oppfolgingsdialog.oppfoelgingsdialogId}`}>Gå til planen</Link>
            </div>
        </div>);
    } else if (!arbeidsgiver.harNaermesteLeder) {
        return (<div className="velgArbeidsgiverUndertekst">
            <img className="velgArbeidsgiverUndertekst__ikon" src={`${getContextRoot()}/img/svg/varseltrekant.svg`} alt="varsel" />
            <span className="velgArbeidsgiverUndertekst__tekst">
                {getLedetekst('oppfolgingsdialog.arbeidstaker.opprett.varsel.ingen-naermesteleder.tekst')}
            </span>
        </div>);
    } else if (arbeidsgiver.naermesteLeder) {
        return (<div className="velgArbeidsgiverUndertekst">
            <span className="velgArbeidsgiverUndertekst__tekst">
                {getLedetekst('oppfolgingsdialog.arbeidstaker.opprett.varsel.naermeste-leder-navn', {
                    '%NAVN%': arbeidsgiver.naermesteLeder,
                })}
            </span>
        </div>);
    }
    return (null);
};
VelgArbeidsgiverUndertekst.propTypes = {
    oppfolgingsdialoger: PropTypes.array,
    arbeidsgiver: PropTypes.object,
};
export const VelgArbeidsgiverRadioKnapper = ({ input, meta, oppfolgingsdialoger, arbeidsgivere }) => {
    return (
        <Radioknapper
            input={input}
            meta={meta}
            visUndertekst
        >
            {
                arbeidsgivere.map((arbeidsgiver, index) => {
                    return (
                        <input
                            key={index}
                            value={arbeidsgiver.virksomhetsnummer}
                            label={arbeidsgiver.navn}
                            disabled={!erOppfolgingsdialogOpprettbarMedArbeidsgiver(oppfolgingsdialoger, arbeidsgiver)}>
                            <VelgArbeidsgiverUndertekst
                                oppfolgingsdialoger={oppfolgingsdialoger}
                                arbeidsgiver={arbeidsgiver}
                            />
                        </input>
                    );
                })
            }
        </Radioknapper>
    );
};
VelgArbeidsgiverRadioKnapper.propTypes = {
    input: fieldPropTypes.input,
    meta: fieldPropTypes.meta,
    oppfolgingsdialoger: PropTypes.array,
    arbeidsgivere: PropTypes.array,
};

export const ArbeidsgiverSkjema = ({ arbeidsgivere, oppfolgingsdialoger, handleSubmit, avbrytHref }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="inputgruppe velgarbeidsgiver__inputgruppe">
                <Field
                    name="arbeidsgiver"
                    component={VelgArbeidsgiverRadioKnapper}
                    oppfolgingsdialoger={oppfolgingsdialoger}
                    arbeidsgivere={arbeidsgivere}
                />
            </div>

            <div className="knapperad">
                <button
                    type="submit"
                    className="knapp knapperad__element"
                    disabled={!erOppfolgingsdialogOpprettbarMedMinstEnArbeidsgiver(oppfolgingsdialoger, arbeidsgivere)}>
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
