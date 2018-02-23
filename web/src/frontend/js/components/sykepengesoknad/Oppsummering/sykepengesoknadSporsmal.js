import { getLedetekst, toDatePrettyPrint, tidligsteFom } from 'digisyfo-npm';
import { finnFomForFeriesporsmal, getTomDato } from '../../../utils/sykepengesoknadUtils';
import { getTidligsteStartdatoSykeforloep } from '../../../utils/sykmeldingUtils';

export const getEgenmeldingsdagerSporsmal = (sykepengesoknad, callback = getLedetekst) => {
    return callback('sykepengesoknad.egenmeldingsdager.janei.sporsmal', {
        '%DATO%': toDatePrettyPrint(getTidligsteStartdatoSykeforloep(sykepengesoknad)),
    });
};

export const getFeriePermisjonEllerUtenlandsoppholdSporsmal = (sykepengesoknad, gjenopptattArbeidFulltUtDato, callback = getLedetekst) => {
    const _soknad = {
        ...sykepengesoknad,
        gjenopptattArbeidFulltUtDato,
    };
    const _tidligsteFom = finnFomForFeriesporsmal(sykepengesoknad);
    const senesteTom = getTomDato(_soknad);
    return callback('sykepengesoknad.ferie-permisjon-utenlandsopphold.janei.sporsmal', {
        '%FOM%': toDatePrettyPrint(_tidligsteFom),
        '%TOM%': toDatePrettyPrint(senesteTom),
    });
};

export const getAktivitetssporsmal = (aktivitet, arbeidsgiver, callback = getLedetekst) => {
    const ledetekstUgradert = 'sykepengesoknad.aktiviteter.ugradert.spoersmal-2';
    const ledetekstGradert = 'sykepengesoknad.aktiviteter.gradert.spoersmal-2';

    const nokkel = aktivitet.grad === 100 ? ledetekstUgradert : ledetekstGradert;
    const tomDato = aktivitet.periode.tom;

    return callback(nokkel, {
        '%FOM%': toDatePrettyPrint(aktivitet.periode.fom),
        '%TOM%': toDatePrettyPrint(tomDato),
        '%ARBEIDSGIVER%': arbeidsgiver,
        '%ARBEIDSGRAD%': 100 - aktivitet.grad,
    });
};

export const getTotalJobbingSporsmal = (arbeidsgiver, callback = getLedetekst) => {
    return callback('sykepengesoknad.aktiviteter.avvik.hvor-mye-har-du-jobbet-totalt', {
        '%ARBEIDSGIVER%': arbeidsgiver,
    });
};

export const getInntektskildeLabel = (annenInntektskildeType, callback = getLedetekst) => {
    return callback(`sykepengesoknad.andre-inntektskilder.${annenInntektskildeType}.label`);
};

export const getUtdanningssporsmal = (sykepengesoknad, gjenopptattArbeidFulltUtDato, callback = getLedetekst) => {
    const perioder = sykepengesoknad.aktiviteter.map((aktivitet) => {
        return aktivitet.periode;
    });
    const _tidligsteFom = tidligsteFom(perioder);
    const _soknad = {
        ...sykepengesoknad,
        gjenopptattArbeidFulltUtDato,
    };
    const _senesteTom = getTomDato(_soknad);

    return callback('sykepengesoknad.utdanning.ja-nei.sporsmal', {
        '%STARTDATO%': toDatePrettyPrint(_tidligsteFom),
        '%SLUTTDATO%': toDatePrettyPrint(_senesteTom),
    });
};
