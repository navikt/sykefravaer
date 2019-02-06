import { getLedetekst, tilLesbarDatoMedArstall } from '@navikt/digisyfo-npm';
import { formaterOrgnr } from '../index';
import { KORRIGERT } from '../../enums/soknadstatuser';

const hentStatustekst = (soknad) => {
    const soknadSendtTilNav = soknad.sendtNav !== null || soknad.innsendtDato !== null;
    const soknadSendtTilArbeidsgiver = soknad.sendtArbeidsgiver !== null;
    const nokkel = soknad.status === KORRIGERT
        ? 'sykepengesoknad.status-2.KORRIGERT'
        : soknadSendtTilNav && soknadSendtTilArbeidsgiver
            ? 'sykepengesoknad.status-2.SENDT.til-arbeidsgiver-og-nav'
            : soknadSendtTilNav && !soknadSendtTilArbeidsgiver
                ? 'sykepengesoknad.status-2.SENDT.til-nav'
                : 'sykepengesoknad.status-2.SENDT.til-arbeidsgiver';
    const args = {
        '%ARBEIDSGIVER%': soknad.arbeidsgiver ? soknad.arbeidsgiver.navn : null,
        '%ORGNR%': soknad.arbeidsgiver ? formaterOrgnr(soknad.arbeidsgiver.orgnr) : null,
        '%SENDTTILARBEIDSGIVERDATO%': soknadSendtTilArbeidsgiver ? tilLesbarDatoMedArstall(soknad.sendtArbeidsgiver) : null,
        '%SENDTTILNAVDATO%': soknadSendtTilNav ? tilLesbarDatoMedArstall(soknad.sendtNav || soknad.innsendtDato) : null,
    };
    return getLedetekst(nokkel, args);
};

export default hentStatustekst;
