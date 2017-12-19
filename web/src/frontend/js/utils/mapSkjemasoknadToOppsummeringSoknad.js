import { getLedetekst, toDatePrettyPrint } from 'digisyfo-npm';
import { getGjenopptattArbeidFulltUtDato } from './connectGjenopptattArbeidFulltUtDato';
import { getFeriePermisjonEllerUtenlandsoppholdSporsmal } from '../components/sykepengesoknad/FravaerOgFriskmelding/FeriePermisjonEllerUtenlandsopphold';
import { getAktivitetssporsmal } from '../components/sykepengesoknad/AktiviteterISykmeldingsperioden/Aktiviteter';
import { getTotalJobbingSporsmal } from '../components/sykepengesoknad/AktiviteterISykmeldingsperioden/AngiTid';
import { getInntektskildeLabel } from '../components/sykepengesoknad/AktiviteterISykmeldingsperioden/AndreInntektskilder';
import { getUtdanningssporsmal } from '../components/sykepengesoknad/AktiviteterISykmeldingsperioden/AktiviteterISykmeldingsperioden';
import { getObjectValueByString } from './index';
import { CHECKBOX, RADIOKNAPPER, TEKSTSVAR, DATO, DATOSPENN } from '../enums/sykepengesoknadsvartyper';
import { ANNET } from '../enums/inntektskildetyper';
import * as skjemafelter from '../enums/sykepengesoknadskjemafelter';

const {
    ansvarBekreftet,
    bruktEgenmeldingsdagerFoerLegemeldtFravaer,
    egenmeldingsperioder,
    harGjenopptattArbeidFulltUt,
    gjenopptattArbeidFulltUtDato,
    harHattFeriePermisjonEllerUtenlandsopphold,
    harHattFerie,
    harHattPermisjon,
    harHattUtenlandsopphold,
    utenlandsoppholdSoektOmSykepengerIPerioden,
    aktiviteter,
    normalArbeidstimerPerUke,
    harAndreInntektskilder,
    andreInntektskilder,
    underUtdanningISykmeldingsperioden,
    utdanningStartdato,
    erUtdanningFulltidsstudium,
    bekreftetKorrektInformasjon,
    ansvarserklaring,
    arbeidsgiverForskutterer } = skjemafelter;

const jegHar = 'jegHar';

const hovedsporsmalsliste = [
    ansvarBekreftet,
    bruktEgenmeldingsdagerFoerLegemeldtFravaer,
    harGjenopptattArbeidFulltUt,
    harHattFeriePermisjonEllerUtenlandsopphold,
    aktiviteter,
    harAndreInntektskilder,
    underUtdanningISykmeldingsperioden,
    arbeidsgiverForskutterer,
];

const nokler = {};
nokler[ansvarBekreftet] = 'sykepengesoknad.bekreft-ansvar.label';
nokler[bruktEgenmeldingsdagerFoerLegemeldtFravaer] = 'sykepengesoknad.egenmeldingsdager.janei.sporsmal';
nokler[egenmeldingsperioder] = 'sykepengesoknad.egenmeldingsdager.dato.sporsmal';
nokler[harGjenopptattArbeidFulltUt] = 'sykepengesoknad.gjenopptatt-arbeid-fullt-ut.janei.sporsmal';
nokler[gjenopptattArbeidFulltUtDato] = 'sykepengesoknad.gjenopptatt-arbeid-fullt-ut.dato.sporsmal';
nokler[harHattFeriePermisjonEllerUtenlandsopphold] = 'sykepengesoknad.ferie-permisjon-utenlandsopphold.janei.sporsmal';
nokler[harHattFerie] = 'sykepengesoknad.ferie-permisjon-utenlandsopphold.tatt-ut-ferie';
nokler[harHattUtenlandsopphold] = 'sykepengesoknad.ferie-permisjon-utenlandsopphold.oppholdt-meg-utenfor-norge';
nokler[jegHar] = 'sykepengesoknad.ferie-permisjon-utenlandsopphold.jeg-har';
nokler[harHattPermisjon] = 'sykepengesoknad.ferie-permisjon-utenlandsopphold.hatt-permisjon';
nokler[utenlandsoppholdSoektOmSykepengerIPerioden] = 'sykepengesoknad.ferie-permisjon-utenlandsopphold.sokt-om-sykepenger.sporsmal';
nokler.aktiviteterGradert = 'sykepengesoknad.aktiviteter.gradert.spoersmal-2';
nokler.aktiviteterUgradert = 'sykepengesoknad.aktiviteter.ugradert.spoersmal-2';

