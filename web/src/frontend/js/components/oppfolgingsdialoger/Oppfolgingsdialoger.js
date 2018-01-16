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
    isEmpty,
    erSykmeldtUtenOppfolgingsdialogerOgNaermesteLedere,
} from '../../utils/oppfolgingsdialogUtils';
import { finnArbeidsgivereForGyldigeSykmeldinger, HarAktivSykmelding } from '../../utils/sykmeldingUtils';
import { finnArbeidsgivereForGyldigeSykmeldinger } from '../../utils/sykmeldingUtils';
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
        return oppfolgingsdialog.arbeidsgiver.forrigeNaermesteLeder &&
            oppfolgingsdialog.arbeidsgiver.naermesteLeder &&
            new Date(sisteInnlogging).toISOString().split('T')[0] <= new Date(oppfolgingsdialog.arbeidsgiver.naermesteLeder.aktivFom).toISOString().split('T')[0];
    })[0];
};

class Oppfolgingsdialoger extends Component {
    componentWillMount() {
        const { oppfolgingsdialoger, virksomhet, person, forrigenaermesteleder, hentPerson, hentVirksomhet, hentForrigeNaermesteLeder } = this.props;
        finnOgHentVirksomheterSomMangler(oppfolgingsdialoger, virksomhet, hentVirksomhet);
        finnOgHentPersonerSomMangler(oppfolgingsdialoger, person, hentPerson);
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
            dinesykmeldinger,
            naermesteLedere,
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
        } else if (!HarAktivSykmelding(dinesykmeldinger.data)) {
            panel = (
                <div>
                    <div className="blokk--l">
                        <OppfolgingsdialogUtenSykmelding
                            ledetekster={ledetekster}
                            rootUrl={getContextRoot()}
                        />
                    </div>

                    { !isEmpty(oppfolgingsdialoger) &&
                    <div>
                        <OppfolgingsdialogerUtenAktivSykmelding
                            ledetekster={ledetekster}
                            oppfolgingsdialoger={oppfolgingsdialoger}
                            tittel={getLedetekst('oppfolgingsdialoger.tidligereplaner.tittel')}
                            rootUrl={getContextRoot()}
                        />
                    </div>
                    }
                </div>);
        } else {
            panel = (<div>
                {!isEmpty(oppfolgingsdialoger) && harAktivOppfolgingsdialog(oppfolgingsdialoger) &&
                <div>
                    { finnArbeidsgivereForGyldigeSykmeldinger(dinesykmeldinger.data, naermesteLedere.data).length > 1 &&
                        <OppfolgingsdialogNyDialog />
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
};

export default Oppfolgingsdialoger;
