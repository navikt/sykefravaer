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
                    } else if (sykmelding.status !== 'SENDT' && sykmelding.status !== 'BEKREFTET') {
                        return <Feilmelding />;
                    }
                    return (<SykmeldingKvittering {...props} />);
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

export function mapStateToProps(state, ownProps) {
    const sykmeldingId = ownProps.params.sykmeldingId;
    const sykmelding = getSykmelding(state.dineSykmeldinger.data, sykmeldingId);
    const ledetekster = state.ledetekster.data;
    const henter = state.dineSykmeldinger.henter || state.ledetekster.henter;
    const hentingFeilet = state.dineSykmeldinger.hentingFeilet || state.ledetekster.hentingFeilet;

    const kvitteringTittelKey = sykmelding && sykmelding.status === 'SENDT' ? 'send-til-arbeidsgiver.kvittering.tittel' : 'bekreft-sykmelding.kvittering.tittel';
    const kvitteringBrodtekstKey = sykmelding && sykmelding.status === 'SENDT' ? 'send-til-arbeidsgiver.kvittering.undertekst' : null;
    const sykepengerTittel = sykmelding && sykmelding.status === 'SENDT' ?
        'send-til-arbeidsgiver.kvittering.sok-om-sykepenger.tittel' :
        'bekreft-sykmelding.kvittering.sok-om-sykepenger.tittel';
    const sykepengerTekst = sykmelding && sykmelding.status === 'SENDT' ?
        'send-til-arbeidsgiver.kvittering.sok-om-sykepenger.tekst' :
        'bekreft-sykmelding.kvittering.sok-om-sykepenger.tekst';
    const brodtekst = kvitteringBrodtekstKey ? getLedetekst(kvitteringBrodtekstKey, ledetekster, {
        '%ARBEIDSGIVER%': sykmelding ? sykmelding.innsendtArbeidsgivernavn : undefined,
    }) : null;

    return {
        sykmelding,
        henter,
        ledetekster,
        hentingFeilet,
        tittel: getLedetekst(kvitteringTittelKey, ledetekster),
        brodtekst,
        sykepengerTittel: getLedetekst(sykepengerTittel, ledetekster),
        sykepengerTekst: getHtmlLedetekst(sykepengerTekst, ledetekster),
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
