import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { getLedetekst, keyValue } from 'digisyfo-npm';
import {
    OppfolgingsdialogTeasere,
    BRUKERTYPE,
    OppfolgingsdialogerIngenplan,
    finnTidligereOppfolgingsdialoger,
    harTidligereOppfolgingsdialoger,
    finnAktiveOppfolgingsdialoger,
    harAktivOppfolgingsdialog,
    AvbruttPlanNotifikasjonBoksAdvarsel,
    finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging,
    finnBrukersSisteInnlogging,
    proptypes as oppfolgingProptypes,
    NyNaermestelederInfoboks,
    henterEllerHarHentetVirksomhet,
    henterEllerHarHentetPerson,
    finnFodselsnumreKnyttetTilDialog,
    henterEllerHarHentetForrigeNaermesteLeder,
    henterEllerHarHentetNaermesteLeder,
} from 'oppfolgingsdialog-npm';
import {
    sykmelding as sykmeldingPt,
    naermesteLeder as naermesteLederPt,
} from '../../propTypes';
import Sidetopp from '../Sidetopp';
import {
    isEmpty,
    erSykmeldtUtenOppfolgingsdialogerOgNaermesteLedere,
} from '../../utils/oppfolgingsdialogUtils';
import UnderUtviklingVarsel from './UnderUtviklingVarsel';
import IngenledereInfoboks from './IngenledereInfoboks';
import { getContextRoot } from '../../routers/paths';
import OppfolgingsdialogFilm from './OppfolgingsdialogFilm';

export const OppfolgingsdialogNyDialog = () => {
    return (
        <div className="panel oppfolgingsdialogNyDialog">
            <h3>
                {getLedetekst('oppfolgingsdialoger.oppfolgingsdialoger.oppfolgingsdialogNyDialog.arbeidstaker.tittel')}
            </h3>
            <p>
                {getLedetekst('oppfolgingsdialoger.oppfolgingsdialoger.oppfolgingsdialogNyDialog.arbeidstaker.tekst')}
            </p>
            <div className="knapperad">
                <Link role="button" className="knapp" to={`${getContextRoot()}/oppfolgingsplaner/opprett`}>
                    {getLedetekst('oppfolgingsdialog.knapp.ny-oppfolgingsdialog')}
                </Link>
            </div>
        </div>
    );
};

const finnOppfolgingsdialogMedFoersteInnloggingSidenNyNaermesteLeder = (oppfolgingsdialoger) => {
    const sisteInnlogging = finnBrukersSisteInnlogging(oppfolgingsdialoger, BRUKERTYPE.ARBEIDSTAKER);
    return oppfolgingsdialoger.filter((oppfolgingsdialog) => {
        return oppfolgingsdialog.arbeidsgiver.forrigeNaermesteLeder &&
            oppfolgingsdialog.arbeidsgiver.naermesteLeder &&
            new Date(sisteInnlogging).toISOString().split('T')[0] <= new Date(oppfolgingsdialog.arbeidsgiver.naermesteLeder.aktivFom).toISOString().split('T')[0];
    })[0];
};

export class Oppfolgingsdialoger extends Component {
    componentWillMount() {
        const { oppfolgingsdialoger, virksomhet, person, forrigenaermesteleder, naermesteleder } = this.props;
        const virksomhetsnummerSet = new Set();
        oppfolgingsdialoger.forEach((oppfolgingsdialog) => {
            virksomhetsnummerSet.add(oppfolgingsdialog.virksomhet.virksomhetsnummer);
        });

        virksomhetsnummerSet.forEach((virksomhetsnummer) => {
            if (!henterEllerHarHentetVirksomhet(virksomhetsnummer, virksomhet)) {
                this.props.hentVirksomhet(virksomhetsnummer);
            }
        });

        const fnrSet = new Set();
        const forrigeNaermesteLederListe = [];
        oppfolgingsdialoger.forEach((oppfolgingsdialog) => {
            finnFodselsnumreKnyttetTilDialog(oppfolgingsdialog).forEach((fnr) => {
                fnrSet.add(fnr);
            });
            forrigeNaermesteLederListe.push({ fnr: oppfolgingsdialog.arbeidstaker.fnr, virksomhetsnummer: oppfolgingsdialog.virksomhet.virksomhetsnummer });
        });

        fnrSet.forEach((fnr) => {
            if (!henterEllerHarHentetPerson(fnr, person)) {
                this.props.hentPerson(fnr);
            }
        });
        const forrigeNaermesteLederSet = Array.from(new Set(forrigeNaermesteLederListe.map(JSON.stringify))).map(JSON.parse);
        forrigeNaermesteLederSet.forEach((forrigeNaermesteLeder) => {
            if (!henterEllerHarHentetForrigeNaermesteLeder(forrigeNaermesteLeder.fnr, forrigeNaermesteLeder.virksomhetsnummer, forrigenaermesteleder)) {
                this.props.hentForrigeNaermesteLeder(forrigeNaermesteLeder.fnr, forrigeNaermesteLeder.virksomhetsnummer);
            }
        });

        const naermesteLederListe = new Set();
        oppfolgingsdialoger.forEach((oppfolgingsdialog) => {
            naermesteLederListe.push({ fnr: oppfolgingsdialog.arbeidstaker.fnr, virksomhetsnummer: oppfolgingsdialog.virksomhet.virksomhetsnummer });
        });

        const naermesteLederSet = Array.from(new Set(naermesteLederListe.map(JSON.stringify))).map(JSON.parse);
        naermesteLederSet.forEach((naermesteLeder) => {
            if (!henterEllerHarHentetNaermesteLeder(naermesteLeder.fnr, naermesteLeder.virksomhetsnummer, naermesteleder)) {
                this.props.hentNaermesteLeder(naermesteLeder.fnr, naermesteLeder.virksomhetsnummer);
            }
        });
    }