nokler[normalArbeidstimerPerUke] = 'sykepengesoknad.angi-tid.normal-arbeidstimer.sporsmal';
nokler.normalArbeidstimerPerUkeSvar = 'sykepengesoknad.angi-tid.normal-arbeidstimer.label-med-verdi';
nokler.totalJobbing = 'sykepengesoknad.aktiviteter.avvik.hvor-mye-har-du-jobbet-totalt';
nokler.angiArbeidsgrad = 'sykepengesoknad.angi-tid.velg-enhet.label.prosent-med-verdi';
nokler.angiArbeidstimer = 'sykepengesoknad.angi-tid.velg-enhet.label.timer-med-verdi';
nokler.detteTilsvarer = 'sykepengesoknad.angi-tid.dette-tilsvarer';
nokler[andreInntektskilder] = 'sykepengesoknad.andre-inntektskilder.hvilke-inntektskilder.sporsmal';
nokler[harAndreInntektskilder] = 'sykepengesoknad.andre-inntektskilder.janei.sporsmal';
nokler.erDuSykmeldtFraInntektskilde = 'sykepengesoknad.andre-inntektskilder.er-du-sykmeldt-fra-dette.sporsmal';
nokler[utdanningStartdato] = 'sykepengesoknad.utdanning.startdato.sporsmal';
nokler[erUtdanningFulltidsstudium] = 'sykepengesoknad.utdanning.fulltidsstudium.sporsmal';
nokler.arbeidsgiverForskuttererSvarJA = 'sykepengesoknad.forskutterer-arbeidsgiver.svar.JA';
nokler.arbeidsgiverForskuttererSvarNEI = 'sykepengesoknad.forskutterer-arbeidsgiver.svar.NEI';
nokler.arbeidsgiverForskuttererSvarVET_IKKE = 'sykepengesoknad.forskutterer-arbeidsgiver.svar.VET_IKKE';
nokler[arbeidsgiverForskutterer] = 'sykepengesoknad.forskutterer-arbeidsgiver.sporsmal';
nokler.periode = 'sykepengesoknad.oppsummering.periode.fra-til';
nokler.dato = 'sykepengesoknad.dato';
nokler.ja = 'sykepengesoknad.ja';
nokler.nei = 'sykepengesoknad.nei';
nokler[ansvarserklaring] = 'sykepengesoknad.oppsummering.vaer-klar-over-at';
nokler[bekreftetKorrektInformasjon] = 'sykepengesoknad.oppsummering.bekreft-korrekt-informasjon.label';

const getNokkelOgVerdier = (nokkel, verdier) => {
    const tekst = getLedetekst(nokkel, verdier);
    if (verdier) {
        return {
            nokkel, verdier, tekst,
        };
    }
    return { nokkel, tekst };
};

const getSporsmalstekst = (felt, sykepengesoknad, skjemasoknad) => {
    const nokkel = nokler[felt];
    switch (felt) {
        case bruktEgenmeldingsdagerFoerLegemeldtFravaer: {
            return getNokkelOgVerdier(nokkel, {
                '%DATO%': toDatePrettyPrint(sykepengesoknad.identdato),
            });
        }
        case harGjenopptattArbeidFulltUt:
        case harAndreInntektskilder: {
            return getNokkelOgVerdier(nokkel, {
                '%ARBEIDSGIVER%': sykepengesoknad.arbeidsgiver.navn,
            });
        }
        case harHattFeriePermisjonEllerUtenlandsopphold: {
            const _gjenopptattArbeidFulltUtDato = getGjenopptattArbeidFulltUtDato(skjemasoknad);
            return getFeriePermisjonEllerUtenlandsoppholdSporsmal(sykepengesoknad, _gjenopptattArbeidFulltUtDato, getNokkelOgVerdier);
        }
        case underUtdanningISykmeldingsperioden: {
            const _gjenopptattArbeidFulltUtDato = getGjenopptattArbeidFulltUtDato(skjemasoknad);
            return getUtdanningssporsmal(sykepengesoknad, _gjenopptattArbeidFulltUtDato, getNokkelOgVerdier);
        }
        default: {
            return getNokkelOgVerdier(nokkel);
        }
    }
};

const tilPeriode = ({ fom, tom }) => {
    const verdier = {
        '%FOM%': fom,
        '%TOM%': tom,
    };
    return {
        svartekst: {
            nokkel: nokler.periode,
            verdier,
            tekst: getLedetekst(nokler.periode, verdier),
        },
        type: DATOSPENN,
    };
};

export const Sporsmal = function (sporsmalstekst, svar, undersporsmal) {
    this.sporsmalstekst = sporsmalstekst;
    this.svar = svar;
    if (undersporsmal) {
        this.undersporsmal = undersporsmal;
    }
};

