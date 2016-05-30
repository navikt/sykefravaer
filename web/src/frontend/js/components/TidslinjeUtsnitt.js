import React, { PropTypes } from 'react';
import Milepael from './Milepael.js';
import { Link } from 'react-router';
import { getLedetekst } from '../ledetekster/';

const TidslinjeUtsnitt = ({ milepaeler = [], ledetekster }) => {
    const preview = milepaeler.slice(0, 2);
    return (<div className="blokk">
        <div className="tidslinje-utsnitt">
            {
                preview.map((milepael, index) => {
                    return (<Milepael {...milepael} key={index} ledetekster={ledetekster} />);
                })
            }
            {
                milepaeler.length === 0 ? null :
                    <Link className="tidslinje-pille" to="/sykefravaer/app/tidslinjen">{getLedetekst('tidslinje-utsnitt.lenketekst', ledetekster)}</Link>
            }
        </div>
    </div>);
};

TidslinjeUtsnitt.propTypes = {
    milepaeler: PropTypes.array,
    ledetekster: PropTypes.object,
};

export default TidslinjeUtsnitt;
