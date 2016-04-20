import React, { PropTypes } from 'react';

const Feilmelding = ({ tittel, melding }) => {
    return (<div className="panel typo-infotekst panel-melding">
                <h1 className="hode hode-feil hode-innholdstittel hode-dekorert blokk">{tittel}</h1>
                <p>{melding}</p>
            </div>);
};

Feilmelding.propTypes = {
    tittel: PropTypes.string,
    melding: PropTypes.string,
};

export default Feilmelding;
