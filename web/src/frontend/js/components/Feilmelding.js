import React, { PropTypes } from 'react';

const Feilmelding = ({ tittel = 'Beklager, det oppstod en feil', melding = 'Vennligst prøv igjen litt senere.' }) => {
    return (<div className="feilmelding">
                <h1 className="hode hode-feil hode-undertittel hode-dekorert blokk">{tittel}</h1>
                <p>{melding}</p>
            </div>);
};

Feilmelding.propTypes = {
    tittel: PropTypes.string,
    melding: PropTypes.string,
};

export default Feilmelding;
