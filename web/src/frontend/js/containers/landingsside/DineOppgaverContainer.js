import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getSvarsideModus } from 'moter-npm';
import { getLedetekst, log } from 'digisyfo-npm';
import { Experiment, Variant } from 'react-ab';
import {
    hentOppfolgingsdialogerAt as hentOppfolgingsdialoger,
    proptypes as oppfolgingProptypes,
    finnNyesteGodkjenning,
} from 'oppfolgingsdialog-npm';
import { NY as NY_SYKMELDING } from '../../enums/sykmeldingstatuser';
import { NY as NY_SYKEPENGESOKNAD } from '../../enums/sykepengesoknadstatuser';
import { sykepengesoknad as sykepengesoknadPt, sykmelding as sykmeldingPt } from '../../propTypes';
import { erMotePassert } from '../../utils/moteUtils';
import { hentDineSykmeldinger } from '../../actions/dineSykmeldinger_actions';
import { hentHendelser } from '../../actions/hendelser_actions';
import { getAktivitetskravvisning, NYTT_AKTIVITETSKRAVVARSEL } from '../aktivitetskrav/AktivitetskravvarselContainer';
import IllustrertInnhold from '../../components/IllustrertInnhold';

const Li = ({ tekst, url, onClick }) => {
    return (<li>
        <Link onClick={onClick} to={url}>{tekst}</Link>
    </li>);
};

Li.propTypes = {
    tekst: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export const NySykmelding = ({ sykmeldinger, onClick }) => {
    const url = sykmeldinger.length === 1 ? `/sykefravaer/sykmeldinger/${sykmeldinger[0].id}` : '/sykefravaer/sykmeldinger';
    const tekst = sykmeldinger.length === 1 ? getLedetekst('dine-oppgaver.sykmeldinger.en-sykmelding') : getLedetekst('dine-oppgaver.sykmeldinger.flere-sykmeldinger', {
        '%ANTALL%': sykmeldinger.length.toString(),
    });
    return (<Li onClick={onClick} url={url} tekst={tekst} />);
};

NySykmelding.propTypes = {
    sykmeldinger: PropTypes.arrayOf(sykmeldingPt),
    onClick: PropTypes.func,
};

export const NySykepengesoknad = ({ sykepengesoknader, onClick }) => {
    const url = sykepengesoknader.length === 1 ? `/sykefravaer/soknader/${sykepengesoknader[0].id}` : '/sykefravaer/soknader';
    const tekst = sykepengesoknader.length === 1 ? getLedetekst('dine-oppgaver.sykepengesoknader.en-soknad') : getLedetekst('dine-oppgaver.sykepengesoknader.flere-soknader', {
        '%ANTALL%': sykepengesoknader.length.toString(),
    });
    return (<Li onClick={onClick} url={url} tekst={tekst} />);
};

export const NyttAktivitetskravvarsel = ({ onClick }) => {
    return (<Li onClick={onClick} url="/sykefravaer/aktivitetsplikt/" tekst={getLedetekst('dine-oppgaver.aktivitetskrav')} />);
};

NyttAktivitetskravvarsel.propTypes = {
    onClick: PropTypes.func,
};

NySykepengesoknad.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
    onClick: PropTypes.func,
};

const nyePlanerTekst = (antall) => {
    return antall === 1 ? getLedetekst('dine-oppgaver.oppfoelgingsdialog.sykmeldt.nyeplaner.entall') :
        getLedetekst('dine-oppgaver.oppfoelgingsdialog.sykmeldt.nyeplaner.flertall', {
            '%ANTALL%': antall,
        });
};

const avventendeGodkjenningerTekst = (antall) => {
    return antall === 1 ? getLedetekst('dine-oppgaver.oppfoelgingsdialog.avventendegodkjenninger.entall') :
        getLedetekst('dine-oppgaver.oppfoelgingsdialog.avventendegodkjenninger.flertall', {
            '%ANTALL%': antall,
        });
};

const idAlleredeFunnet = (planer, id) => {
    return planer.filter((plan) => {
        return plan.id === id;
    }).length > 0;
};

const RendreOppgaver = ({ sykmeldinger = [], sykepengesoknader = [], visOppgaver, mote, avventendeGodkjenninger, nyePlaner, visAktivitetskrav, svg, variant, className }) => {
    if (!visOppgaver) {
        return null;
    }
    const onClick = () => {
        log('Registrerer klikk', variant);
        window.dataLayer.push({
            'event': 'DINE_OPPGAVER_KLIKK',
            'variant': variant,
        });
    };
    return (<div className={`landingspanel dineOppgaver ${className}`}>
        <IllustrertInnhold ikon={`/sykefravaer/img/svg/landingsside/${svg}`} ikonAlt="Oppgaver">
            <div>
                <h2 className="dineOppgaver__tittel js-tittel">{getLedetekst('dine-oppgaver.tittel')}</h2>
                <ul className="inngangsliste">
                    { sykmeldinger.length > 0 ? <NySykmelding onClick={onClick} sykmeldinger={sykmeldinger} /> : null }
                    { sykepengesoknader.length > 0 ? <NySykepengesoknad onClick={onClick} sykepengesoknader={sykepengesoknader} /> : null }
                    { mote !== null ? <Li onClick={onClick} url="/sykefravaer/dialogmote" tekst={getLedetekst('dine-oppgaver.mote.svar')} /> : null }
                    { avventendeGodkjenninger.length > 0 ? <Li onClick={onClick} url="/sykefravaer/oppfolgingsplaner" tekst={avventendeGodkjenningerTekst(avventendeGodkjenninger.length)} /> : null }
                    { nyePlaner.length > 0 ? <Li onClick={onClick} url="/sykefravaer/oppfolgingsplaner" tekst={nyePlanerTekst(nyePlaner.length)} /> : null }
                    { visAktivitetskrav && <NyttAktivitetskravvarsel onClick={onClick} /> }
                </ul>
            </div>
        </IllustrertInnhold>
    </div>);
};

