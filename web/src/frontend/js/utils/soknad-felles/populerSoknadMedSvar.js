import { fraInputdatoTilJSDato } from 'digisyfo-npm';
import { CHECKBOX_GRUPPE, DATO, IKKE_RELEVANT, PERIODER } from '../../enums/svartyper';

const fraJSDatoTilBackendDato = (jsDato) => {
    return jsDato.toJSON().substr(0, 10);
};

const fraInputDatoTilBackendDato = (inputdato) => {
    return fraJSDatoTilBackendDato(fraInputdatoTilJSDato(inputdato));
};

const tilPeriodesvar = (perioder) => {
    return perioder.map((p) => {
        return {
            verdi: JSON.stringify({
                fom: fraInputDatoTilBackendDato(p.fom),
                tom: fraInputDatoTilBackendDato(p.tom),
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

const populerSporsmalMedSvar = (sporsmal, svarFraSkjema) => {
    const svar = (() => {
        if (sporsmal.svartype === PERIODER) {
            return tilPeriodesvar(svarFraSkjema);
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

const populerSporsmalsliste = (sporsmalsliste, values) => {
    return sporsmalsliste.map((sporsmal) => {
        const svarValue = values[sporsmal.tag];
        const undersporsmalErStilt = erUndersporsmalStilt(sporsmal, values);
        const populertSporsmal = populerSporsmalMedSvar(sporsmal, svarValue);
        if (undersporsmalErStilt) {
            return {
                ...populertSporsmal,
                undersporsmal: populerSporsmalsliste(populertSporsmal.undersporsmal, values),
            };
        }
        return populertSporsmal;
    });
};

export default (soknad, values) => {
    const sporsmal = populerSporsmalsliste(soknad.sporsmal, values);

    return {
        ...soknad,
        sporsmal,
    };
};
