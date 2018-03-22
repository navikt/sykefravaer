import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { getLedetekst, toDatePrettyPrint, keyValue, Video, filmer, sykmeldingstatuser } from 'digisyfo-npm';
import LenkeTilDineSykmeldinger from '../LenkeTilDineSykmeldinger';
import Sidetopp from '../Sidetopp';
import { sykepengesoknad as sykepengesoknadPt, sykmeldingstatus } from '../../propTypes';
import { Bjorn } from '../Hjelpeboble';
import IllustrertInnhold from '../IllustrertInnhold';

export const kvitteringtyper = {
    STANDARDKVITTERING: 'STANDARDKVITTERING',
    KVITTERING_MED_SYKEPENGER_SOK_NA: 'KVITTERING_MED_SYKEPENGER_SØK_NÅ',
    KVITTERING_MED_SYKEPENGER_SOK_SENERE: 'KVITTERING_MED_SYKEPENGER_SØK_SENERE',
    KVITTERING_MED_SYKEPENGER_FRILANSER_NAERINGSDRIVENDE_PAPIR: 'KVITTERING_MED_SYKEPENGER_FRILANSER_NAERINGSDRIVENDE_PAPIR',
    KVITTERING_UTEN_SYKEPENGER_FRILANSER_NAERINGSDRIVENDE: 'KVITTERING_UTEN_SYKEPENGER_FRILANSER_NAERINGSDRIVENDE',
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

export const HtmlAvsnitt = ({ nokkel, replacements = null }) => {
    return <p className="kvitteringsteg__tekst" dangerouslySetInnerHTML={{ __html: getLedetekst(nokkel, replacements) }} />;
};

HtmlAvsnitt.propTypes = {
    nokkel: PropTypes.string.isRequired,
    replacements: keyValue,
};

export const KvitteringSokNa = () => {
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

export const KvitteringSokSenere = ({ sykepengesoknader }) => {
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

KvitteringSokSenere.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
};

export const KvitteringSokPapir = () => {
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

export const FrilanserUtenSoknadKvittering = ({ tittel, brodtekst }) => {
    return (<div className="panel blokk js-kvittering--standard">
        <IllustrertInnhold ikon="/sykefravaer/img/svg/kvitteringhake.svg" ikonAlt="Hake">
            <h2 className="panel__tittel">
                {tittel}
            </h2>
            <div className="redaksjonelt-innhold" dangerouslySetInnerHTML={brodtekst} />
        </IllustrertInnhold>
    </div>);
};

FrilanserUtenSoknadKvittering.propTypes = {
    tittel: PropTypes.string,
    brodtekst: PropTypes.shape({
        ___html: PropTypes.string,
    }),
};

const HvaNaaTopp = () => {
    return <Sidetopp tittel={getLedetekst('din-sykmelding.kvittering.hva-naa')} />;
};

const Standardtopp = () => {
    return <Sidetopp tittel={getLedetekst('din-sykmelding.kvittering.sidetittel')} />;
};

const SykmeldingKvittering = (props) => {
    const { kvitteringtype } = props;
    return (<div>
        {
            (() => {
                if (kvitteringtype === kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE) {
                    return [<HvaNaaTopp key="topp-1" />, <KvitteringSokSenere {...props} key="kvittering-1" />];
                }
                if (kvitteringtype === kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_NA) {
                    return [<HvaNaaTopp key="topp-2" />, <KvitteringSokNa {...props} key="kvittering-2" />];
                }
                if (kvitteringtype === kvitteringtyper.KVITTERING_MED_SYKEPENGER_FRILANSER_NAERINGSDRIVENDE_PAPIR) {
                    return [<HvaNaaTopp key="topp-3" />, <KvitteringSokPapir {...props} key="kvittering-3" />];
                }
                if (kvitteringtype === kvitteringtyper.KVITTERING_UTEN_SYKEPENGER_FRILANSER_NAERINGSDRIVENDE) {
                    return [<HvaNaaTopp key="topp-4" />, <FrilanserUtenSoknadKvittering {...props} key="kvittering-4" />];
                }
                return [<Standardtopp key="topp-5" />, <Standardkvittering {...props} status={props.sykmeldingStatus} key="kvittering-5" />];
            })()
        }
        <LenkeTilDineSykmeldinger />
    </div>);
};

SykmeldingKvittering.propTypes = {
    sykmeldingStatus: sykmeldingstatus,
    kvitteringtype: PropTypes.oneOf(Object.values(kvitteringtyper)),
};

export default SykmeldingKvittering;
