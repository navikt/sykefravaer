import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { getLedetekst, toDatePrettyPrint, keyValue, Video, filmer, sykmeldingstatuser, getHtmlLedetekst, sykepengesoknad as sykepengesoknadPt } from 'digisyfo-npm';
import LenkeTilDineSykmeldinger from '../LenkeTilDineSykmeldinger';
import Sidetopp from '../Sidetopp';
import { Bjorn } from '../Hjelpeboble';
import IllustrertInnhold from '../IllustrertInnhold';

export const kvitteringtyper = {
    KVITTERING_MED_SYKEPENGER_SOK_NA: 'KVITTERING_MED_SYKEPENGER_SØK_NÅ',
    KVITTERING_MED_SYKEPENGER_SOK_SENERE: 'KVITTERING_MED_SYKEPENGER_SØK_SENERE',
    KVITTERING_MED_SYKEPENGER_FRILANSER_NAERINGSDRIVENDE_PAPIR: 'KVITTERING_MED_SYKEPENGER_FRILANSER_NAERINGSDRIVENDE_PAPIR',
    KVITTERING_UTEN_SYKEPENGER_FRILANSER_NAERINGSDRIVENDE: 'KVITTERING_UTEN_SYKEPENGER_FRILANSER_NAERINGSDRIVENDE',
    AVBRUTT_SYKMELDING: 'AVBRUTT_SYKMELDING',
    SENDT_SYKMELDING_INGEN_SOKNAD: 'SENDT_SYKMELDING_INGEN_SOKNAD',
    BEKREFTET_SYKMELDING_UTEN_OPPGITT_ARBEIDSGIVER: 'BEKREFTET_SYKMELDING_UTEN_OPPGITT_ARBEIDSGIVER',
    STRENGT_FORTROLIG_ADRESSE: 'STRENGT_FORTROLIG_ADRESSE',
    BEKREFTET_SYKMELDING_FRILANSER_SELVSTENDIG: 'BEKREFTET_SYKMELDING_FRILANSER_SELVSTENDIG',
};

export const Standardkvittering = (props) => {
    const { tittel, brodtekst, status } = props;
    const ikon = status === sykmeldingstatuser.AVBRUTT ? 'avbryt-sykmelding.svg' : 'digital-til-papir.svg';
    const ikonKlasse = status === sykmeldingstatuser.AVBRUTT ? 'illustrertTittel__img--mikro' : '';
    return (<div className="panel blokk js-kvittering--standard">
        <div className="illustrertTittel">
            <img className={`illustrertTittel__img ${ikonKlasse}`} src={`/sykefravaer/img/svg/${ikon}`} alt="" />
            <h2 className="illustrertTittel__tittel">
                {tittel}
            </h2>
        </div>
        <div className="redaksjonelt-innhold" dangerouslySetInnerHTML={brodtekst} />
    </div>);
};

Standardkvittering.propTypes = {
    tittel: PropTypes.string,
    brodtekst: PropTypes.shape({
        ___html: PropTypes.string,
    }),
    status: PropTypes.string,
};

export const Kvitteringsteg = ({ ikon, alt, tittel, children }) => {
    return (<div className="kvitteringsteg">
        <div className="kvitteringsteg__ikon">
            <img alt={alt} src={`${window.APP_SETTINGS.APP_ROOT}/img/svg/${ikon}`} />
        </div>
        <div className="kvitteringsteg__innhold">
            <h2 className="kvitteringsteg__tittel js-tittel">{tittel}</h2>
            { children && <div className="js-tekst">{children}</div> }
        </div>
    </div>);
};

Kvitteringsteg.propTypes = {
    ikon: PropTypes.string,
    alt: PropTypes.string,
    tittel: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
    ]),
};

export const HtmlAvsnitt = ({ nokkel, replacements = null }) => {
    return <p className="kvitteringsteg__tekst" dangerouslySetInnerHTML={{ __html: getLedetekst(nokkel, replacements) }} />;
};

HtmlAvsnitt.propTypes = {
    nokkel: PropTypes.string.isRequired,
    replacements: keyValue,
};

export const SokOmSykepengerNaa = () => {
    const sokUrl = `${window.APP_SETTINGS.APP_ROOT}/soknader`;
    return (<div className="panel blokk js-kvittering--sok-naa">
        <div className="stegvisKvittering">
            <Kvitteringsteg ikon="kvitteringhake.svg" alt="Grønn hake" tittel={getLedetekst('sykmelding.kvittering.sok-na.steg-1.tittel')} />
            <Kvitteringsteg ikon="kvitteringSokSykepenger.svg" alt="Søk om sykepenger" tittel={getLedetekst('sykmelding.kvittering.sok-na.steg-2.tittel')}>
                <HtmlAvsnitt nokkel="sykmelding.kvittering.sok-na.steg-2.tekst" />
                <p className="kvitteringsteg__handling">
                    <Link to={sokUrl} className="js-sok knapp">{getLedetekst('sykmelding.kvittering.sok-na.steg-2.knapp')}</Link>
                </p>
            </Kvitteringsteg>
        </div>
    </div>);
};

