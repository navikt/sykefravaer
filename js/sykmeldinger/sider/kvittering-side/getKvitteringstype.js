import { kvitteringtyper } from '../../kvittering/Sykmeldingkvittering';
import {
    arbeidssituasjoner,
    sykepengesoknadstatuser,
    sykmeldingstatuser,
} from '../../../digisyfoNpm';
import { IKKE_DIGITALISERT, INNENFOR_VENTETID } from './sykmeldingBehandletResultat';


const {
    SENDT,
    TIL_SENDING,
    BEKREFTET,
    AVBRUTT,
} = sykmeldingstatuser;
const {
    FREMTIDIG,
    NY,
} = sykepengesoknadstatuser;

const erEgenmeldt = (sykmelding) => {
    return sykmelding.erEgenmeldt;
};
const erAvventende = (sykmelding) => {
    return sykmelding.mulighetForArbeid.perioder.some((periode) => {
        return periode.avventende;
    });
};
// const erReisetilskudd = (sykmelding) => { return sykmelding.mulighetForArbeid.perioder.some((periode) => { return periode.reisetilskudd; }); };

const getArbeidssituasjon = (sykmelding) => {
    return (
        typeof sykmelding.valgtArbeidssituasjon === 'string'
            ? sykmelding.valgtArbeidssituasjon.toUpperCase()
            : ''
    );
};
const erArbeidstaker = (sykmelding) => {
    return (
        [arbeidssituasjoner.ARBEIDSTAKER].indexOf(getArbeidssituasjon(sykmelding)) > -1
    );
};

const erFrilanserEllerSelvstendigNaringsdrivende = (sykmelding) => {
    return (
        [arbeidssituasjoner.FRILANSER, arbeidssituasjoner.NAERINGSDRIVENDE]
            .indexOf(getArbeidssituasjon(sykmelding)) > -1
    );
};

const erAvventendeEllerBehandlingsdager = (sykmelding) => {
    return sykmelding
        && sykmelding.mulighetForArbeid
        && sykmelding.mulighetForArbeid.perioder
            .some((periode) => {
                return periode.avventende || periode.behandlingsdager;
            });
};

const erBehandlingsdager = (sykmelding) => {
    return sykmelding
        && sykmelding.mulighetForArbeid
        && sykmelding.mulighetForArbeid.perioder
            .some((periode) => {
                return periode.behandlingsdager;
            });
};

function getForskuttererArbeidsgiver(sykmelding, arbeidsgivere) {
    const mottakendeArbeidsgiver = sykmelding.mottakendeArbeidsgiver
        ? arbeidsgivere.data.find((arbeidsgiver) => {
            return arbeidsgiver.orgnummer === sykmelding.mottakendeArbeidsgiver.virksomhetsnummer;
        })
        : null;
    return mottakendeArbeidsgiver
    && mottakendeArbeidsgiver.naermesteLeder
        ? mottakendeArbeidsgiver.naermesteLeder.arbeidsgiverForskuttererLoenn !== false
        : true;
}


const finnKvitteringstypeForBehandlingsdager = (sykmelding, soknader, arbeidsgivere) => {
    const harAktiveSoknader = soknader.filter((s) => {
        return s.status === NY;
    }).length > 0;
    const harMangeFremtidigeSoknader = soknader.length > 1;
    const harEnFremtidigSoknad = soknader.length === 1;
    const { arbeidssituasjon } = soknader[0];

    if (arbeidssituasjon === arbeidssituasjoner.ARBEIDSTAKER) {
        const forskuttererArbeidsgiver = getForskuttererArbeidsgiver(sykmelding, arbeidsgivere);

        if (harAktiveSoknader) {
            return kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_NA;
        }
        if (harEnFremtidigSoknad) {
            return forskuttererArbeidsgiver
                ? kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE_ARBEIDSGIVER_FORSKUTTERER_KORT_SYKMELDING
                : kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE_ARBEIDSGIVER_FORSKUTTERER_IKKE_KORT_SYKMELDING;
        }
        if (harMangeFremtidigeSoknader) {
            return forskuttererArbeidsgiver
                ? kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE_ARBEIDSGIVER_FORSKUTTERER_LANG_SYKMELDING
                : kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE_ARBEIDSGIVER_FORSKUTTERER_IKKE_LANG_SYKMELDING;
        }
    }
    if (arbeidssituasjon === arbeidssituasjoner.ARBEIDSLEDIG || arbeidssituasjon === arbeidssituasjoner.ANNET) {
        if (harAktiveSoknader) {
            return kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_NA_ARBEIDSLEDIG;
        }
        if (harEnFremtidigSoknad) {
            return kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE_ARBEIDSLEDIG_KORT_SYKMELDING;
        }
        if (harMangeFremtidigeSoknader) {
            return kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE_ARBEIDSLEDIG_LANG_SYKMELDING;
        }
    }
    if (arbeidssituasjon === arbeidssituasjoner.FRILANSER || arbeidssituasjon === arbeidssituasjoner.NAERINGSDRIVENDE) {
        if (harAktiveSoknader) {
            return kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_NA_FRILANSER;
        }
        if (harEnFremtidigSoknad || harMangeFremtidigeSoknader) {
            return kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE_FRILANSER;
        }
    }
    return null;
};


