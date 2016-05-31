import React, { PropTypes } from 'react';
import Milepael from './Milepael.js';
import TidslinjeVelgArbeidssituasjonContainer from '../containers/TidslinjeVelgArbeidssituasjonContainer.js';

const Tidslinje = ({ milepaeler = [], ledetekster }) => {
    return (<div>
        <header className="tidslinje-header">
            <h1 className="tittel-dekorert">Tidslinjen</h1>
        </header>
        <p className="typo-infotekst tidslinje-intro">Mens du er sykmeldt har arbeidsgiveren din ansvar for å følge deg opp og tilrettelegge arbeidet. Derfor er det viktig at dere har tett kontakt. Du har plikt til å samarbeide om å finne løsninger og delta i aktivitet hvis du ikke er for syk.</p>
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
