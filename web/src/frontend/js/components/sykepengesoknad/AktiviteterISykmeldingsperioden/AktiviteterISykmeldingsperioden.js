import React, { PropTypes } from 'react';
import SykepengerSkjema from '../SykepengerSkjema';
import { Field, FieldArray } from 'redux-form';
import history from '../../../history';
import setup from '../setup';
import JaEllerNei, { JaEllerNeiRadioknapper, parseJaEllerNei } from '../JaEllerNei';
import Datovelger from '../../skjema/Datovelger';
import Aktiviteter from './Aktiviteter';
import AndreInntektskilder, { ANNET } from './AndreInntektskilder';
import { Link } from 'react-router';
import Knapperad from '../../skjema/Knapperad';
import { toDatePrettyPrint } from 'digisyfo-npm';
import { tidligsteFom, senesteTom } from '../../../utils/periodeUtils';
import * as foerDuBegynner from '../FoerDuBegynner/FoerDuBegynner';
import * as fravaerOgFriskmelding from '../FravaerOgFriskmelding/FravaerOgFriskmelding';

const UtdanningStartDato = () => {
    return (<div className="blokk">
        <label className="skjema__sporsmal" htmlFor="utdanningStartdato">Når startet du på utdanningen?</label>
        <Datovelger name="utdanning.utdanningStartdato" id="utdanningStartdato" />
    </div>);
};

const AktiviteterISykmeldingsperioden = (props) => {
    const { handleSubmit, sykepengesoknad, ledetekster, autofill, untouch } = props;
    const perioder = sykepengesoknad.aktiviteter.map((aktivitet) => {
        return aktivitet.periode;
    });
    const onSubmit = () => {
        history.push(`/sykefravaer/soknader/${sykepengesoknad.id}/oppsummering`);
    };

    return (<SykepengerSkjema aktivtSteg="2" tittel="Aktiviteter i sykmeldingsperioden" ledetekster={ledetekster} sykepengesoknad={sykepengesoknad}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldArray
                component={Aktiviteter}
                fields={sykepengesoknad.aktiviteter}
                autofill={autofill}
                untouch={untouch}
                name="aktiviteter"
                ledetekster={ledetekster}
                arbeidsgiver={sykepengesoknad.arbeidsgiver.navn} />

            <JaEllerNei
                name="harAndreInntektskilder"
                spoersmal={`Har du andre inntektskilder enn ${sykepengesoknad.arbeidsgiver.navn}?`}>
                <AndreInntektskilder />
            </JaEllerNei>

            <JaEllerNei
                name="utdanning.underUtdanningISykmeldingsperioden"
                spoersmal={`Har du vært under utdanning i løpet av perioden ${toDatePrettyPrint(tidligsteFom(perioder))} – ${toDatePrettyPrint(senesteTom(perioder))}?`}>
                <UtdanningStartDato />
                <Field
                    component={JaEllerNeiRadioknapper}
                    name="utdanning.erUtdanningFulltidsstudium"
                    parse={parseJaEllerNei}
                    spoersmal="Er utdanningen et fulltidsstudium?"
                    Overskrift="h4" />
            </JaEllerNei>

            <Knapperad variant="knapperad--forrigeNeste">
                <Link to={`/sykefravaer/soknader/${sykepengesoknad.id}/fravaer-og-friskmelding`} className="rammeknapp">Tilbake</Link>
                <button type="submit" className="knapp">Gå videre</button>
            </Knapperad>
        </form>
    </SykepengerSkjema>);
};

AktiviteterISykmeldingsperioden.propTypes = {
    handleSubmit: PropTypes.func,
    sykepengesoknad: PropTypes.object,
    ledetekster: PropTypes.object,
    autofill: PropTypes.func,
    untouch: PropTypes.func,
};

