import { finnAktiveOppfolgingsdialoger, finnNyesteGodkjenning } from 'oppfolgingsdialog-npm';
import { finnArbeidsgivereForGyldigeSykmeldinger } from './sykmeldingUtils';

export function getOppfolgingsdialog(oppfolgingsdialoger, id) {
    return oppfolgingsdialoger.filter((oppfolgingsdialog) => {
        return oppfolgingsdialog.id.toString() === id.toString();
    })[0];
}

export const erAktivOppfolgingsdialogOpprettetMedArbeidsgiver = (oppfolgingsdialoger, virksomhetsnummer) => {
    return finnAktiveOppfolgingsdialoger(oppfolgingsdialoger).filter((dialog) => {
        return dialog.virksomhet.virksomhetsnummer === virksomhetsnummer;
    }).length > 0;
};

export const hentAktivOppfolgingsdialogOpprettetMedArbeidsgiver = (oppfolgingsdialoger, virksomhetsnummer) => {
    return finnAktiveOppfolgingsdialoger(oppfolgingsdialoger).filter((dialog) => {
        return dialog.virksomhet.virksomhetsnummer === virksomhetsnummer;
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

const idAlleredeFunnet = (planer, id) => {
    return planer.filter((plan) => {
        return plan.id === id;
    }).length > 0;
};

export const oppgaverOppfoelgingsdialoger = (oppfolgingsdialoger) => {
    const avventendeGodkjenninger = oppfolgingsdialoger
        .filter((plan) => {
            return plan.godkjenninger.length > 0 &&
                plan.arbeidstaker.fnr !== finnNyesteGodkjenning(plan.godkjenninger).godkjentAv.fnr &&
                finnNyesteGodkjenning(plan.godkjenninger).godkjent;
        });
    const nyePlaner = oppfolgingsdialoger
        .filter((plan) => {
            return plan.arbeidstaker.sistInnlogget === null
                && plan.status === 'UNDER_ARBEID'
                && plan.sistEndretAv.fnr !== plan.arbeidstaker.fnr
                && !idAlleredeFunnet(avventendeGodkjenninger, plan.id);
        });

    return {
        nyePlaner,
        avventendeGodkjenninger,
    };
};
