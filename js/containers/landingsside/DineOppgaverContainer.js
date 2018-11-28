import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getSvarsideModus } from 'moter-npm';
import { getLedetekst, sykepengesoknadstatuser, sykmeldingstatuser } from 'digisyfo-npm';
import { oppfolgingsdialogPt } from '../../oppfolgingsdialogNpm/oppfolgingProptypes';
import beregnOppgaverOppfoelgingsdialoger from '../../utils/beregnOppgaverOppfoelgingsdialoger';
import { sykepengesoknad as sykepengesoknadPt, sykmelding as sykmeldingPt, soknad as soknadPt } from '../../propTypes';
import { erMotePassert } from '../../utils/moteUtils';
import { hentDineSykmeldinger } from '../../actions/dineSykmeldinger_actions';
import { hentHendelser } from '../../actions/hendelser_actions';
import { getAktivitetskravvisning, NYTT_AKTIVITETSKRAVVARSEL } from '../../sider/AktivitetskravvarselSide';
import IllustrertInnhold from '../../components/IllustrertInnhold';
import { NY } from '../../enums/soknadstatuser';
import { ARBEIDSTAKERE, SELVSTENDIGE_OG_FRILANSERE } from '../../enums/soknadtyper';
import { toggleNyArbeidstakerSoknad } from '../../selectors/unleashTogglesSelectors';
import { erMotebehovUbesvart } from '../../utils/motebehovUtils';

const Li = ({ tekst, url }) => {
    return (<li>
        <Link to={url}>{tekst}</Link>
    </li>);
};

Li.propTypes = {
    tekst: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
};

const EksternLi = ({ tekst, url }) => {
    return (<li>
        <a href={url}>{tekst}</a>
    </li>);
};

EksternLi.propTypes = Li.propTypes;

export const NySykmelding = ({ sykmeldinger }) => {
    const url = sykmeldinger.length === 1 ? `${process.env.REACT_APP_CONTEXT_ROOT}/sykmeldinger/${sykmeldinger[0].id}` : `${process.env.REACT_APP_CONTEXT_ROOT}/sykmeldinger`;
    const tekst = sykmeldinger.length === 1 ? getLedetekst('dine-oppgaver.sykmeldinger.en-sykmelding') : getLedetekst('dine-oppgaver.sykmeldinger.flere-sykmeldinger', {
        '%ANTALL%': sykmeldinger.length.toString(),
    });
    return (<Li url={url} tekst={tekst} />);
};

NySykmelding.propTypes = {
    sykmeldinger: PropTypes.arrayOf(sykmeldingPt),
};

export const NySykepengesoknad = ({ sykepengesoknader, soknader }) => {
    const alleSoknader = [...sykepengesoknader, ...soknader];
    const url = alleSoknader.length === 1 ? `${process.env.REACT_APP_CONTEXT_ROOT}/soknader/${alleSoknader[0].id}` : `${process.env.REACT_APP_CONTEXT_ROOT}/soknader`;
    const tekst = alleSoknader.length === 1 ? getLedetekst('dine-oppgaver.sykepengesoknader.en-soknad') : getLedetekst('dine-oppgaver.sykepengesoknader.flere-soknader', {
        '%ANTALL%': alleSoknader.length.toString(),
    });
    return (<Li url={url} tekst={tekst} />);
};

NySykepengesoknad.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
    soknader: PropTypes.arrayOf(soknadPt),
};

export const NyttAktivitetskravvarsel = () => {
    return (<Li
        url={`${process.env.REACT_APP_CONTEXT_ROOT}/aktivitetsplikt/`}
        tekst={getLedetekst('dine-oppgaver.aktivitetskrav')} />);
};

const nyePlanerTekst = (antall) => {
    return antall === 1 ? getLedetekst('dine-oppgaver.oppfoelgingsdialog.sykmeldt.nyeplaner.entall') :
        getLedetekst('dine-oppgaver.oppfoelgingsdialog.sykmeldt.nyeplaner.flertall', {
            '%ANTALL%': antall,
        });
};

export const NyttMotebehovVarsel = () => {
    return (<Li
        url={`${process.env.REACT_APP_CONTEXT_ROOT}/dialogmoter/behov`}
        tekst={getLedetekst('sykefravaer.dineoppgaver.nyttMotebehovVarsel')}
    />);
};

