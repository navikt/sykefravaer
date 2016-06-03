import React, { PropTypes } from 'react';
import Milepael from './Milepael.js';
import TidslinjeVelgArbeidssituasjonContainer from '../containers/TidslinjeVelgArbeidssituasjonContainer.js';
import { getLedetekst } from '../ledetekster';

const Tidslinje = ({ milepaeler = [], ledetekster, arbeidssituasjon }) => {
    return (<div>
        <header className="tidslinje-header">
            <h1 className="tittel-dekorert">Tidslinjen</h1>
        </header>
        <TidslinjeVelgArbeidssituasjonContainer arbeidssituasjon={arbeidssituasjon} />
        <p className="tidslinje-intro">
            {getLedetekst('tidslinje.introtekst', ledetekster)}
        </p>
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
    arbeidssituasjon: PropTypes.string,
};

export default Tidslinje;
