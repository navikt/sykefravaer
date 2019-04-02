import React from 'react';
import PropTypes from 'prop-types';
import Knapp from 'nav-frontend-knapper';
import { soknadPt } from '../../../propTypes/index';
import ConnectedEttersending from '../ettersending/Ettersending';

const EndreSoknad = ({ soknad, endreSoknad, endrer, endringFeilet, tekst = 'Endre søknad', vis }) => {
    return vis ? (<div>
        <div className={`verktoylinje ${endringFeilet ? 'blokk--mini' : ''}`}>
            <Knapp
                type="standard"
                spinner={endrer}
                disabled={endrer}
                mini
                onClick={(e) => {
                    e.preventDefault();
                    endreSoknad(soknad.id);
                }}
                className="js-endre verktoylinje__element">
                {tekst}
            </Knapp>
            <ConnectedEttersending
                manglendeDato="sendtTilNAVDato"
                ledetekstKeySuffix="send-til-nav"
                sykepengesoknad={soknad} />
            <ConnectedEttersending
                manglendeDato="sendtTilArbeidsgiverDato"
                ledetekstKeySuffix="send-til-arbeidsgiver"
                sykepengesoknad={soknad} />
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
