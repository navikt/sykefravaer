import React, { PropTypes } from 'react';
import HendelseTittel from './HendelseTittel';
import HendelseBoble from './HendelseBoble';
import TidslinjeVelgArbeidssituasjonContainer from '../../containers/TidslinjeVelgArbeidssituasjonContainer';
import { getLedetekst } from 'digisyfo-npm';
import Sidetopp from '../Sidetopp';

const Tidslinje = ({ hendelser = [], ledetekster, arbeidssituasjon, setHendelseData }) => {
    const htmlIntro = {
        __html: `<p>${getLedetekst('tidslinje.introtekst', ledetekster)}</p>`,
    };
    return (<div>
        <Sidetopp tittel="Tidslinjen" htmlTekst={htmlIntro} />
        <TidslinjeVelgArbeidssituasjonContainer arbeidssituasjon={arbeidssituasjon} />
        <div className="tidslinje">
            {
                hendelser
                .filter((hendelse) => {
                    return hendelse.type !== 'NY_NAERMESTE_LEDER';
                    // Skjuler dette til vi har navn på leder på plass
                })
                .map((hendelse) => {
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
