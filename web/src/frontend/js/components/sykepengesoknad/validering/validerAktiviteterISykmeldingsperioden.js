import validerFoerDuBegynner from './validerFoerDuBegynner';
import validerFravaerOgFriskmelding from './validerFravaerOgFriskmelding';
import { ANNET } from '../AktiviteterISykmeldingsperioden/AndreInntektskilder';
import { log } from 'digisyfo-npm';

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

const validate = (values, props) => {
    const steg = 'AktiviteterISykmeldingsperioden';
    log(`verdier på steg ${steg}\n`, JSON.stringify(values));
    log(`sykepengesoknad på steg ${steg}\n`, JSON.stringify(props.sykepengesoknad));

    const feilmeldinger = {};
    if (Object.keys(validerFoerDuBegynner(values, props)).length > 0 || Object.keys(validerFravaerOgFriskmelding(values, props)).length) {
        log('Feil i step 2');
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

export default validate;
