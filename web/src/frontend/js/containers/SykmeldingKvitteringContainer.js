import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, getHtmlLedetekst, getSykmelding, toDatePrettyPrint, senesteTom } from 'digisyfo-npm';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import SykmeldingKvittering, { kvitteringtyper } from '../components/sykmelding/SykmeldingKvittering';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import * as actions from '../actions/sykepengesoknader_actions';
import { SENDT, TIL_SENDING, BEKREFTET, AVBRUTT } from '../enums/sykmeldingstatuser';
import { sykmelding as sykmeldingPt, brodsmule as brodsmulePt } from '../propTypes';
import { FREMTIDIG, NY } from '../enums/sykepengesoknadstatuser';

export const KvitteringSide = (props) => {
    const { sykmelding, henter, hentingFeilet, brodsmuler } = props;
    return (
        <Side tittel={getLedetekst('din-sykmelding.kvittering.sidetittel')} brodsmuler={brodsmuler}>
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
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    sykmelding: sykmeldingPt,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
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

export const getKvitteringtype = (sykmelding, sykepengesoknader) => {
    if (!sykmelding) {
        return kvitteringtyper.STANDARDKVITTERING;
    }

    const sykmeldingId = sykmelding.id;
    const denneSykmeldingensSoknader = sykepengesoknader.filter((s) => {
        return s.sykmeldingId === sykmeldingId;
    });

    if (denneSykmeldingensSoknader.length === 0) {
        return kvitteringtyper.STANDARDKVITTERING;
    }

    const sokbareSoknader = denneSykmeldingensSoknader.filter((s) => {
        return s.status === NY;
    });

    if (sokbareSoknader.length > 0) {
        return kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_NA;
    }

    return kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE;
};

export function mapStateToProps(state, ownProps) {
    const sykmeldingId = ownProps.params.sykmeldingId;
    const sykmelding = getSykmelding(state.dineSykmeldinger.data, sykmeldingId);
    const henter = state.dineSykmeldinger.henter || state.ledetekster.henter || state.sykepengesoknader.henter;
    const hentingFeilet = state.dineSykmeldinger.hentingFeilet || state.ledetekster.hentingFeilet;
    const harStrengtFortroligAdresse = (() => {
        try {
            return state.brukerinfo.bruker.data.strengtFortroligAdresse;
        } catch (e) {
            return false;
        }
    })();

    const kvitteringTittelKey = getLedetekstNokkel(sykmelding, 'kvittering.tittel');
    const kvitteringBrodtekstKey = getLedetekstNokkel(sykmelding, 'kvittering.undertekst', { harStrengtFortroligAdresse });
    const tittel = kvitteringTittelKey ? getLedetekst(kvitteringTittelKey) : null;
    const brodtekst = kvitteringBrodtekstKey ? getHtmlLedetekst(kvitteringBrodtekstKey, {
        '%TOM%': toDatePrettyPrint(senesteTom(sykmelding.mulighetForArbeid.perioder)),
    }) : null;
    const sykepengesoknader = state.sykepengesoknader.data;

    return {
        henter,
        hentingFeilet,
        sykmelding,
        sykmeldingStatus: sykmelding ? sykmelding.status : undefined,
        sykepengesoknader: state.sykepengesoknader.data.filter((s) => {
            return s.sykmeldingId === sykmeldingId && s.status === FREMTIDIG;
        }),
        tittel,
        kvitteringtype: getKvitteringtype(sykmelding, sykepengesoknader),
        brodtekst,
        brodsmuler: [{
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
        }],
    };
}

const SykmeldingKvitteringContainer = connect(mapStateToProps, actions)(KvitteringSide);

export default SykmeldingKvitteringContainer;
