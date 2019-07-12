import { CHECKED, UNCHECKED } from '../enums/svarEnums';

export const genererParseForEnkeltverdi = () => verdi => (verdi || verdi === ''
    ? {
        svarverdier: [{
            verdi,
        }],
    }
    : undefined);

export const genererParseForFlereVerdier = () => (verdier = []) => ({
    svarverdier: verdier.map(verdi => ({
        verdi,
    })),
});

export const genererParseForCheckbox = () => {
    const parse = genererParseForEnkeltverdi();
    return (value) => {
        const checkedVerdi = value ? CHECKED : UNCHECKED;
        return parse(checkedVerdi);
    };
};

export const formaterEnkeltverdi = (value) => {
    try {
        const { verdi } = value.svarverdier[0];
        return (verdi === CHECKED || verdi === UNCHECKED)
            ? verdi === CHECKED
            : verdi;
    } catch (e) {
        return '';
    }
};

export const formaterFlereVerdier = verdi => (!verdi || !verdi.svarverdier
    ? []
    : verdi.svarverdier.map(svarverdi => svarverdi.verdi));

export const fjernIndexFraTag = (tag) => {
    const separator = '_';
    const tagdeler = tag.split(separator);
    if (!Number.isNaN(parseInt(tagdeler[tagdeler.length - 1], 10))) {
        tagdeler.splice(-1, 1);
        return tagdeler.join(separator);
    }
    return tag;
};

export const tagMatcher = (tags, inputTag) => tags.filter(tag => inputTag.indexOf(tag) > -1).length > 0;
