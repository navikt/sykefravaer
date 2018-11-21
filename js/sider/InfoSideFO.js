import React from 'react';
import PropTypes from 'prop-types';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { connect } from 'react-redux';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import Feilmelding from '../components/Feilmelding';
import Side from './Side';
import AppSpinner from '../components/AppSpinner';

// const veilederBilde = require('../../img/svg/infoside-fo/veileder-mann.svg');
// const merVeiledningBilde = require('../../img/svg/infoside-fo/mer-veiledning.svg');
// const kontaktArbeidsgiverBilde = require('../../img/svg/infoside-fo/kontakt-arbeidsgiver.svg');

const InfoSideFO = ({ henter, hentingFeilet }) => {
    return (
        <Side tittel={getLedetekst('infoside-fo.sidetittel')} laster={henter} fullBredde>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    } else if (hentingFeilet) {
                        return (<Feilmelding />);
                    }
                    return (<ArbeidsrettetOppfolging />);
                })()
            }
        </Side>
    );
};

InfoSideFO.propTypes = {
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
};

export function mapStateToProps(state) {
    return {
        henter: state.ledetekster.henter,
        hentingFeilet: state.ledetekster.hentingFeilet,
    };
}

export default connect(mapStateToProps)(InfoSideFO);

const ArbeidsrettetOppfolging = () => {
    return (
        <div className="infoside-fo">
            <div className="sidebanner">
                <div className="sidebanner__innhold">
                    <h1 className="js-sidetittel sidebanner__tittel">
                        {getLedetekst('infoside-fo.sidetittel')}
                    </h1>
                    <img className="sidebanner__illustrasjon" src="/sykefravaer/img/svg/landingsside/konsultasjon.svg" alt="Konsultasjon" />
                </div>
            </div>
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
        </div>
    );
};

const Rad1 = () => {
    return (
        <div className="begrensning">
            <div className="nav-veilederpanel nav-veilederpanel--kompakt">
                <div className="nav-veileder nav-veileder--flytende">
                    <div className="nav-veileder__frame nav-veileder__frame--s">
                        <img src="/sykefravaer/img/svg/infoside-fo/veileder-mann.svg" alt="Veileder" />
                    </div>
                </div>
                <div>
                    <h2>{getLedetekst('infoside-fo.intro-overskrift', { '%NAVN%': 'Kari' })}</h2>
                    <div dangerouslySetInnerHTML={getHtmlLedetekst('infoside-fo.intro-tekst', { '%FRA_DATO%': new Date(), '%TIL_DATO%': new Date() })} />
                </div>
            </div>
        </div>
    );
};

const Rad2 = () => {
    return (
        <div className="begrensning to-kol">
            <div>
                <img src="/sykefravaer/img/svg/infoside-fo/mer-veiledning.svg" alt="" />
                <h2>{getLedetekst('infoside-fo.kontakt-overskrift')}</h2>
                <p>{getLedetekst('infoside-fo.kontakt-tekst')}</p>
            </div>

            <div>
                <img src="/sykefravaer/img/svg/infoside-fo/kontakt-arbeidsgiver.svg" alt="" />
                <h2>{getLedetekst('infoside-fo.aktivitetsplan-overskrift')}</h2>
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
            <Ekspanderbartpanel tittel={getLedetekst('infoside-fo.arbeidsavklaring-overskrift')} tittelProps="undertittel" border>
                <div dangerouslySetInnerHTML={getHtmlLedetekst('infoside-fo.arbeidsavklaring-tekst')} />
            </Ekspanderbartpanel>
            <h4>{getLedetekst('infoside-fo.forsikring-overskrift')}</h4>
            <p>{getLedetekst('infoside-fo.forsikring-tekst')}</p>
        </div>
    );
};

const Rad4 = () => {
    return (
        <div className="begrensning">
            <h3>{getLedetekst('infoside-fo.veiledning-overskrift')}</h3>
            <p>{getLedetekst('infoside-fo.veiledning-tekst')}</p>
            <div className="knapperad">
                <Knapp>
                    {getLedetekst('infoside-fo.knapp-nei')}
                </Knapp>
                <Hovedknapp>
                    {getLedetekst('infoside-fo.knapp-ja')}
                </Hovedknapp>
            </div>
        </div>
    );
};