const validerAktiviteter = (values, aktiviteter) => {
    const jobbetMerEnnPlanlagtFeil = 'Vennligst oppgi om du har jobbet mer enn planlagt';
    const feil = aktiviteter.map((aktivitet, index) => {
        if (!values.aktiviteter || !values.aktiviteter[index]) {
            return {
                jobbetMerEnnPlanlagt: jobbetMerEnnPlanlagtFeil,
            };
        } else if (values.aktiviteter[index].jobbetMerEnnPlanlagt === false) {
            return {};
        }
        const jobbetMerEnnPlanlagt = values.aktiviteter[index].jobbetMerEnnPlanlagt === undefined ? undefined : jobbetMerEnnPlanlagtFeil;

        const avvik = (() => {
            const antallFeil = 'Vennligst oppgi antall';
            const normaltAntallFeil = 'Vennligst oppgi normalt antall';
            const res = {};

            if (!values || !values.aktiviteter || !values.aktiviteter[index] || !values.aktiviteter[index].avvik) {
                res.arbeidsgrad = antallFeil;
                res.arbeidstimerNormalUke = normaltAntallFeil;
                return res;
            }

            const avvikValues = values.aktiviteter[index].avvik;

            if (!avvikValues.arbeidstimerNormalUke) {
                res.arbeidstimerNormalUke = normaltAntallFeil;
            }

            if (!avvikValues.arbeidsgrad && (avvikValues.enhet === 'prosent' || !avvikValues.enhet)) {
                res.arbeidsgrad = antallFeil;
            }

            if (!avvikValues.timer && avvikValues.enhet === 'timer') {
                res.timer = antallFeil;
            }

            return res;
        })();

        const f = {};
        if (!values.aktiviteter[index].jobbetMerEnnPlanlagt) {
            f.jobbetMerEnnPlanlagt = jobbetMerEnnPlanlagt;
        }
        if (Object.keys(avvik).length > 0) {
            f.avvik = avvik;
        }
        return f;
    });

    const faktiskeFeil = feil.filter((f) => {
        return Object.keys(f).length > 0;
    });

    if (faktiskeFeil.length > 0) {
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
    const steg = "AktiviteterISykmeldingsperioden";
    console.log("verdier på steg " + steg + "\n", JSON.stringify(values));
    console.log("sykepengesoknad på steg " + steg + "\n", JSON.stringify(props.sykepengesoknad));    

    const feilmeldinger = {};
    if (Object.keys(foerDuBegynner.validate(values, props)).length > 0 || Object.keys(fravaerOgFriskmelding.validate(values, props)).length) {
        console.log("Feil i step 2");
        props.sendTilFoerDuBegynner(props.sykepengesoknad);
    }

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
                if (inntektskilde !== ANNET && values.andreInntektskilder[inntektskilde].avkrysset && values.andreInntektskilder[inntektskilde].sykmeldt === undefined) {
                    andreInntektskilderFeilmeldinger[inntektskilde] = {
                        sykmeldt: 'Vennligst svar på om du er sykmeldt',
                    };
                }
            }
            if (Object.keys(andreInntektskilderFeilmeldinger).length > 0) {
                feilmeldinger.andreInntektskilder = andreInntektskilderFeilmeldinger;
            }
        }
    }
    const utdanningsfeilmelding = {};
    if (values.utdanning === undefined || values.utdanning.underUtdanningISykmeldingsperioden === undefined) {
        utdanningsfeilmelding.underUtdanningISykmeldingsperioden = 'Vennligst svar på om du har vært under utdanning';
    } else if (values.utdanning.underUtdanningISykmeldingsperioden === true) {
        if (!values.utdanning.utdanningStartdato) {
            utdanningsfeilmelding.utdanningStartdato = 'Vennligst oppgi når du startet på utdanningen';
        }
        if (values.utdanning.erUtdanningFulltidsstudium === undefined) {
            utdanningsfeilmelding.erUtdanningFulltidsstudium = 'Vennligst svar på om utdanningen er et fulltidsstudium';
        }
    }

    if (Object.keys(utdanningsfeilmelding).length > 0) {
        feilmeldinger.utdanning = utdanningsfeilmelding;
    }

    const aktivitetFeil = validerAktiviteter(values, props.sykepengesoknad.aktiviteter);
    if (aktivitetFeil) {
        feilmeldinger.aktiviteter = aktivitetFeil;
    }
    return feilmeldinger;
};

const AktiviteterISykmeldingsperiodenSkjema = setup(validate, AktiviteterISykmeldingsperioden);

export default AktiviteterISykmeldingsperiodenSkjema;
