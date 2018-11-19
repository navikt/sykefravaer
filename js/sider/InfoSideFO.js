import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import Feilmelding from '../components/Feilmelding';
import Side from './Side';
import AppSpinner from '../components/AppSpinner';

const veilederbilde = require('../../img/svg/infoside-fo/veileder-mann.svg');

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
            </div>
            <div className="rad rad--hvit">
                <div className="begrensning to-kol">
                    dobbel
                </div>
            </div>
            <div className="rad rad--graa">
                <div className="begrensning">
                    din økonomi
                </div>
            </div>
        </div>
    );
};
