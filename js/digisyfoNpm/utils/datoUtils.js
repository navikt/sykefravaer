export const ANTALL_MS_DAG = 1000 * 60 * 60 * 24;

export const toDate = (dato) => {
    if (typeof dato === 'undefined' || dato === null) {
        return null;
    } if (typeof date === 'string' && dato.includes('T') && !dato.includes('Z')) {
        return new Date(`${dato}Z`);
    }
    return new Date(dato);
};

export const toDatePrettyPrint = (dato) => {
    if (typeof dato === 'undefined' || dato === null) {
        return null;
    }

    const _dato = toDate(dato);

    const days = _dato.getUTCDate() < 10 ? `0${_dato.getUTCDate()}` : `${_dato.getUTCDate()}`;
    const months = _dato.getUTCMonth() + 1 < 10 ? `0${_dato.getUTCMonth() + 1}` : `${_dato.getUTCMonth() + 1}`;
    const years = _dato.getUTCFullYear();

    return `${days}.${months}.${years}`;
};

export function getDuration(from, to) {
    return Math.round(Math.floor(toDate(to) - toDate(from)) / (1000 * 60 * 60 * 24)) + 1;
}

export const fraInputdatoTilJSDato = (inputDato) => {
    const datoSplit = inputDato.split('.');
    let ar = datoSplit[2];
    if (ar.length === 2) {
        ar = `20${ar}`;
    }
    const s = `${ar}-${datoSplit[1]}-${datoSplit[0]}`;
    return new Date(s);
};

export const erGyldigDatoformat = (dato) => {
    const d = dato.replace(/\./g, '');
    let s = `${parseInt(d, 10)}`;
    if (dato.startsWith('0')) {
        s = `0${s}`;
    }
    if (dato.trim().length !== 10) {
        return false;
    }
    if (s.length !== 8) {
        return false;
    }
    return true;
};

const maaneder = ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember'];
const SKILLETEGN_PERIODE = '–';

export const langtDatoFormat = (_dato) => {
    const dato = new Date(_dato);
    return `${dato.getUTCDate()}. ${maaneder[dato.getUTCMonth()]} ${dato.getUTCFullYear()}`;
};

export const tilLesbarDatoUtenAarstall = (datoArg) => {
    if (datoArg) {
        const dato = new Date(datoArg);
        const dag = dato.getUTCDate();
        const manedIndex = dato.getUTCMonth();
        const maned = maaneder[manedIndex];
        return `${dag}. ${maned}`;
    }
    return null;
};

export const tilLesbarDatoMedArstall = (datoArg) => {
    return datoArg
        ? `${tilLesbarDatoUtenAarstall(new Date(datoArg))} ${new Date(datoArg).getUTCFullYear()}`
        : null;
};

export const tilLesbarPeriodeMedArstall = (fomArg, tomArg) => {
    const fom = new Date(fomArg);
    const tom = new Date(tomArg);
    const erSammeAar = fom.getUTCFullYear() === tom.getUTCFullYear();
    const erSammeMaaned = fom.getUTCMonth() === tom.getUTCMonth();
    return erSammeAar && erSammeMaaned
        ? `${fom.getUTCDate()}. ${SKILLETEGN_PERIODE} ${tilLesbarDatoMedArstall(tom)}`
        : erSammeAar
            ? `${tilLesbarDatoUtenAarstall(fom)} ${SKILLETEGN_PERIODE} ${tilLesbarDatoMedArstall(tom)}`
            : `${tilLesbarDatoMedArstall(fom)} ${SKILLETEGN_PERIODE} ${tilLesbarDatoMedArstall(tom)}`;
};

export const tilLesbarPeriodeUtenArstall = (fomArg, tomArg) => {
    const fom = new Date(fomArg);
    const tom = new Date(tomArg);
    const erSammeMaaned = fom.getUTCMonth() === tom.getUTCMonth();
    return erSammeMaaned
        ? `${fom.getUTCDate()}. ${SKILLETEGN_PERIODE} ${tilLesbarDatoUtenAarstall(tom)}`
        : `${tilLesbarDatoUtenAarstall(fom)} ${SKILLETEGN_PERIODE} ${tilLesbarDatoUtenAarstall(tom)}`;
};
