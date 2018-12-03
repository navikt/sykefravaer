import Veilederpanel from 'nav-frontend-veilederpanel';
import { Systemtittel } from 'nav-frontend-typografi';
import { getHtmlLedetekst, getLedetekst } from 'digisyfo-npm';
import React from 'react';

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

export default VeilederRad;
