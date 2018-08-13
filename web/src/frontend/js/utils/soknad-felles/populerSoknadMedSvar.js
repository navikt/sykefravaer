import { fraInputdatoTilJSDato } from 'digisyfo-npm';
import { CHECKBOX_GRUPPE, DATO, IKKE_RELEVANT, PERIODER } from '../../enums/svartyper';

const tilBackendDato = (inputdato) => {
    return fraInputdatoTilJSDato(inputdato).toJSON().substr(0, 10);
};

const tilPeriodesvar = (perioder) => {
    return perioder.map((p) => {
        return {
            verdi: {
                fom: tilBackendDato(p.fom),
                tom: tilBackendDato(p.tom),
            },
        };
    });
};

const tilDatoSvar = (svar) => {
    return svar
        ? svar.svarverdier.map((s) => {
            return {
                ...s,
                verdi: tilBackendDato(s.verdi),
            };
        })
        : [];
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