    render() {
        const { oppfolgingsdialoger = [], ledetekster, avkreftLeder, bekreftetNyNaermesteLeder, bekreftNyNaermesteLeder, sykmeldinger, naermesteLedere } = this.props;
        let panel;
        const dialogerAvbruttAvMotpartSidenSistInnlogging = finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging(oppfolgingsdialoger, BRUKERTYPE.ARBEIDSTAKER);
        const oppfolgingsdialogMedNyNaermesteLeder = finnOppfolgingsdialogMedFoersteInnloggingSidenNyNaermesteLeder(oppfolgingsdialoger);
        if (erSykmeldtUtenOppfolgingsdialogerOgNaermesteLedere(oppfolgingsdialoger, sykmeldinger, naermesteLedere)) {
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
        } else {
            panel = (<div>
                {!isEmpty(oppfolgingsdialoger) && harAktivOppfolgingsdialog(oppfolgingsdialoger) &&
                <div>
                    <OppfolgingsdialogTeasere
                        ledetekster={ledetekster}
                        oppfolgingsdialoger={finnAktiveOppfolgingsdialoger(oppfolgingsdialoger)}
                        tittel={finnAktiveOppfolgingsdialoger(oppfolgingsdialoger).length > 1 ? getLedetekst('oppfolgingsdialoger.oppfolgingsdialoger.fler.header.tittel') :
                            getLedetekst('oppfolgingsdialoger.oppfolgingsdialoger.header.tittel')}
                        brukerType={BRUKERTYPE.ARBEIDSTAKER}
                        rootUrl={getContextRoot()}
                        rootUrlPlaner={getContextRoot()}
                    />
                    <OppfolgingsdialogNyDialog ledetekster={ledetekster} />
                </div>
                }

                {(isEmpty(oppfolgingsdialoger) || !harAktivOppfolgingsdialog(oppfolgingsdialoger)) &&
                <div className="blokk--l">
                    <OppfolgingsdialogerIngenplan
                        ledetekster={ledetekster}
                        brukerType={BRUKERTYPE.ARBEIDSTAKER}
                        rootUrl={getContextRoot()}
                    />
                </div>
                }

                {!isEmpty(oppfolgingsdialoger) && harTidligereOppfolgingsdialoger(oppfolgingsdialoger) &&
                <div>
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
                </div>
                }
                <OppfolgingsdialogFilm ledetekster={ledetekster} />
            </div>);
        }
        return (<div>
            <UnderUtviklingVarsel />
            <Sidetopp
                tittel={getLedetekst('oppfolgingsdialoger.sidetittel')} />
            <p className="oppfolgingsdialoger__tekst">
                {getLedetekst('oppfolgingsdialog.oppfolgingsdialoger.arbeidstaker.tekst')}
            </p>

            {
                dialogerAvbruttAvMotpartSidenSistInnlogging.length > 0 && <AvbruttPlanNotifikasjonBoksAdvarsel
                    ledetekster={ledetekster}
                    motpartnavn={dialogerAvbruttAvMotpartSidenSistInnlogging[0].arbeidsgiver.naermesteLeder.navn}
                    rootUrl={getContextRoot()}
                />
            }

            {panel}
        </div>);
    }
}
Oppfolgingsdialoger.propTypes = {
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingProptypes.oppfolgingsdialogPt),
    sykmeldinger: PropTypes.arrayOf(sykmeldingPt),
    naermesteLedere: PropTypes.arrayOf(naermesteLederPt),
    ledetekster: keyValue,
    bekreftetNyNaermesteLeder: PropTypes.bool,
    bekreftNyNaermesteLeder: PropTypes.func,
    avkreftLeder: PropTypes.func,
    hentVirksomhet: PropTypes.func,
    hentPerson: PropTypes.func,
    hentForrigeNaermesteLeder: PropTypes.func,
    hentNaermesteLeder: PropTypes.func,
    virksomhet: oppfolgingProptypes.virksomhetReducerPt,
    naermesteleder: oppfolgingProptypes.naermestelederReducerPt,
    person: oppfolgingProptypes.personReducerPt,
    forrigenaermesteleder: oppfolgingProptypes.forrigenaermestelederReducerPt,
};

export default Oppfolgingsdialoger;
