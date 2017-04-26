import React, { PropTypes } from 'react';
import { getLedetekst, getHtmlLedetekst, toDatePrettyPrint } from 'digisyfo-npm';
import LenkeTilDineSykmeldinger from '../LenkeTilDineSykmeldinger';
import Sidetopp from '../Sidetopp';
import { AVBRUTT } from '../../enums/sykmeldingstatuser';
import { senesteTom } from '../../utils/periodeUtils';
import history from '../../history';
import { sykmelding as sykmeldingPt } from '../../propTypes';

export const kvitteringtyper = {
    STANDARDKVITTERING: 'STANDARDKVITTERING',
    KVITTERING_MED_SYKEPENGER_SOK_NA: 'KVITTERING_MED_SYKEPENGER_SØK_NÅ',
    KVITTERING_MED_SYKEPENGER_SOK_SENERE: 'KVITTERING_MED_SYKEPENGER_SØK_SENERE',
};

export const Kvitteringsteg = ({ ikon, alt, tittel, children }) => {
    return (<div className="kvitteringsteg">
        <div className="kvitteringsteg__ikon">
            <img alt={alt} src={`${window.APP_SETTINGS.APP_ROOT}/img/svg/${ikon}`} />
        </div>
        <div className="kvitteringsteg__innhold">
            <h2 className="kvitteringsteg__tittel js-tittel">{tittel}</h2>
            <div className="js-tekst">{children}</div>
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
    const { tittel, brodtekst, sykmeldingStatus } = props;
    const ikon = sykmeldingStatus === AVBRUTT ? 'avbryt-sykmelding.svg' : 'digital-til-papir.svg';
    const ikonKlasse = sykmeldingStatus === AVBRUTT ? 'illustrertTittel__img--mikro' : '';
    return (<div className="panel blokk">
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
    brodtekst: PropTypes.object,
    sykmeldingStatus: PropTypes.string,
};

export const HtmlAvsnitt = ({ nokkel, replacements = null }) => {
    return <p className="kvitteringsteg__tekst" dangerouslySetInnerHTML={{ __html: getLedetekst(nokkel, replacements) }}></p>;
};

HtmlAvsnitt.propTypes = {
    nokkel: PropTypes.string.isRequired,
    replacements: PropTypes.object,
};

export const KvitteringSokNa = ({ hentSykepengesoknader }) => {
    const sokUrl = `${window.APP_SETTINGS.APP_ROOT}/soknader`;
    return (<div className="panel blokk">
        <div className="stegvisKvittering">
            <Kvitteringsteg ikon="kvitteringhake.svg" alt="Grønn hake" tittel={getLedetekst('sykmelding.kvittering.sok-na.steg-1.tittel')}>
                <HtmlAvsnitt nokkel="sykmelding.kvittering.sok-na.steg-1.tekst" />
            </Kvitteringsteg>
            <Kvitteringsteg ikon="kvitteringSokSykepenger.svg" alt="Søk om sykepenger" tittel={getLedetekst('sykmelding.kvittering.sok-na.steg-2.tittel')}>
                <HtmlAvsnitt nokkel="sykmelding.kvittering.sok-na.steg-2.tekst" />
                <p className="kvitteringsteg__handling">
                    <a onClick={(e) => {
                        e.preventDefault();
                        hentSykepengesoknader();
                        history.push(sokUrl);
                    }} href={sokUrl} className="js-sok knapp">{getLedetekst('sykmelding.kvittering.sok-na.steg-2.knapp')}</a>
                </p>
            </Kvitteringsteg>
        </div>
    </div>);
};

KvitteringSokNa.propTypes = {
    hentSykepengesoknader: PropTypes.func,
};

export const KvitteringSokSenere = ({ sykmelding }) => {
    const tom = senesteTom(sykmelding.mulighetForArbeid.perioder);
    return (<div>
        <div className="panel blokk">
            <div className="stegvisKvittering">
                <Kvitteringsteg ikon="kvitteringhake.svg" alt="Grønn hake" tittel={getLedetekst('sykmelding.kvittering.sok-senere.steg-1.tittel')}>
                    <HtmlAvsnitt nokkel="sykmelding.kvittering.sok-senere.steg-1.tekst" />
                </Kvitteringsteg>
                <Kvitteringsteg ikon="kvitteringVent.svg" alt="Timeglass" tittel={getLedetekst('sykmelding.kvittering.sok-senere.steg-2.tittel')}>
                    <HtmlAvsnitt nokkel="sykmelding.kvittering.sok-senere.steg-2.tekst" />
                </Kvitteringsteg>
                <Kvitteringsteg ikon="kvitteringSokSykepenger.svg" alt="Søk om sykepenger" tittel={getLedetekst('sykmelding.kvittering.sok-senere.steg-3.tittel')}>
                    <HtmlAvsnitt nokkel="sykmelding.kvittering.sok-senere.steg-3.tekst" replacements={{ '%DATO%': toDatePrettyPrint(tom) }} />
                </Kvitteringsteg>
            </div>
        </div>
        <div className="panel blokk">
            <h2 className="kvitteringsteg__tittel">{getLedetekst('sykmelding.kvittering.sok-senere.utenlandsopphold.tittel')}</h2>
            <div className="kvittering__utenlandsopphold" dangerouslySetInnerHTML={getHtmlLedetekst('sykmelding.kvittering.sok-senere.utenlandsopphold.tekst')} />
        </div>
    </div>);
};

KvitteringSokSenere.propTypes = {
    sykmelding: sykmeldingPt,
};

const SykmeldingKvittering = (props) => {
    const { kvitteringtype } = props;
    return (<div>
        <Sidetopp tittel={getLedetekst('din-sykmelding.kvittering.sidetittel')} />
        {
            (() => {
                if (kvitteringtype === kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE) {
                    return (<KvitteringSokSenere {...props} />);
                }
                if (kvitteringtype === kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_NA) {
                    return <KvitteringSokNa {...props} />;
                }
                return <Standardkvittering {...props} />;
            })()
        }
        <LenkeTilDineSykmeldinger />
        <div className="panel">
            <h2 className="kvitteringsteg__tittel">Hjelp oss å bli bedre</h2>
            <p>Dette er en tjeneste som fortsatt er under utvikling. Gi oss tilbakemelding slik at vi kan bli bedre!</p>
            <p className="knapperad">
                <a href="https://www.survey-xact.no/LinkCollector?key=5U5KSNH43P9K" className="rammeknapp rammeknapp--mini" target="_blank">Gi tilbakemelding</a>
            </p>
        </div>
    </div>);
};

SykmeldingKvittering.propTypes = {
    kvitteringtype: PropTypes.oneOf([
        kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE,
        kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_NA,
        kvitteringtyper.STANDARDKVITTERING]),
};

export default SykmeldingKvittering;
