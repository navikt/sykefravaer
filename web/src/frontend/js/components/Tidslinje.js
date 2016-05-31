import React, { PropTypes } from 'react';
import Milepael from './Milepael.js';
import TidslinjeVelgArbeidssituasjonContainer from '../containers/TidslinjeVelgArbeidssituasjonContainer.js';
import { getLedetekst } from '../ledetekster';

const Tidslinje = ({ milepaeler = [], ledetekster }) => {
    return (<div>
        <header className="tidslinje-header">
            <h1 className="tittel-dekorert">Tidslinjen</h1>
        </header>
        <p className="typo-infotekst tidslinje-intro">{getLedetekst('tidslinje.introtekst', ledetekster)}</p>
        <TidslinjeVelgArbeidssituasjonContainer />
        <div className="tidslinje">
            {
                milepaeler.map((milepael) => {
                    return (<Milepael {...milepael} key={milepael.key} ledetekster={ledetekster} />);
                })
            }
        </div>
        </div>);
};

Tidslinje.propTypes = {
    milepaeler: PropTypes.array,
    ledetekster: PropTypes.object,
};

export default Tidslinje;
