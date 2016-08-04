import React, { PropTypes } from 'react';
import Hendelse from './Hendelse.js';
import TidslinjeVelgArbeidssituasjonContainer from '../containers/TidslinjeVelgArbeidssituasjonContainer.js';
import { getLedetekst } from '../ledetekster';

const Tidslinje = ({ hendelser = [], ledetekster, arbeidssituasjon, setHendelseData }) => {
    return (<div>
        <header className="tidslinje-header">
            <h1>Tidslinjen</h1>
        </header>
        <p className="tidslinje-intro">
            {getLedetekst('tidslinje.introtekst', ledetekster)}
        </p>
        <TidslinjeVelgArbeidssituasjonContainer arbeidssituasjon={arbeidssituasjon} />
        <div className="tidslinje">
            {
                hendelser.map((hendelse, index) => {
                    return (
                        <Hendelse
                            {...hendelse}
                            key={index}
                            ledetekster={ledetekster}
                            setHendelseState={(data) => {
                                setHendelseData(hendelse.id, data);
                            }}
                            arbeidssituasjon={arbeidssituasjon}
                        />
                    );
                })
            }
        </div>
        </div>);
};

Tidslinje.propTypes = {
    hendelser: PropTypes.array,
    ledetekster: PropTypes.object,
    arbeidssituasjon: PropTypes.string,
    setHendelseData: PropTypes.func,
};

export default Tidslinje;
