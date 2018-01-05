import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { getLedetekst } from 'digisyfo-npm';
import {
    proptypes as oppfolgingProptypes,
} from 'oppfolgingsdialog-npm';
import { getContextRoot } from '../../routers/paths';
import {
    erAktivOppfolgingsdialogOpprettetMedArbeidsgiver,
    erOppfolgingsdialogOpprettbarMedArbeidsgiver,
    erOppfolgingsdialogOpprettbarMedMinstEnArbeidsgiver,
    hentAktivOppfolgingsdialogOpprettetMedArbeidsgiver,
} from '../../utils/oppfolgingsdialogUtils';
import {
    fieldPropTypes,
    opprettOppfolgingArbeidsgiverPt,
} from '../../propTypes';
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
                <Link className="lenke" to={`${getContextRoot()}/oppfolgingsplaner/${oppfolgingsdialog.id}`}>Gå til planen</Link>
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
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingProptypes.oppfolgingsdialogPt),
    arbeidsgiver: opprettOppfolgingArbeidsgiverPt,
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
                        <i
                            key={index}
                            value={arbeidsgiver.virksomhetsnummer}
                            label={arbeidsgiver.navn}
                            disabled={!erOppfolgingsdialogOpprettbarMedArbeidsgiver(oppfolgingsdialoger, arbeidsgiver)}>
                            <VelgArbeidsgiverUndertekst
                                oppfolgingsdialoger={oppfolgingsdialoger}
                                arbeidsgiver={arbeidsgiver}
                            />
                        </i>
                    );
                })
            }
        </Radioknapper>
    );
};
VelgArbeidsgiverRadioKnapper.propTypes = {
    input: fieldPropTypes.input,
    meta: fieldPropTypes.meta,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingProptypes.oppfolgingsdialogPt),
    arbeidsgivere: PropTypes.arrayOf(opprettOppfolgingArbeidsgiverPt),
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
                <Link className="lenke lenke--avbryt knapperad__element" to={avbrytHref}>
                    {getLedetekst('oppfolgingsdialog.knapp.avbryt')}
                </Link>
            </div>
        </form>);
};

ArbeidsgiverSkjema.propTypes = {
    arbeidsgivere: PropTypes.arrayOf(opprettOppfolgingArbeidsgiverPt),
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingProptypes.oppfolgingsdialogPt),
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
const ArbeidsgiverSkjemaForm = reduxForm({
    form: OPPFOLGINGSKJEMANAVN,
    validate,
})(ArbeidsgiverSkjema);

export default ArbeidsgiverSkjemaForm;