RendreOppgaver.propTypes = {
    avventendeGodkjenninger: PropTypes.arrayOf(oppfolgingProptypes.oppfolgingsdialogPt),
    nyePlaner: PropTypes.arrayOf(oppfolgingProptypes.oppfolgingsdialogPt),
    sykmeldinger: PropTypes.arrayOf(sykmeldingPt),
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
    visOppgaver: PropTypes.bool,
    mote: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    visAktivitetskrav: PropTypes.bool,
    svg: PropTypes.string,
    variant: PropTypes.string,
    className: PropTypes.string,
};

const EKSPERIMENTNAVN = 'DINE_OPPGAVER_FARGE';
const BLAA = 'BLÅ';
const ROED = 'RØD';

export class DineOppgaver extends Component {
    componentWillMount() {
        const { sykmeldingerHentet, sykmeldingerHentingFeilet, hendelserHentet, hentingFeiletHendelser, oppfolgingsdialogerHentet } = this.props;
        if (!sykmeldingerHentet && !sykmeldingerHentingFeilet) {
            this.props.hentDineSykmeldinger();
        }
        if (!hendelserHentet && !hentingFeiletHendelser) {
            this.props.hentHendelser();
        }
        if (!oppfolgingsdialogerHentet) {
            this.props.hentOppfolgingsdialoger();
        }
    }

    render() {
        return (<Experiment
            name={EKSPERIMENTNAVN}
            onChoice={(experiment, variant) => {
                log('Registrerer visning', variant);
                window.dataLayer.push({
                    'event': 'DINE_OPPGAVER_VIST',
                    'variant': variant,
                });
            }}>
            <Variant name={BLAA}>
                <RendreOppgaver {...this.props} className="dineOppgaver--bla" svg="oppgaver.svg" variant={BLAA} />
            </Variant>
            <Variant name={ROED}>
                <RendreOppgaver {...this.props} className="dineOppgaver--roed" svg="oppgaver--roed.svg" variant={ROED} />
            </Variant>
        </Experiment>);
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
};

export const mapStateToProps = (state) => {
    const sykmeldinger = state.dineSykmeldinger.data.filter((s) => {
        return s.status === NY_SYKMELDING;
    });
    const sykepengesoknader = state.sykepengesoknader.data.filter((s) => {
        return s.status === NY_SYKEPENGESOKNAD;
    });

    const mote = state.mote.data;
    let moteRes = null;
    if (mote && !erMotePassert(mote)) {
        if (getSvarsideModus(mote) === 'SKJEMA') {
            moteRes = 'TRENGER_SVAR';
        }
    }

    const avventendeGodkjenninger = state.oppfolgingsdialoger.data
        .filter((plan) => {
            return plan.godkjenninger.length > 0
                && plan.arbeidstaker.fnr !== finnNyesteGodkjenning(plan.godkjenninger).godkjentAvFnr
                && finnNyesteGodkjenning(plan.godkjenninger).godkjent;
        });
    const nyePlaner = state.oppfolgingsdialoger.data
        .filter((plan) => {
            return plan.arbeidstaker.sistInnlogget === null
                && plan.status === 'UNDER_ARBEID'
                && plan.sistEndretAvFnr !== plan.arbeidstaker.fnr
                && !idAlleredeFunnet(avventendeGodkjenninger, plan.id);
        });

    const visOppgaver = sykmeldinger.length > 0 || sykepengesoknader.length > 0 || moteRes !== null || avventendeGodkjenninger.length > 0 || nyePlaner.length > 0;

    return {
        sykmeldingerHentet: state.dineSykmeldinger.hentet === true,
        sykmeldinger,
        sykmeldingerHentingFeilet: state.dineSykmeldinger.hentingFeilet,
        oppfolgingsdialogerHentet: state.oppfolgingsdialoger.hentet,
        sykepengesoknader,
        visOppgaver,
        mote: moteRes,
        avventendeGodkjenninger,
        nyePlaner,
        hentingFeiletHendelser: state.hendelser.hentingFeilet,
        hendelserHentet: state.hendelser.hentet,
        visAktivitetskrav: getAktivitetskravvisning(state.hendelser.data) === NYTT_AKTIVITETSKRAVVARSEL,
    };
};

const DineOppgaverContainer = connect(mapStateToProps, {
    hentDineSykmeldinger, hentHendelser, hentOppfolgingsdialoger,
})(DineOppgaver);

export default DineOppgaverContainer;
