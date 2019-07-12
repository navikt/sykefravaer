export const HENT_VENTETID_FORESPURT = 'HENT_VENTETID_FORESPURT';
export const HENTER_VENTETID = 'HENTER_VENTETID';
export const VENTETID_HENTET = 'VENTETID_HENTET';
export const HENT_VENTETID_FEILET = 'HENT_VENTETID_FEILET';
export const SKAL_OPPRETTE_SOKNAD_HENTET = 'SKAL_OPPRETTE_SOKNAD_HENTET';

export const hentVentetid = sykmeldingId => ({
    type: HENT_VENTETID_FORESPURT,
    sykmeldingId,
});

export const henterVentetid = sykmeldingId => ({
    type: HENTER_VENTETID,
    sykmeldingId,
});

export const ventetidHentet = (sykmeldingId, erUtenforVentetid) => ({
    type: VENTETID_HENTET,
    sykmeldingId,
    erUtenforVentetid,
});

export const hentVentetidFeilet = sykmeldingId => ({
    type: HENT_VENTETID_FEILET,
    sykmeldingId,
});

export const skalOppretteSoknadHentet = (sykmeldingId, skalOppretteSoknad) => ({
    type: SKAL_OPPRETTE_SOKNAD_HENTET,
    skalOppretteSoknad,
    sykmeldingId,
});
