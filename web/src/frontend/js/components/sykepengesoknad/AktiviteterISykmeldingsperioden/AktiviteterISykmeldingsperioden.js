import React, { PropTypes } from 'react';
import SykepengerSkjema from '../SykepengerSkjema';
import { Field, FieldArray } from 'redux-form';
import history from '../../../history';
import setup from '../setup';
import JaEllerNei, { JaEllerNeiRadioknapper, parseJaEllerNei } from '../JaEllerNei';
import Datovelger from '../../skjema/Datovelger';
import Perioder from './Perioder';
import AndreInntektskilder from './AndreInntektskilder';
import { Link } from 'react-router';
import Knapperad from '../../skjema/Knapperad';

const UtdanningStartDato = () => {
    return (<div className="blokk">
        <label className="skjema__sporsmal" htmlFor="utdanningStartdato">Når startet du på utdanningen?</label>
        <Datovelger name="utdanningStartdato" id="utdanningStartdato" />
    </div>);
};

const AktiviteterISykmeldingsperioden = ({ handleSubmit, sykmelding }) => {
    const onSubmit = () => {
        history.push('/sykepenger/oppsummering');
    };

    return (<SykepengerSkjema aktivtSteg="2" tittel="Aktiviteter i sykmeldingsperioden">
        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldArray component={Perioder} fields={sykmelding.mulighetForArbeid.perioder} name="perioder" />

            <JaEllerNei
                name="harAndreInntektskilder"
                spoersmal="Har du andre inntektskilder enn SOLSTRÅLEN BARNEHAGE?">
                <AndreInntektskilder />
            </JaEllerNei>

            <JaEllerNei
                name="underUtdanning"
                spoersmal="Har du vært under utdanning i løpet av perioden 01.01.2017 – 31.01.2017?">
                <UtdanningStartDato />
                <Field
                    component={JaEllerNeiRadioknapper}
                    name="erUtdanningFulltidsstudium"
                    parse={parseJaEllerNei}
                    spoersmal="Er utdanningen et fulltidsstudium?"
                    Overskrift="h4" />
            </JaEllerNei>

            <Knapperad variant="knapperad--forrigeNeste">
                <Link to="/sykepenger/fravaer-og-friskmelding" className="rammeknapp">Tilbake</Link>
                <button type="submit" className="knapp">Gå videre</button>
            </Knapperad>
        </form>
    </SykepengerSkjema>);
};

AktiviteterISykmeldingsperioden.propTypes = {
    handleSubmit: PropTypes.func,
    sykmelding: PropTypes.object,
};

const validerPerioder = (values, sykmeldingPerioder) => {
    const feil = sykmeldingPerioder.map((periode, index) => {
        const jobbetMerEnnPlanlagt = (!values || !values.perioder || !values.perioder[index] || values.perioder[index].jobbetMerEnnPlanlagt === undefined) ? 'Du må svare på om du har jobbet mer enn planlagt' : undefined;
        const gjennomsnittPerUke = (() => {
            const enhetFeil = 'Vennligst oppgi enhet';
            const antallFeil = 'Vennligst oppgi antall';
            const normaltAntallFeil = 'Vennligst oppgi normalt antall';
            const res = {};
            if (!values || !values.perioder || !values.perioder[index]) {
                res.enhet = enhetFeil;
                res.antall = antallFeil;
                if (periode.grad === 100) {
                    res.normaltAntall = normaltAntallFeil;
                }
                return res;
            }
            if (!values.perioder[index].gjennomsnittPerUke || !values.perioder[index].gjennomsnittPerUke.antall) {
                res.antall = antallFeil;
            }
            if (!values.perioder[index].gjennomsnittPerUke || !values.perioder[index].gjennomsnittPerUke.enhet) {
                res.enhet = enhetFeil;
            }
            if (periode.grad === 100 && (!values.perioder[index].gjennomsnittPerUke || !values.perioder[index].gjennomsnittPerUke.normaltAntall)) {
                res.normaltAntall = normaltAntallFeil;
            }
            return res;
        })();

        const f = { gjennomsnittPerUke };
        if (jobbetMerEnnPlanlagt) {
            f.jobbetMerEnnPlanlagt = jobbetMerEnnPlanlagt;
        }
        return f;
    });

    const erSvarFeil = feil.filter((f) => {
        return f.jobbetMerEnnPlanlagt;
    }).length > 0;

    if (erSvarFeil) {
        return feil;
    }
    return undefined;
};

const getAntallAvkryssedeInntektstkilder = (inntektskilder = []) => {
    const avkryssede = [];
    for (const inntektskilde in inntektskilder) {
        if (inntektskilder[inntektskilde].avkrysset) {
            avkryssede.push(inntektskilde);
        }
    }
    return avkryssede.length;
};

export const validate = (values, props) => {
    const sykmelding = props.sykmelding;
    const feilmeldinger = {};
    if (values.harAndreInntektskilder === undefined) {
        feilmeldinger.harAndreInntektskilder = 'Du må svare på om du har andre inntektskilder';
    } else if (values.harAndreInntektskilder) {
        if (getAntallAvkryssedeInntektstkilder(values.andreInntektskilder) === 0) {
            feilmeldinger.andreInntektskilder = {
                _error: 'Vennligst oppgi hvilke andre inntektskilder du har',
            };
        } else {
            const andreInntektskilderFeilmeldinger = {};
            for (const inntektskilde in values.andreInntektskilder) {
                if (values.andreInntektskilder[inntektskilde].avkrysset && values.andreInntektskilder[inntektskilde].sykmeldt === undefined) {
                    andreInntektskilderFeilmeldinger[inntektskilde] = {
                        sykmeldt: 'Vennligst svar på om du er sykmeldt',
                    };
                }
            }
            feilmeldinger.andreInntektskilder = andreInntektskilderFeilmeldinger;
        }
    }
    if (values.underUtdanning === undefined) {
        feilmeldinger.underUtdanning = 'Vennligst svar på om du har vært under utdanning';
    } else if (values.underUtdanning) {
        if (!values.utdanningStartdato) {
            feilmeldinger.utdanningStartdato = 'Vennligst oppgi når du startet på utdanningen';
        }
        if (values.erUtdanningFulltidsstudium === undefined) {
            feilmeldinger.erUtdanningFulltidsstudium = 'Vennligst svar på om utdanningen er et fulltidsstudium';
        }
    }

    const periodeFeil = validerPerioder(values, sykmelding.mulighetForArbeid.perioder);
    if (periodeFeil) {
        feilmeldinger.perioder = periodeFeil;
    }
    return feilmeldinger;
};

const AktiviteterISykmeldingsperiodenSkjema = setup(validate, AktiviteterISykmeldingsperioden);

export default AktiviteterISykmeldingsperiodenSkjema;
