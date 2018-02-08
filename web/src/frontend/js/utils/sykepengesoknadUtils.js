import { tilDatePeriode } from 'digisyfo-npm';

export const getTidligsteSendtDato = (soknad) => {
    if (soknad.sendtTilNAVDato && soknad.sendtTilArbeidsgiverDato) {
        return soknad.sendtTilNAVDato > soknad.sendtTilArbeidsgiverDato ? soknad.sendtTilArbeidsgiverDato : soknad.sendtTilNAVDato;
    }
    return soknad.sendtTilNAVDato || soknad.sendtTilArbeidsgiverDato;
};

export const sorterEtterSendtDato = (soknad1, soknad2) => {
    const dato1 = getTidligsteSendtDato(soknad1);
    const dato2 = getTidligsteSendtDato(soknad2);

    if (dato1.getTime() > dato2.getTime()) {
        return -1;
    }
    if (dato1.getTime() < dato2.getTime()) {
        return 1;
    }
    return 0;
};

export const erSendtTilBeggeMenIkkeSamtidig = (sykepengesoknad) => {
    return sykepengesoknad.sendtTilNAVDato && sykepengesoknad.sendtTilArbeidsgiverDato &&
        sykepengesoknad.sendtTilNAVDato.getTime() !== sykepengesoknad.sendtTilArbeidsgiverDato.getTime();
};

export const getSendtTilSuffix = (sykepengesoknad) => {
    if (sykepengesoknad.sendtTilArbeidsgiverDato && sykepengesoknad.sendtTilNAVDato) {
        return '.til-arbeidsgiver-og-nav';
    }
    if (sykepengesoknad.sendtTilArbeidsgiverDato) {
        return '.til-arbeidsgiver';
    }
    if (sykepengesoknad.sendtTilNAVDato) {
        return '.til-nav';
    }
    return '';
};

export const sorterEtterPerioder = (soknad1, soknad2) => {
    if (soknad1.tom.getTime() < soknad2.tom.getTime()) {
        return 1;
    }
    if (soknad1.tom.getTime() > soknad2.tom.getTime()) {
        return -1;
    }
    return 0;
};

export const sorterEtterOpprettetDato = (soknad1, soknad2) => {
    if (soknad1.opprettetDato.getTime() - soknad2.opprettetDato.getTime() !== 0) {
        return soknad1.opprettetDato.getTime() - soknad2.opprettetDato.getTime();
    }
    return soknad1.fom.getTime() - soknad2.fom.getTime();
};

export const getFeriePermisjonPerioder = (values) => {
    let ferieOgPermisjonPerioder = [];
    if (values.harHattFeriePermisjonEllerUtenlandsopphold) {
        if (values.harHattFerie) {
            ferieOgPermisjonPerioder = [...ferieOgPermisjonPerioder, ...values.ferie];
        }
        if (values.harHattPermisjon) {
            ferieOgPermisjonPerioder = [...ferieOgPermisjonPerioder, ...values.permisjon];
        }
    }
    return ferieOgPermisjonPerioder.map(tilDatePeriode);
};
