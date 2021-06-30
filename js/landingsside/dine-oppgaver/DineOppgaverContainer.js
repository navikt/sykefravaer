import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {
    getLedetekst,
    sykmeldingstatuser,
} from '../../digisyfoNpm';
import { oppfolgingsdialogPt } from '../../oppfolgingsdialogNpm/oppfolgingProptypes';
import beregnOppgaverOppfoelgingsdialoger from '../../utils/beregnOppgaverOppfoelgingsdialoger';
import {
    soknadPt,
    sykmelding as sykmeldingPt,
} from '../../propTypes/index';
import { hentDineSykmeldinger } from '../../sykmeldinger/data/dine-sykmeldinger/dineSykmeldingerActions';
import { hentHendelser } from '../data/hendelser/hendelserActions';
import {
    getAktivitetskravvisning,
    NYTT_AKTIVITETSKRAVVARSEL,
} from '../../aktivitetskrav/sider/AktivitetskravvarselSide';
import IllustrertInnhold from '../../components/IllustrertInnhold';
import { NY } from '../../enums/soknadstatuser';
import {
    ARBEIDSTAKERE,
    SELVSTENDIGE_OG_FRILANSERE,
    ARBEIDSLEDIG,
    ANNET_ARBEIDSFORHOLD,
    BEHANDLINGSDAGER,
    REISETILSKUDD,
} from '../../enums/soknadtyper';
import { erMotePassert, getSvarsideModus } from '../../utils/moteUtils';
import { erMotebehovUbesvart } from '../../utils/motebehovUtils';
import {
    erNaisLabsDemo, getDialogmoteContextRoot, getOppfolgingsplanContextRoot,
    getSykepengesoknaderUrl,
    getSykepengesoknadUrl,
} from '../../utils/urlUtils';
import { avvisteSmSykmeldingerDataSelector } from '../../sykmeldinger/data/sm-sykmeldinger/smSykmeldingerSelectors';
import { smSykmeldingerPt } from '../../propTypes/smSykmeldingProptypes';
import { selectSykepengerVarsel } from '../../data/sykepengerVarsel/sykepengerVarselSelectors';
import { toggleSykmeldingerFrontend } from '../../data/unleash-toggles/unleashTogglesSelectors';

