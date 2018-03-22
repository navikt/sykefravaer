import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, sykmeldingstatuser, getHtmlLedetekst, sykepengesoknad as sykepengesoknadPt } from 'digisyfo-npm';
import LenkeTilDineSykmeldinger from '../LenkeTilDineSykmeldinger';
import Sidetopp from '../Sidetopp';
import Standardkvittering from './StandardSykmeldingkvittering';
import SokOmSykepengerSenereKvittering from './SokOmSykepengerSenereKvittering';
import SokOmSykepengerNaaKvittering from './SokOmSykepengerNaaKvittering';
import FrilanserMedPapirsoknadKvittering from './FrilanserMedPapirsoknadKvittering';
import FrilanserUtenSoknadKvittering from './FrilanserUtenSoknadKvittering';

export const kvitteringtyper = {
    KVITTERING_MED_SYKEPENGER_SOK_NA: 'KVITTERING_MED_SYKEPENGER_SØK_NÅ',
    KVITTERING_MED_SYKEPENGER_SOK_SENERE: 'KVITTERING_MED_SYKEPENGER_SØK_SENERE',
    KVITTERING_MED_SYKEPENGER_FRILANSER_NAERINGSDRIVENDE_PAPIR: 'KVITTERING_MED_SYKEPENGER_FRILANSER_NAERINGSDRIVENDE_PAPIR',
    KVITTERING_UTEN_SYKEPENGER_FRILANSER_NAERINGSDRIVENDE: 'KVITTERING_UTEN_SYKEPENGER_FRILANSER_NAERINGSDRIVENDE',
    AVBRUTT_SYKMELDING: 'AVBRUTT_SYKMELDING',
    SENDT_SYKMELDING_INGEN_SOKNAD: 'SENDT_SYKMELDING_INGEN_SOKNAD',
    BEKREFTET_SYKMELDING_ARBEIDSTAKER_UTEN_OPPGITT_ARBEIDSGIVER: 'BEKREFTET_SYKMELDING_ARBEIDSTAKER_UTEN_OPPGITT_ARBEIDSGIVER',
    STRENGT_FORTROLIG_ADRESSE: 'STRENGT_FORTROLIG_ADRESSE',
    BEKREFTET_SYKMELDING_UTEN_ARBEIDSGIVER: 'BEKREFTET_SYKMELDING_UTEN_ARBEIDSGIVER',
};

const AvbruttKvittering = () => {
    return (<Standardkvittering
        status={sykmeldingstatuser.AVBRUTT}
        tittel={getLedetekst('avbryt-sykmelding.kvittering.tittel')}
        brodtekst={getHtmlLedetekst('avbryt-sykmelding.kvittering.undertekst')} />);
};

const SendtIngenSoknadKvittering = () => {
    return (<Standardkvittering
        tittel={getLedetekst('send-til-arbeidsgiver.kvittering.tittel')}
        brodtekst={getHtmlLedetekst('send-til-arbeidsgiver.kvittering.undertekst')} />);
};

const ArbeidstakerBekreftetSykmeldingKvittering = () => {
    return (<Standardkvittering
        tittel={getLedetekst('bekreft-sykmelding.arbeidstaker-uten-arbeidsgiver.kvittering.tittel')}
        brodtekst={getHtmlLedetekst('bekreft-sykmelding.arbeidstaker-uten-arbeidsgiver.kvittering.undertekst')} />);
};

const StrengtFortroligAdresseKvittering = () => {
    return (<Standardkvittering
        tittel={getLedetekst('bekreft-sykmelding.arbeidstaker-uten-arbeidsgiver.kvittering.tittel')}
        brodtekst={getHtmlLedetekst('bekreft-sykmelding.skjermingskode-6.kvittering.undertekst')} />);
};

const BekreftetKvittering = () => {
    return (<Standardkvittering
        tittel={getLedetekst('bekreft-sykmelding.kvittering.tittel')}
        brodtekst={getHtmlLedetekst('bekreft-sykmelding.kvittering.undertekst')} />);
};

const SykmeldingKvittering = (props) => {
    const { kvitteringtype, sykepengesoknader } = props;
    return (<div>
        <Sidetopp tittel={getLedetekst('din-sykmelding.kvittering.hva-naa')} />
        {
            (() => {
                switch (kvitteringtype) {
                    case kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE: {
                        return <SokOmSykepengerSenereKvittering sykepengesoknader={sykepengesoknader} />;
                    }
                    case kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_NA: {
                        return <SokOmSykepengerNaaKvittering />;
                    }
                    case kvitteringtyper.KVITTERING_MED_SYKEPENGER_FRILANSER_NAERINGSDRIVENDE_PAPIR: {
                        return <FrilanserMedPapirsoknadKvittering />;
                    }
                    case kvitteringtyper.KVITTERING_UTEN_SYKEPENGER_FRILANSER_NAERINGSDRIVENDE: {
                        return <FrilanserUtenSoknadKvittering />;
                    }
                    case kvitteringtyper.AVBRUTT_SYKMELDING: {
                        return <AvbruttKvittering />;
                    }
                    case kvitteringtyper.SENDT_SYKMELDING_INGEN_SOKNAD: {
                        return <SendtIngenSoknadKvittering />;
                    }
                    case kvitteringtyper.BEKREFTET_SYKMELDING_ARBEIDSTAKER_UTEN_OPPGITT_ARBEIDSGIVER: {
                        return <ArbeidstakerBekreftetSykmeldingKvittering />;
                    }
                    case kvitteringtyper.STRENGT_FORTROLIG_ADRESSE: {
                        return <StrengtFortroligAdresseKvittering />;
                    }
                    case kvitteringtyper.BEKREFTET_SYKMELDING_UTEN_ARBEIDSGIVER: {
                        return <BekreftetKvittering />;
                    }
                    default: {
                        return null;
                    }
                }
            })()
        }
        <LenkeTilDineSykmeldinger />
    </div>);
};

SykmeldingKvittering.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt).isRequired,
    kvitteringtype: PropTypes.oneOf(Object.values(kvitteringtyper)).isRequired,
};

export default SykmeldingKvittering;
