import { toDatePrettyPrint } from 'digisyfo-npm';
import inntektskilder from '../../enums/inntektskildetyper';
import { mapAktiviteter } from '../../utils/sykepengesoknadUtils';

const parsePeriode = (periode) => {
    return {
        fom: toDatePrettyPrint(periode.fom),
        tom: toDatePrettyPrint(periode.tom),
    };
};

const map = (sykepengesoknad) => {
    let utenlandsopphold = sykepengesoknad.utenlandsopphold;
    let utdanning = sykepengesoknad.utdanning;
    if (utenlandsopphold) {
        utenlandsopphold = {
            ...sykepengesoknad.utenlandsopphold,
            perioder: utenlandsopphold.perioder.map(parsePeriode),
        };
    } else {
        utenlandsopphold = {
            perioder: [],
        };
    }

    if (utdanning) {
        utdanning = {
            utdanningStartdato: toDatePrettyPrint(sykepengesoknad.utdanning.utdanningStartdato),
            underUtdanningISykmeldingsperioden: true,
            erUtdanningFulltidsstudium: utdanning.erUtdanningFulltidsstudium,
        };
    } else {
        utdanning = {
            underUtdanningISykmeldingsperioden: false,
        };
    }

    const harHattFerie = sykepengesoknad.ferie.length > 0;
    const harHattUtenlandsopphold = sykepengesoknad.utenlandsopphold !== null;
    const harHattPermisjon = sykepengesoknad.permisjon.length > 0;

    return {
        ...sykepengesoknad,
        bekreftetKorrektInformasjon: false,
        ferie: sykepengesoknad.ferie.map(parsePeriode),
        permisjon: sykepengesoknad.permisjon.map(parsePeriode),
        utenlandsopphold,
        andreInntektskilder: inntektskilder.map((inntektskilde) => {
            const matchendeInntektskilder = sykepengesoknad.andreInntektskilder.filter((i) => {
                return i.annenInntektskildeType === inntektskilde.annenInntektskildeType;
            });
            if (matchendeInntektskilder.length > 0) {
                return {
                    annenInntektskildeType: inntektskilde.annenInntektskildeType,
                    avkrysset: true,
                    sykmeldt: matchendeInntektskilder[0].sykmeldt,
                };
            }
            return inntektskilde;
        }),
        gjenopptattArbeidFulltUtDato: sykepengesoknad.gjenopptattArbeidFulltUtDato ? toDatePrettyPrint(sykepengesoknad.gjenopptattArbeidFulltUtDato) : null,
        harGjenopptattArbeidFulltUt: sykepengesoknad.gjenopptattArbeidFulltUtDato !== null,
        egenmeldingsperioder: sykepengesoknad.egenmeldingsperioder.map(parsePeriode),
        harHattFerie,
        harHattUtenlandsopphold,
        harHattPermisjon,
        harHattFeriePermisjonEllerUtenlandsopphold: harHattFerie || harHattPermisjon || harHattUtenlandsopphold,
        harAndreInntektskilder: sykepengesoknad.andreInntektskilder.length > 0,
        bruktEgenmeldingsdagerFoerLegemeldtFravaer: sykepengesoknad.egenmeldingsperioder.length > 0,
        utdanning,
        aktiviteter: mapAktiviteter(sykepengesoknad).aktiviteter.map((aktivitet) => {
            if (aktivitet.avvik === null) {
                return {
                    ...aktivitet,
                    avvik: {},
                    jobbetMerEnnPlanlagt: false,
                };
            }
            const avvik = {
                enhet: aktivitet.avvik.timer ? 'timer' : 'prosent',
                arbeidstimerNormalUke: aktivitet.avvik.arbeidstimerNormalUke.toString().replace('.', ','),
                timer: aktivitet.avvik.timer ? aktivitet.avvik.timer.toString().replace('.', ',') : '',
                arbeidsgrad: aktivitet.avvik.arbeidsgrad ? aktivitet.avvik.arbeidsgrad.toString().replace('.', ',') : '',
            };

            if (aktivitet.avvik.beregnetArbeidsgrad) {
                avvik.beregnetArbeidsgrad = aktivitet.avvik.beregnetArbeidsgrad;
            }

            return {
                ...aktivitet,
                jobbetMerEnnPlanlagt: true,
                avvik,
            };
        }),
    };
};

export default map;
