import React from 'react';
import PropTypes from 'prop-types';
import { keyValue } from '@navikt/digisyfo-npm';
import HendelseTittel from './HendelseTittel';
import HendelseBoble from './HendelseBoble';
import { tidslinjehendelse as hendelsePt } from './tidslinjePropTypes';

const filterToggles = (hendelse, toggleHendelseUke7, toggleHendelseUke17) => {
    return !((hendelse.antallDager === 49 && toggleHendelseUke7 === false) || (hendelse.antallDager === 119 && toggleHendelseUke17 === false));
};

const Tidslinje = ({ hendelser = [], ledetekster, arbeidssituasjon, setHendelseData, toggleHendelseUke7, toggleHendelseUke17 }) => {
    const nyNaermesteLederHendelseMedArbeidsgiver = (hendelse) => {
        return !(arbeidssituasjon === 'UTEN_ARBEIDSGIVER' && hendelse.type === 'NY_NAERMESTE_LEDER');
    };
    return (
        <div className="tidslinje">
            {
                hendelser
                    .filter(nyNaermesteLederHendelseMedArbeidsgiver)
                    .filter((hendelse) => { return filterToggles(hendelse, toggleHendelseUke7, toggleHendelseUke17); })
                    .filter((h) => {
                        return h.type !== 'AKTIVITETSKRAV_VARSEL';
                    })
                    .map((hendelse) => {
                        if (hendelse.type !== 'BOBLE' && hendelse.type !== 'NY_NAERMESTE_LEDER') {
                            return (
                                <HendelseTittel
                                    {...hendelse}
                                    key={hendelse.id}
                                    ledetekster={ledetekster}
                                />
                            );
                        }
                        return (
                            <HendelseBoble
                                hendelse={hendelse}
                                key={hendelse.id}
                                ledetekster={ledetekster}
                                setHendelseState={(data) => {
                                    setHendelseData(hendelse.id, data);
                                }}
                            />
                        );
                    })
            }
        </div>
    );
};

Tidslinje.propTypes = {
    hendelser: PropTypes.arrayOf(hendelsePt),
    ledetekster: keyValue,
    arbeidssituasjon: PropTypes.string,
    setHendelseData: PropTypes.func,
    toggleHendelseUke7: PropTypes.bool,
    toggleHendelseUke17: PropTypes.bool,
};

export default Tidslinje;
