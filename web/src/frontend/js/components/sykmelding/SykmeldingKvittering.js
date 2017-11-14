import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, getHtmlLedetekst, toDatePrettyPrint, keyValue } from 'digisyfo-npm';
import LenkeTilDineSykmeldinger from '../LenkeTilDineSykmeldinger';
import Sidetopp from '../Sidetopp';
import history from '../../history';
import { sykepengesoknad as sykepengesoknadPt, sykmeldingstatus } from '../../propTypes';
import { AVBRUTT } from '../../enums/sykmeldingstatuser';
import Video from '../Video';

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
    const ikon = status === AVBRUTT ? 'avbryt-sykmelding.svg' : 'digital-til-papir.svg';
    const ikonKlasse = status === AVBRUTT ? 'illustrertTittel__img--mikro' : '';
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

export const KvitteringSokNa = ({ hentSykepengesoknader }) => {
    const sokUrl = `${window.APP_SETTINGS.APP_ROOT}/soknader`;
    return (<div className="panel blokk js-kvittering--sok-naa">
        <div className="stegvisKvittering">
            <Kvitteringsteg ikon="kvitteringhake.svg" alt="Grønn hake" tittel={getLedetekst('sykmelding.kvittering.sok-na.steg-1.tittel')} />
            <Kvitteringsteg ikon="kvitteringSokSykepenger.svg" alt="Søk om sykepenger" tittel={getLedetekst('sykmelding.kvittering.sok-na.steg-2.tittel')}>
                <HtmlAvsnitt nokkel="sykmelding.kvittering.sok-na.steg-2.tekst" />
                <p className="kvitteringsteg__handling">
                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            hentSykepengesoknader();
                            history.push(sokUrl);
                        }}
                        href={sokUrl}
                        className="js-sok knapp">{getLedetekst('sykmelding.kvittering.sok-na.steg-2.knapp')}</a>
                </p>
            </Kvitteringsteg>
        </div>
    </div>);
};

KvitteringSokNa.propTypes = {
    hentSykepengesoknader: PropTypes.func,
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
        <div className="panel blokk">
            <h2 className="panel__tittel">{getLedetekst('sykmelding.kvittering.sok-senere.utenlandsopphold.tittel')}</h2>
            <div className="kvittering__utenlandsopphold" dangerouslySetInnerHTML={getHtmlLedetekst('sykmelding.kvittering.sok-senere.utenlandsopphold.tekst')} />
        </div>
        <div className="blokk">
            <h2 className="panel__tittel blokk--xxs">{getLedetekst('sykmelding.kvittering.sok-senere.video.tittel')}</h2>
            <Video
                width="640"
                height="360"
                src="https://video.qbrick.com/play2/embed/player?accountId=763558&mediaId=B248D6CB&pageStyling=adaptive&autoplay=false&repeat=false&sharing=false" />
        </div>
    </div>);
};

KvitteringSokSenere.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
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
                return <Standardkvittering {...props} status={props.sykmeldingStatus} />;
            })()
        }
        <LenkeTilDineSykmeldinger />
    </div>);
};

SykmeldingKvittering.propTypes = {
    sykmeldingStatus: sykmeldingstatus,
    kvitteringtype: PropTypes.oneOf([
        kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE,
        kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_NA,
        kvitteringtyper.STANDARDKVITTERING]),
};

export default SykmeldingKvittering;
