import React from 'react';
import PropTypes from 'prop-types';
import Knapp from 'nav-frontend-knapper';
import { soknad as soknadPt } from '../../propTypes';

const EndreSoknad = ({ soknad, endreSoknad, endrer, endringFeilet, tekst = 'Endre søknad', vis }) => {
    return vis ? (<div>
        <div className={`verktoylinje ${endringFeilet ? 'blokk--mini' : ''}`}>
            <div className="verktoylinje__element">
                <Knapp
                    type="standard"
                    spinner={endrer}
                    disabled={endrer}
                    mini
                    onClick={(e) => {
                        e.preventDefault();
                        endreSoknad(soknad.id);
                    }}
                    className="js-gjenapne">
                    {tekst}</Knapp>
            </div>
        </div>
        <div aria-live="polite">
            {endringFeilet && <p className="skjemaelement__feilmelding">Beklager, søknaden kunne ikke gjenåpnes</p>}
        </div>
    </div>) : null;
};

EndreSoknad.propTypes = {
    endreSoknad: PropTypes.func,
    endrer: PropTypes.bool,
    endringFeilet: PropTypes.bool,
    soknad: soknadPt,
    tekst: PropTypes.string,
    vis: PropTypes.bool,
};

export default EndreSoknad;
