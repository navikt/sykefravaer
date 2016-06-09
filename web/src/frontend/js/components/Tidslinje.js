import React, { PropTypes } from 'react';
import Milepael from './Milepael.js';
import TidslinjeVelgArbeidssituasjonContainer from '../containers/TidslinjeVelgArbeidssituasjonContainer.js';
import { getLedetekst } from '../ledetekster';

const Tidslinje = ({ milepaeler = [], ledetekster, arbeidssituasjon, setMilepaeldata }) => {
    return (<div>
        <header className="tidslinje-header">
            <h1 className="tittel-dekorert">Tidslinjen</h1>
        </header>
        <p className="tidslinje-intro">
            {getLedetekst('tidslinje.introtekst', ledetekster)}
        </p>
        <TidslinjeVelgArbeidssituasjonContainer arbeidssituasjon={arbeidssituasjon} />
        <div className="tidslinje">
            {
                milepaeler.map((milepael) => {
                    return (<Milepael {...milepael} key={milepael.id} ledetekster={ledetekster} setMilepaelState={(data) => {
                        setMilepaeldata(milepael.id, data);
                    }} />);
                })
            }
        </div>
        </div>);
};

Tidslinje.propTypes = {
    milepaeler: PropTypes.array,
    ledetekster: PropTypes.object,
    arbeidssituasjon: PropTypes.string,
    setMilepaeldata: PropTypes.func,
};

export default Tidslinje;
