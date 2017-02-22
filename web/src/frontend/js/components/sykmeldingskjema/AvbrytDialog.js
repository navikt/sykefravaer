import React, { PropTypes } from 'react';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';

const AvbrytDialog = ({ ledetekster, avbryter, avbrytHandler, bekreftHandler }) => {
    return (<div className="panel panel-ekstra">
        <p className="blokk--s" dangerouslySetInnerHTML={getHtmlLedetekst('din-sykmelding.avbryt.spoersmal', ledetekster)} />
        <div className="blokk--xs">
            <button disabled={avbryter} className="js-bekreft knapp knapp--fare" type="button" onClick={(e) => {
                e.preventDefault();
                bekreftHandler();
            }}>{getLedetekst('din-sykmelding.avbryt.ja', ledetekster)}
                { avbryter && <span className="knapp__spinner" /> }
            </button>
        </div>
        <p className="sist">
            <a href="#" role="button" className="js-avbryt" onClick={(e) => {
                e.preventDefault();
                avbrytHandler();
            }}>{getLedetekst('din-sykmelding.avbryt.angre', ledetekster)}
            </a>
        </p>
    </div>);
};

AvbrytDialog.propTypes = {
    ledetekster: PropTypes.object,
    avbryter: PropTypes.bool,
    avbrytHandler: PropTypes.func,
    bekreftHandler: PropTypes.func,
};

export default AvbrytDialog;
