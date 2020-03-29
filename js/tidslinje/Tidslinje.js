import React from 'react';
import PropTypes from 'prop-types';
import { keyValue } from '@navikt/digisyfo-npm';
import HendelseTittel from './HendelseTittel';
import HendelseBoble from './HendelseBoble';
import { tidslinjehendelse as hendelsePt } from './tidslinjePropTypes';

const filterToggles = (antallDager, visAktivitetskravInformasjon, visDialogmote2Informasjon) => {
    const erHendelseAktivitetsKravInformasjon = antallDager === 49 || antallDager === 55;
    const erHendelseDialogmoteInformasjon = antallDager === 119 || antallDager === 181;
    return !((erHendelseAktivitetsKravInformasjon && visAktivitetskravInformasjon === false) || (erHendelseDialogmoteInformasjon && visDialogmote2Informasjon === false));
};

const Tidslinje = ({ hendelser = [], ledetekster, arbeidssituasjon, setHendelseData, visAktivitetskravInformasjon, visDialogmote2Informasjon }) => {
    const nyNaermesteLederHendelseMedArbeidsgiver = (hendelse) => {
        return !(arbeidssituasjon === 'UTEN_ARBEIDSGIVER' && hendelse.type === 'NY_NAERMESTE_LEDER');
    };
    return (
        <div className="tidslinje">
            {
                hendelser
                    .filter(nyNaermesteLederHendelseMedArbeidsgiver)
                    .filter((hendelse) => { return filterToggles(hendelse.antallDager, visAktivitetskravInformasjon, visDialogmote2Informasjon); })
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
    visAktivitetskravInformasjon: PropTypes.bool,
    visDialogmote2Informasjon: PropTypes.bool,
};

export default Tidslinje;
