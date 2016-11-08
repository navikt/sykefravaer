import React, { PropTypes } from 'react';
import HendelseTittel from './HendelseTittel';
import HendelseBoble from './HendelseBoble';
import { getLedetekst } from 'digisyfo-npm';

const Tidslinje = ({ hendelser = [], ledetekster, arbeidssituasjon, setHendelseData }) => {
    const nyNaermesteLederHendelseMedArbeidsgiver = (hendelse) => {
        return !(arbeidssituasjon === 'UTEN_ARBEIDSGIVER' && hendelse.type === 'NY_NAERMESTE_LEDER');
    };
    return (<div className="tidslinje">
            {
                hendelser
                    .filter(nyNaermesteLederHendelseMedArbeidsgiver)
                .map((hendelse) => {
                    if (hendelse.type !== 'BOBLE' && hendelse.type !== 'AKTIVITETSKRAV_VARSEL' && hendelse.type !== 'NY_NAERMESTE_LEDER') {
                        return <HendelseTittel {...hendelse} key={hendelse.id} ledetekster={ledetekster} />;
                    }
                    return (<HendelseBoble hendelse={hendelse} key={hendelse.id} ledetekster={ledetekster}
                        setHendelseState={(data) => {
                            setHendelseData(hendelse.id, data);
                        }} />);
                })
            }
        </div>);
};

Tidslinje.propTypes = {
    hendelser: PropTypes.array,
    ledetekster: PropTypes.object,
    arbeidssituasjon: PropTypes.string,
    setHendelseData: PropTypes.func,
};

export default Tidslinje;
