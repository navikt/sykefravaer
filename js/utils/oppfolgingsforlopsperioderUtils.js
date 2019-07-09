import {
    finnArbeidsgivereForAktiveSykmeldinger,
} from './sykmeldingUtils';

export const hentOppfolgingsPerioderFeilet = (oppfolgingsforlopsPerioderReducerListe) => {
    return oppfolgingsforlopsPerioderReducerListe.filter((reducer) => {
        return reducer.hentingFeilet;
    }).length > 0;
};

export const forsoektHentetOppfolgingsPerioder = (oppfolgingsforlopsPerioderReducerListe) => {
    return oppfolgingsforlopsPerioderReducerListe.filter((reducer) => {
        return reducer.hentet || reducer.hentingFeilet;
    }).length === oppfolgingsforlopsPerioderReducerListe.length;
};

export const henterEllerHarForsoektHentetOppfolgingsPerioder = (oppfolgingsforlopsPerioderReducerListe) => {
    return oppfolgingsforlopsPerioderReducerListe.filter((reducer) => {
        return reducer.henter || forsoektHentetOppfolgingsPerioder([reducer]);
    }).length === oppfolgingsforlopsPerioderReducerListe.length;
};

export const finnVirksomheterMedAktivSykmelding = (sykmeldinger, ledere) => {
    return finnArbeidsgivereForAktiveSykmeldinger(sykmeldinger, ledere).map((virksomhet) => {
        return virksomhet.virksomhetsnummer;
    });
};

export const finnOgHentManglendeOppfolgingsforlopsPerioder = (props) => {
    const {
        actions,
        oppfolgingsforlopsPerioderReducerListe,
        virksomhetsnrListe,
    } = props;
    virksomhetsnrListe.forEach((virksomhetsnr) => {
        const reducer = oppfolgingsforlopsPerioderReducerListe.filter((elem) => {
            return elem.virksomhetsnummer === virksomhetsnr;
        })[0];
        const skalHente = !reducer || !henterEllerHarForsoektHentetOppfolgingsPerioder([reducer]);
        if (skalHente) {
            actions.hentOppfolgingsforlopsPerioder(virksomhetsnr);
        }
    });
};

export const finnOppfolgingsforlopsPerioderForAktiveSykmeldinger = (
    state,
    virksomhetsnummerListe,
) => {
    const virksomhetsnumrListe = virksomhetsnummerListe || finnVirksomheterMedAktivSykmelding(state.dineSykmeldinger.data, state.ledere.data);
    const oppfolgingsforlopsPerioderReducer = state.oppfolgingsforlopsPerioder || {};
    const oppfolgingsforlopsPeriodeListe = [];

    virksomhetsnumrListe.forEach((virksomhetsnummer) => {
        if (oppfolgingsforlopsPerioderReducer[virksomhetsnummer]) {
            oppfolgingsforlopsPeriodeListe.push({
                virksomhetsnummer,
                ...oppfolgingsforlopsPerioderReducer[virksomhetsnummer],
            });
        }
    });
    return oppfolgingsforlopsPeriodeListe;
};

