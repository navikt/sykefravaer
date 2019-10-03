import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getLedetekst, sykepengesoknadstatuser, sykmeldingstatuser } from '@navikt/digisyfo-npm';
import { oppfolgingsdialogPt } from '../../oppfolgingsdialogNpm/oppfolgingProptypes';
import beregnOppgaverOppfoelgingsdialoger from '../../utils/beregnOppgaverOppfoelgingsdialoger';
import { soknadPt, sykepengesoknad as sykepengesoknadPt, sykmelding as sykmeldingPt } from '../../propTypes/index';
import { hentDineSykmeldinger } from '../../sykmeldinger/data/dine-sykmeldinger/dineSykmeldingerActions';
import { hentHendelser } from '../data/hendelser/hendelserActions';
import { getAktivitetskravvisning, NYTT_AKTIVITETSKRAVVARSEL } from '../../aktivitetskrav/sider/AktivitetskravvarselSide';
import IllustrertInnhold from '../../components/IllustrertInnhold';
import { NY } from '../../enums/soknadstatuser';
import { ARBEIDSTAKERE, SELVSTENDIGE_OG_FRILANSERE, ARBEIDSLEDIG } from '../../enums/soknadtyper';
import { erMotePassert, getSvarsideModus } from '../../utils/moteUtils';
import { erMotebehovUbesvart } from '../../utils/motebehovUtils';
import { erPaaHeroku, getSykepengesoknaderUrl, getSykepengesoknadUrl } from '../../utils/urlUtils';
import { selectHarMerVeiledningHendelse } from '../data/hendelser/hendelser';
import { avvisteSmSykmeldingerDataSelector } from '../../sykmeldinger/data/sm-sykmeldinger/smSykmeldingerSelectors';
import { smSykmeldingerPt } from '../../propTypes/smSykmeldingProptypes';

const Li = ({
                tekst, url, img, imgAlt,
            }) => {
    return (
        <li>
            {img && <img src={img} alt={imgAlt} className="inngangsliste__ikon" />}
            <span>
                <Link to={url}>{tekst}</Link>
            </span>
        </li>
    );
};

Li.propTypes = {
    tekst: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    img: PropTypes.string,
    imgAlt: PropTypes.string,
};

export const EksternLi = ({ tekst, url }) => {
    return (
        <li>
            <a href={url}>{tekst}</a>
        </li>
    );
};

EksternLi.propTypes = Li.propTypes;

export const NySykmelding = ({ sykmeldinger }) => {
    const url = sykmeldinger.length === 1
        ? `${process.env.REACT_APP_CONTEXT_ROOT}/sykmeldinger/${sykmeldinger[0].id}`
        : `${process.env.REACT_APP_CONTEXT_ROOT}/sykmeldinger`;
    const tekst = sykmeldinger.length === 1
        ? getLedetekst('dine-oppgaver.sykmeldinger.en-sykmelding')
        : getLedetekst('dine-oppgaver.sykmeldinger.flere-sykmeldinger', {
            '%ANTALL%': sykmeldinger.length.toString(),
        });
    return (<Li url={url} tekst={tekst} />);
};

NySykmelding.propTypes = {
    sykmeldinger: PropTypes.arrayOf(sykmeldingPt),
};

export const AvvistSmSykmelding = ({ smSykmeldinger }) => {
    const url = smSykmeldinger.length === 1
        ? `${process.env.REACT_APP_CONTEXT_ROOT}/sykmeldinger/${smSykmeldinger[0].id}`
        : `${process.env.REACT_APP_CONTEXT_ROOT}/sykmeldinger`;
    const tekst = smSykmeldinger.length === 1
        ? getLedetekst('dine-oppgaver.sm-sykmeldinger.en-avvist-sykmelding')
        : getLedetekst('dine-oppgaver.sykmeldinger.flere-avviste-sykmeldinger', {
            '%ANTALL%': smSykmeldinger.length.toString(),
        });
    return (
        <Li
            url={url}
            tekst={tekst}
            img="/sykefravaer/img/svg/report-problem-triangle-red.svg"
            imgAlt="Utropstegn" />
    );
};

AvvistSmSykmelding.propTypes = {
    smSykmeldinger: smSykmeldingerPt,
};

export const NySykepengesoknad = ({ sykepengesoknader, soknader }) => {
    const alleSoknader = [...sykepengesoknader, ...soknader];
    const url = alleSoknader.length === 1
        ? getSykepengesoknadUrl(alleSoknader[0].id)
        : getSykepengesoknaderUrl();
    const tekst = alleSoknader.length === 1
        ? getLedetekst('dine-oppgaver.sykepengesoknader.en-soknad')
        : getLedetekst('dine-oppgaver.sykepengesoknader.flere-soknader', {
            '%ANTALL%': alleSoknader.length.toString(),
        });
    return (<EksternLi url={url} tekst={tekst} />);
};

