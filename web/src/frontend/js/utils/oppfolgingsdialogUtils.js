import {
    finnAktiveOppfolgingsdialoger,
    finnNyesteGodkjenning,
    erOppfolgingsdialogKnyttetTilGyldigSykmelding,
} from 'oppfolgingsdialog-npm';
import { finnArbeidsgivereForGyldigeSykmeldinger } from './sykmeldingUtils';

export const harForrigeNaermesteLeder = (oppfolgingsdialog) => {
    return oppfolgingsdialog.arbeidsgiver.forrigeNaermesteLeder;
};

export const harNaermesteLeder = (oppfolgingsdialog) => {
    return oppfolgingsdialog.arbeidsgiver.naermesteLeder.fnr;
};

export const inneholderGodkjenninger = (oppfolgingsdialog) => {
    return oppfolgingsdialog.godkjenninger.length > 0;
};

export const inneholderGodkjenningerAvArbeidstaker = (oppfolgingsdialog) => {
    return oppfolgingsdialog.godkjenninger.length > 0 && oppfolgingsdialog.godkjenninger[0].godkjent && oppfolgingsdialog.godkjenninger[0].godkjentAv.fnr === oppfolgingsdialog.arbeidstaker.fnr;
};

export const inneholderGodkjentPlan = (oppfolgingsdialog) => {
    return oppfolgingsdialog.godkjentPlan;
};

export const utenSamtykke = (oppfoelgingsdialog) => {
    return oppfoelgingsdialog.arbeidstaker.samtykke === null;
};

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

export const oppgaverOppfoelgingsdialoger = (oppfolgingsdialoger, sykmeldinger) => {
    const oppfolgingdialogerKnyttetTilGyldigSykmelding = oppfolgingsdialoger.filter((plan) => {
        return erOppfolgingsdialogKnyttetTilGyldigSykmelding(plan, sykmeldinger);
    });
    const avventendeGodkjenninger = oppfolgingdialogerKnyttetTilGyldigSykmelding
        .filter((plan) => {
            return plan.godkjenninger.length > 0 &&
                plan.arbeidstaker.fnr !== finnNyesteGodkjenning(plan.godkjenninger).godkjentAv.fnr &&
                finnNyesteGodkjenning(plan.godkjenninger).godkjent;
        });
    const nyePlaner = oppfolgingdialogerKnyttetTilGyldigSykmelding
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
