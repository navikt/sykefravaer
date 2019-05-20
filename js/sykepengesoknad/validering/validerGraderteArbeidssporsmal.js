import { fjernIndexFraTag, formaterEnkeltverdi } from '../felleskomponenter/sporsmal/fieldUtils';
import {
    HVOR_MANGE_TIMER_PER_UKE,
    HVOR_MYE_HAR_DU_JOBBET,
    HVOR_MYE_PROSENT,
    HVOR_MYE_PROSENT_VERDI,
    HVOR_MYE_TIMER,
    HVOR_MYE_TIMER_VERDI,
    JOBBET_DU_GRADERT,
} from '../enums/tagtyper';
import { getStillingsprosent } from '../../sykepengesoknad-gammel-plattform/aktiviteter-i-sykmeldingsperioden/BeregnetArbeidsgrad';
import { beregnFeilmeldingstekstFraTag } from './validerSporsmal';

const leggIndexPaTag = (tag, index) => {
    return `${tag}_${index}`;
};

const validerGraderteArbeidssporsmal = (sporsmal, values, soknadPerioder) => {
    const feilmeldinger = {};
    const graderteArbeidssporsmal = sporsmal
        .filter((s) => {
            return fjernIndexFraTag(s.tag) === JOBBET_DU_GRADERT;
        })
        .filter((s) => {
            return formaterEnkeltverdi(values[s.tag]) === s.kriterieForVisningAvUndersporsmal;
        });
    graderteArbeidssporsmal.forEach((gradertArbeidssporsmal) => {
        const index = parseInt(gradertArbeidssporsmal.tag.split(`${JOBBET_DU_GRADERT}_`)[1], 10);
        const antallTimerPerNormalUke = formaterEnkeltverdi(values[leggIndexPaTag(HVOR_MANGE_TIMER_PER_UKE, index)]);
        const erSvarOppgittITimer = formaterEnkeltverdi(values[leggIndexPaTag(HVOR_MYE_TIMER, index)]);
        const antallTimerJobbet = formaterEnkeltverdi(values[leggIndexPaTag(HVOR_MYE_TIMER_VERDI, index)]);
        const minsteArbeidsgrad = gradertArbeidssporsmal.undersporsmal
            .find((underspm) => {
                return fjernIndexFraTag(underspm.tag) === HVOR_MYE_HAR_DU_JOBBET;
            })
            .undersporsmal.find((underspm) => {
                return fjernIndexFraTag(underspm.tag) === HVOR_MYE_PROSENT;
            })
            .undersporsmal.find((underspm) => {
                return fjernIndexFraTag(underspm.tag) === HVOR_MYE_PROSENT_VERDI;
            }).min;
        const periode = soknadPerioder[index];
        const arbeidsgrad = getStillingsprosent(antallTimerJobbet, antallTimerPerNormalUke, periode);
        if (erSvarOppgittITimer && arbeidsgrad < parseInt(minsteArbeidsgrad, 10)) {
            feilmeldinger[leggIndexPaTag(HVOR_MYE_TIMER_VERDI, index)] = beregnFeilmeldingstekstFraTag(HVOR_MYE_TIMER_VERDI, true);
        }
    });

    return feilmeldinger;
};

export default validerGraderteArbeidssporsmal;
