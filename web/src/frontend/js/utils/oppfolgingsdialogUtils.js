import { finnArbeidsgivereForAktiveSykmeldinger } from '../utils/sykmeldingUtils';

export function getOppfolgingsdialog(oppfolgingsdialoger, oppfolgingsdialogId) {
    return oppfolgingsdialoger.filter((oppfolgingsdialog) => {
        return oppfolgingsdialog.oppfoelgingsdialogId === oppfolgingsdialogId.toString();
    })[0];
}

export const isEmpty = (array) => {
    return array.length === 0;
};

export const finnOppfolgingsdialogsArbeidsgivernavn = (arbeidsgivere, oppfolgingsdialog) => {
    return arbeidsgivere.filter((arbeidsgiver) => {
        return oppfolgingsdialog.virksomhetsnummer === arbeidsgiver.virksomhetsnummer;
    }).map((arbeidsgiver) => {
        return arbeidsgiver.navn;
    })[0] || 'Arbeidsgiver';
};

export const finnArbeidsgivere = (state) => {
    const sykmeldinger = state.dineSykmeldinger.data;
    const naermesteLedere = state.ledere.data;
    return finnArbeidsgivereForAktiveSykmeldinger(sykmeldinger, naermesteLedere);
};
