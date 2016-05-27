import React, { PropTypes } from 'react';
import Milepael from './Milepael.js';

const Tidslinje = ({ tidspunkter = [], ledetekster }) => {
    return (<div>
        <header className="tidslinje-header">
            <h1 className="tittel-dekorert">Tidslinjen</h1>
        </header>
        <div className="tidslinje">
            {
                tidspunkter.map((tidspunkt, index) => {
                    return (<Milepael {...tidspunkt} key={index} ledetekster={ledetekster} />);
                })
            }
        </div>
        </div>);
};

Tidslinje.propTypes = {
    tidspunkter: PropTypes.array,
    ledetekster: PropTypes.object,
};

export default Tidslinje;
