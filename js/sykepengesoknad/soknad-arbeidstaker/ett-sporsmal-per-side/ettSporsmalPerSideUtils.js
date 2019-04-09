import { getLedetekst } from '@navikt/digisyfo-npm';
import { VAER_KLAR_OVER_AT } from '../../enums/tagtyper';
import { fjernIndexFraTag } from '../../felleskomponenter/sporsmal/fieldUtils';

export const hentSporsmalForDenneSiden = (soknad, sidenummer) => {
    const sporsmal = soknad.sporsmal[sidenummer - 1];
    return [sporsmal];
};

export const erSisteSide = (soknad, sidenummer) => {
    const sporsmal = hentSporsmalForDenneSiden(soknad, sidenummer);
    return sporsmal[0].tag === VAER_KLAR_OVER_AT;
};

export const hentTittel = (soknad, sidenummer) => {
    const sporsmal = hentSporsmalForDenneSiden(soknad, sidenummer)[0];
    const nokkel = sidenummer === 1
        ? 'sykepengesoknad.for-du-begynner.tittel'
        : erSisteSide(soknad, sidenummer)
            ? 'sykepengesoknad.til-slutt.tittel'
            : `sykepengesoknad.${fjernIndexFraTag(sporsmal.tag)
                .toLowerCase()}.tittel`;
    return getLedetekst(nokkel);
};
