import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';

const AvbrytDialog = ({ avbryter, avbrytHandler, bekreftHandler }) => {
    return (<div className="snakkeboble">
        <p className="blokk--s" dangerouslySetInnerHTML={getHtmlLedetekst('din-sykmelding.avbryt.spoersmal')} />
        <div className="blokk--xs">
            <button disabled={avbryter} className="js-bekreft knapp knapp--fare" type="button" onClick={(e) => {
                e.preventDefault();
                bekreftHandler();
            }}>{getLedetekst('din-sykmelding.avbryt.ja')}
                { avbryter && <span className="knapp__spinner" /> }
            </button>
        </div>
        <p className="sist">
            <button className="lenke js-avbryt" onClick={(e) => {
                e.preventDefault();
                avbrytHandler();
            }}>{getLedetekst('din-sykmelding.avbryt.angre')}
            </button>
        </p>
    </div>);
};

AvbrytDialog.propTypes = {
    avbryter: PropTypes.bool,
    avbrytHandler: PropTypes.func,
    bekreftHandler: PropTypes.func,
};

export default AvbrytDialog;
