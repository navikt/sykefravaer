import { ANTALL_MS_DAG } from './datoUtils';

export const TIDSLINJE_TYPER = {
    MED_ARBEIDSGIVER: 'MED_ARBEIDSGIVER',
    UTEN_ARBEIDSGIVER: 'UTEN_ARBEIDSGIVER',
};

export const HENDELSE_TYPER = {
    AKTIVITETSKRAV_VARSEL: 'AKTIVITETSKRAV_VARSEL',
    NY_NAERMESTE_LEDER: 'NY_NAERMESTE_LEDER',
    BOBLE: 'BOBLE',
    TID: 'TID',
    TITTEL: 'TITTEL',
};

export const sorterTidslinjerSisteFoerst = (tidslinjer) => {
    return [...tidslinjer].sort((t1, t2) => {
        return t2.startdato - t1.startdato;
    });
};

export const hentId = (i, hendelse) => {
    switch (hendelse.type) {
        case HENDELSE_TYPER.AKTIVITETSKRAV_VARSEL:
            return `a${i}`;
        case HENDELSE_TYPER.NY_NAERMESTE_LEDER:
            return `nl${i}`;
        default:
            return null;
    }
};

export const hentAntallDager = (hendelse, sykeforloep) => {
    const oppfoelgingsdato = new Date(sykeforloep.oppfoelgingsdato);
    const inntruffetdato = new Date(hendelse.inntruffetdato);
    oppfoelgingsdato.setHours(0, 0, 0);
    inntruffetdato.setHours(0, 0, 0);
    return (inntruffetdato.getTime() - oppfoelgingsdato.getTime()) / ANTALL_MS_DAG;
};

export const leggTilFelterForSykeforloepHendelser = (sykeforloep) => {
    if (!sykeforloep.hendelser) {
        return [];
    }
    let i = 0;
    return sykeforloep.hendelser.map((hendelse) => {
        i += 1;
        return Object.assign({}, hendelse, {
            id: hentId(i, hendelse),
            antallDager: hentAntallDager(hendelse, sykeforloep),
        });
    });
};

export const leggTypePaaTekstnokkel = (hendelser, type) => {
    return hendelser.map((hendelse) => {
        return Object.assign({}, hendelse, {
            tekstkey: `${hendelse.tekstkey}.${type}`,
        });
    });
};

const aktivitetsplan = () => {
    return {
        type: HENDELSE_TYPER.BOBLE,
        antallDager: (7 * 39) - 1,
        tekstkey: 'tidslinje.aktivitetsplan',
    };
};

const sykefravaerMedArbeidsgiverStartet = () => {
    return {
        type: HENDELSE_TYPER.BOBLE,
        antallDager: -1,
        tekstkey: 'tidslinje.sykefravaer-startet',
    };
};

const sykefravaerUtenArbeidsgiverStartet = () => {
    return {
        type: HENDELSE_TYPER.BOBLE,
        antallDager: -1,
        tekstkey: 'tidslinje.sykefravaer-startet',
    };
};

const sykmeldtHvaNaa = () => {
    return {
        type: HENDELSE_TYPER.BOBLE,
        antallDager: 1,
        tekstkey: 'tidslinje.sykmeldt-hva-naa',
    };
};

const forberedelseDialogmoteArbeidsgiver = () => {
    return {
        type: HENDELSE_TYPER.BOBLE,
        antallDager: (7 * 7) - 1,
        tekstkey: 'tidslinje.dialogmote-arbeidsgiver',
    };
};

const forberedelseDialogmoteNav = () => {
    return {
        type: HENDELSE_TYPER.BOBLE,
        antallDager: (7 * 26) - 1,
        tekstkey: 'tidslinje.dialogmote-nav',
    };
};

const langtidssykmeldt = () => {
    return {
        type: HENDELSE_TYPER.BOBLE,
        antallDager: (7 * 39) - 1,
        tekstkey: 'tidslinje.langtidssykmeldt',
    };
};

const navVurdereKravOmAktivitet = () => {
    return {
        type: HENDELSE_TYPER.BOBLE,
        antallDager: (7 * 8) - 1,
        tekstkey: 'tidslinje.aktivitetskrav',
    };
};

const snakkMedArbeidsgiver = () => {
    return {
        type: HENDELSE_TYPER.BOBLE,
        antallDager: (7 * 4) - 1,
        tekstkey: 'tidslinje.snakk-med-arbeidsgiver',
    };
};

const snakkMedNav = () => {
    return {
        type: HENDELSE_TYPER.BOBLE,
        antallDager: (7 * 12) - 1,
        tekstkey: 'tidslinje.snakk-med-nav',
    };
};

const sluttfasenAvSykefravaeret = () => {
    return {
        type: HENDELSE_TYPER.BOBLE,
        antallDager: (7 * 52) - 1,
        tekstkey: 'tidslinje.sluttfasen',
    };
};

const mulighetForAktivitetUtenArbeidsgiver = () => {
    return {
        type: HENDELSE_TYPER.BOBLE,
        antallDager: (7 * 8) - 1,
        tekstkey: 'tidslinje.mulighet-for-aktivitet',
    };
};


export const hentHendelserMedArbeidsgiver = () => {
    return [
        sykefravaerMedArbeidsgiverStartet(),
        sykmeldtHvaNaa(),
        snakkMedArbeidsgiver(),
        forberedelseDialogmoteArbeidsgiver(),
        navVurdereKravOmAktivitet(),
        forberedelseDialogmoteNav(),
        langtidssykmeldt(),
        sluttfasenAvSykefravaeret(),
    ];
};

export const hentHendelserUtenArbeidsgiver = () => {
    return [
        sykefravaerUtenArbeidsgiverStartet(),
        sykmeldtHvaNaa(),
        mulighetForAktivitetUtenArbeidsgiver(),
        snakkMedNav(),
        aktivitetsplan(),
        sluttfasenAvSykefravaeret(),
    ];
};

export const hentStatiskeHendelser = (type) => {
    switch (type) {
        case TIDSLINJE_TYPER.MED_ARBEIDSGIVER:
            return hentHendelserMedArbeidsgiver();
        case TIDSLINJE_TYPER.UTEN_ARBEIDSGIVER:
            return hentHendelserUtenArbeidsgiver();
        default:
            return [];
    }
};

export const hentStatiskTidslinje = (type) => {
    return {
        hendelser: leggTypePaaTekstnokkel(hentStatiskeHendelser(type), type),
    };
};

export const hentTidslinjerFraSykeforloep = (sykeforloep, arbeidssituasjon) => {
    if (sykeforloep.length === 0) {
        return [hentStatiskTidslinje(arbeidssituasjon)];
    }
    const tidslinjer = [];
    sykeforloep.forEach((sf) => {
        const hendelserSykeforloep = leggTilFelterForSykeforloepHendelser(sf);
        const hendelserStatiske = hentStatiskeHendelser(arbeidssituasjon);
        const hendelser = leggTypePaaTekstnokkel(hendelserStatiske.concat(hendelserSykeforloep), arbeidssituasjon);
        tidslinjer.push({
            startdato: new Date(sf.oppfoelgingsdato),
            hendelser,
        });
    });
    return sorterTidslinjerSisteFoerst(tidslinjer);
};
