/* eslint arrow-body-style: ["error", "as-needed"] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    arbeidssituasjoner,
    getLedetekst,
    senesteTom,
    sykepengesoknad as sykepengesoknadPt,
    sykepengesoknadstatuser,
    sykmeldingstatuser,
    tilLesbarDatoMedArstall,
} from '@navikt/digisyfo-npm';
import Side from '../../../sider/Side';
import Sykmeldingkvittering, { kvitteringtyper } from '../../kvittering/Sykmeldingkvittering';
import AppSpinner from '../../../components/AppSpinner';
import Feilmelding from '../../../components/Feilmelding';
import { soknadPt, sykmelding as sykmeldingPt } from '../../../propTypes';
import { ARBEIDSTAKERE, SELVSTENDIGE_OG_FRILANSERE } from '../../../enums/soknadtyper';
import { harStrengtFortroligAdresseSelector } from '../../../data/brukerinfo/brukerinfoSelectors';
import { hentDineSykmeldinger } from '../../data/dine-sykmeldinger/dineSykmeldingerActions';
import { hentSykepengesoknader } from '../../../data/sykepengesoknader/sykepengesoknader_actions';
import { hentSoknader } from '../../../data/soknader/soknaderActions';
import { hentBrukerinfo } from '../../../data/brukerinfo/brukerinfo_actions';
import { hentAktuelleArbeidsgivere } from '../../data/arbeidsgivere/arbeidsgivereActions';
import { selectDinSykmelding } from '../../data/dine-sykmeldinger/dineSykmeldingerSelectors';

const {
    SENDT, TIL_SENDING, BEKREFTET, AVBRUTT,
} = sykmeldingstatuser;
const { FREMTIDIG, NY } = sykepengesoknadstatuser;

export class KvitteringSide extends Component {
    componentDidMount() {
        const {
            sykmeldingId,
            doHentDineSykmeldinger,
            doHentSykepengesoknader,
            doHentSoknader,
            doHentBrukerinfo,
            doHentAktuelleArbeidsgivere,
        } = this.props;
        doHentDineSykmeldinger();
        doHentSykepengesoknader();
        doHentSoknader();
        doHentBrukerinfo();
        doHentAktuelleArbeidsgivere(sykmeldingId);
    }

    render() {
        const {
            sykmelding,
            sykmeldingId,
            henter,
            hentingFeilet,
            kvitteringtype,
            sykepengesoknader,
            soknader,
        } = this.props;
        const brodsmuler = [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('dine-sykmeldinger.sidetittel'),
            sti: '/sykmeldinger',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('din-sykmelding.sidetittel'),
            sti: `/sykmeldinger/${sykmeldingId}`,
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('din-sykmelding.kvittering.sidetittel'),
        }];

        const innhold = (() => {
            if (henter) {
                return <AppSpinner />;
            }
            if (hentingFeilet) {
                return <Feilmelding />;
            }
            if (!sykmelding) {
                return (
                    <Feilmelding
                        tittel="Fant ikke kvittering"
                        melding="Vi fant ikke kvitteringen du ser etter. Er du sikker på at du er på riktig side?" />
                );
            }
            if (kvitteringtype && [SENDT, TIL_SENDING, BEKREFTET, AVBRUTT].indexOf(sykmelding.status) > -1) {
                return (
                    <Sykmeldingkvittering
                        kvitteringtype={kvitteringtype}
                        sykepengesoknader={sykepengesoknader}
                        soknader={soknader} />
                );
            }
            if ([SENDT, TIL_SENDING, BEKREFTET, AVBRUTT].indexOf(sykmelding.status) === -1) {
                return (
                    <Feilmelding
                        tittel="Sykmeldingen har feil status"
                        melding={`Du kan ikke se kvitteringen fordi sykmeldingen har status «${sykmelding.status}»`}
                    />
                );
            }
            return <Feilmelding />;
        })();

        return (
            <Side tittel={getLedetekst('din-sykmelding.kvittering.sidetittel')} brodsmuler={brodsmuler}>
                {innhold}
            </Side>
        );
    }
}

KvitteringSide.propTypes = {
    sykmelding: sykmeldingPt,
    sykmeldingId: PropTypes.string,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
    soknader: PropTypes.arrayOf(soknadPt),
    kvitteringtype: PropTypes.oneOf(Object.values(kvitteringtyper)),
    doHentDineSykmeldinger: PropTypes.func,
    doHentSykepengesoknader: PropTypes.func,
    doHentSoknader: PropTypes.func,
    doHentBrukerinfo: PropTypes.func,
    doHentAktuelleArbeidsgivere: PropTypes.func,
};

const erAvventende = sykmelding => sykmelding.mulighetForArbeid.perioder.some(periode => periode.avventende);

const getArbeidssituasjon = sykmelding => (
    typeof sykmelding.valgtArbeidssituasjon === 'string'
        ? sykmelding.valgtArbeidssituasjon.toUpperCase()
        : ''
);

const erFrilanserEllerSelvstendigNaringsdrivende = sykmelding => (
    [arbeidssituasjoner.FRILANSER, arbeidssituasjoner.NAERINGSDRIVENDE]
        .indexOf(getArbeidssituasjon(sykmelding)) > -1
);

const erAvventendeReisetilskuddEllerBehandlingsdager = sykmelding => sykmelding
    && sykmelding.mulighetForArbeid
    && sykmelding.mulighetForArbeid.perioder
        .some(periode => periode.avventende || periode.reisetilskudd || periode.behandlingsdager);

const erBehandlingsdager = sykmelding => sykmelding
    && sykmelding.mulighetForArbeid
    && sykmelding.mulighetForArbeid.perioder
        .some(periode => periode.behandlingsdager);

function getForskuttererArbeidsgiver(sykmelding, arbeidsgivere) {
    const mottakendeArbeidsgiver = sykmelding.mottakendeArbeidsgiver
        ? arbeidsgivere.data.find(arbeidsgiver => arbeidsgiver.orgnummer === sykmelding.mottakendeArbeidsgiver.virksomhetsnummer)
        : null;
    return mottakendeArbeidsgiver
    && mottakendeArbeidsgiver.naermesteLeder
        ? mottakendeArbeidsgiver.naermesteLeder.arbeidsgiverForskuttererLoenn !== false
        : true;
}

const finnKvitteringstypeForBehandlingsdager = (sykmelding, soknader, arbeidsgivere) => {
    const harAktiveSoknader = soknader.filter(s => s.status === NY).length > 0;
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


const getKvitteringtype = (state, sykmeldingId) => {
    const sykmelding = state.dineSykmeldinger.data.find(s => s.id === sykmeldingId);

    if (!sykmelding) {
        return null;
    }


    const soknaderRelatertTilSykmeldingen = state.soknader.data.filter(s => s.sykmeldingId === sykmelding.id);
    const nyeSoknader = soknaderRelatertTilSykmeldingen.filter(s => s.status === NY);

    if (erBehandlingsdager(sykmelding) && soknaderRelatertTilSykmeldingen.length > 0) {
        const kvittering = finnKvitteringstypeForBehandlingsdager(sykmelding, soknaderRelatertTilSykmeldingen, state.arbeidsgivere);
        if (kvittering) {
            return kvittering;
        }
    }

    if (getArbeidssituasjon(sykmelding) === arbeidssituasjoner.ANNET || getArbeidssituasjon(sykmelding) === arbeidssituasjoner.ARBEIDSLEDIG) {
        if (nyeSoknader.length > 0) {
            return kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_NA_ARBEIDSLEDIG;
        }

        if (soknaderRelatertTilSykmeldingen.length === 1) {
            return kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE_ARBEIDSLEDIG_KORT_SYKMELDING;
        }

        if (soknaderRelatertTilSykmeldingen.length > 1) {
            return kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE_ARBEIDSLEDIG_LANG_SYKMELDING;
        }
    }

    const arbeidstakersoknader = state.soknader.data.filter(s => s.soknadstype === ARBEIDSTAKERE);
    const denneSykmeldingensSykepengesoknader = [
        ...state.sykepengesoknader.data,
        ...arbeidstakersoknader,
    ].filter(s => s.sykmeldingId === sykmeldingId);

    const nyeSykepengesoknaderForDenneSykmeldingen = denneSykmeldingensSykepengesoknader.filter(s => s.status === NY);
    const fremtidigeSykepengesoknaderForDenneSykmeldingen = denneSykmeldingensSykepengesoknader.filter(s => s.status === FREMTIDIG);
    const denneSykmeldingensSoknader = state.soknader.data.filter(s => s.sykmeldingId === sykmelding.id && s.soknadstype === SELVSTENDIGE_OG_FRILANSERE);
    const nyeSoknaderForDenneSykmeldingen = denneSykmeldingensSoknader.filter(s => s.status === NY);
    const { skalOppretteSoknad } = state.sykmeldingMeta[sykmeldingId] || {};
    const forskuttererArbeidsgiver = getForskuttererArbeidsgiver(sykmelding, state.arbeidsgivere);

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
                if (denneSykmeldingensSykepengesoknader.length === 0) {
                    return kvitteringtyper.SENDT_SYKMELDING_INGEN_SOKNAD;
                }
                if (nyeSykepengesoknaderForDenneSykmeldingen.length === 0
                    && fremtidigeSykepengesoknaderForDenneSykmeldingen.length === 1) {
                    return forskuttererArbeidsgiver
                        ? kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE_ARBEIDSGIVER_FORSKUTTERER_KORT_SYKMELDING
                        : kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE_ARBEIDSGIVER_FORSKUTTERER_IKKE_KORT_SYKMELDING;
                }
                if (nyeSykepengesoknaderForDenneSykmeldingen.length === 0
                    && fremtidigeSykepengesoknaderForDenneSykmeldingen.length > 1) {
                    return forskuttererArbeidsgiver
                        ? kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE_ARBEIDSGIVER_FORSKUTTERER_LANG_SYKMELDING
                        : kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE_ARBEIDSGIVER_FORSKUTTERER_IKKE_LANG_SYKMELDING;
                }
                return kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_NA;
            })();
        }
        case BEKREFTET: {
            if (harStrengtFortroligAdresseSelector(state) && !erFrilanserEllerSelvstendigNaringsdrivende(sykmelding)) {
                return kvitteringtyper.STRENGT_FORTROLIG_ADRESSE;
            }
            if (getArbeidssituasjon(sykmelding) === arbeidssituasjoner.ARBEIDSTAKER) {
                return kvitteringtyper.BEKREFTET_SYKMELDING_ARBEIDSTAKER_UTEN_OPPGITT_ARBEIDSGIVER;
            }
            if (getArbeidssituasjon(sykmelding) === arbeidssituasjoner.ANNET || getArbeidssituasjon(sykmelding) === arbeidssituasjoner.ARBEIDSLEDIG) {
                return kvitteringtyper.BEKREFTET_SYKMELDING_ANNET_ARBEIDSLEDIG;
            }
            if (erFrilanserEllerSelvstendigNaringsdrivende(sykmelding) && !erAvventendeReisetilskuddEllerBehandlingsdager(sykmelding)) {
                if (state.soknader.hentingFeilet) {
                    return kvitteringtyper.KVITTERING_MED_SYKEPENGER_FEIL_FRILANSER;
                }
                if (nyeSoknaderForDenneSykmeldingen.length > 0) {
                    return kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_NA_FRILANSER;
                }
                if (denneSykmeldingensSoknader.length > 0) {
                    return kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE_FRILANSER;
                }
                if (denneSykmeldingensSoknader.length === 0 && !skalOppretteSoknad) {
                    return kvitteringtyper.KVITTERING_UTEN_SYKEPENGER_FRILANSER_NAERINGSDRIVENDE;
                }
                if (skalOppretteSoknad) {
                    return kvitteringtyper.KVITTERING_MED_SYKEPENGER_FRILANSER_NAERINGSDRIVENDE_PAPIR;
                }
            }
            return kvitteringtyper.BEKREFTET_SYKMELDING_UTEN_ARBEIDSGIVER;
        }
        default: {
            return null;
        }
    }
};

export function mapStateToProps(state, ownProps) {
    const { sykmeldingId } = ownProps.params;
    const sykmelding = selectDinSykmelding(state, sykmeldingId);
    const henter = state.dineSykmeldinger.henter || state.ledetekster.henter || state.sykepengesoknader.henter || state.soknader.henter;
    const hentingFeilet = state.dineSykmeldinger.hentingFeilet || state.ledetekster.hentingFeilet;
    const kvitteringtype = getKvitteringtype(state, sykmeldingId);
    const soknadErFremtidig = s => s.sykmeldingId === sykmeldingId && s.status === FREMTIDIG;

    return {
        henter,
        hentingFeilet,
        sykmeldingId,
        sykmelding,
        sykepengesoknader: state.sykepengesoknader.data.filter(soknadErFremtidig),
        soknader: state.soknader.data.filter(soknadErFremtidig),
        kvitteringtype,
        tom: sykmelding ? tilLesbarDatoMedArstall(senesteTom(sykmelding.mulighetForArbeid.perioder)) : null,
    };
}

const actionCreators = {
    doHentDineSykmeldinger: hentDineSykmeldinger,
    doHentSykepengesoknader: hentSykepengesoknader,
    doHentSoknader: hentSoknader,
    doHentBrukerinfo: hentBrukerinfo,
    doHentAktuelleArbeidsgivere: hentAktuelleArbeidsgivere,
};

const SykmeldingkvitteringSide = connect(mapStateToProps, actionCreators)(KvitteringSide);

export default SykmeldingkvitteringSide;
