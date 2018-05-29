import { UNCHECKED, CHECKED } from '../../enums/svarEnums';

export const genererParseForEnkeltverdi = (sporsmalsid, svarverditype = null) => {
    return (verdi) => {
        return verdi || verdi === ''
            ? {
                sporsmalsid,
                svarverdier: [{
                    verdi,
                    svarverditype,
                }],
            }
            : undefined;
    };
};

export const genererParseForCheckbox = (id) => {
    const parse = genererParseForEnkeltverdi(id);
    return (value) => {
        const checkedVerdi = value ? CHECKED : UNCHECKED;
        return parse(checkedVerdi);
    };
};

export const formaterEnkeltverdi = (value) => {
    try {
        const verdi = value.svarverdier[0].verdi;
        return (verdi === CHECKED || verdi === UNCHECKED)
            ? verdi === CHECKED
            : verdi;
    } catch (e) {
        return '';
    }
};

export const fjernIndexFraTag = (tag) => {
    const separator = '_';
    const tagdeler = tag.split(separator);
    if (!isNaN(parseInt(tagdeler[tagdeler.length - 1], 10))) {
        tagdeler.splice(-1, 1);
        return tagdeler.join(separator);
    }
    return tag;
};
