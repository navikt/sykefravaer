import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { getLedetekst, keyValue } from 'digisyfo-npm';
import {
    OppfolgingsdialogTeasere,
    BRUKERTYPE,
    OppfolgingsdialogerIngenplanAT,
    finnTidligereOppfolgingsdialoger,
    harTidligereOppfolgingsdialoger,
    finnAktiveOppfolgingsdialoger,
    AvbruttPlanNotifikasjonBoksAdvarsel,
    finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging,
    finnBrukersSisteInnlogging,
    proptypes as oppfolgingProptypes,
    NyNaermestelederInfoboks,
    finnOgHentVirksomheterSomMangler,
    finnOgHentPersonerSomMangler,
    finnOgHentNaermesteLedereSomMangler,
    finnOgHentForrigeNaermesteLedereSomMangler,
    UnderUtviklingVarsel,
    OppfolgingsdialogUtenSykmelding,
    OppfolgingsdialogerUtenAktivSykmelding,
} from 'oppfolgingsdialog-npm';
import {
    dinesykmeldingerReducerPt,
    ledereReducerPt,
} from '../../propTypes';
import Sidetopp from '../Sidetopp';
import {
    harForrigeNaermesteLeder,
    harNaermesteLeder,
    isEmpty,
    erSykmeldtUtenOppfolgingsdialogerOgNaermesteLedere,
} from '../../utils/oppfolgingsdialogUtils';
import { finnArbeidsgivereForGyldigeSykmeldinger, sykmeldtHarGyldigSykmelding } from '../../utils/sykmeldingUtils';
import IngenledereInfoboks from './IngenledereInfoboks';
import { getContextRoot } from '../../routers/paths';
import OppfolgingsdialogFilm from './OppfolgingsdialogFilm';

export const OppfolgingsdialogNyDialog = () => {
    return (
        <div className="oppfolgingsdialogNyDialog">
            <Link role="button" className="rammeknapp" to={`${getContextRoot()}/oppfolgingsplaner/opprett`}>
                {getLedetekst('oppfolgingsdialog.oppfolgingsdialogNyDialog.knapp')}
            </Link>
        </div>
    );
};

const finnOppfolgingsdialogMedFoersteInnloggingSidenNyNaermesteLeder = (oppfolgingsdialoger) => {
    const sisteInnlogging = finnBrukersSisteInnlogging(oppfolgingsdialoger, BRUKERTYPE.ARBEIDSTAKER);
    return oppfolgingsdialoger.filter((oppfolgingsdialog) => {
        return harForrigeNaermesteLeder(oppfolgingsdialog) &&
            harNaermesteLeder(oppfolgingsdialog) &&
            new Date(sisteInnlogging).toISOString().split('T')[0] <= new Date(oppfolgingsdialog.arbeidsgiver.naermesteLeder.aktivFom).toISOString().split('T')[0];
    })[0];
};

class Oppfolgingsdialoger extends Component {
    componentWillMount() {
        const {
            oppfolgingsdialoger,
            virksomhet,
            person,
            forrigenaermesteleder,
            naermesteleder,
            hentPerson,
            hentVirksomhet,
            hentNaermesteLeder,
            hentForrigeNaermesteLeder,
        } = this.props;
        finnOgHentVirksomheterSomMangler(oppfolgingsdialoger, virksomhet, hentVirksomhet);
        finnOgHentPersonerSomMangler(oppfolgingsdialoger, person, hentPerson);
        finnOgHentNaermesteLedereSomMangler(oppfolgingsdialoger, naermesteleder, hentNaermesteLeder);
        finnOgHentForrigeNaermesteLedereSomMangler(oppfolgingsdialoger, forrigenaermesteleder, hentForrigeNaermesteLeder);

        window.sessionStorage.removeItem('hash');
    }

