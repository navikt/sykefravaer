import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, sykmeldingstatuser, getHtmlLedetekst, sykepengesoknad as sykepengesoknadPt } from 'digisyfo-npm';
import LenkeTilDineSykmeldinger from '../LenkeTilDineSykmeldinger';
import Sidetopp from '../Sidetopp';
import StandardSykmeldingkvittering from './StandardSykmeldingkvittering';
import {
    SokOmSykepengerSenereKvitteringArbeidsgiverForskuttererIkkeKortSykmelding,
    SokOmSykepengerSenereKvitteringArbeidsgiverForskuttererIkkeLangSykmelding,
    SokOmSykepengerSenereKvitteringArbeidsgiverForskuttererKortSykmelding,
    SokOmSykepengerSenereKvitteringArbeidsgiverForskuttererLangSykmelding,
} from './SokOmSykepengerSenereKvittering';
import SokOmSykepengerNaaKvittering from './SokOmSykepengerNaaKvittering';
import FrilanserMedPapirsoknadKvittering from './FrilanserMedPapirsoknadKvittering';
import FrilanserUtenSoknadKvittering from './FrilanserUtenSoknadKvittering';
import FrilanserSoekDigitaltNaa from './FrilanserSoekDigitaltNaa';
import FrilanserSoekDigitaltSenere from './FrilanserSoekDigitaltSenere';
import FrilanserSoekDigitaltFeil from './FrilanserSoekDigitaltFeil';
import SendtSykmeldingMedPapirSoknadKvittering from './SendtSykmeldingMedPapirSoknadKvittering';
import AnnetArbeidsledigKvittering from './AnnetArbeidsledigKvittering';
import Feilmelding from '../Feilmelding';
import { soknad as soknadPt } from '../../propTypes';

export const kvitteringtyper = {
    KVITTERING_MED_SYKEPENGER_SOK_NA: 'KVITTERING_MED_SYKEPENGER_SØK_NÅ',
    KVITTERING_MED_SYKEPENGER_SOK_SENERE: 'KVITTERING_MED_SYKEPENGER_SØK_SENERE',
    KVITTERING_MED_SYKEPENGER_SOK_SENERE_ARBEIDSGIVER_FORSKUTTERER_KORT_SYKMELDING: 'KVITTERING_MED_SYKEPENGER_SOK_SENERE_ARBEIDSGIVER_FORSKUTTERER_KORT_SYKMELDING',
    KVITTERING_MED_SYKEPENGER_SOK_SENERE_ARBEIDSGIVER_FORSKUTTERER_LANG_SYKMELDING: 'KVITTERING_MED_SYKEPENGER_SOK_SENERE_ARBEIDSGIVER_FORSKUTTERER_LANG_SYKMELDING',
    KVITTERING_MED_SYKEPENGER_SOK_SENERE_ARBEIDSGIVER_FORSKUTTERER_IKKE_KORT_SYKMELDING: 'KVITTERING_MED_SYKEPENGER_SOK_SENERE_ARBEIDSGIVER_FORSKUTTERER_IKKE_KORT_SYKMELDING',
    KVITTERING_MED_SYKEPENGER_SOK_SENERE_ARBEIDSGIVER_FORSKUTTERER_IKKE_LANG_SYKMELDING: 'KVITTERING_MED_SYKEPENGER_SOK_SENERE_ARBEIDSGIVER_FORSKUTTERER_IKKE_LANG_SYKMELDING',
    KVITTERING_MED_SYKEPENGER_SOK_NA_FRILANSER: 'KVITTERING_MED_SYKEPENGER_SØK_NÅ_FRILANSER',
    KVITTERING_MED_SYKEPENGER_SOK_SENERE_FRILANSER: 'KVITTERING_MED_SYKEPENGER_SØK_SENERE_FRILANSER',
    KVITTERING_MED_SYKEPENGER_FEIL_FRILANSER: 'KVITTERING_MED_SYKEPENGER_FEIL_FRILANSER',
    KVITTERING_MED_SYKEPENGER_FRILANSER_NAERINGSDRIVENDE_PAPIR: 'KVITTERING_MED_SYKEPENGER_FRILANSER_NAERINGSDRIVENDE_PAPIR',
    KVITTERING_UTEN_SYKEPENGER_FRILANSER_NAERINGSDRIVENDE: 'KVITTERING_UTEN_SYKEPENGER_FRILANSER_NAERINGSDRIVENDE',
    AVBRUTT_SYKMELDING: 'AVBRUTT_SYKMELDING',
    SENDT_SYKMELDING_INGEN_SOKNAD: 'SENDT_SYKMELDING_INGEN_SOKNAD',
    BEKREFTET_SYKMELDING_ARBEIDSTAKER_UTEN_OPPGITT_ARBEIDSGIVER: 'BEKREFTET_SYKMELDING_ARBEIDSTAKER_UTEN_OPPGITT_ARBEIDSGIVER',
    STRENGT_FORTROLIG_ADRESSE: 'STRENGT_FORTROLIG_ADRESSE',
    BEKREFTET_SYKMELDING_UTEN_ARBEIDSGIVER: 'BEKREFTET_SYKMELDING_UTEN_ARBEIDSGIVER',
    BEKREFTET_SYKMELDING_ANNET_ARBEIDSLEDIG: 'BEKREFTET_SYKMELDING_ANNET_ARBEIDSLEDIG',
};