const avventendeGodkjenningerTekst = (antall) => {
    return antall === 1 ? getLedetekst('dine-oppgaver.oppfoelgingsdialog.avventendegodkjenninger.entall') :
        getLedetekst('dine-oppgaver.oppfoelgingsdialog.avventendegodkjenninger.flertall', {
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
        avventendeGodkjenninger,
        harNyttMotebehov,
        nyePlaner,
        visAktivitetskrav,
    }) => {
    if (!visOppgaver) {
        return null;
    }

    const OPPFOLGINGSPLANER_URL = `${process.env.REACT_APP_OPPFOLGINGSPLAN_CONTEXT_ROOT}/oppfolgingsplaner`;

    return (<div className="landingspanel dineOppgaver">
        <IllustrertInnhold ikon={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/landingsside/oppgaver.svg`} ikonAlt="Oppgaver">
            <div>
                <h2 className="dineOppgaver__tittel js-tittel">{getLedetekst('dine-oppgaver.tittel')}</h2>
                <ul className="inngangsliste">
                    { sykmeldinger.length > 0 && <NySykmelding sykmeldinger={sykmeldinger} /> }
                    { (sykepengesoknader.length > 0 || soknader.length > 0) && <NySykepengesoknad sykepengesoknader={sykepengesoknader} soknader={soknader} /> }
                    { mote !== null && <Li url={`${process.env.REACT_APP_CONTEXT_ROOT}/dialogmote`} tekst={getLedetekst('dine-oppgaver.mote.svar')} /> }
                    {/* TODO:  TODO: Kommenter ut linjen under når InfosideFO er klar  */}
                    {/* <Li url={`${process.env.REACT_APP_CONTEXT_ROOT}/arbeidsrettet-oppfolging`} tekst={getLedetekst('infoside-fo.inngangstekst')} /> */}
                    { avventendeGodkjenninger.length > 0 && <EksternLi url={OPPFOLGINGSPLANER_URL} tekst={avventendeGodkjenningerTekst(avventendeGodkjenninger.length)} /> }
                    { nyePlaner.length > 0 && <EksternLi url={OPPFOLGINGSPLANER_URL} tekst={nyePlanerTekst(nyePlaner.length)} /> }
                    { harNyttMotebehov && <NyttMotebehovVarsel /> }
                    { visAktivitetskrav && <NyttAktivitetskravvarsel /> }
                </ul>
            </div>
        </IllustrertInnhold>
    </div>);
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
    visAktivitetskrav: PropTypes.bool,
};

export class DineOppgaver extends Component {
    componentWillMount() {
        const {
            sykmeldingerHentet,
            sykmeldingerHentingFeilet,
            hendelserHentet,
            hentingFeiletHendelser,
        } = this.props;
        if (!sykmeldingerHentet && !sykmeldingerHentingFeilet) {
            this.props.hentDineSykmeldinger();
        }
        if (!hendelserHentet && !hentingFeiletHendelser) {
            this.props.hentHendelser();
        }
    }

    render() {
        return <RendreOppgaver {...this.props} />;
    }
}

DineOppgaver.propTypes = {
    sykmeldingerHentet: PropTypes.bool,
    sykmeldingerHentingFeilet: PropTypes.bool,
    hentDineSykmeldinger: PropTypes.func,
    hentOppfolgingsdialoger: PropTypes.func,
    hentHendelser: PropTypes.func,
    hentingFeiletHendelser: PropTypes.bool,
    hendelserHentet: PropTypes.bool,
    oppfolgingsdialogerHentet: PropTypes.bool,
    visOppgaver: PropTypes.bool,
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
            return toggleNyArbeidstakerSoknad(state)
                ? s.soknadstype === SELVSTENDIGE_OG_FRILANSERE || s.soknadstype === ARBEIDSTAKERE
                : s.soknadstype === SELVSTENDIGE_OG_FRILANSERE;
        });

    const mote = state.mote.data;
    let moteRes = null;
    if (mote && !erMotePassert(mote)) {
        if (getSvarsideModus(mote) === 'SKJEMA') {
            moteRes = 'TRENGER_SVAR';
        }
    }
    const _oppgaverOppfoelgingsdialoger = beregnOppgaverOppfoelgingsdialoger(state.oppfolgingsdialoger.data, state.dineSykmeldinger.data);
    const visAktivitetskrav = getAktivitetskravvisning(state.hendelser.data) === NYTT_AKTIVITETSKRAVVARSEL;
    const visOppgaver = sykmeldinger.length > 0 ||
        sykepengesoknader.length > 0 ||
        soknader.length > 0 ||
        moteRes !== null ||
        _oppgaverOppfoelgingsdialoger.avventendeGodkjenninger.length > 0 ||
        _oppgaverOppfoelgingsdialoger.nyePlaner.length > 0 ||
        visAktivitetskrav;

    const harNyttMotebehov = erMotebehovUbesvart(state);

    return {
        sykmeldingerHentet: state.dineSykmeldinger.hentet === true,
        sykmeldinger,
        sykmeldingerHentingFeilet: state.dineSykmeldinger.hentingFeilet
            || state.oppfolgingsdialoger.hentingFeilet,
        sykepengesoknader,
        soknader,
        visOppgaver,
        mote: moteRes,
        avventendeGodkjenninger: _oppgaverOppfoelgingsdialoger.avventendeGodkjenninger,
        nyePlaner: _oppgaverOppfoelgingsdialoger.nyePlaner,
        harNyttMotebehov,
        hentingFeiletHendelser: state.hendelser.hentingFeilet,
        hendelserHentet: state.hendelser.hentet,
        visAktivitetskrav,
    };
};

const DineOppgaverContainer = connect(mapStateToProps, {
    hentDineSykmeldinger, hentHendelser,
})(DineOppgaver);

export default DineOppgaverContainer;