    render() {
        const {
            oppfolgingsdialoger = [],
            ledetekster,
            avkreftLeder,
            bekreftetNyNaermesteLeder,
            bekreftNyNaermesteLeder,
            opprettOppfolgingsdialog,
            dinesykmeldinger,
            naermesteLedere,
        } = this.props;
        let panel;
        const dialogerAvbruttAvMotpartSidenSistInnlogging = finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging(oppfolgingsdialoger, BRUKERTYPE.ARBEIDSTAKER);
        const oppfolgingsdialogMedNyNaermesteLeder = finnOppfolgingsdialogMedFoersteInnloggingSidenNyNaermesteLeder(oppfolgingsdialoger);
        const arbeidsgivereForSykmeldinger = finnArbeidsgivereForGyldigeSykmeldinger(dinesykmeldinger.data, naermesteLedere.data);
        if (erSykmeldtUtenOppfolgingsdialogerOgNaermesteLedere(oppfolgingsdialoger, dinesykmeldinger.data, naermesteLedere.data)) {
            panel = (<IngenledereInfoboks />);
        } else if (!bekreftetNyNaermesteLeder && oppfolgingsdialogMedNyNaermesteLeder) {
            panel = (<NyNaermestelederInfoboks
                ledetekster={ledetekster}
                oppfolgingsdialog={oppfolgingsdialogMedNyNaermesteLeder}
                avkreftNyNaermesteleder={avkreftLeder}
                bekreftNyNaermesteLeder={bekreftNyNaermesteLeder}
                brukerType={BRUKERTYPE.ARBEIDSTAKER}
                rootUrlImg={getContextRoot()}
            />);
        } else if (!sykmeldtHarGyldigSykmelding(dinesykmeldinger.data)) {
            panel = (
                <div>
                    <div className="blokk--l">
                        <OppfolgingsdialogUtenSykmelding
                            ledetekster={ledetekster}
                            rootUrl={getContextRoot()}
                        />
                    </div>

                    {!isEmpty(oppfolgingsdialoger) && harTidligereOppfolgingsdialoger(oppfolgingsdialoger) &&
                    <OppfolgingsdialogerUtenAktivSykmelding
                        oppfolgingsdialoger={finnTidligereOppfolgingsdialoger(oppfolgingsdialoger)}
                        tittel={getLedetekst('oppfolgingsdialoger.tidligereplaner.tittel')}
                        rootUrl={getContextRoot()}
                    />
                    }
                </div>);
        } else {
            const aktivOppfolgingsdialoger = finnAktiveOppfolgingsdialoger(oppfolgingsdialoger, dinesykmeldinger.data);
            panel = (<div>
                {!isEmpty(oppfolgingsdialoger) && aktivOppfolgingsdialoger.length > 0 &&
                <div>
                    { arbeidsgivereForSykmeldinger.length > 1 &&
                        <OppfolgingsdialogNyDialog />
                    }
                    <OppfolgingsdialogTeasere
                        ledetekster={ledetekster}
                        oppfolgingsdialoger={aktivOppfolgingsdialoger}
                        tittel={aktivOppfolgingsdialoger.length > 1 ? getLedetekst('oppfolgingsdialoger.oppfolgingsdialoger.fler.header.tittel') :
                            getLedetekst('oppfolgingsdialoger.oppfolgingsdialoger.header.tittel')}
                        brukerType={BRUKERTYPE.ARBEIDSTAKER}
                        rootUrl={getContextRoot()}
                        rootUrlPlaner={getContextRoot()}
                    />
                </div>
                }

                {(isEmpty(oppfolgingsdialoger) || !aktivOppfolgingsdialoger.length > 0) &&
                <div className="blokk--l">
                    <OppfolgingsdialogerIngenplanAT
                        ledetekster={ledetekster}
                        arbeidsgivere={arbeidsgivereForSykmeldinger}
                        opprettdialog={opprettOppfolgingsdialog}
                        rootUrl={getContextRoot()}
                    />
                </div>
                }

                {!isEmpty(oppfolgingsdialoger) && harTidligereOppfolgingsdialoger(oppfolgingsdialoger) &&
                <OppfolgingsdialogTeasere
                    ledetekster={ledetekster}
                    oppfolgingsdialoger={finnTidligereOppfolgingsdialoger(oppfolgingsdialoger)}
                    harTidligerOppfolgingsdialoger
                    tittel={getLedetekst('oppfolgingsdialoger.tidligereplaner.tittel')}
                    id="OppfolgingsdialogTeasereAT"
                    brukerType={BRUKERTYPE.ARBEIDSTAKER}
                    rootUrl={getContextRoot()}
                    rootUrlPlaner={getContextRoot()}
                    svgUrl={`${window.APP_SETTINGS.APP_ROOT}/img/svg/plan-godkjent.svg`}
                    svgAlt="OppfølgingsdialogTidligere"
                />
                }
                <OppfolgingsdialogFilm ledetekster={ledetekster} />
            </div>);
        }
        return (<div>
            <UnderUtviklingVarsel
                ledetekster={ledetekster}
                rootUrl={getContextRoot()}
            />
            <Sidetopp
                tittel={getLedetekst('oppfolgingsdialoger.sidetittel')} />
            <p className="oppfolgingsdialoger__tekst">
                {getLedetekst('oppfolgingsdialog.oppfolgingsdialoger.arbeidstaker.tekst')}
            </p>

            {
                dialogerAvbruttAvMotpartSidenSistInnlogging.length > 0 && <AvbruttPlanNotifikasjonBoksAdvarsel
                    ledetekster={ledetekster}
                    motpartnavn={dialogerAvbruttAvMotpartSidenSistInnlogging[0].sistEndretAv.navn}
                    rootUrl={getContextRoot()}
                />
            }

            {panel}
        </div>);
    }
}
Oppfolgingsdialoger.propTypes = {
    dinesykmeldinger: dinesykmeldingerReducerPt,
    naermesteleder: oppfolgingProptypes.naermestelederReducerPt,
    forrigenaermesteleder: oppfolgingProptypes.forrigenaermestelederReducerPt,
    naermesteLedere: ledereReducerPt,
    person: oppfolgingProptypes.personReducerPt,
    virksomhet: oppfolgingProptypes.virksomhetReducerPt,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingProptypes.oppfolgingsdialogPt),
    ledetekster: keyValue,
    bekreftetNyNaermesteLeder: PropTypes.bool,
    bekreftNyNaermesteLeder: PropTypes.func,
    avkreftLeder: PropTypes.func,
    hentVirksomhet: PropTypes.func,
    hentPerson: PropTypes.func,
    hentNaermesteLeder: PropTypes.func,
    hentForrigeNaermesteLeder: PropTypes.func,
    opprettOppfolgingsdialog: PropTypes.func,
};

export default Oppfolgingsdialoger;