NySykepengesoknad.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
    soknader: PropTypes.arrayOf(soknadPt),
};

export const NyttAktivitetskravvarsel = () => {
    return (
        <Li
            url={`${process.env.REACT_APP_CONTEXT_ROOT}/aktivitetsplikt/`}
            tekst={getLedetekst('dine-oppgaver.aktivitetskrav')} />
    );
};

const nyePlanerTekst = (antall) => {
    return antall === 1 ? getLedetekst('dine-oppgaver.oppfoelgingsdialog.sykmeldt.nyeplaner.entall')
        : getLedetekst('dine-oppgaver.oppfoelgingsdialog.sykmeldt.nyeplaner.flertall', {
            '%ANTALL%': antall,
        });
};

export const NyttMotebehovVarsel = () => {
    return (
        <EksternLi
            url={`${process.env.REACT_APP_DIALOGMOTE_CONTEXT_ROOT}/behov`}
            tekst={getLedetekst('sykefravaer.dineoppgaver.nyttMotebehovVarsel')}
        />
    );
};

const avventendeGodkjenningerTekst = (antall) => {
    return antall === 1 ? getLedetekst('dine-oppgaver.oppfoelgingsdialog.avventendegodkjenninger.entall')
        : getLedetekst('dine-oppgaver.oppfoelgingsdialog.avventendegodkjenninger.flertall', {
            '%ANTALL%': antall,
        });
};

