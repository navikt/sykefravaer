import React from 'react';
import { getHtmlLedetekst, getLedetekst, Utvidbar } from 'digisyfo-npm';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import history from '../history';
import Sidetopp from './Sidetopp';

const ArbeidsrettetOppfolging = () => {
    return (
        <React.Fragment>
            <Sidetopp
                tittel={getLedetekst('infoside-fo.sidetittel')}
            />
            <div className="rad rad--graa">
                <Rad1 />
            </div>
            <div className="rad rad--hvit">
                <Rad2 />
            </div>
            <div className="rad rad--graa">
                <Rad3 />
            </div>
            <div className="rad rad--hvit">
                <Rad4 />
            </div>
        </React.Fragment>
    );
};

const Rad1 = () => {
    let veilederpanelType;
    let veilederpanelKompakt;
    if (window.matchMedia('(min-width: 768px)').matches) {
        veilederpanelType = 'normal';
        veilederpanelKompakt = true;
    } else {
        veilederpanelType = 'plakat';
        veilederpanelKompakt = false;
    }
    return (
        <div className="begrensning">
            <Veilederpanel
                svg={<img src="/sykefravaer/img/svg/infoside-fo/veileder-mann.svg" alt="Veileder" className="nav-veilederpanel__illustrasjon" />}
                type={veilederpanelType}
                kompakt={veilederpanelKompakt}
            >
                <div>
                    <h2>{getLedetekst('infoside-fo.intro-overskrift', { '%NAVN%': 'Kari' })}</h2>
                    <div dangerouslySetInnerHTML={getHtmlLedetekst('infoside-fo.intro-tekst',
                        { '%FRA_DATO%': 'FRA_DATO', '%TIL_DATO%': 'TIL_DATO' })} />
                </div>
            </Veilederpanel>
        </div>
    );
};

const Rad2 = () => {
    return (
        <div className="begrensning info-bokser">
            <div className="info-boks">
                <img src="/sykefravaer/img/svg/infoside-fo/kontakt-arbeidsgiver.svg" alt="" className="info-boks__illustrasjon" />
                <h2>{getLedetekst('infoside-fo.kontakt-overskrift')}</h2>
                <p>{getLedetekst('infoside-fo.kontakt-tekst')}</p>
            </div>

            <div className="info-boks">
                <img src="/sykefravaer/img/svg/infoside-fo/mer-veiledning.svg" alt="" className="info-boks__illustrasjon" />
                <h2 className="info-boks__aktivitetsplan--overskrift">{getLedetekst('infoside-fo.aktivitetsplan-overskrift')}</h2>
                <p>{getLedetekst('infoside-fo.aktivitetsplan-tekst')}</p>
            </div>
        </div>
    );
};

const Rad3 = () => {
    return (
        <div className="begrensning">
            <h3>{getLedetekst('infoside-fo.dinokonomi.tittel')}</h3>
            <h4>{getLedetekst('infoside-fo.stotte-overskrift')}</h4>
            <p>{getLedetekst('infoside-fo.stotte-tekst')}</p>
            <Utvidbar tittel={getLedetekst('infoside-fo.arbeidsavklaring-overskrift')}>
                <div dangerouslySetInnerHTML={getHtmlLedetekst('infoside-fo.arbeidsavklaring-tekst')} />
            </Utvidbar>
            <h4>{getLedetekst('infoside-fo.forsikring-overskrift')}</h4>
            <p>{getLedetekst('infoside-fo.forsikring-tekst')}</p>
        </div>
    );
};

const handleNeiBtnClicked = () => {
    // TODO: Fjern dialog
    history.push('/sykefravaer');
};

const handleJaBtnClicked = () => {
    // TODO: Fjern dialog
    history.push('/arbeidssokerregistrering');
};

const Rad4 = () => {
    return (
        <div className="begrensning">
            <h3>{getLedetekst('infoside-fo.veiledning-overskrift')}</h3>
            <p>{getLedetekst('infoside-fo.veiledning-tekst')}</p>
            <div className="knapperad">
                <Knapp onClick={handleNeiBtnClicked}>
                    {getLedetekst('infoside-fo.knapp-nei')}
                </Knapp>
                <Hovedknapp onClick={handleJaBtnClicked}>
                    {getLedetekst('infoside-fo.knapp-ja')}
                </Hovedknapp>
            </div>
        </div>
    );
};

export default ArbeidsrettetOppfolging;
