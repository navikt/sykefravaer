import React, { PropTypes } from 'react';
import Milepael from './Milepael.js';

const Tidslinje = ({ milepaeler = [], ledetekster }) => {
    return (<div>
        <header className="tidslinje-header">
            <h1 className="tittel-dekorert">Tidslinjen</h1>
        </header>
        <div className="tidslinje">
            {
                milepaeler.map((milepael, index) => {
                    return (<Milepael {...milepael} key={index} ledetekster={ledetekster} />);
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
