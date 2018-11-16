import {
    hentDagerMellomDatoer,
    leggTilDagerPaaDato,
} from './datoUtils';

export const skalViseMotebehovKvittering = (motebehovReducer, virksomhetsnummer) => {
    return motebehovReducer.data.find((motebehov) => {
        return motebehov.virksomhetsnummer === virksomhetsnummer;
    });
};

export const hentMoteLandingssideUrl = (skalViseMotebehov) => {
    const moteVisning = skalViseMotebehov ? '' : '/mote';
    return `/sykefravaer/dialogmoter${moteVisning}`;
};

export const erOppfoelgingsdatoNyereEnn132DagerForProdsetting = (oppfoelgingsdato) => {
    const antallDagerMellomGrensedatoOgProddato = 132;
    // TODO: fyll i dato for prodsetting her
    // Dato for prodsetting av motebehov
    const motebehovPilotProdDato = new Date(2018, 9, 23, 0, 0, 0, 0);
    // Dato hvor alle tidligere oppfoelgingsdatoer ikke skal vises motebehov for
    const grenseDato = leggTilDagerPaaDato(motebehovPilotProdDato, -antallDagerMellomGrensedatoOgProddato);

    return oppfoelgingsdato.getTime() > grenseDato.getTime();
};

export const erOppfoelgingsdatoPassertMed16UkerOgIkke26Uker = (startOppfolgingsdato) => {
    const antallDagerMotebehovStart = 16 * 7;
    const antallDagerMotebehovSlutt = 26 * 7;

    const oppfoelgingstilfelleStartDato = new Date(startOppfolgingsdato);
    oppfoelgingstilfelleStartDato.setHours(0, 0, 0, 0);
    const dagensDato = new Date();
    dagensDato.setHours(0, 0, 0, 0);

    const antallDagerSidenOppfoelgingsTilfelleStart = hentDagerMellomDatoer(oppfoelgingstilfelleStartDato, dagensDato);

    return antallDagerSidenOppfoelgingsTilfelleStart >= antallDagerMotebehovStart
        && antallDagerSidenOppfoelgingsTilfelleStart < antallDagerMotebehovSlutt;
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

export const hentNyesteOppfoelgingstilfelleStartdato = (oppfolgingsforlopsPeriodeData) => {
    return oppfolgingsforlopsPeriodeData.length > 0 && new Date(Math.min.apply(null, oppfolgingsforlopsPeriodeData.map((periode) => {
        return new Date(periode.fom);
    })));
};

export const hentNyesteOppfoelgingstilfelleSluttdato = (oppfolgingsforlopsPeriodeData) => {
    return oppfolgingsforlopsPeriodeData.length > 0 && new Date(Math.max.apply(null, oppfolgingsforlopsPeriodeData.map((periode) => {
        return new Date(periode.tom);
    })));
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
            const startOppfolgingsdato = oppfolgingsforlopsPerioderReducer.data && hentNyesteOppfoelgingstilfelleStartdato(oppfolgingsforlopsPerioderReducer.data);
            const sluttOppfolgingsdato = oppfolgingsforlopsPerioderReducer.data && hentNyesteOppfoelgingstilfelleSluttdato(oppfolgingsforlopsPerioderReducer.data);

            if (!startOppfolgingsdato || !sluttOppfolgingsdato) {
                return false;
            }
            if (erOppfolgingstilfelleSluttDatoPassert(sluttOppfolgingsdato)) {
                return false;
            }

            return erOppfoelgingsdatoPassertMed16UkerOgIkke26Uker(startOppfolgingsdato)
                && erOppfoelgingsdatoNyereEnn132DagerForProdsetting(startOppfolgingsdato);
        }).length > 0;
    } catch (e) {
        return false;
    }
};
