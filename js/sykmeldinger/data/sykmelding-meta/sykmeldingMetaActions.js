import { HENT_VENTETID_FORESPURT, HENTER_VENTETID, VENTETID_HENTET, HENT_VENTETID_FEILET, SKAL_OPPRETTE_SOKNAD_HENTET } from '../../../actions/actiontyper';

export const hentVentetid = (sykmeldingId) => {
    return {
        type: HENT_VENTETID_FORESPURT,
        sykmeldingId,
    };
};

export const henterVentetid = (sykmeldingId) => {
    return {
        type: HENTER_VENTETID,
        sykmeldingId,
    };
};

export const ventetidHentet = (sykmeldingId, erUtenforVentetid) => {
    return {
        type: VENTETID_HENTET,
        sykmeldingId,
        erUtenforVentetid,
    };
};

export const hentVentetidFeilet = (sykmeldingId) => {
    return {
        type: HENT_VENTETID_FEILET,
        sykmeldingId,
    };
};

export const skalOppretteSoknadHentet = (sykmeldingId, skalOppretteSoknad) => {
    return {
        type: SKAL_OPPRETTE_SOKNAD_HENTET,
        skalOppretteSoknad,
        sykmeldingId,
    };
};