const RendreOppgaver = (
    {
        soknader = [],
        sykepengesoknader = [],
        sykmeldinger = [],
        visOppgaver,
        mote,
        visMerVeiledingHendelse,
        avventendeGodkjenninger,
        harNyttMotebehov,
        nyePlaner,
        visAktivitetskrav,
        avvisteSmSykmeldinger = [],
    },
) => {
    if (!visOppgaver) {
        return null;
    }

    const OPPFOLGINGSPLANER_URL = erPaaHeroku()
        ? 'https://oppfolgingsplan.herokuapp.com/oppfolgingsplan/oppfolgingsplaner'
        : `${process.env.REACT_APP_OPPFOLGINGSPLAN_CONTEXT_ROOT}/oppfolgingsplaner`;

    return (
        <div className="landingspanel dineOppgaver">
            <IllustrertInnhold ikon={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/landingsside/oppgaver.svg`} ikonAlt="Oppgaver">
                <h2 className="dineOppgaver__tittel js-tittel">{getLedetekst('dine-oppgaver.tittel')}</h2>
                <ul className="inngangsliste">
                    {sykmeldinger.length > 0 && <NySykmelding sykmeldinger={sykmeldinger} />}
                    {avvisteSmSykmeldinger.length > 0 && <AvvistSmSykmelding smSykmeldinger={avvisteSmSykmeldinger} />}
                    {(sykepengesoknader.length > 0 || soknader.length > 0) && <NySykepengesoknad sykepengesoknader={sykepengesoknader} soknader={soknader} />}
                    {mote !== null && <EksternLi url={`${process.env.REACT_APP_DIALOGMOTE_CONTEXT_ROOT}`} tekst={getLedetekst('dine-oppgaver.mote.svar')} />}
                    {visMerVeiledingHendelse && <Li url={`${process.env.REACT_APP_CONTEXT_ROOT}/arbeidsrettet-oppfolging`} tekst={getLedetekst('ao.oppgave.inngangstekst')} />}
                    {avventendeGodkjenninger.length > 0 && <EksternLi url={OPPFOLGINGSPLANER_URL} tekst={avventendeGodkjenningerTekst(avventendeGodkjenninger.length)} />}
                    {nyePlaner.length > 0 && <EksternLi url={OPPFOLGINGSPLANER_URL} tekst={nyePlanerTekst(nyePlaner.length)} />}
                    {harNyttMotebehov && <NyttMotebehovVarsel />}
                    {visAktivitetskrav && <NyttAktivitetskravvarsel />}
                </ul>
            </IllustrertInnhold>
        </div>
    );
};

RendreOppgaver.propTypes = {
    avventendeGodkjenninger: PropTypes.arrayOf(oppfolgingsdialogPt),
    nyePlaner: PropTypes.arrayOf(oppfolgingsdialogPt),
    sykmeldinger: PropTypes.arrayOf(sykmeldingPt),
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
    soknader: PropTypes.arrayOf(soknadPt),
    harNyttMotebehov: PropTypes.bool,
    visOppgaver: PropTypes.bool,
    mote: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    visMerVeiledingHendelse: PropTypes.bool,
    visAktivitetskrav: PropTypes.bool,
    avvisteSmSykmeldinger: smSykmeldingerPt,
};

export class DineOppgaverComponent extends Component {
    componentWillMount() {
        const {
            sykmeldingerHentet,
            sykmeldingerHentingFeilet,
            hendelserHentet,
            hentingFeiletHendelser,
            doHentDineSykmeldinger,
            doHentHendelser,
        } = this.props;
        if (!sykmeldingerHentet && !sykmeldingerHentingFeilet) {
            doHentDineSykmeldinger();
        }
        if (!hendelserHentet && !hentingFeiletHendelser) {
            doHentHendelser();
        }
    }

    render() {
        return <RendreOppgaver {...this.props} />;
    }
}

DineOppgaverComponent.propTypes = {
    sykmeldingerHentet: PropTypes.bool,
    sykmeldingerHentingFeilet: PropTypes.bool,
    hentOppfolgingsdialoger: PropTypes.func,
    hentingFeiletHendelser: PropTypes.bool,
    hendelserHentet: PropTypes.bool,
    oppfolgingsdialogerHentet: PropTypes.bool,
    visOppgaver: PropTypes.bool,
    doHentDineSykmeldinger: PropTypes.func,
    doHentHendelser: PropTypes.func,
};

export const mapStateToProps = (state) => {
    const sykmeldinger = state.dineSykmeldinger.data.filter((s) => {
        return s.status === sykmeldingstatuser.NY;
    });
    const sykepengesoknader = state.sykepengesoknader.data.filter((s) => {
        return s.status === sykepengesoknadstatuser.NY;
    });
    const soknader = state.soknader.data
        .filter((s) => {
            return s.status === NY;
        })
        .filter((s) => {
            return s.soknadstype === SELVSTENDIGE_OG_FRILANSERE || s.soknadstype === ARBEIDSTAKERE || s.soknadstype === ARBEIDSLEDIG;
        });

    const mote = state.mote.data;
    let moteRes = null;
    if (mote && !erMotePassert(mote)) {
        if (getSvarsideModus(mote) === 'SKJEMA') {
            moteRes = 'TRENGER_SVAR';
        }
    }
    const harNyttMotebehov = erMotebehovUbesvart(state);
    const _oppgaverOppfoelgingsdialoger = beregnOppgaverOppfoelgingsdialoger(state.oppfolgingsdialoger.data, state.dineSykmeldinger.data);
    const visAktivitetskrav = getAktivitetskravvisning(state.hendelser.data) === NYTT_AKTIVITETSKRAVVARSEL;
    const avvisteSmSykmeldinger = avvisteSmSykmeldingerDataSelector(state)
        .filter((smSykmelding) => {
            return smSykmelding.bekreftetDato === null;
        });
    const visOppgaver = sykmeldinger.length > 0
        || sykepengesoknader.length > 0
        || soknader.length > 0
        || moteRes !== null
        || harNyttMotebehov
        || _oppgaverOppfoelgingsdialoger.avventendeGodkjenninger.length > 0
        || _oppgaverOppfoelgingsdialoger.nyePlaner.length > 0
        || visAktivitetskrav
        || avvisteSmSykmeldinger.length > 0;

    return {
        sykmeldingerHentet: state.dineSykmeldinger.hentet === true,
        sykmeldinger,
        sykmeldingerHentingFeilet: state.dineSykmeldinger.hentingFeilet
            || state.oppfolgingsdialoger.hentingFeilet,
        sykepengesoknader,
        soknader,
        visOppgaver,
        mote: moteRes,
        visMerVeiledingHendelse: selectHarMerVeiledningHendelse(state),
        avventendeGodkjenninger: _oppgaverOppfoelgingsdialoger.avventendeGodkjenninger,
        nyePlaner: _oppgaverOppfoelgingsdialoger.nyePlaner,
        harNyttMotebehov,
        hentingFeiletHendelser: state.hendelser.hentingFeilet,
        hendelserHentet: state.hendelser.hentet,
        visAktivitetskrav,
        avvisteSmSykmeldinger,
    };
};

const DineOppgaverContainer = connect(mapStateToProps, {
    doHentDineSykmeldinger: hentDineSykmeldinger,
    doHentHendelser: hentHendelser,
})(DineOppgaverComponent);

export default DineOppgaverContainer;
