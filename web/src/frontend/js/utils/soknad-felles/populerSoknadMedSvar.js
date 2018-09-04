import { fraInputdatoTilJSDato } from 'digisyfo-npm';
import { CHECKBOX_GRUPPE, DATO, IKKE_RELEVANT, PERIODER } from '../../enums/svartyper';

const fraJSDatoTilBackendDato = (jsDato) => {
    return jsDato.toJSON().substr(0, 10);
};

const fraInputDatoTilBackendDato = (inputdato) => {
    return fraJSDatoTilBackendDato(fraInputdatoTilJSDato(inputdato));
};

const tilPeriodesvar = (perioder, konverterPerioder) => {
    return perioder
        .filter((p) => {
            return konverterPerioder
                ? p.tom && p.tom
                : true;
        })
        .map((p) => {
            return {
                verdi: JSON.stringify({
                    fom: konverterPerioder ? fraInputDatoTilBackendDato(p.fom) : p.fom,
                    tom: konverterPerioder ? fraInputDatoTilBackendDato(p.tom) : p.tom,
                }),
            };
        });
};

const tilDatoSvar = (svar) => {
    return svar
        ? svar.svarverdier.map((s) => {
            return {
                ...s,
                verdi: fraInputDatoTilBackendDato(s.verdi),
            };
        })
        : [];
};

const tilBackendMinMax = (minMax) => {
    return minMax && typeof minMax.getFullYear === 'function'
        ? fraJSDatoTilBackendDato(minMax)
        : minMax;
};

const populerSporsmalMedSvar = (sporsmal, svarFraSkjema, options) => {
    const svar = (() => {
        if (sporsmal.svartype === PERIODER) {
            return tilPeriodesvar(svarFraSkjema, options.konverterPerioder);
        }
        if (sporsmal.svartype === DATO) {
            return tilDatoSvar(svarFraSkjema);
        }
        return svarFraSkjema ? svarFraSkjema.svarverdier : [];
    })();
    return {
        ...sporsmal,
        min: tilBackendMinMax(sporsmal.min),
        max: tilBackendMinMax(sporsmal.max),
        svar,
    };
};

const erUndersporsmalStilt = (sporsmal, values) => {
    const svarValue = values[sporsmal.tag];
    const svarverdiliste = svarValue && svarValue.svarverdier ? svarValue.svarverdier : [];
    const svarverdistrenger = svarverdiliste.map((svarverdi) => {
        return svarverdi.verdi;
    });
    return sporsmal.svartype === CHECKBOX_GRUPPE
        || sporsmal.svartype === IKKE_RELEVANT
        || svarverdistrenger.indexOf(sporsmal.kriterieForVisningAvUndersporsmal) > -1;
};

const settMinMax = (sporsmal) => {
    switch (sporsmal.svartype) {
        case DATO:
        case PERIODER: {
            return {
                ...sporsmal,
                min: tilBackendMinMax(sporsmal.min),
                max: tilBackendMinMax(sporsmal.max),
                undersporsmal: sporsmal.undersporsmal.map(settMinMax),
            };
        }
        default: {
            return {
                ...sporsmal,
                undersporsmal: sporsmal.undersporsmal.map(settMinMax),
            };
        }
    }
};

const populerSporsmalsliste = (sporsmalsliste, values, options) => {
    return sporsmalsliste.map((sporsmal) => {
        const svarValue = values[sporsmal.tag];
        const undersporsmalErStilt = erUndersporsmalStilt(sporsmal, values);
        const populertSporsmal = populerSporsmalMedSvar(sporsmal, svarValue, options);
        if (undersporsmalErStilt) {
            return {
                ...populertSporsmal,
                undersporsmal: populerSporsmalsliste(populertSporsmal.undersporsmal, values, options),
            };
        }
        return settMinMax(populertSporsmal);
    });
};

const populerSoknadMedSvar = (soknad, values, optionsParam = {}) => {
    const options = {
        konverterPerioder: true,
        ...optionsParam,
    };
    const sporsmal = populerSporsmalsliste(soknad.sporsmal, values, options);

    return {
        ...soknad,
        sporsmal,
    };
};

export const populerSoknadMedSvarUtenKonvertertePerioder = (soknad, values) => {
    return populerSoknadMedSvar(soknad, values, {
        konverterPerioder: false,
    });
};

export default populerSoknadMedSvar;
