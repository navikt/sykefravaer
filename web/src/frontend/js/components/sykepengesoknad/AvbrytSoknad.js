import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, getHtmlLedetekst, Varselstripe } from 'digisyfo-npm';

const Feilmelding = () => {
    return (<div className="panel panel--ramme panel--komprimert">
        <Varselstripe type="feil">
            <p className="sist">Beklager, det oppstod en feil! Prøv litt senere.</p>
        </Varselstripe>
    </div>);
};

const AvbrytSoknad = ({ avbryter, avbrytFeilet, avbrytHandler, bekreftHandler, sender }) => {
    return (<div className="avbrytDialog__dialog">
        <div className="snakkeboble">
            <p className="blokk--s" dangerouslySetInnerHTML={getHtmlLedetekst('sykepengesoknad.avbryt.sporsmal')} />
            <div role="alert" aria-live="polite">{ avbrytFeilet && <Feilmelding /> }</div>
            <div className="blokk--xs">
                <button
                    disabled={avbryter || sender}
                    className="js-bekreft knapp knapp--fare"
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        bekreftHandler();
                    }}>{getLedetekst('sykepengesoknad.avbryt.ja')}
                    { avbryter && <span className="knapp__spinner" /> }
                </button>
            </div>
            <p className="sist">
                <button
                    className="lenke js-avbryt"
                    onClick={(e) => {
                        e.preventDefault();
                        avbrytHandler();
                    }}>{getLedetekst('sykepengesoknad.avbryt.angre')}
                </button>
            </p>
        </div>
    </div>);
};

AvbrytSoknad.propTypes = {
    avbryter: PropTypes.bool,
    avbrytHandler: PropTypes.func,
    bekreftHandler: PropTypes.func,
    avbrytFeilet: PropTypes.bool,
    sender: PropTypes.bool,
};

export default AvbrytSoknad;
