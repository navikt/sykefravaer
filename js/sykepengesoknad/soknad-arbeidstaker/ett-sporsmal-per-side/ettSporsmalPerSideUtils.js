import { VAER_KLAR_OVER_AT } from '../../enums/tagtyper';

export const hentSporsmalForDenneSiden = (soknad, sidenummer) => {
    const sporsmal = soknad.sporsmal[sidenummer - 1];
    return [sporsmal];
};

export const erSisteSide = (soknad, sidenummer) => {
    const sporsmal = hentSporsmalForDenneSiden(soknad, sidenummer);
    return sporsmal[0].tag === VAER_KLAR_OVER_AT;
};
