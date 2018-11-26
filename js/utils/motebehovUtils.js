import {
    hentDagerMellomDatoer,
    leggTilDagerPaaDato,
} from './datoUtils';
import {
    finnOppfolgingsforlopsPerioderForAktiveSykmeldinger,
    finnVirksomheterMedAktivSykmelding,
} from './oppfolgingsforlopsperioderUtils';

export const MOTEBEHOVSVAR_GYLDIG_VARIGHET_DAGER = 10 * 7;
export const OPPFOLGINGSFORLOP_MOTEBEHOV_START_DAGER = 16 * 7;
export const OPPFOLGINGSFORLOP_MOTEBEHOV_SLUTT_DAGER = 26 * 7;

export const finnNyesteMotebehovForVirksomhetListe = (motebehovReducer, virksomhetsnrListe) => {
    return motebehovReducer.data.filter((motebehov) => {
        return virksomhetsnrListe.filter((virksomhetsnr) => {
            return motebehov.virksomhetsnummer === virksomhetsnr;
        }).length > 0;
    }).sort((m1, m2) => {
        return m2.opprettetDato - m1.opprettetDato;
    })[0];
};

export const skalViseMotebehovKvittering = (motebehovReducer, virksomhetsnrListe) => {
    return !!finnNyesteMotebehovForVirksomhetListe(motebehovReducer, virksomhetsnrListe);
};

export const hentMoteLandingssideUrl = (skalViseMotebehov) => {
    const moteVisning = skalViseMotebehov ? '' : '/mote';
    return `/sykefravaer/dialogmoter${moteVisning}`;
};

export const erOppfoelgingsdatoNyereEnn132DagerForProdsetting = (oppfoelgingsdato) => {
    const antallDagerMellomGrensedatoOgProddato = 132;
    // TODO: fyll i dato for prodsetting her
    // Dato for prodsetting av motebehov
    const motebehovPilotProdDato = new Date('2018-11-19');
    // Dato hvor alle tidligere oppfoelgingsdatoer ikke skal vises motebehov for
    const grenseDato = leggTilDagerPaaDato(motebehovPilotProdDato, -antallDagerMellomGrensedatoOgProddato);

    return oppfoelgingsdato.getTime() > grenseDato.getTime();
};

export const erOppfoelgingsdatoPassertMed16UkerOgIkke26Uker = (startOppfolgingsdato) => {
    const oppfoelgingstilfelleStartDato = new Date(startOppfolgingsdato);
    oppfoelgingstilfelleStartDato.setHours(0, 0, 0, 0);
    const dagensDato = new Date();
    dagensDato.setHours(0, 0, 0, 0);

    const antallDagerSidenOppfoelgingsTilfelleStart = hentDagerMellomDatoer(oppfoelgingstilfelleStartDato, dagensDato);

    return antallDagerSidenOppfoelgingsTilfelleStart >= OPPFOLGINGSFORLOP_MOTEBEHOV_START_DAGER
        && antallDagerSidenOppfoelgingsTilfelleStart < OPPFOLGINGSFORLOP_MOTEBEHOV_SLUTT_DAGER;
};

export const erOppfolgingstilfelleSluttDatoPassert = (sluttOppfolgingsdato) => {
    const oppfolgingstilfelleSluttDato = new Date(sluttOppfolgingsdato);
    oppfolgingstilfelleSluttDato.setHours(0, 0, 0, 0);
    const dagensDato = new Date();
    dagensDato.setHours(0, 0, 0, 0);

    return dagensDato > oppfolgingstilfelleSluttDato;
};

export const erMotebehovATToggletPaa = (togglesReducer) => {
    return togglesReducer.data && togglesReducer.data['syfotoggles.enable.motebehov.at'] === 'true';
};

export const erMotebehovToggletPaa = (togglesReducer) => {
    return togglesReducer.data
        && togglesReducer.data['syfotoggles.dialogmote.motebehov.vis'] === 'true'
        && erMotebehovATToggletPaa(togglesReducer);
};

export const hentOppfolgingsforlopStartdato = (oppfolgingsforlopsPeriodeData) => {
    return oppfolgingsforlopsPeriodeData.length > 0 && new Date(Math.min.apply(null, oppfolgingsforlopsPeriodeData.map((periode) => {
        return new Date(periode.fom);
    })));
};

export const hentOppfolgingsforlopSluttdato = (oppfolgingsforlopsPeriodeData) => {
    return oppfolgingsforlopsPeriodeData.length > 0 && new Date(Math.max.apply(null, oppfolgingsforlopsPeriodeData.map((periode) => {
        return new Date(periode.tom);
    })));
};

export const skalViseMotebehovForOppfolgingsforlop = (oppfolgingsforlopsPerioderReducer) => {
    const startOppfolgingsdato = oppfolgingsforlopsPerioderReducer.data && hentOppfolgingsforlopStartdato(oppfolgingsforlopsPerioderReducer.data);
    const sluttOppfolgingsdato = oppfolgingsforlopsPerioderReducer.data && hentOppfolgingsforlopSluttdato(oppfolgingsforlopsPerioderReducer.data);

    return (startOppfolgingsdato && sluttOppfolgingsdato)
        && !erOppfolgingstilfelleSluttDatoPassert(sluttOppfolgingsdato)
        && erOppfoelgingsdatoPassertMed16UkerOgIkke26Uker(startOppfolgingsdato)
        && erOppfoelgingsdatoNyereEnn132DagerForProdsetting(startOppfolgingsdato);
};

export const finnVirksomhetnrListeMedSkalViseMotebehov = (oppfolgingsforlopsPerioderReducerListe) => {
    const liste = [];
    oppfolgingsforlopsPerioderReducerListe.forEach((oppfolgingsforlopsPerioderReducer) => {
        if (skalViseMotebehovForOppfolgingsforlop(oppfolgingsforlopsPerioderReducer)) {
            liste.push(oppfolgingsforlopsPerioderReducer.virksomhetsnummer);
        }
    });
    return liste;
};

export const skalViseMotebehovMedOppfolgingsforlopListe = (oppfolgingsforlopsPerioderReducerListe, toggles, motebehovReducer) => {
    try {
        if (!erMotebehovToggletPaa(toggles)) {
            return false;
        }

        if (motebehovReducer && motebehovReducer.hentingForbudt === true) {
            return false;
        }

        return oppfolgingsforlopsPerioderReducerListe.filter((oppfolgingsforlopsPerioderReducer) => {
            return skalViseMotebehovForOppfolgingsforlop(oppfolgingsforlopsPerioderReducer);
        }).length > 0;
    } catch (e) {
        return false;
    }
};

export const erMotebehovTilgjengeligForOppfolgingsforlop = (state) => {
    const virksomhetsnrListe = finnVirksomheterMedAktivSykmelding(state.dineSykmeldinger.data, state.ledere.data);
    const oppfolgingsforlopsPerioderReducerListe = finnOppfolgingsforlopsPerioderForAktiveSykmeldinger(state, virksomhetsnrListe);

    return skalViseMotebehovMedOppfolgingsforlopListe(oppfolgingsforlopsPerioderReducerListe, state.toggles, state.motebehov);
};

export const harMotebehovSvar = (state) => {
    return state.motebehov.data.length > 0;
};

export const erMotebehovUbesvart = (state) => {
    try {
        return erMotebehovTilgjengeligForOppfolgingsforlop(state) && !harMotebehovSvar(state);
    } catch (e) {
        return false;
    }
};
