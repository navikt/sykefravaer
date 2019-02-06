import { getHtmlLedetekst } from '@navikt/digisyfo-npm';

const hentSykepengetekst = (soknad) => {
    const nokkel = soknad.sendtNav && soknad.sendtArbeidsgiver
        ? 'sykepengesoknad.sykepengeinfo.til-arbeidsgiver-og-nav'
        : soknad.sendtNav
            ? 'sykepengesoknad.sykepengeinfo.til-nav'
            : 'sykepengesoknad.sykepengeinfo.til-arbeidsgiver';
    return getHtmlLedetekst(nokkel);
};

export default hentSykepengetekst;
