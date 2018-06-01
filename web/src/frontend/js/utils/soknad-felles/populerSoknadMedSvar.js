import { CHECKBOX_GRUPPE, PERIODER } from '../../enums/svartyper';
import { FOM, TOM } from '../../enums/svarverdityper';

const tilPeriodesvar = (perioder) => {
    let periodesvar = [];
    perioder.forEach((periode) => {
        periodesvar = [...periodesvar, {
            verdi: periode.fom,
            svarverdiType: FOM,
        }, {
            verdi: periode.tom,
            svarverdiType: TOM,
        }];
    });
    return periodesvar;
};

const populerSporsmalMedSvar = (sporsmal, svarFraSkjema) => {
    const svarverdiliste = (() => {
        if (sporsmal.svar.svartype === PERIODER) {
            return tilPeriodesvar(svarFraSkjema);
        }
        return svarFraSkjema ? svarFraSkjema.svarverdier : [];
    })();

    return {
        ...sporsmal,
        svar: {
            ...sporsmal.svar,
            svarverdi: svarverdiliste,
        },
    };
};

const erUndersporsmalStilt = (sporsmal, values) => {
    const svarValue = values[sporsmal.tag];
    const svarverdiliste = svarValue && svarValue.svarverdier ? svarValue.svarverdier : [];
    const svarverdistrenger = svarverdiliste.map((svarverdi) => {
        return svarverdi.verdi;
    });
    return sporsmal.svar.svartype === CHECKBOX_GRUPPE || svarverdistrenger.indexOf(sporsmal.svar.kriterieForVisningAvUndersporsmal) > -1;
};

const populerSporsmalsliste = (sporsmalsliste, values) => {
    return sporsmalsliste.map((sporsmal) => {
        const svarValue = values[sporsmal.tag];
        const undersporsmalErStilt = erUndersporsmalStilt(sporsmal, values);
        const populertSporsmal = populerSporsmalMedSvar(sporsmal, svarValue);
        if (undersporsmalErStilt) {
            return {
                ...populertSporsmal,
                svar: {
                    ...populertSporsmal.svar,
                    undersporsmal: populerSporsmalsliste(populertSporsmal.svar.undersporsmal, values),
                },
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
