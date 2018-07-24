import React from 'react';
import { getLedetekst, sykepengesoknad as sykepengesoknadPt } from 'digisyfo-npm';
import PropTypes from 'prop-types';
import Knapp from 'nav-frontend-knapper';

const GjenapneSoknad = ({ sykepengesoknad, gjenapneSoknad, gjenapner, gjenapneFeilet, tekst = getLedetekst('sykepengesoknad.gjenapne.knapp') }) => {
    return (<div>
        <div className={`verktoylinje ${gjenapneFeilet ? 'blokk--mini' : ''}`}>
            <div className="verktoylinje__element">
                <Knapp
                    type="standard"
                    spinner={gjenapner}
                    disabled={gjenapner}
                    mini
                    onClick={(e) => {
                        e.preventDefault();
                        gjenapneSoknad(sykepengesoknad.id);
                    }}
                    className="js-gjenapne">
                    {tekst}</Knapp>
            </div>
        </div>
        <div aria-live="polite">
            { gjenapneFeilet && <p className="skjemaelement__feilmelding">Beklager, søknaden kunne ikke gjenåpnes</p> }
        </div>
    </div>);
};

GjenapneSoknad.propTypes = {
    gjenapneSoknad: PropTypes.func,
    gjenapner: PropTypes.bool,
    gjenapneFeilet: PropTypes.bool,
    sykepengesoknad: sykepengesoknadPt,
    tekst: PropTypes.string,
};

export default GjenapneSoknad;
