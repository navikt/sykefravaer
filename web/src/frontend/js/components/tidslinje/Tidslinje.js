import React, { PropTypes } from 'react';
import HendelseTittel from './HendelseTittel';
import HendelseBoble from './HendelseBoble';
import TidslinjeVelgArbeidssituasjonContainer from '../../containers/TidslinjeVelgArbeidssituasjonContainer';
import { getLedetekst } from '../../ledetekster';

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
                hendelser.map((hendelse) => {
                    if (hendelse.type !== 'BOBLE' && hendelse.type !== 'AKTIVITETSKRAV_VARSEL') {
                        return <HendelseTittel {...hendelse} key={hendelse.id} ledetekster={ledetekster} />;
                    }
                    return (<HendelseBoble {...hendelse} key={hendelse.id} ledetekster={ledetekster} setHendelseState={(data) => {
                        setHendelseData(hendelse.id, data);
                    }} />);
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
