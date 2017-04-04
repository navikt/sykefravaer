import React, { PropTypes } from 'react';

const Feilmelding = ({ tittel = 'Beklager, det oppstod en feil', melding = 'Vennligst prøv igjen litt senere.' }) => {
    return (<div className="panel">
        <div className="hode hode--feil">
            <h1 className="hode__tittel">{tittel}</h1>
            <p className="hode__melding">{melding}</p>
        </div>
    </div>);
};

Feilmelding.propTypes = {
    tittel: PropTypes.string,
    melding: PropTypes.string,
};

export default Feilmelding;
