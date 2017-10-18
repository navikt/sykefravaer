import { finnAktiveOppfolgingsdialoger } from 'oppfolgingsdialog-npm';
import { finnArbeidsgivereForGyldigeSykmeldinger } from './sykmeldingUtils';

export function getOppfolgingsdialog(oppfolgingsdialoger, oppfolgingsdialogId) {
    return oppfolgingsdialoger.filter((oppfolgingsdialog) => {
        return oppfolgingsdialog.oppfoelgingsdialogId.toString() === oppfolgingsdialogId.toString();
    })[0];
}

export const erAktivOppfolgingsdialogOpprettetMedArbeidsgiver = (oppfolgingsdialoger, virksomhetsnummer) => {
    return finnAktiveOppfolgingsdialoger(oppfolgingsdialoger).filter((dialog) => {
        return dialog.virksomhetsnummer === virksomhetsnummer;
    }).length > 0;
};

export const hentAktivOppfolgingsdialogOpprettetMedArbeidsgiver = (oppfolgingsdialoger, virksomhetsnummer) => {
    return finnAktiveOppfolgingsdialoger(oppfolgingsdialoger).filter((dialog) => {
        return dialog.virksomhetsnummer === virksomhetsnummer;
    })[0];
};

export const erOppfolgingsdialogOpprettbarMedArbeidsgiver = (oppfolgingsdialoger, arbeidsgiver) => {
    return arbeidsgiver.harNaermesteLeder && !erAktivOppfolgingsdialogOpprettetMedArbeidsgiver(oppfolgingsdialoger, arbeidsgiver.virksomhetsnummer);
};

export const erOppfolgingsdialogOpprettbarMedMinstEnArbeidsgiver = (oppfolgingsdialoger, arbeidsgivere) => {
    return arbeidsgivere.filter((arbeidsgiver) => {
        return erOppfolgingsdialogOpprettbarMedArbeidsgiver(oppfolgingsdialoger, arbeidsgiver);
    }).length > 0;
};

export const erSykmeldtUtenOppfolgingsdialogerOgNaermesteLedere = (oppfolgingsdialoger, sykmeldinger, naermesteLedere) => {
    return oppfolgingsdialoger.length === 0 && finnArbeidsgivereForGyldigeSykmeldinger(sykmeldinger, naermesteLedere).filter((arbeidsgiver) => {
        return arbeidsgiver.harNaermesteLeder;
    }).length === 0;
};

export const isEmpty = (array) => {
    return array.length === 0;
};

export const erDatoIFortiden = (dato) => {
    return dato < new Date().toISOString().substring(0, 10);
};
