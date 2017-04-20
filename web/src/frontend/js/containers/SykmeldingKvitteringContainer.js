import React, { PropTypes } from 'react';
import SykmeldingKvittering, { kvitteringtyper } from '../components/sykmelding/SykmeldingKvittering';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import { getLedetekst, getHtmlLedetekst, getSykmelding, toDatePrettyPrint } from 'digisyfo-npm';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import { senesteTom } from '../utils/periodeUtils';
import * as actions from '../actions/sykepengesoknader_actions';
import { SENDT, TIL_SENDING, BEKREFTET, AVBRUTT } from '../enums/sykmeldingstatuser';
import { sykmelding as sykmeldingPt, brodsmule as brodsmulePt } from '../propTypes';

export const KvitteringSide = (props) => {
    const { sykmelding, henter, hentingFeilet, ledetekster, brodsmuler } = props;
    return (
        <Side tittel={getLedetekst('din-sykmelding.kvittering.sidetittel', ledetekster)} brodsmuler={brodsmuler}>
            {
                (() => {
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
                    if (sykmelding.status === SENDT || sykmelding.status === TIL_SENDING || sykmelding.status === BEKREFTET || sykmelding.status === AVBRUTT) {
                        return <SykmeldingKvittering {...props} />;
                    }
                    return <Feilmelding />;
                })()
            }
        </Side>
    );
};

KvitteringSide.propTypes = {
    ledetekster: PropTypes.object,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    sykmelding: sykmeldingPt,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
};

const erPeriodePassert = (sykmelding) => {
    return Date.now() > Date.parse(senesteTom(sykmelding.mulighetForArbeid.perioder));
};

export const getLedetekstNokkel = (sykmelding, nokkel, alternativer = {}) => {
    if (!sykmelding) {
        return null;
    }
    switch (sykmelding.status) {
        case BEKREFTET: {
            if (alternativer.harStrengtFortroligAdresse) {
                return `bekreft-sykmelding.skjermingskode-6.${nokkel}`;
            } else if (typeof sykmelding.valgtArbeidssituasjon === 'string' && sykmelding.valgtArbeidssituasjon.toUpperCase() === 'ARBEIDSTAKER') {
                return `bekreft-sykmelding.arbeidstaker-uten-arbeidsgiver.${nokkel}`;
            }
            return `bekreft-sykmelding.${nokkel}`;
        }
        case TIL_SENDING:
        case SENDT: {
            return `send-til-arbeidsgiver.${nokkel}`;
        }
        case AVBRUTT: {
            return `avbryt-sykmelding.${nokkel}`;
        }
        default: {
            return null;
        }
    }
};

export const getKvitteringtype = (sykmelding, erPilot) => {
    if (!sykmelding || !erPilot || (sykmelding.status !== SENDT && sykmelding.status !== TIL_SENDING) || !sykmelding.arbeidsgiverForskutterer) {
        return kvitteringtyper.STANDARDKVITTERING;
    }
    if (erPeriodePassert(sykmelding)) {
        return kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_NA;
    }
    return kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE;
};

export function mapStateToProps(state, ownProps) {
    const sykmeldingId = ownProps.params.sykmeldingId;
    const sykmelding = getSykmelding(state.dineSykmeldinger.data, sykmeldingId);
    const ledetekster = state.ledetekster.data;
    const henter = state.dineSykmeldinger.henter || state.ledetekster.henter;
    const hentingFeilet = state.dineSykmeldinger.hentingFeilet || state.ledetekster.hentingFeilet;
    const harStrengtFortroligAdresse = state.brukerinfo.bruker.data.strengtFortroligAdresse;
    const pilotSykepenger = state.pilot.data.pilotSykepenger;

    const kvitteringTittelKey = getLedetekstNokkel(sykmelding, 'kvittering.tittel');
    const kvitteringBrodtekstKey = getLedetekstNokkel(sykmelding, 'kvittering.undertekst', { harStrengtFortroligAdresse });
    const tittel = kvitteringTittelKey ? getLedetekst(kvitteringTittelKey, ledetekster) : null;
    const brodtekst = kvitteringBrodtekstKey ? getHtmlLedetekst(kvitteringBrodtekstKey, ledetekster, {
        '%TOM%': toDatePrettyPrint(senesteTom(sykmelding.mulighetForArbeid.perioder)),
    }) : null;

    return {
        henter,
        hentingFeilet,
        sykmelding,
        ledetekster,
        sykmeldingStatus: sykmelding ? sykmelding.status : undefined,
        tittel,
        kvitteringtype: getKvitteringtype(sykmelding, pilotSykepenger),
        brodtekst,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel', state.ledetekster.data),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('dine-sykmeldinger.sidetittel', state.ledetekster.data),
            sti: '/sykmeldinger',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('din-sykmelding.sidetittel', state.ledetekster.data),
            sti: `/sykmeldinger/${sykmeldingId}`,
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('din-sykmelding.kvittering.sidetittel', state.ledetekster.data),
        }],
    };
}

const SykmeldingKvitteringContainer = connect(mapStateToProps, actions)(KvitteringSide);

export default SykmeldingKvitteringContainer;
