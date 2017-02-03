import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const StartIgjen = ({ sykepengesoknad }) => {
    return (<div className="panel">
        <h1 className="hode hode-informasjon hode-undertittel hode-dekorert blokk">Oops, nå har vi mistet dataene dine</h1>
        <div>
            <p>Derfor må du dessverre <Link to={`/sykefravaer/soknader/${sykepengesoknad.id}`}>fylle ut søknaden på nytt</Link>.</p>
        </div>
    </div>);
};

StartIgjen.propTypes = {
    sykepengesoknad: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }),
};

export default StartIgjen;
