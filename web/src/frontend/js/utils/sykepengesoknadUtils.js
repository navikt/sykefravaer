import { periodeOverlapperMedPeriode } from './periodeUtils';

export const getTidligsteSendtDato = (soknad) => {
    if (soknad.sendtTilNAVDato && soknad.sendtTilArbeidsgiverDato) {
        return soknad.sendtTilNAVDato > soknad.sendtTilArbeidsgiverDato ? soknad.sendtTilArbeidsgiverDato : soknad.sendtTilNAVDato;
    }
    return soknad.sendtTilNAVDato || soknad.sendtTilArbeidsgiverDato;
};

export const sorterEtterDato = (soknad1, soknad2) => {
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

export const mapAktiviteter = (soknad) => {
    const aktiviteter = soknad.aktiviteter
        .filter((aktivitet) => {
            return periodeOverlapperMedPeriode(aktivitet.periode, {
                fom: soknad.fom,
                tom: soknad.tom,
            });
        })
        .map((aktivitet) => {
            const fom = aktivitet.periode.fom.getTime() < soknad.fom.getTime() ? soknad.fom : aktivitet.periode.fom;
            const tom = aktivitet.periode.tom.getTime() > soknad.tom.getTime() ? soknad.tom : aktivitet.periode.tom;
            return Object.assign({}, aktivitet, {
                periode: { fom, tom },
            });
        });
    return Object.assign({}, soknad, { aktiviteter });
};