export const getKvitteringtype = (sykmelding, sykmeldingensSoknader, arbeidsgivere, harStrengtFortroligAdresse, soknadHentingFeilet, behandletStatus) => {
    if (!sykmelding) {
        return null;
    }


    const nyeSoknader = sykmeldingensSoknader.filter((s) => {
        return s.status === NY;
    });

    if (erEgenmeldt(sykmelding)) {
        if (nyeSoknader && nyeSoknader.length > 0) {
            return kvitteringtyper.EGENMELDT_KVITTERING_SOK_NA;
        }
        if (sykmelding.status === AVBRUTT) {
            return kvitteringtyper.EGENMELDING_AVBRUTT_KVITTERING;
        }
        return kvitteringtyper.EGENMELDT_KVITTERING;
    }

    if (erBehandlingsdager(sykmelding) && sykmeldingensSoknader.length > 0) {
        const kvittering = finnKvitteringstypeForBehandlingsdager(sykmelding, sykmeldingensSoknader, arbeidsgivere);
        if (kvittering) {
            return kvittering;
        }
    }

    if (getArbeidssituasjon(sykmelding) === arbeidssituasjoner.ANNET || getArbeidssituasjon(sykmelding) === arbeidssituasjoner.ARBEIDSLEDIG) {
        if (nyeSoknader.length > 0) {
            return kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_NA_ARBEIDSLEDIG;
        }

        if (sykmeldingensSoknader.length === 1) {
            return kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE_ARBEIDSLEDIG_KORT_SYKMELDING;
        }

        if (sykmeldingensSoknader.length > 1) {
            return kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE_ARBEIDSLEDIG_LANG_SYKMELDING;
        }
    }


    const nyeSykepengesoknader = sykmeldingensSoknader.filter((s) => {
        return s.status === NY;
    });
    const fremtidigeSykepengesoknader = sykmeldingensSoknader.filter((s) => {
        return s.status === FREMTIDIG;
    });


    const forskuttererArbeidsgiver = getForskuttererArbeidsgiver(sykmelding, arbeidsgivere);

    switch (sykmelding.status) {
        case AVBRUTT: {
            return kvitteringtyper.AVBRUTT_SYKMELDING;
        }
        case SENDT:
        case TIL_SENDING: {
            return (() => {
                if (erAvventende(sykmelding)) {
                    return kvitteringtyper.SENDT_AVVENTENDE_SYKMELDING;
                }
                if (behandletStatus === IKKE_DIGITALISERT) {
                    return kvitteringtyper.SENDT_SYKMELDING_INGEN_SOKNAD;
                }
                if (nyeSykepengesoknader.length === 0
                    && fremtidigeSykepengesoknader.length === 1) {
                    return forskuttererArbeidsgiver
                        ? kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE_ARBEIDSGIVER_FORSKUTTERER_KORT_SYKMELDING
                        : kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE_ARBEIDSGIVER_FORSKUTTERER_IKKE_KORT_SYKMELDING;
                }
                if (nyeSykepengesoknader.length === 0
                    && fremtidigeSykepengesoknader.length > 1) {
                    return forskuttererArbeidsgiver
                        ? kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE_ARBEIDSGIVER_FORSKUTTERER_LANG_SYKMELDING
                        : kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE_ARBEIDSGIVER_FORSKUTTERER_IKKE_LANG_SYKMELDING;
                }
                return kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_NA;
            })();
        }
        case BEKREFTET: {
            if (harStrengtFortroligAdresse && erArbeidstaker(sykmelding)) {
                return kvitteringtyper.STRENGT_FORTROLIG_ADRESSE;
            }
            if (getArbeidssituasjon(sykmelding) === arbeidssituasjoner.ARBEIDSTAKER) {
                return kvitteringtyper.BEKREFTET_SYKMELDING_ARBEIDSTAKER_UTEN_OPPGITT_ARBEIDSGIVER;
            }
            if (behandletStatus === IKKE_DIGITALISERT) {
                return kvitteringtyper.KVITTERING_MED_SYKEPENGER_FRILANSER_NAERINGSDRIVENDE_PAPIR;
            }
            if (erFrilanserEllerSelvstendigNaringsdrivende(sykmelding)
                && !erAvventendeEllerBehandlingsdager(sykmelding)) {
                if (soknadHentingFeilet) {
                    return kvitteringtyper.KVITTERING_MED_SYKEPENGER_FEIL_FRILANSER;
                }
                if (nyeSykepengesoknader.length > 0) {
                    return kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_NA_FRILANSER;
                }
                if (sykmeldingensSoknader.length > 0) {
                    return kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE_FRILANSER;
                }
                if (behandletStatus === INNENFOR_VENTETID) {
                    return kvitteringtyper.KVITTERING_UTEN_SYKEPENGER_FRILANSER_NAERINGSDRIVENDE;
                }
            }
            return kvitteringtyper.BEKREFTET_SYKMELDING_UTEN_ARBEIDSGIVER;
        }
        default: {
            return null;
        }
    }
};
