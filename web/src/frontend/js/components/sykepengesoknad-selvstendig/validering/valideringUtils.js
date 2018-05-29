import { getLedetekst } from 'digisyfo-npm';
import { formaterEnkeltverdi } from '../../soknad-felles/fieldUtils';
import { CHECKED } from '../../../enums/svarEnums';
import { CHECKBOX_GRUPPE } from '../../../enums/svartyper';

export const getLedetekstNokkelFraTag = (tag) => {
    return `soknad.feilmelding.${tag.toLowerCase()}`;
};

export const getLedetekstFraTag = (tag, ledetekster) => {
    const nokkel = getLedetekstNokkelFraTag(tag);
    return ledetekster ? getLedetekst(nokkel, ledetekster) : getLedetekst(nokkel);
};

export const validerUndersporsmal = (sporsmalsliste = [], values = {}, feilmeldinger = {}) => {
    let returverdi = { ...feilmeldinger };
    const sporsmalMedAktiveUndersporsmal = sporsmalsliste
        .filter((sporsmal) => {
            return values[sporsmal.tag] !== undefined;
        })
        .filter((sporsmal) => {
            const verdi = formaterEnkeltverdi(values[sporsmal.tag]);
            const formatertVerdi = verdi === true ? CHECKED : verdi;
            return sporsmal.svar && formatertVerdi === sporsmal.svar.kriterieForVisningAvUndersporsmal;
        });

    sporsmalMedAktiveUndersporsmal
        .forEach((sporsmalMedUndersporsmal) => {
            const undersporsmalsliste = sporsmalMedUndersporsmal.svar.undersporsmal;
            undersporsmalsliste.forEach((undersporsmal) => {
                switch (undersporsmal.svar.svartype) {
                    case CHECKBOX_GRUPPE: {
                        const avkryssedeCheckboxer = undersporsmal.svar.undersporsmal
                            .map((checkboxSporsmal) => {
                                const verdi = values[checkboxSporsmal.tag];
                                return formaterEnkeltverdi(verdi);
                            })
                            .filter((verdier) => {
                                return verdier === true;
                            });

                        if (avkryssedeCheckboxer.length === 0) {
                            returverdi[undersporsmal.tag] = {
                                _error: getLedetekstFraTag(undersporsmal.tag),
                            };
                        } else {
                            returverdi = validerUndersporsmal(undersporsmal.svar.undersporsmal, values, returverdi);
                        }
                        break;
                    }
                    default: {
                        const verdi = formaterEnkeltverdi(values[undersporsmal.tag]);
                        if ((verdi || verdi === '') && verdi.trim && verdi.trim() === '') {
                            returverdi[undersporsmal.tag] = getLedetekstFraTag(undersporsmal.tag);
                        }
                        break;
                    }
                }
            });
        });

    return returverdi;
};

export const validerSporsmal = (sporsmal, values) => {
    const returverdi = {};
    sporsmal
        .filter((s) => {
            return values[s.tag] === undefined ||
                formaterEnkeltverdi(values[s.tag]) === false;
        })
        .forEach((s) => {
            returverdi[s.tag] = getLedetekstFraTag(s.tag);
        });
    return validerUndersporsmal(sporsmal, values, returverdi);
};
