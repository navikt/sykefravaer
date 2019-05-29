import {
    hentDagerMellomDatoer,
    leggTilDagerPaaDato,
} from './datoUtils';
import {
    finnOppfolgingsforlopsPerioderForAktiveSykmeldinger,
    finnVirksomheterMedAktivSykmelding,
} from './oppfolgingsforlopsperioderUtils';

const isDefined = (value) => {
    return value !== undefined;
};

export const harSvarMotebehovSender = (motebehovSvarReducerListe) => {
    return motebehovSvarReducerListe.filter((reducer) => {
        return reducer.sender;
    }).length > 0;
};

export const harSvarMotebehovFeilet = (motebehovSvarReducerListe) => {
    return motebehovSvarReducerListe.filter((reducer) => {
        return reducer.sendingFeilet;
    }).length > 0;
};

export const input2RSLagreMotebehov = (motebehov, virksomhetsnummer, fnr) => {
    const rsLagreMotebehov = {};
    const rsMotebehovSvar = {};
    if (!isDefined(motebehov)) {
        return rsLagreMotebehov;
    }
    rsLagreMotebehov.virksomhetsnummer = virksomhetsnummer || '';
    rsLagreMotebehov.arbeidstakerFnr = fnr || '';

    if (isDefined(motebehov.harMotebehov)) {
        if (motebehov.harMotebehov === 'true') {
            rsMotebehovSvar.harMotebehov = true;
        } else if (motebehov.harMotebehov === 'false') {
            rsMotebehovSvar.harMotebehov = false;
        } else {
            rsMotebehovSvar.harMotebehov = motebehov.harMotebehov;
        }
    }
    if (isDefined(motebehov.friskmeldingForventning)) {
        rsMotebehovSvar.friskmeldingForventning = motebehov.friskmeldingForventning;
    }
    if (isDefined(motebehov.tiltak)) {
        rsMotebehovSvar.tiltak = motebehov.tiltak;
    }
    if (isDefined(motebehov.tiltakResultat)) {
        rsMotebehovSvar.tiltakResultat = motebehov.tiltakResultat;
    }
    if (isDefined(motebehov.forklaring)) {
        rsMotebehovSvar.forklaring = motebehov.forklaring;
    }
    rsLagreMotebehov.motebehovSvar = rsMotebehovSvar;

    return rsLagreMotebehov;
};

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
    return `${process.env.REACT_APP_CONTEXT_ROOT}/dialogmoter${moteVisning}`;
};

export const erOppfoelgingsdatoNyereEnn132DagerForProdsetting = (oppfoelgingsdato) => {
    const antallDagerMellomGrensedatoOgProddato = 132;
    // Dato for prodsetting av motebehov
    const motebehovPilotProdDato = new Date('2019-03-11');
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

export const orgnummerFraMote = (moteReducer) => {
    const moteData = moteReducer.data;
    const deltakerMedOrgnummer = moteData.deltakere && moteData.deltakere.find((deltaker) => {
        return !!deltaker.orgnummer;
    });
    return deltakerMedOrgnummer.orgnummer;
};

export const moteOpprettetIOppfolgingstilfelle = (moteReducer, oppfolgingsforlopsPerioderReducerListe) => {
    const orgnummer = moteReducer && orgnummerFraMote(moteReducer);
    const oppfolgingsforlopsPerioderReducer = oppfolgingsforlopsPerioderReducerListe.find((periodeReducer) => {
        return periodeReducer.virksomhetsnummer === orgnummer;
    });

    const startOppfolgingsdato = oppfolgingsforlopsPerioderReducer.data && hentOppfolgingsforlopStartdato(oppfolgingsforlopsPerioderReducer.data);
    const sluttOppfolgingsdato = oppfolgingsforlopsPerioderReducer.data && hentOppfolgingsforlopSluttdato(oppfolgingsforlopsPerioderReducer.data);
    const moteOpprettetDato = new Date(moteReducer.data.opprettetTidspunkt);

    return startOppfolgingsdato <= moteOpprettetDato && moteOpprettetDato <= sluttOppfolgingsdato;
};

export const moteplanleggerBruktIOppfolgingstilfelle = (moteReducer, oppfolgingsforlopsPerioderReducerListe) => {
    if (!moteReducer || !moteReducer.data) {
        return false;
    }

    return moteOpprettetIOppfolgingstilfelle(moteReducer, oppfolgingsforlopsPerioderReducerListe);
};

export const harSykmeldtSvartPaaMotebehov = (motebehovReducer) => {
    return motebehovReducer.data && motebehovReducer.data.findIndex((motebehov) => {
        return motebehov.aktorId === motebehov.opprettetAv;
    }) > -1;
};

export const skalViseMotebehovMedOppfolgingsforlopListe = (oppfolgingsforlopsPerioderReducerListe, motebehovReducer, moteReducer) => {
    try {
        if (motebehovReducer && motebehovReducer.hentingForbudt === true) {
            return false;
        }
        if (motebehovReducer && harSykmeldtSvartPaaMotebehov(motebehovReducer)) {
            return true;
        }

        const oppfolgingsforlopMedMotebehovVisning = oppfolgingsforlopsPerioderReducerListe.filter((oppfolgingsforlopsPerioderReducer) => {
            return skalViseMotebehovForOppfolgingsforlop(oppfolgingsforlopsPerioderReducer);
        });
        if (oppfolgingsforlopMedMotebehovVisning.length === 0) {
            return false;
        }
        return !moteplanleggerBruktIOppfolgingstilfelle(moteReducer, oppfolgingsforlopsPerioderReducerListe);
    } catch (e) {
        return false;
    }
};

export const erMotebehovTilgjengeligForOppfolgingsforlop = (state) => {
    const virksomhetsnrListe = finnVirksomheterMedAktivSykmelding(state.dineSykmeldinger.data, state.ledere.data);
    const oppfolgingsforlopsPerioderReducerListe = finnOppfolgingsforlopsPerioderForAktiveSykmeldinger(state, virksomhetsnrListe);

    return skalViseMotebehovMedOppfolgingsforlopListe(oppfolgingsforlopsPerioderReducerListe, state.motebehov);
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
