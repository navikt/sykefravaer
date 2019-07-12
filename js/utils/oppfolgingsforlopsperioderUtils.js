import { finnArbeidsgivereForAktiveSykmeldinger } from './sykmeldingUtils';

export const hentOppfolgingsPerioderFeilet = oppfolgingsforlopsPerioderReducerListe =>
    oppfolgingsforlopsPerioderReducerListe
        .filter(reducer => reducer.hentingFeilet).length > 0;

export const forsoektHentetOppfolgingsPerioder = oppfolgingsforlopsPerioderReducerListe =>
    oppfolgingsforlopsPerioderReducerListe
        .filter(reducer => reducer.hentet || reducer.hentingFeilet)
        .length === oppfolgingsforlopsPerioderReducerListe.length;

export const henterEllerHarForsoektHentetOppfolgingsPerioder = oppfolgingsforlopsPerioderReducerListe =>
    oppfolgingsforlopsPerioderReducerListe
        .filter(reducer => reducer.henter || forsoektHentetOppfolgingsPerioder([reducer]))
        .length === oppfolgingsforlopsPerioderReducerListe.length;

export const finnVirksomheterMedAktivSykmelding = (sykmeldinger, ledere) => finnArbeidsgivereForAktiveSykmeldinger(sykmeldinger, ledere)
    .map(virksomhet => virksomhet.virksomhetsnummer);

export const finnOgHentManglendeOppfolgingsforlopsPerioder = (hentOppfolgingsforlopsPerioder, oppfolgingsforlopsPerioderReducerListe, virksomhetsnrListe) => {
    virksomhetsnrListe.forEach((virksomhetsnr) => {
        const reducer = oppfolgingsforlopsPerioderReducerListe.filter(elem => elem.virksomhetsnummer === virksomhetsnr)[0];
        const skalHente = !reducer || !henterEllerHarForsoektHentetOppfolgingsPerioder([reducer]);
        if (skalHente) {
            hentOppfolgingsforlopsPerioder(virksomhetsnr);
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
