import Veilederpanel from 'nav-frontend-veilederpanel';
import { Systemtittel } from 'nav-frontend-typografi';
import { getHtmlLedetekst, getLedetekst } from '@navikt/digisyfo-npm';
import React from 'react';
import PropTypes from 'prop-types';
import { hentFornavn } from '../../utils';

const VeilederRad = ({ brukerNavn, maksDato }) => {
    const veilederpanelKompakt = window.matchMedia('(min-width: 768px)').matches;
    const veilederpanelType = veilederpanelKompakt ? 'normal' : 'plakat';
    const fornavn = hentFornavn(brukerNavn);

    return (
        <div className="infoside-fo__rad infoside-fo__rad--graa">
            <div className="begrensning">
                <Veilederpanel
                    svg={<img src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/infoside-fo/veileder-mann.svg`} alt="Veileder" className="nav-veilederpanel__illustrasjon" />}
                    type={veilederpanelType}
                    kompakt={veilederpanelKompakt}
                >
                    <div>
                        <Systemtittel className="blokk-xs">{getLedetekst('infoside-fo.intro.overskrift', { '%NAVN%': fornavn })}</Systemtittel>
                        <div
                            className="typo-normal"
                            dangerouslySetInnerHTML={getHtmlLedetekst('infoside-fo.intro.tekst', { '%DATO%': maksDato })}
                        />
                    </div>
                </Veilederpanel>
            </div>
        </div>
    );
};

VeilederRad.propTypes = {
    brukerNavn: PropTypes.string,
    maksDato: PropTypes.string,
};

export default VeilederRad;
