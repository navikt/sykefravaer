import React, { PropTypes } from 'react';
import SykmeldingKvittering from '../components/sykmelding/SykmeldingKvittering';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import { getLedetekst, getHtmlLedetekst } from '../ledetekster';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import { getSykmelding } from '../utils';

export const KvitteringSide = (props) => {
    const { sykmelding, henter, hentingFeilet, ledetekster, brodsmuler } = props;
    return (
        <Side tittel={getLedetekst('din-sykmelding.kvittering.sidetittel', ledetekster)} brodsmuler={brodsmuler}>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    } else if (hentingFeilet) {
                        return <Feilmelding />;
                    } else if (!sykmelding) {
                        return (<Feilmelding
                            tittel="Fant ikke kvittering"
                            melding="Vi fant ikke kvitteringen du ser etter. Er du sikker på at du er på riktig side?" />);
                    } else if (sykmelding.status === 'SENDT' || sykmelding.status === 'BEKREFTET' || sykmelding.status === 'AVBRUTT') {
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
    brodsmuler: PropTypes.array,
    sykmelding: PropTypes.object,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
};

export const getLedetekstNokkel = (sykmelding, nokkel, alternativer = {}) => {
    if (!sykmelding) {
        return null;
    }
    switch (sykmelding.status) {
        case 'BEKREFTET': {
            if (alternativer.harStrengtFortroligAdresse) {
                return `bekreft-sykmelding.skjermingskode-6.${nokkel}`;
            } else if (sykmelding.arbeidssituasjon === 'arbeidstaker') {
                return `bekreft-sykmelding.arbeidstaker-uten-arbeidsgiver.${nokkel}`;
            }
            return `bekreft-sykmelding.${nokkel}`;
        }
        case 'SENDT': {
            return `send-til-arbeidsgiver.${nokkel}`;
        }
        case 'AVBRUTT': {
            return `avbryt-sykmelding.${nokkel}`;
        }
        default: {
            return null;
        }
    }
};

export function mapStateToProps(state, ownProps) {
    const sykmeldingId = ownProps.params.sykmeldingId;
    const sykmelding = getSykmelding(state.dineSykmeldinger.data, sykmeldingId);
    const ledetekster = state.ledetekster.data;
    const henter = state.dineSykmeldinger.henter || state.ledetekster.henter;
    const hentingFeilet = state.dineSykmeldinger.hentingFeilet || state.ledetekster.hentingFeilet;
    const harStrengtFortroligAdresse = state.brukerinfo.bruker.data.strengtFortroligAdresse;

    const kvitteringTittelKey = getLedetekstNokkel(sykmelding, 'kvittering.tittel');
    const kvitteringBrodtekstKey = getLedetekstNokkel(sykmelding, 'kvittering.undertekst');
    const sykepengerTittelNokkel = getLedetekstNokkel(sykmelding, 'kvittering.sok-om-sykepenger.tittel');
    const sykepengerTekstNokkel = getLedetekstNokkel(sykmelding, 'kvittering.sok-om-sykepenger.tekst', {
        harStrengtFortroligAdresse,
    });
    const brodtekst = kvitteringBrodtekstKey ? getHtmlLedetekst(kvitteringBrodtekstKey, ledetekster) : null;

    return {
        sykmelding,
        henter,
        ledetekster,
        hentingFeilet,
        sykmeldingStatus: sykmelding ? sykmelding.status : undefined,
        tittel: getLedetekst(kvitteringTittelKey, ledetekster),
        brodtekst,
        sykepengerTittel: getLedetekst(sykepengerTittelNokkel, ledetekster),
        sykepengerTekst: getHtmlLedetekst(sykepengerTekstNokkel, ledetekster),
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

const SykmeldingKvitteringContainer = connect(mapStateToProps)(KvitteringSide);

export default SykmeldingKvitteringContainer;