export const Svar = function (svartekst, type = TEKSTSVAR, undersporsmal) {
    this.svartekst = svartekst;
    this.type = type;
    if (undersporsmal) {
        this.undersporsmal = undersporsmal;
    }
};

export default (skjemasoknad, sykepengesoknad) => {
    const getJaEllerNeiSvar = (bool) => {
        const svartekst = bool ? getNokkelOgVerdier(nokler.ja) : getNokkelOgVerdier(nokler.nei);
        return [new Svar(svartekst, RADIOKNAPPER)];
    };

    const returverdi = hovedsporsmalsliste.map((felt) => {
        if (felt === ansvarBekreftet) {
            const svar = new Svar(getNokkelOgVerdier(nokler[ansvarBekreftet]), CHECKBOX);
            return new Sporsmal(null, [svar]);
        }

        const sporsmal = new Sporsmal(getSporsmalstekst(felt, sykepengesoknad, skjemasoknad), getJaEllerNeiSvar(getObjectValueByString(skjemasoknad, felt)));

        if (skjemasoknad[felt]) {
            switch (felt) {
                case bruktEgenmeldingsdagerFoerLegemeldtFravaer: {
                    const egenmeldingsperioderSporsmal = new Sporsmal(null, skjemasoknad.egenmeldingsperioder.map(tilPeriode));
                    return {
                        ...sporsmal,
                        undersporsmal: [egenmeldingsperioderSporsmal],
                    };
                }
                case harGjenopptattArbeidFulltUt: {
                    const verdier = {
                        '%DATO%': skjemasoknad[gjenopptattArbeidFulltUtDato],
                    };
                    return {
                        ...sporsmal,
                        undersporsmal: [
                            new Sporsmal(
                                null,
                                [new Svar(getNokkelOgVerdier(nokler.dato, verdier), DATO)]),
                        ],
                    };
                }
                case harHattFeriePermisjonEllerUtenlandsopphold: {
                    const utenlandsopphold = (() => {
                        if (!skjemasoknad.harHattUtenlandsopphold) {
                            return null;
                        }
                        const utenlandsoppholdperiodersporsmal = new Sporsmal(null, skjemasoknad.utenlandsopphold.perioder.map(tilPeriode));
                        const utenlandsoppholdSoektSporsmal = new Sporsmal(
                            getSporsmalstekst(utenlandsoppholdSoektOmSykepengerIPerioden),
                            getJaEllerNeiSvar(skjemasoknad.utenlandsopphold.soektOmSykepengerIPerioden));
                        return new Svar(getNokkelOgVerdier(nokler[harHattUtenlandsopphold]), RADIOKNAPPER, [utenlandsoppholdperiodersporsmal, utenlandsoppholdSoektSporsmal]);
                    })();

                    const ferieOgPermisjonssvar = [harHattFerie, harHattPermisjon].map((_felt) => {
                        if (skjemasoknad[_felt]) {
                            const skjemafelt = _felt === harHattFerie ? 'ferie' : 'permisjon';
                            const periodesporsmal = new Sporsmal(null, skjemasoknad[skjemafelt].map(tilPeriode));
                            return new Svar(getNokkelOgVerdier(nokler[_felt]), CHECKBOX, [periodesporsmal]);
                        }
                        return null;
                    });

                    const alleSvar = [...ferieOgPermisjonssvar, utenlandsopphold].filter((s) => {
                        return s !== null;
                    });
                    const undersporsmal = [new Sporsmal(getSporsmalstekst(jegHar, sykepengesoknad, skjemasoknad), alleSvar)];

                    return {
                        ...sporsmal,
                        undersporsmal,
                    };
                }
                case aktiviteter: {
                    return skjemasoknad.aktiviteter.map((aktivitet) => {
                        const harAvvik = aktivitet.jobbetMerEnnPlanlagt;
                        const aktivitetssporsmal = new Sporsmal(
                            getAktivitetssporsmal(aktivitet, sykepengesoknad.arbeidsgiver.navn, getNokkelOgVerdier),
                            getJaEllerNeiSvar(harAvvik));

                        if (harAvvik) {
                            const valgtEnhet = aktivitet.avvik.enhet;
                            const prosent = 'prosent';
                            const normalArbeidstimePerUkeVerdier = {
                                '%ANTALL%': aktivitet.avvik.arbeidstimerNormalUke,
                            };
                            const arbeidsgradverdier = {
                                '%ANTALL%': valgtEnhet === prosent ? aktivitet.avvik.arbeidsgrad : aktivitet.avvik.timer,
                            };
                            const svarnokkel = valgtEnhet === prosent ? nokler.angiArbeidsgrad : nokler.angiArbeidstimer;
                            const faktiskjobbingSvar = new Svar(getNokkelOgVerdier(svarnokkel, arbeidsgradverdier));

                            if (valgtEnhet !== prosent) {
                                faktiskjobbingSvar.beskrivelse = getNokkelOgVerdier(nokler.detteTilsvarer, {
                                    '%STILLINGSPROSENT%': aktivitet.avvik.beregnetArbeidsgrad,
                                });
                            }

                            const undersporsmal = [
                                new Sporsmal(
                                    getSporsmalstekst(normalArbeidstimerPerUke),
                                    [new Svar(getNokkelOgVerdier(nokler.normalArbeidstimerPerUkeSvar,
                                        normalArbeidstimePerUkeVerdier))]),
                                new Sporsmal(getTotalJobbingSporsmal(sykepengesoknad.arbeidsgiver.navn, getNokkelOgVerdier), [faktiskjobbingSvar]),
                            ];

                            return {
                                ...aktivitetssporsmal,
                                undersporsmal,
                            };
                        }

                        return aktivitetssporsmal;
                    });
                }
                case harAndreInntektskilder: {
                    const svar = skjemasoknad.andreInntektskilder.map((inntektskilde) => {
                        if (inntektskilde.avkrysset) {
                            const label = getInntektskildeLabel(inntektskilde.annenInntektskildeType, getNokkelOgVerdier);
                            if (inntektskilde.annenInntektskildeType !== ANNET) {
                                const undersporsmal = new Sporsmal(getNokkelOgVerdier(nokler.erDuSykmeldtFraInntektskilde), getJaEllerNeiSvar(inntektskilde.sykmeldt));
                                return new Svar(label, CHECKBOX, [undersporsmal]);
                            }
                            return new Svar(label, CHECKBOX);
                        }
                        return null;
                    }).filter((i) => {
                        return i !== null;
                    });
                    const undersporsmal = [new Sporsmal(getSporsmalstekst(andreInntektskilder), svar)];
                    return {
                        ...sporsmal,
                        undersporsmal,
                    };
                }
                default: {
                    break;
                }
            }
        }

        if (felt === underUtdanningISykmeldingsperioden && skjemasoknad.utdanning && skjemasoknad.utdanning.underUtdanningISykmeldingsperioden) {
            const svar1 = new Svar(getNokkelOgVerdier(nokler.dato, {
                '%DATO%': skjemasoknad.utdanning.utdanningStartdato,
            }));
            const startdatoSporsmal = new Sporsmal(getSporsmalstekst(utdanningStartdato), [svar1]);
            const fulltidsstudiumSporsmal = new Sporsmal(getSporsmalstekst(erUtdanningFulltidsstudium), getJaEllerNeiSvar(skjemasoknad.utdanning.erUtdanningFulltidsstudium));
            return {
                ...sporsmal,
                undersporsmal: [startdatoSporsmal, fulltidsstudiumSporsmal],
            };
        }

        if (felt === arbeidsgiverForskutterer) {
            if (!skjemasoknad.arbeidsgiverForskutterer) {
                return null;
            }
            const nokkel = nokler[`arbeidsgiverForskuttererSvar${skjemasoknad.arbeidsgiverForskutterer}`];
            const svar = new Svar(getNokkelOgVerdier(nokkel), RADIOKNAPPER);

            return new Sporsmal(getSporsmalstekst(arbeidsgiverForskutterer), [svar]);
        }

        return sporsmal;
    });
    
    /* Arbeidsspørsmålet er et array av Sporsmal, mens de andre spørsmålene er Sporsmal-instanser. 
    Vi må derfor pakke arbeidsspørsmålet ut slik at det ligger på samme nivå som de andre spørsmålene */
    
    const indeksForArbeidssporsmal = 4;
    const oppsummering = [...returverdi.slice(0, indeksForArbeidssporsmal),
        ...returverdi[indeksForArbeidssporsmal],
        ...returverdi.slice(indeksForArbeidssporsmal + 1, returverdi.length)]
        .filter((s) => {
            return s !== null;
        });

    return {
        oppsummering,
        ansvarserklaring: {
            beskrivelse: getNokkelOgVerdier(nokler[ansvarserklaring]),
        },
        bekreftetKorrektInformasjon: new Sporsmal(null, [new Svar(getNokkelOgVerdier(nokler[bekreftetKorrektInformasjon]), CHECKBOX)]),
    };
};
