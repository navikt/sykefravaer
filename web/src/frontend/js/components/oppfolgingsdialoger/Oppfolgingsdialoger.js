import React from 'react';
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
    proptypes as oppfolgingProptypes,
    NyNaermestelederInfoboks,
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
import Video from '../Video';

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
    return oppfolgingsdialoger.filter((oppfolgingsdialog) => {
        return oppfolgingsdialog.arbeidsgiver.forrigeNaermesteLeder &&
            oppfolgingsdialog.arbeidsgiver.naermesteLeder &&
            new Date(oppfolgingsdialog.arbeidstaker.sistInnlogget).toISOString().split('T')[0] < new Date(oppfolgingsdialog.arbeidsgiver.naermesteLeder.aktivFom).toISOString().split('T')[0];
    })[0];
};

const Oppfolgingsdialoger = ({ oppfolgingsdialoger = [], ledetekster, avkreftLeder, bekreftetNyNaermesteLeder, bekreftNyNaermesteLeder, sykmeldinger, naermesteLedere }) => {
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
            { !isEmpty(oppfolgingsdialoger) && harAktivOppfolgingsdialog(oppfolgingsdialoger) &&
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

            { (isEmpty(oppfolgingsdialoger) || !harAktivOppfolgingsdialog(oppfolgingsdialoger)) &&
            <div className="blokk--l">
                <OppfolgingsdialogerIngenplan
                    ledetekster={ledetekster}
                    brukerType={BRUKERTYPE.ARBEIDSTAKER}
                    rootUrl={getContextRoot()}
                />
            </div>
            }

            { !isEmpty(Oppfolgingsdialoger) && harTidligereOppfolgingsdialoger(oppfolgingsdialoger) &&
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
            {
                <div className="panel">
                    <h2 className="js-begrensning lite-film typo-undertittel blokk--xxs">{getLedetekst('oppfolgingsdialog.filmsnutt.tittel')}</h2>
                    <Video width="476" height="360" src="https://video.qbrick.com/play2/embed/player?accountId=763558&mediaId=25edfd35-00015227-b68553ad&configId=default&pageStyling=adaptive&&autoplay=false&repeat=false&sharing=false" />
                    <p dangerouslySetInnerHTML={{ __html: getLedetekst('oppfolgingsdialog.filmsnutt.tekst', ledetekster) }} />
                </div>
            }
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

        { panel }
    </div>);
};

Oppfolgingsdialoger.propTypes = {
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingProptypes.oppfolgingsdialogPt),
    sykmeldinger: PropTypes.arrayOf(sykmeldingPt),
    naermesteLedere: PropTypes.arrayOf(naermesteLederPt),
    ledetekster: keyValue,
    bekreftetNyNaermesteLeder: PropTypes.bool,
    bekreftNyNaermesteLeder: PropTypes.func,
    avkreftLeder: PropTypes.func,
};

export default Oppfolgingsdialoger;
