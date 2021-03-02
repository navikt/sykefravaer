import React from 'react';
import PropTypes from 'prop-types';
import {
    getLedetekst,
    keyValue,
    tilLesbarDatoMedArstall,
} from '../digisyfoNpm';
import HendelseIkon from './HendelseIkon';

const HendelseTittel = ({ data, ledetekster, tekstkey, type }) => {
    let titteltekst = getLedetekst(`${tekstkey}`, ledetekster);
    if (type === 'FØRSTE_SYKMELDINGSDAG') {
        titteltekst = getLedetekst(`${tekstkey}`, ledetekster, {
            '%DATO%': tilLesbarDatoMedArstall(data.startdato),
        });
    }

    return (
        <div className="tidslinjeHendelse tidslinjeHendelse__rad js-hendelse">
            <div className="tidslinjeHendelse__status">
                <HendelseIkon type={type} />
            </div>
            <div className="tidslinjeHendelse__innhold">
                <h2 className="tidslinjeHendelse__tittel">
                    {titteltekst}
                </h2>
            </div>
        </div>
    );
};

HendelseTittel.propTypes = {
    ledetekster: keyValue,
    type: PropTypes.string,
    tekstkey: PropTypes.string,
    data: PropTypes.shape({
        startdato: PropTypes.instanceOf(Date),
    }),
};

export default HendelseTittel;
