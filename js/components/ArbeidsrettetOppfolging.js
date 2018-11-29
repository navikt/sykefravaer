import React from 'react';
import { getHtmlLedetekst, getLedetekst, Utvidbar } from 'digisyfo-npm';
import { Element, Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import Alertstripe from 'nav-frontend-alertstriper';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import history from '../history';
import Sidetopp from './Sidetopp';
import Brodsmuler from './Brodsmuler';

const ArbeidsrettetOppfolging = () => {
    const brodsmuler = [{
        tittel: getLedetekst('landingsside.sidetittel'),
        sti: '/',
        erKlikkbar: true,
    }, {
        tittel: getLedetekst('infoside-fo.sidetittel'),
        sti: '',
    }];

    const harOppfolgingsFlagg = true;

    return (
        <React.Fragment>
            <div className="infoside-fo__brodsmuler--wrapper begrensning">
                <Brodsmuler brodsmuler={brodsmuler} />
            </div>
            { harOppfolgingsFlagg ? <HarAlleredeOppfolgingAlertstripe /> : null }
            <Sidetopp tittel={getLedetekst('infoside-fo.sidetittel')} />
            <VeilederRad />
            <KommunikasjonRad />
            <AapRad />
            { !harOppfolgingsFlagg ? <TrengerMerVeiledningRad /> : null }
        </React.Fragment>
    );
};

const HarAlleredeOppfolgingAlertstripe = () => {
    return (
        <div className="begrensning infoside-fo__alertstripe">
            <Alertstripe type="suksess">
                <div className="infoside-fo__alertstripe--innhold">
                    <Normaltekst className="infoside-fo__alertstripe--tekst">{'Du har allerede bedt om mer veiledning fra NAV.'}</Normaltekst>
                    <a className="knapp knapp--hoved infoside-fo__alertstripe--knapp" href="/veientilarbeid">
                        {'Gå til oppfølging'}
                    </a>
                </div>
            </Alertstripe>
        </div>
    );
};

const VeilederRad = () => {
    const veilederpanelKompakt = window.matchMedia('(min-width: 768px)').matches;
    const veilederpanelType = veilederpanelKompakt ? 'normal' : 'plakat';
    return (
        <div className="infoside-fo__rad infoside-fo__rad--graa">
            <div className="begrensning">
                <Veilederpanel
                    svg={<img src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/infoside-fo/veileder-mann.svg`} alt="Veileder" className="nav-veilederpanel__illustrasjon" />}
                    type={veilederpanelType}
                    kompakt={veilederpanelKompakt}
                >
                    <div>
                        <Systemtittel className="blokk-xs">{getLedetekst('infoside-fo.intro-overskrift', { '%NAVN%': 'Kari' })}</Systemtittel>
                        <div
                            className="typo-normal"
                            dangerouslySetInnerHTML={getHtmlLedetekst('infoside-fo.intro-tekst',
                                { '%FRA_DATO%': '01.01.1970', '%TIL_DATO%': '01.01.1970' })}
                        />
                    </div>
                </Veilederpanel>
            </div>
        </div>
    );
};

const KommunikasjonRad = () => {
    return (
        <div className="infoside-fo__rad infoside-fo__rad--hvit">
            <div className="begrensning infoside-fo__info-bokser">
                <div className="infoside-fo__info-boks">
                    <img src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/infoside-fo/kontakt-arbeidsgiver.svg`} alt="" className="info-boks__illustrasjon" />
                    <Undertittel className="blokk-s">{getLedetekst('infoside-fo.kontakt-overskrift')}</Undertittel>
                    <Normaltekst>{getLedetekst('infoside-fo.kontakt-tekst')}</Normaltekst>
                </div>
                <div className="infoside-fo__info-boks">
                    <img src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/infoside-fo/mer-veiledning.svg`} alt="" className="info-boks__illustrasjon" />
                    <Undertittel className="blokk-s">{getLedetekst('infoside-fo.aktivitetsplan-overskrift')}</Undertittel>
                    <Normaltekst>{getLedetekst('infoside-fo.aktivitetsplan-tekst')}</Normaltekst>
                </div>
            </div>
        </div>
    );
};

const AapRad = () => {
    return (
        <div className="infoside-fo__rad infoside-fo__rad--graa">
            <div className="begrensning">
                <Undertittel className="blokk-m">{getLedetekst('infoside-fo.dinokonomi.tittel')}</Undertittel>
                <Element className="blokk-xxs">{getLedetekst('infoside-fo.stotte-overskrift')}</Element>
                <Normaltekst className="blokk-s">{getLedetekst('infoside-fo.stotte-tekst')}</Normaltekst>
                <Utvidbar className="blokk-s" tittel={getLedetekst('infoside-fo.arbeidsavklaring-overskrift')}>
                    <div dangerouslySetInnerHTML={getHtmlLedetekst('infoside-fo.arbeidsavklaring-tekst')} />
                </Utvidbar>
                <Element className="blokk-xxs">{getLedetekst('infoside-fo.forsikring-overskrift')}</Element>
                <Normaltekst>{getLedetekst('infoside-fo.forsikring-tekst')}</Normaltekst>
            </div>
        </div>
    );
};

const handleNeiBtnClicked = () => {
    // TODO: Legg til API-kall for å registrere knappetrykk
    history.push('/sykefravaer');
};

const handleJaBtnClicked = () => {
    // TODO: Legg til API-kall for å registrere knappetrykk
    window.location.href = '/arbeidssokerregistrering';
};

const TrengerMerVeiledningRad = () => {
    return (
        <div className="infoside-fo__rad infoside-fo__rad--hvit">
            <div className="begrensning">
                <Undertittel className="blokk-s">{getLedetekst('infoside-fo.veiledning-overskrift')}</Undertittel>
                <Normaltekst className="blokk-xs">{getLedetekst('infoside-fo.veiledning-tekst')}</Normaltekst>
                <div className="infoside-fo__knapperad">
                    <Knapp onClick={handleNeiBtnClicked}>
                        {getLedetekst('infoside-fo.knapp-nei')}
                    </Knapp>
                    <Hovedknapp onClick={handleJaBtnClicked}>
                        {getLedetekst('infoside-fo.knapp-ja')}
                    </Hovedknapp>
                </div>
            </div>
        </div>
    );
};

export default ArbeidsrettetOppfolging;
