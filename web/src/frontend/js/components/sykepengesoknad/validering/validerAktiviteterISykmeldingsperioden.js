import validerFoerDuBegynner from './validerFoerDuBegynner';
import validerFravaerOgFriskmelding from './validerFravaerOgFriskmelding';
import { ANNET } from '../../../enums/inntektskildetyper';
import { fraInputdatoTilJSDato } from '../../../utils';
import { toDatePrettyPrint, getTomDato } from 'digisyfo-npm';
import { getStillingsprosent } from '../AktiviteterISykmeldingsperioden/DetteTilsvarer';

const parseString = (str) => {
    if (str) {
        return parseFloat(str.replace(',', '.'));
    }
    return null;
};

export const antallFeil = 'Vennligst oppgi antall';
export const normaltAntallFeil = 'Vennligst oppgi normalt antall';
export const ikkeJobbetMerEnnGraderingProsentFeil = 'Prosenten du har oppgitt er lavere enn sykmeldingsgraden. Husk å oppgi hvor mye du har jobbet totalt';
export const ikkeJobbetMerEnnGraderingTimerFeil = 'Antall timer du har oppgitt er lavere enn sykmeldingen tilsier. Husk å oppgi hvor mye du har jobbet totalt';
export const overHundreFeil = 'Du må oppgi et tall fra 1 til 100';
export const jobbetMerEnnPlanlagtFeil = 'Vennligst oppgi om du har jobbet mer enn planlagt';
export const overHundreogfemtiFeil = 'Du må oppgi et tall fra 1 til 150';
export const sammeNormalAntallFeil = 'Vennligst oppi samme antall timer for alle periodene';
export const antallTimerErMerEnn100ProsentFeil = 'Antall timer tilsvarer over 100 % av din stilling';

const validerAktiviteter = (values, aktiviteter) => {
    const harSammeNormalAntall = values.aktiviteter && values.aktiviteter.filter((a) => {
        return a.jobbetMerEnnPlanlagt && a.avvik;
    }).map((a) => {
        return a.avvik.arbeidstimerNormalUke;
    }).filter((a) => {
        return typeof a === 'string' && a.trim() !== '';
    }).every((val, index, array) => {
        return val === array[0];
    });

    const feil = aktiviteter.map((aktivitet, index) => {
        if (!values.aktiviteter || !values.aktiviteter[index]) {
            return {
                jobbetMerEnnPlanlagt: jobbetMerEnnPlanlagtFeil,
            };
        } else if (values.aktiviteter[index].jobbetMerEnnPlanlagt === false) {
            return {};
        }
        const jobbetMerEnnPlanlagt = values.aktiviteter[index].jobbetMerEnnPlanlagt !== undefined ? undefined : jobbetMerEnnPlanlagtFeil;

        const avvik = (() => {
            const res = {};

            if (values && values.aktiviteter[index] && values.aktiviteter[index].jobbetMerEnnPlanlagt) {
                const _avvik = values.aktiviteter[index].avvik;

                if (_avvik) {
                    const { enhet, arbeidstimerNormalUke, arbeidsgrad, timer } = _avvik;
                    if (enhet === 'prosent') {
                        if (arbeidsgrad > 100) {
                            res.arbeidsgrad = overHundreFeil;
                        }
                        if (arbeidsgrad <= (100 - values.aktiviteter[index].grad)) {
                            res.arbeidsgrad = ikkeJobbetMerEnnGraderingProsentFeil;
                        }
                        if (!arbeidsgrad || arbeidsgrad === '') {
                            res.arbeidsgrad = antallFeil;
                        }
                    } else if (enhet === 'timer') {
                        const stillingsprosent = getStillingsprosent(timer, arbeidstimerNormalUke, aktivitet.periode);
                        if (parseString(timer) > 150) {
                            res.timer = overHundreogfemtiFeil;
                        } else if (stillingsprosent > 100) {
                            res.timer = antallTimerErMerEnn100ProsentFeil;
                        }

                        if (arbeidstimerNormalUke && parseString(arbeidstimerNormalUke) > 0) {
                            const arbeidsgradISykmeldingen = 100 - values.aktiviteter[index].grad;
                            if (stillingsprosent <= arbeidsgradISykmeldingen) {
                                res.timer = ikkeJobbetMerEnnGraderingTimerFeil;
                            }
                        }

                        if (!timer || timer === '') {
                            res.timer = antallFeil;
                        }
                    }
                    if (!arbeidstimerNormalUke || arbeidstimerNormalUke === '') {
                        res.arbeidstimerNormalUke = normaltAntallFeil;
                    } else if (arbeidstimerNormalUke > 100) {
                        res.arbeidstimerNormalUke = overHundreFeil;
                    } else if (!harSammeNormalAntall) {
                        res.arbeidstimerNormalUke = sammeNormalAntallFeil;
                    }
                } else {
                    res.arbeidsgrad = antallFeil;
                    res.arbeidstimerNormalUke = normaltAntallFeil;
                }
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
    return inntektskilder.filter((i) => {
        return i.avkrysset;
    }).length;
};

const validate = (values, props) => {
    const feilmeldinger = {};
    if (Object.keys(validerFoerDuBegynner(values, props)).length > 0 || Object.keys(validerFravaerOgFriskmelding(values, props)).length) {
        props.sendTilFoerDuBegynner(props.sykepengesoknad);
    }

    const _sykepengesoknad = Object.assign({}, props.sykepengesoknad, {
        gjenopptattArbeidFulltUtDato: fraInputdatoTilJSDato(values.gjenopptattArbeidFulltUtDato),
    });
    const tomDato = getTomDato(_sykepengesoknad);

    if (values.harAndreInntektskilder === undefined) {
        feilmeldinger.harAndreInntektskilder = 'Du må svare på om du har andre inntektskilder';
    } else if (values.harAndreInntektskilder) {
        if (getAntallAvkryssedeInntektstkilder(values.andreInntektskilder) === 0) {
            feilmeldinger.andreInntektskilder = {
                _error: 'Vennligst oppgi hvilke andre inntektskilder du har',
            };
        } else {
            const andreInntektskilderFeilmeldinger = values.andreInntektskilder.map((i) => {
                if (i.avkrysset && i.sykmeldt === undefined && i.annenInntektskildeType !== ANNET) {
                    return {
                        sykmeldt: 'Vennligst svar på om du er sykmeldt',
                    };
                }
                return {};
            });
            const erFeil = andreInntektskilderFeilmeldinger.filter((i) => {
                return Object.keys(i).length > 0;
            }).length > 0;
            if (erFeil) {
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
        if (values.utdanning.utdanningStartdato && fraInputdatoTilJSDato(values.utdanning.utdanningStartdato) > tomDato) {
            utdanningsfeilmelding.utdanningStartdato = `Datoen kan ikke være etter sykmeldingsperioden gikk ut den ${toDatePrettyPrint(tomDato)}`;
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
