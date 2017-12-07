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
    finnOgHentVirksomheterSomMangler,
    finnOgHentPersonerSomMangler,
    finnOgHentForrigeNaermesteLedereSomMangler,
} from 'oppfolgingsdialog-npm';
import {
    dinesykmeldingerReducerPt,
    ledereReducerPt,
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

export const OppfolgingsdialogNyDialog = ({ oppfolgingsdialoger, virksomheter, opprettOppfolgingsdialog }) => {
    return (
        <div className="oppfolgingsdialogNyDialog">
            {
                virksomheter.length === 1 && finnAktiveOppfolgingsdialoger(oppfolgingsdialoger).length === 0 ?
                    <button className="rammeknapp" onClick={() => { opprettOppfolgingsdialog(virksomheter[0]); }}>
                        {getLedetekst('oppfolgingsdialog.oppfolgingsdialogNyDialog.knapp')}
                    </button>
                    :
                    <Link role="button" className="rammeknapp" to={`${getContextRoot()}/oppfolgingsplaner/opprett`}>
                        {getLedetekst('oppfolgingsdialog.oppfolgingsdialogNyDialog.knapp')}
                    </Link>
            }
        </div>
    );
};
OppfolgingsdialogNyDialog.propTypes = {
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingProptypes.oppfolgingsdialogPt),
    virksomheter: PropTypes.arrayOf(PropTypes.string),
    opprettOppfolgingsdialog: PropTypes.func,
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
        const { oppfolgingsdialoger, virksomhet, person, forrigenaermesteleder, hentPerson, hentVirksomhet, hentForrigeNaermesteLeder } = this.props;
        finnOgHentVirksomheterSomMangler(oppfolgingsdialoger, virksomhet, hentVirksomhet);
        finnOgHentPersonerSomMangler(oppfolgingsdialoger, person, hentPerson);
        finnOgHentForrigeNaermesteLedereSomMangler(oppfolgingsdialoger, forrigenaermesteleder, hentForrigeNaermesteLeder);
    }

    render() {
        const {
            oppfolgingsdialoger = [],
            ledetekster,
            avkreftLeder,
            bekreftetNyNaermesteLeder,
            bekreftNyNaermesteLeder,
            dinesykmeldinger,
            naermesteLedere,
            opprettOppfolgingsdialog,
            virksomhet,
        } = this.props;
        let panel;
        const dialogerAvbruttAvMotpartSidenSistInnlogging = finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging(oppfolgingsdialoger, BRUKERTYPE.ARBEIDSTAKER);
        const oppfolgingsdialogMedNyNaermesteLeder = finnOppfolgingsdialogMedFoersteInnloggingSidenNyNaermesteLeder(oppfolgingsdialoger);
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
        } else {
            panel = (<div>
                {!isEmpty(oppfolgingsdialoger) && harAktivOppfolgingsdialog(oppfolgingsdialoger) &&
                <div>
                    { finnAktiveOppfolgingsdialoger(oppfolgingsdialoger).length < virksomhet.hentet.length &&
                        <OppfolgingsdialogNyDialog
                            virksomheter={virksomhet.hentet}
                            opprettOppfolgingsdialog={opprettOppfolgingsdialog}
                        />
                    }
                    <OppfolgingsdialogTeasere
                        ledetekster={ledetekster}
                        oppfolgingsdialoger={finnAktiveOppfolgingsdialoger(oppfolgingsdialoger)}
                        tittel={finnAktiveOppfolgingsdialoger(oppfolgingsdialoger).length > 1 ? getLedetekst('oppfolgingsdialoger.oppfolgingsdialoger.fler.header.tittel') :
                            getLedetekst('oppfolgingsdialoger.oppfolgingsdialoger.header.tittel')}
                        brukerType={BRUKERTYPE.ARBEIDSTAKER}
                        rootUrl={getContextRoot()}
                        rootUrlPlaner={getContextRoot()}
                    />
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
    hentForrigeNaermesteLeder: PropTypes.func,
    opprettOppfolgingsdialog: PropTypes.func,
};

export default Oppfolgingsdialoger;