const AvbruttKvittering = () => {
    return (<StandardSykmeldingkvittering
        status={sykmeldingstatuser.AVBRUTT}
        tittel={getLedetekst('avbryt-sykmelding.kvittering.tittel')}
        brodtekst={getHtmlLedetekst('avbryt-sykmelding.kvittering.undertekst')} />);
};

const ArbeidstakerBekreftetSykmeldingKvittering = () => {
    return (<StandardSykmeldingkvittering
        tittel={getLedetekst('bekreft-sykmelding.arbeidstaker-uten-arbeidsgiver.kvittering.tittel')}
        brodtekst={getHtmlLedetekst('bekreft-sykmelding.arbeidstaker-uten-arbeidsgiver.kvittering.undertekst')} />);
};

const StrengtFortroligAdresseKvittering = () => {
    return (<StandardSykmeldingkvittering
        tittel={getLedetekst('bekreft-sykmelding.arbeidstaker-uten-arbeidsgiver.kvittering.tittel')}
        brodtekst={getHtmlLedetekst('bekreft-sykmelding.skjermingskode-6.kvittering.undertekst')} />);
};

const BekreftetKvittering = () => {
    return (<StandardSykmeldingkvittering
        tittel={getLedetekst('bekreft-sykmelding.kvittering.tittel')}
        brodtekst={getHtmlLedetekst('bekreft-sykmelding.kvittering.undertekst')} />);
};

const SykmeldingKvittering = (props) => {
    const { kvitteringtype, sykepengesoknader, soknader } = props;
    /* eslint-disable max-len */
    const kvitteringMap = {
        [kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE_ARBEIDSGIVER_FORSKUTTERER_LANG_SYKMELDING]: SokOmSykepengerSenereKvitteringArbeidsgiverForskuttererLangSykmelding,
        [kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE_ARBEIDSGIVER_FORSKUTTERER_KORT_SYKMELDING]: SokOmSykepengerSenereKvitteringArbeidsgiverForskuttererKortSykmelding,
        [kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE_ARBEIDSGIVER_FORSKUTTERER_IKKE_LANG_SYKMELDING]: SokOmSykepengerSenereKvitteringArbeidsgiverForskuttererIkkeLangSykmelding,
        [kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE_ARBEIDSGIVER_FORSKUTTERER_IKKE_KORT_SYKMELDING]: SokOmSykepengerSenereKvitteringArbeidsgiverForskuttererIkkeKortSykmelding,
        [kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_NA]: SokOmSykepengerNaaKvittering,
        [kvitteringtyper.KVITTERING_MED_SYKEPENGER_FRILANSER_NAERINGSDRIVENDE_PAPIR]: FrilanserMedPapirsoknadKvittering,
        [kvitteringtyper.KVITTERING_UTEN_SYKEPENGER_FRILANSER_NAERINGSDRIVENDE]: FrilanserUtenSoknadKvittering,
        [kvitteringtyper.AVBRUTT_SYKMELDING]: AvbruttKvittering,
        [kvitteringtyper.SENDT_SYKMELDING_INGEN_SOKNAD]: SendtSykmeldingMedPapirSoknadKvittering,
        [kvitteringtyper.BEKREFTET_SYKMELDING_ARBEIDSTAKER_UTEN_OPPGITT_ARBEIDSGIVER]: ArbeidstakerBekreftetSykmeldingKvittering,
        [kvitteringtyper.STRENGT_FORTROLIG_ADRESSE]: StrengtFortroligAdresseKvittering,
        [kvitteringtyper.BEKREFTET_SYKMELDING_UTEN_ARBEIDSGIVER]: BekreftetKvittering,
        [kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE_FRILANSER]: FrilanserSoekDigitaltSenere,
        [kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_NA_FRILANSER]: FrilanserSoekDigitaltNaa,
        [kvitteringtyper.KVITTERING_MED_SYKEPENGER_FEIL_FRILANSER]: FrilanserSoekDigitaltFeil,
        [kvitteringtyper.BEKREFTET_SYKMELDING_ANNET_ARBEIDSLEDIG]: AnnetArbeidsledigKvittering,
    };
    /* eslint-enable max-len */
    const Component = kvitteringMap[kvitteringtype];
    return (<div>
        <Sidetopp tittel={getLedetekst('din-sykmelding.kvittering.hva-naa')} />
        {
            Component
                ? <Component sykepengesoknader={sykepengesoknader} soknader={soknader} />
                : <Feilmelding />
        }
        <LenkeTilDineSykmeldinger />
    </div>);
};

SykmeldingKvittering.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt).isRequired,
    soknader: PropTypes.arrayOf(soknadPt),
    kvitteringtype: PropTypes.oneOf(Object.values(kvitteringtyper)).isRequired,
};

export default SykmeldingKvittering;
