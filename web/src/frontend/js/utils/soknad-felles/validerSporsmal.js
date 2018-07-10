import { getLedetekst } from 'digisyfo-npm';
import { formaterEnkeltverdi } from '../../components/soknad-felles/fieldUtils';
import { CHECKED } from '../../enums/svarEnums';
import { CHECKBOX_GRUPPE, PERIODER, FRITEKST } from '../../enums/svartyper';

const hentSporsmalMedStilteUndersporsmal = (sporsmalsliste, values) => {
    return sporsmalsliste
        .filter((sporsmal) => {
            return values[sporsmal.tag] !== undefined;
        })
        .filter((sporsmal) => {
            const verdi = formaterEnkeltverdi(values[sporsmal.tag]);
            const formatertVerdi = verdi === true ? CHECKED : verdi;
            return (sporsmal.svar && formatertVerdi === sporsmal.kriterieForVisningAvUndersporsmal);
        });
};

export const beregnFeilmeldingnokkelFraTag = (tag) => {
    return `soknad.feilmelding.${tag.toLowerCase()}`;
};

export const beregnFeilmeldingstekstFraTag = (tag) => {
    const nokkel = beregnFeilmeldingnokkelFraTag(tag);
    return getLedetekst(nokkel);
};

const verdiErTom = (verdi) => {
    return (verdi || verdi === '') && verdi.trim && verdi.trim() === '';
};

const validerUndersporsmalsliste = (sporsmalsliste = [], values = {}, feilmeldingerParam = {}) => {
    let feilmeldinger = { ...feilmeldingerParam };
    const sporsmalMedStilteUndersporsmal = hentSporsmalMedStilteUndersporsmal(sporsmalsliste, values);

    sporsmalMedStilteUndersporsmal
        .forEach((sporsmalMedUndersporsmal) => {
            const undersporsmalsliste = sporsmalMedUndersporsmal.undersporsmal;
            undersporsmalsliste.forEach((undersporsmal) => {
                switch (undersporsmal.svartype) {
                    case CHECKBOX_GRUPPE: {
                        const avkryssedeCheckboxer = undersporsmal.undersporsmal
                            .map((checkboxSporsmal) => {
                                const verdi = values[checkboxSporsmal.tag];
                                return formaterEnkeltverdi(verdi);
                            })
                            .filter((verdi) => {
                                return verdi === true;
                            });

                        if (avkryssedeCheckboxer.length === 0) {
                            feilmeldinger[undersporsmal.tag] = {
                                _error: beregnFeilmeldingstekstFraTag(undersporsmal.tag),
                            };
                        } else {
                            feilmeldinger = validerUndersporsmalsliste(undersporsmal.undersporsmal, values, feilmeldinger);
                        }
                        break;
                    }
                    case PERIODER: {
                        // Perioder valideres i komponenten, og har en avvikende datastruktur i store
                        break;
                    }
                    default: {
                        const verdi = formaterEnkeltverdi(values[undersporsmal.tag]);
                        if (verdiErTom(verdi)) {
                            feilmeldinger[undersporsmal.tag] = beregnFeilmeldingstekstFraTag(undersporsmal.tag);
                        }
                        break;
                    }
                }
            });
        });

    return feilmeldinger;
};

export default (sporsmal = [], values = {}) => {
    const feilmeldinger = {};
    sporsmal
        .filter((s) => {
            const verdi = formaterEnkeltverdi(values[s.tag]);
            return (values[s.tag] === undefined
                    || verdi === false
                    || (s.svartype === FRITEKST && verdiErTom(verdi))
            );
        })
        .forEach((s) => {
            feilmeldinger[s.tag] = beregnFeilmeldingstekstFraTag(s.tag);
        });

    return validerUndersporsmalsliste(sporsmal, values, feilmeldinger);
};
