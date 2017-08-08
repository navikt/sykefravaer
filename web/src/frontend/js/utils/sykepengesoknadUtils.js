import { tidligsteFom, senesteTom } from './periodeUtils';

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
    return sykepengesoknad.sendtTilNAVDato && sykepengesoknad.sendtTilArbeidsgiverDato && sykepengesoknad.sendtTilNAVDato.getTime() !== sykepengesoknad.sendtTilArbeidsgiverDato.getTime();
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


export const sorterEtterOpprettetDato = (soknad1, soknad2) => {
    if (soknad1.opprettetDato.getTime() > soknad2.opprettetDato.getTime()) {
        return 1;
    }
    if (soknad1.opprettetDato.getTime() < soknad2.opprettetDato.getTime()) {
        return -1;
    }
    return 0;
};

export const sorterEtterPerioder = (soknad1, soknad2) => {
    const soknad1Perioder = soknad1.aktiviteter.map((a) => {
        return a.periode;
    });
    const soknad2Perioder = soknad2.aktiviteter.map((a) => {
        return a.periode;
    });
    const soknad1TidligsteFom = tidligsteFom(soknad1Perioder);
    const soknad2TidligsteFom = tidligsteFom(soknad2Perioder);
    const soknad1SenesteTom = senesteTom(soknad1Perioder);
    const soknad2Senestetom = senesteTom(soknad2Perioder);

    if (soknad1TidligsteFom.getTime() > soknad2TidligsteFom.getTime()) {
        return -1;
    }
    if (soknad1TidligsteFom.getTime() < soknad2TidligsteFom.getTime()) {
        return 1;
    }
    if (soknad1SenesteTom.getTime() > soknad2Senestetom.getTime()) {
        return 1;
    }
    if (soknad1SenesteTom.getTime() < soknad2Senestetom.getTime()) {
        return -1;
    }
    return 0;
};
