import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    getLedetekst,
    getSykmelding,
    toDatePrettyPrint,
    senesteTom,
    sykepengesoknadstatuser,
    sykmeldingstatuser,
    arbeidssituasjoner,
    sykepengesoknad as sykepengesoknadPt } from 'digisyfo-npm';
import Side from '../../sider/Side';
import Sykmeldingkvittering, { kvitteringtyper } from '../../components/sykmeldingkvittering/Sykmeldingkvittering';
import AppSpinner from '../../components/AppSpinner';
import Feilmelding from '../../components/Feilmelding';
import { sykmelding as sykmeldingPt } from '../../propTypes';

const { SENDT, TIL_SENDING, BEKREFTET, AVBRUTT } = sykmeldingstatuser;
const { FREMTIDIG, NY } = sykepengesoknadstatuser;

export const KvitteringSide = (props) => {
    const { sykmelding, sykmeldingId, henter, hentingFeilet, kvitteringtype, sykepengesoknader } = props;
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
            return (<Feilmelding
                tittel="Fant ikke kvittering"
                melding="Vi fant ikke kvitteringen du ser etter. Er du sikker på at du er på riktig side?" />);
        }
        if (kvitteringtype && [SENDT, TIL_SENDING, BEKREFTET, AVBRUTT].indexOf(sykmelding.status) > -1) {
            return (<Sykmeldingkvittering
                kvitteringtype={kvitteringtype}
                sykepengesoknader={sykepengesoknader} />);
        }
        return <Feilmelding />;
    })();

    return (
        <Side tittel={getLedetekst('din-sykmelding.kvittering.sidetittel')} brodsmuler={brodsmuler}>
            {innhold}
        </Side>
    );
};

KvitteringSide.propTypes = {
    sykmelding: sykmeldingPt,
    sykmeldingId: PropTypes.string,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
    kvitteringtype: PropTypes.oneOf(Object.values(kvitteringtyper)),
};

const getArbeidssituasjon = (sykmelding) => {
    return typeof sykmelding.valgtArbeidssituasjon === 'string'
        ? sykmelding.valgtArbeidssituasjon.toUpperCase()
        : '';
};

const erFrilanserEllerSelvstendigNaringsdrivende = (sykmelding) => {
    return [arbeidssituasjoner.FRILANSER, arbeidssituasjoner.NAERINGSDRIVENDE].indexOf(getArbeidssituasjon(sykmelding)) > -1;
};

const erAvventendeReisetilskuddEllerBehandlingsdager = (sykmelding) => {
    return sykmelding
        && sykmelding.mulighetForArbeid
        && sykmelding.mulighetForArbeid.perioder
            .some((periode) => {
                return periode.avventende || periode.reisetilskudd || periode.behandlingsdager;
            });
};

const getKvitteringtype = (sykmelding, sykepengesoknader = [], harStrengtFortroligAdresse = false) => {
    if (!sykmelding) {
        return null;
    }
    const denneSykmeldingensSoknader = sykepengesoknader.filter((s) => {
        return s.sykmeldingId === sykmelding.id;
    });
    const nyeSoknaderForDenneSykmeldingen = denneSykmeldingensSoknader.filter((s) => {
        return s.status === NY;
    });
    switch (sykmelding.status) {
        case AVBRUTT: {
            return kvitteringtyper.AVBRUTT_SYKMELDING;
        }
        case SENDT:
        case TIL_SENDING: {
            return denneSykmeldingensSoknader.length === 0
                ? kvitteringtyper.SENDT_SYKMELDING_INGEN_SOKNAD
                : nyeSoknaderForDenneSykmeldingen.length === 0
                ? kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE
                : kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_NA;
        }
        case BEKREFTET: {
            if (harStrengtFortroligAdresse) {
                return kvitteringtyper.STRENGT_FORTROLIG_ADRESSE;
            }
            if (getArbeidssituasjon(sykmelding) === arbeidssituasjoner.ARBEIDSTAKER) {
                return kvitteringtyper.BEKREFTET_SYKMELDING_ARBEIDSTAKER_UTEN_OPPGITT_ARBEIDSGIVER;
            }
            if (erFrilanserEllerSelvstendigNaringsdrivende(sykmelding) && !erAvventendeReisetilskuddEllerBehandlingsdager(sykmelding)) {
                return sykmelding.erUtenforVentetid || sykmelding.skalOppretteSoknad
                    ? kvitteringtyper.KVITTERING_MED_SYKEPENGER_FRILANSER_NAERINGSDRIVENDE_PAPIR
                    : kvitteringtyper.KVITTERING_UTEN_SYKEPENGER_FRILANSER_NAERINGSDRIVENDE;
            }
            return kvitteringtyper.BEKREFTET_SYKMELDING_UTEN_ARBEIDSGIVER;
        }
        default: {
            return null;
        }
    }
};

export function mapStateToProps(state, ownProps) {
    const sykmeldingId = ownProps.params.sykmeldingId;
    const sykmelding = getSykmelding(state.dineSykmeldinger.data, sykmeldingId) || undefined;
    const henter = state.dineSykmeldinger.henter || state.ledetekster.henter || state.sykepengesoknader.henter;
    const hentingFeilet = state.dineSykmeldinger.hentingFeilet || state.ledetekster.hentingFeilet;
    const harStrengtFortroligAdresse = (() => {
        try {
            return state.brukerinfo.bruker.data.strengtFortroligAdresse;
        } catch (e) {
            return false;
        }
    })();

    const kvitteringtype = getKvitteringtype(sykmelding, state.sykepengesoknader.data, harStrengtFortroligAdresse);

    return {
        henter,
        hentingFeilet,
        sykmeldingId,
        sykmelding,
        sykepengesoknader: state.sykepengesoknader.data.filter((s) => {
            return s.sykmeldingId === sykmeldingId && s.status === FREMTIDIG;
        }),
        kvitteringtype,
        tom: sykmelding ? toDatePrettyPrint(senesteTom(sykmelding.mulighetForArbeid.perioder)) : null,
    };
}

const SykmeldingkvitteringContainer = connect(mapStateToProps)(KvitteringSide);

export default SykmeldingkvitteringContainer;