export const Soknadsdatoliste = ({ sykepengesoknader, visStatus = false }) => {
    return (<ul className="js-soknadsdatoliste">
        {
            [...sykepengesoknader]
                .sort((a, b) => {
                    if (a.tom.getTime() > b.tom.getTime()) {
                        return 1;
                    }
                    return -1;
                })
                .map((s, index) => {
                    const nokkel = `sykepengesoknader.datoliste.status.${s.status}`;
                    return (<li key={index}>
                        <strong>{toDatePrettyPrint(s.tom)}</strong>
                        { visStatus ? ` – ${getLedetekst(nokkel)}` : null }
                    </li>);
                })
        }
    </ul>);
};

Soknadsdatoliste.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
    visStatus: PropTypes.bool,
};

export const SokOmSykepengerSenereKvittering = ({ sykepengesoknader }) => {
    return (<div className="js-kvittering--sok-senere">
        <div className="panel blokk">
            <div className="stegvisKvittering">
                <Kvitteringsteg ikon="kvitteringhake.svg" alt="Grønn hake" tittel={getLedetekst('sykmelding.kvittering.sok-senere.steg-1.tittel')} />
                <Kvitteringsteg ikon="kvitteringVent.svg" alt="Timeglass" tittel={getLedetekst('sykmelding.kvittering.sok-senere.steg-2.tittel')}>
                    <HtmlAvsnitt nokkel="sykmelding.kvittering.sok-senere.steg-2.tekst" />
                </Kvitteringsteg>
                <Kvitteringsteg ikon="kvitteringSokSykepenger.svg" alt="Søk om sykepenger" tittel={getLedetekst('sykmelding.kvittering.sok-senere.steg-3.tittel')}>
                    <HtmlAvsnitt nokkel="sykmelding.kvittering.sok-senere.steg-3.tekst-med-liste" />
                    <Soknadsdatoliste sykepengesoknader={sykepengesoknader} />
                </Kvitteringsteg>
            </div>
        </div>
        <div className="blokk">
            <h2 className="panel__tittel blokk--xxs">{getLedetekst('sykmelding.kvittering.sok-senere.video.tittel')}</h2>
            <Video film={filmer.SOKNAD_SYKEPENGER} />
        </div>
    </div>);
};

SokOmSykepengerSenereKvittering.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
};

export const FrilanserMedPapirsoknadKvittering = () => {
    return (<div className="js-kvittering--sok-papir">
        <div className="panel blokk">
            <div className="stegvisKvittering">
                <Kvitteringsteg ikon="kvitteringhake.svg" alt="Grønn hake" tittel={getLedetekst('bekreft-sykmelding.skal-opprettes-soknad.steg-1.tittel')} />
                <Kvitteringsteg ikon="kvitteringKonvolutt.svg" alt="Konvolutt" tittel={getLedetekst('bekreft-sykmelding.skal-opprettes-soknad.steg-2.tittel')}>
                    <HtmlAvsnitt nokkel="bekreft-sykmelding.skal-opprettes-soknad.steg-2.tekst" />
                </Kvitteringsteg>
            </div>
        </div>
        <Bjorn className="blokk" hvit stor nokkel="bekreft-sykmelding.skal-opprettes-soknad.bjorn" />
    </div>);
};

export const FrilanserUtenSoknadKvittering = () => {
    return (<div className="panel blokk js-kvittering--standard">
        <IllustrertInnhold ikon="/sykefravaer/img/svg/kvitteringhake.svg" ikonAlt="Hake">
            <h2 className="panel__tittel">
                {getLedetekst('bekreft-sykmelding.skal-ikke-opprettes-soknad.kvittering.tittel')}
            </h2>
            <div className="redaksjonelt-innhold" dangerouslySetInnerHTML={getHtmlLedetekst('bekreft-sykmelding.skal-ikke-opprettes-soknad.kvittering.undertekst')} />
        </IllustrertInnhold>
    </div>);
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
                        return <SokOmSykepengerNaa />;
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
                    case kvitteringtyper.BEKREFTET_SYKMELDING_UTEN_OPPGITT_ARBEIDSGIVER: {
                        return <ArbeidstakerBekreftetSykmeldingKvittering />;
                    }
                    case kvitteringtyper.STRENGT_FORTROLIG_ADRESSE: {
                        return <StrengtFortroligAdresseKvittering />;
                    }
                    case kvitteringtyper.BEKREFTET_SYKMELDING_FRILANSER_SELVSTENDIG: {
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
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
    kvitteringtype: PropTypes.oneOf(Object.values(kvitteringtyper)),
};

export default SykmeldingKvittering;
