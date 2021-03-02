/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { tilLesbarDatoMedArstall } from '../../utils';
import { getLedetekst } from '../../ledetekster';
import HendelseIkon from './HendelseIkon';
import { keyValue } from '../../propTypes';

const HendelseTittel = (props) => {
    let titteltekst = getLedetekst(`${props.tekstkey}`, props.ledetekster);
    if (props.type === 'FØRSTE_SYKMELDINGSDAG') {
        titteltekst = getLedetekst(`${props.tekstkey}`, props.ledetekster, {
            '%DATO%': tilLesbarDatoMedArstall(props.data.startdato),
        });
    }

    return (
        <div className="tidslinjeHendelse tidslinjeHendelse__rad js-hendelse">
            <div className="tidslinjeHendelse__status">
                <HendelseIkon type={props.type} />
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
