import React from 'react';
import { Link } from 'react-router';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';

const StartIgjen = ({ sykepengesoknad }) => {
    return (<div className="panel">
        <div className="hode hode--informasjon">
            <h1 className="hode__tittel">Oops, nå har vi mistet dataene dine</h1>
            <p className="hode__melding">Derfor må du dessverre <Link className="lenke" to={`/sykefravaer/soknader/${sykepengesoknad.id}`}>fylle ut søknaden på nytt</Link>.</p>
        </div>
    </div>);
};

StartIgjen.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

export default StartIgjen;
