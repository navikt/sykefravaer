import React, { PropTypes } from 'react';
import { getLedetekst } from '../../ledetekster';
import { toDatePrettyPrint } from '../../utils';
import HendelseIkon from './HendelseIkon';

const HendelseTittel = (props) => {
    let titteltekst = getLedetekst(`${props.tekstkey}`, props.ledetekster);
    if (props.type === 'FØRSTE_SYKMELDINGSDAG') {
        titteltekst = getLedetekst(`${props.tekstkey}`, props.ledetekster, {
            '%DATO%': toDatePrettyPrint(props.data.startdato),
        });
    }

    return (<div className="tidslinjeHendelse tidslinjeHendelse__rad js-hendelse">
        <div className="tidslinjeHendelse__status">
            <HendelseIkon type={props.type} />
        </div>
        <div className="tidslinjeHendelse__innhold">
            <h2 className="tidslinjeHendelse__tittel">
                {titteltekst}
            </h2>
        </div>
    </div>);
};

HendelseTittel.propTypes = {
    erApen: PropTypes.bool,
    ledetekster: PropTypes.object,
    type: PropTypes.string,
    tekstkey: PropTypes.string,
    data: PropTypes.object,
};

export default HendelseTittel;
