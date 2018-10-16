import { erGyldigDatoformat, fraInputdatoTilJSDato, periodeOverlapperMedPeriode, tidligsteFom, tilDatePeriode } from 'digisyfo-npm';

export const getTidligsteSendtDato = (soknad) => {
    if (soknad.sendtTilNAVDato && soknad.sendtTilArbeidsgiverDato) {
        return soknad.sendtTilNAVDato > soknad.sendtTilArbeidsgiverDato ? soknad.sendtTilArbeidsgiverDato : soknad.sendtTilNAVDato;
    }
    return soknad.sendtTilNAVDato || soknad.sendtTilArbeidsgiverDato;
};

export const sorterEtterSendtDato = (soknad1, soknad2) => {
    const dato1 = getTidligsteSendtDato(soknad1);
    const dato2 = getTidligsteSendtDato(soknad2);
    return dato2.getTime() - dato1.getTime();
};

export const filtrerAktuelleAktiviteter = (aktiviteter, gjenopptattArbeidFulltUtDato) => {
    if (gjenopptattArbeidFulltUtDato && aktiviteter) {
        return aktiviteter
            .filter((aktivitet) => {
                return aktivitet.periode.fom < gjenopptattArbeidFulltUtDato;
            })
            .map((aktivitet) => {
                const justertTOM = gjenopptattArbeidFulltUtDato <= aktivitet.periode.tom
                    ? new Date(gjenopptattArbeidFulltUtDato.getTime() - (24 * 60 * 60 * 1000))
                    : aktivitet.periode.tom;

                return Object.assign({}, aktivitet, {
                    periode: {
                        fom: aktivitet.periode.fom,
                        tom: justertTOM,
                    },
                });
            });
    }
    return aktiviteter;
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
            return {
                ...aktivitet,
                periode: { fom, tom },
            };
        });
    return {
        ...soknad,
        aktiviteter,
    };
};

export const getTomDato = (sykepengesoknad) => {
    const perioder = sykepengesoknad.aktiviteter.map((a) => {
        return a.periode;
    });
    if (sykepengesoknad.gjenopptattArbeidFulltUtDato) {
        const tidligsteFomFraPerioder = new Date(tidligsteFom(perioder));
        const gjenopptattArbeidFulltUtDato = new Date(sykepengesoknad.gjenopptattArbeidFulltUtDato);
        if (gjenopptattArbeidFulltUtDato.getTime() === tidligsteFomFraPerioder.getTime()) {
            return gjenopptattArbeidFulltUtDato;
        }
        return new Date(gjenopptattArbeidFulltUtDato - (1000 * 60 * 60 * 24));
    }
    return sykepengesoknad.tom;
};

export const getGjenopptattArbeidFulltUtDato = (skjemasoknad) => {
    let gjenopptattArbeidFulltUtDato = skjemasoknad.gjenopptattArbeidFulltUtDato;
    if (!skjemasoknad.harGjenopptattArbeidFulltUt || !gjenopptattArbeidFulltUtDato || !erGyldigDatoformat(gjenopptattArbeidFulltUtDato)) {
        gjenopptattArbeidFulltUtDato = null;
    } else {
        try {
            gjenopptattArbeidFulltUtDato = fraInputdatoTilJSDato(gjenopptattArbeidFulltUtDato);
        } catch (e) {
            gjenopptattArbeidFulltUtDato = null;
        }
        if (gjenopptattArbeidFulltUtDato && isNaN(gjenopptattArbeidFulltUtDato.getTime())) {
            gjenopptattArbeidFulltUtDato = null;
        }
    }
    return gjenopptattArbeidFulltUtDato;
};

export const erSendtTilBeggeMenIkkeSamtidig = (sykepengesoknad) => {
    return sykepengesoknad.sendtTilNAVDato
        && sykepengesoknad.sendtTilArbeidsgiverDato
        && sykepengesoknad.sendtTilNAVDato.getTime() !== sykepengesoknad.sendtTilArbeidsgiverDato.getTime();
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
    return soknad2.tom.getTime() - soknad1.tom.getTime();
};

export const sorterEtterOpprettetDato = (soknad1, soknad2) => {
    return soknad1.opprettetDato.getTime() - soknad2.opprettetDato.getTime() !== 0
        ? soknad1.opprettetDato.getTime() - soknad2.opprettetDato.getTime()
        : soknad1.fom.getTime() - soknad2.fom.getTime();
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

export const getGjenopptattArbeidFulltUtDatoFraSkjema = (skjemasoknad) => {
    return skjemasoknad.harGjenopptattArbeidFulltUt && skjemasoknad.gjenopptattArbeidFulltUtDato
        ? fraInputdatoTilJSDato(skjemasoknad.gjenopptattArbeidFulltUtDato)
        : null;
};

export const finnFomForFeriesporsmal = (sykepengesoknad) => {
    const { forrigeSykeforloepTom, forrigeSendteSoknadTom } = sykepengesoknad;

    if (forrigeSykeforloepTom !== null && forrigeSendteSoknadTom !== null) {
        if (forrigeSendteSoknadTom >= forrigeSykeforloepTom) {
            return sykepengesoknad.fom;
        }
    }

    return forrigeSykeforloepTom || sykepengesoknad.fom;
};