const Li = ({ tekst, url, img, imgAlt }) => {
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

export const EksternLi = ({ tekst, url, img, imgAlt }) => {
    return (
        <li>
            {img && <img src={img} alt={imgAlt} className="inngangsliste__ikon" />}
            <span>
                <a href={url}>{tekst}</a>
            </span>
        </li>
    );
};

EksternLi.propTypes = Li.propTypes;

export const getSykmeldingerFrontendUrl = () => {
    const url = window
    && window.location
    && window.location.href
        ? window.location.href
        : '';

    if (url.indexOf('tjenester.nav') > -1) {
        // Prod
        return 'https://www.nav.no/syk';
    }

    if (erNaisLabsDemo()) {
        return 'https://sykmeldinger.labs.nais.io/syk';
    }

    if (url.indexOf('localhost') > -1) {
        // Lokalt
        return process.env.REACT_APP_CONTEXT_ROOT;
    }
    // Preprod
    return 'https://www-gcp.dev.nav.no/syk';
};

export const NySykmelding = ({ sykmeldinger, toggleNySmFrontend }) => {
    const url = sykmeldinger.length === 1
        ? `${toggleNySmFrontend ? getSykmeldingerFrontendUrl() : process.env.REACT_APP_CONTEXT_ROOT}/sykmeldinger/${sykmeldinger[0].id}`
        : `${toggleNySmFrontend ? getSykmeldingerFrontendUrl() : process.env.REACT_APP_CONTEXT_ROOT}/sykmeldinger`;

    const tekst = sykmeldinger.length === 1
        ? `Du har 1 ny ${
            sykmeldinger[0].erEgenmeldt ? 'egenmelding' : 'sykmelding'
        }`
        : `Du har ${sykmeldinger.length.toString()} nye ${
            sykmeldinger.some((sm) => {
                return sm.erEgenmeldt;
            })
                ? 'sykmeldinger/egenmeldinger'
                : 'sykmeldinger'
        }`;

    if (toggleNySmFrontend) {
        return <EksternLi url={url} tekst={tekst} />;
    }
    return <Li url={url} tekst={tekst} />;
};

NySykmelding.propTypes = {
    sykmeldinger: PropTypes.arrayOf(sykmeldingPt),
    toggleNySmFrontend: PropTypes.bool,
};

export const AvvistSmSykmelding = ({ smSykmeldinger, toggleNySmFrontend }) => {
    const url = smSykmeldinger.length === 1
        ? `${toggleNySmFrontend ? getSykmeldingerFrontendUrl() : process.env.REACT_APP_CONTEXT_ROOT}/sykmeldinger/${smSykmeldinger[0].id}`
        : `${toggleNySmFrontend ? getSykmeldingerFrontendUrl() : process.env.REACT_APP_CONTEXT_ROOT}/sykmeldinger`;
    const tekst = smSykmeldinger.length === 1
        ? getLedetekst('dine-oppgaver.sm-sykmeldinger.en-avvist-sykmelding')
        : getLedetekst('dine-oppgaver.sykmeldinger.flere-avviste-sykmeldinger', {
            '%ANTALL%': smSykmeldinger.length.toString(),
        });
    if (toggleNySmFrontend) {
        return (
            <EksternLi
                url={url}
                tekst={tekst}
                img="/sykefravaer/img/svg/report-problem-triangle-red.svg"
                imgAlt="Utropstegn"
            />
        );
    }
    return (
        <Li
            url={url}
            tekst={tekst}
            img="/sykefravaer/img/svg/report-problem-triangle-red.svg"
            imgAlt="Utropstegn"
        />
    );
};

AvvistSmSykmelding.propTypes = {
    smSykmeldinger: smSykmeldingerPt,
    toggleNySmFrontend: PropTypes.bool,
};

export const NySykepengesoknad = ({ soknader }) => {
    const alleSoknader = [...soknader];
    const url = alleSoknader.length === 1
        ? getSykepengesoknadUrl(alleSoknader[0].id)
        : getSykepengesoknaderUrl();
    const tekst = alleSoknader.length === 1
        ? getLedetekst('dine-oppgaver.sykepengesoknader.en-soknad')
        : getLedetekst('dine-oppgaver.sykepengesoknader.flere-soknader', {
            '%ANTALL%': alleSoknader.length.toString(),
        });
    return <EksternLi url={url} tekst={tekst} />;
};

NySykepengesoknad.propTypes = {
    soknader: PropTypes.arrayOf(soknadPt),
};

const NyReisetilskuddsoknad = ({ reisetilskuddSoknader }) => {
    const alleSoknader = [...reisetilskuddSoknader];
    const url = alleSoknader.length === 1
        ? getSykepengesoknadUrl(alleSoknader[0].id)
        : getSykepengesoknaderUrl();
    const tekst = alleSoknader.length === 1
        ? getLedetekst('dine-oppgaver.reisetilskudd.en-soknad')
        : getLedetekst('dine-oppgaver.reisetilskudd.flere-soknader', {
            '%ANTALL%': alleSoknader.length.toString(),
        });
    return <EksternLi url={url} tekst={tekst} />;
};

NyReisetilskuddsoknad.propTypes = {
    reisetilskuddSoknader: PropTypes.arrayOf(soknadPt),
};

export const NyttAktivitetskravvarsel = () => {
    return (
        <Li
            url={`${process.env.REACT_APP_CONTEXT_ROOT}/aktivitetsplikt/`}
            tekst={getLedetekst('dine-oppgaver.aktivitetskrav')}
        />
    );
};

const nyePlanerTekst = (antall) => {
    return antall === 1
        ? getLedetekst('dine-oppgaver.oppfoelgingsdialog.sykmeldt.nyeplaner.entall')
        : getLedetekst(
            'dine-oppgaver.oppfoelgingsdialog.sykmeldt.nyeplaner.flertall',
            {
                '%ANTALL%': antall,
            },
        );
};

export const NyttMotebehovVarsel = () => {
    return (
        <EksternLi
            url={`${getDialogmoteContextRoot()}/behov`}
            tekst={getLedetekst('sykefravaer.dineoppgaver.nyttMotebehovVarsel')}
        />
    );
};

const avventendeGodkjenningerTekst = (antall) => {
    return antall === 1
        ? getLedetekst(
            'dine-oppgaver.oppfoelgingsdialog.avventendegodkjenninger.entall',
        )
        : getLedetekst(
            'dine-oppgaver.oppfoelgingsdialog.avventendegodkjenninger.flertall',
            {
                '%ANTALL%': antall,
            },
        );
};

const RendreOppgaver = ({
    soknader = [],
    reisetilskuddSoknader = [],
    sykmeldinger = [],
    visOppgaver,
    mote,
    visSykepengerVarsel,
    avventendeGodkjenninger,
    harNyttMotebehov,
    nyePlaner,
    visAktivitetskrav,
    avvisteSmSykmeldinger = [],
    toggleSmFrontend,
}) => {
    if (!visOppgaver) {
        return null;
    }

    const OPPFOLGINGSPLANER_URL = erNaisLabsDemo()
        ? 'https://oppfolgingsplan.herokuapp.com/oppfolgingsplan/oppfolgingsplaner'
        : `${getOppfolgingsplanContextRoot()}/oppfolgingsplaner`;

    return (
        <div className="landingspanel dineOppgaver">
            <IllustrertInnhold
                ikon={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/landingsside/oppgaver.svg`}
                ikonAlt="Oppgaver"
            >
                <h2 className="dineOppgaver__tittel js-tittel">
                    {getLedetekst('dine-oppgaver.tittel')}
                </h2>
                <ul className="inngangsliste">
                    {sykmeldinger.length > 0 && (
                        <NySykmelding sykmeldinger={sykmeldinger} toggleNySmFrontend={toggleSmFrontend} />
                    )}
                    {avvisteSmSykmeldinger.length > 0 && (
                        <AvvistSmSykmelding
                            smSykmeldinger={avvisteSmSykmeldinger}
                            toggleNySmFrontend={toggleSmFrontend} />
                    )}
                    {(soknader.length > 0) && (
                        <NySykepengesoknad
                            soknader={soknader}
                        />
                    )}
                    {(reisetilskuddSoknader.length > 0) && (
                        <NyReisetilskuddsoknad
                            reisetilskuddSoknader={reisetilskuddSoknader}
                        />
                    )}
                    {mote !== null && (
                        <EksternLi
                            url={`${getDialogmoteContextRoot()}`}
                            tekst={getLedetekst('dine-oppgaver.mote.svar')}
                        />
                    )}
                    {visSykepengerVarsel && (
                        <Li
                            url={`${process.env.REACT_APP_CONTEXT_ROOT}/arbeidsrettet-oppfolging`}
                            tekst={getLedetekst('ao.oppgave.inngangstekst')}
                        />
                    )}
                    {avventendeGodkjenninger.length > 0 && (
                        <EksternLi
                            url={OPPFOLGINGSPLANER_URL}
                            tekst={avventendeGodkjenningerTekst(
                                avventendeGodkjenninger.length,
                            )}
                        />
                    )}
                    {nyePlaner.length > 0 && (
                        <EksternLi
                            url={OPPFOLGINGSPLANER_URL}
                            tekst={nyePlanerTekst(nyePlaner.length)}
                        />
                    )}
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
    soknader: PropTypes.arrayOf(soknadPt),
    reisetilskuddSoknader: PropTypes.arrayOf(soknadPt),
    harNyttMotebehov: PropTypes.bool,
    visOppgaver: PropTypes.bool,
    mote: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    visSykepengerVarsel: PropTypes.bool,
    visAktivitetskrav: PropTypes.bool,
    avvisteSmSykmeldinger: smSykmeldingerPt,
    toggleSmFrontend: PropTypes.bool,
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
    toggleSmFrontend: PropTypes.bool,
};

export const mapStateToProps = (state) => {
    const sykmeldinger = state.dineSykmeldinger.data.filter((s) => {
        return s.status === sykmeldingstatuser.NY;
    });

    const soknader = state.soknader.data
        .filter((s) => {
            return s.status === NY;
        })
        .filter((s) => {
            return (
                s.soknadstype === SELVSTENDIGE_OG_FRILANSERE
                || s.soknadstype === ARBEIDSTAKERE
                || s.soknadstype === ARBEIDSLEDIG
                || s.soknadstype === ANNET_ARBEIDSFORHOLD
                || s.soknadstype === BEHANDLINGSDAGER
            );
        });

    const reisetilskuddSoknader = state.soknader.data
        .filter((s) => {
            return s.status === NY;
        })
        .filter((s) => {
            return s.soknadstype === REISETILSKUDD;
        });

    const mote = state.mote.data;
    let moteRes = null;
    if (mote && !erMotePassert(mote)) {
        if (getSvarsideModus(mote) === 'SKJEMA') {
            moteRes = 'TRENGER_SVAR';
        }
    }
    const harNyttMotebehov = erMotebehovUbesvart(state.motebehov);
    const _oppgaverOppfoelgingsdialoger = beregnOppgaverOppfoelgingsdialoger(state.oppfolgingsdialoger.data, state.dineSykmeldinger.data);
    const visAktivitetskrav = getAktivitetskravvisning(state.hendelser.data) === NYTT_AKTIVITETSKRAVVARSEL;
    const avvisteSmSykmeldinger = avvisteSmSykmeldingerDataSelector(state)
        .filter((smSykmelding) => {
            return smSykmelding.sykmeldingStatus.statusEvent === 'APEN';
        });
    const visOppgaver = sykmeldinger.length > 0
        || soknader.length > 0
        || reisetilskuddSoknader.length > 0
        || moteRes !== null
        || harNyttMotebehov
        || _oppgaverOppfoelgingsdialoger.avventendeGodkjenninger.length > 0
        || _oppgaverOppfoelgingsdialoger.nyePlaner.length > 0
        || visAktivitetskrav
        || avvisteSmSykmeldinger.length > 0;

    return {
        sykmeldingerHentet: state.dineSykmeldinger.hentet === true,
        sykmeldinger,
        sykmeldingerHentingFeilet:
            state.dineSykmeldinger.hentingFeilet
            || state.oppfolgingsdialoger.hentingFeilet,
        soknader,
        reisetilskuddSoknader,
        visOppgaver,
        mote: moteRes,
        visSykepengerVarsel: selectSykepengerVarsel(state),
        avventendeGodkjenninger:
        _oppgaverOppfoelgingsdialoger.avventendeGodkjenninger,
        nyePlaner: _oppgaverOppfoelgingsdialoger.nyePlaner,
        harNyttMotebehov,
        hentingFeiletHendelser: state.hendelser.hentingFeilet,
        hendelserHentet: state.hendelser.hentet,
        visAktivitetskrav,
        avvisteSmSykmeldinger,
        toggleSmFrontend: toggleSykmeldingerFrontend(state),
    };
};

const DineOppgaverContainer = connect(mapStateToProps, {
    doHentDineSykmeldinger: hentDineSykmeldinger,
    doHentHendelser: hentHendelser,
})(DineOppgaverComponent);

export default DineOppgaverContainer;
