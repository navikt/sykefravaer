import React, { PropTypes } from 'react';
import { getLedetekst } from '../../ledetekster';
import { toDatePrettyPrint } from '../../utils/datoUtils';
import HendelseIkon from './HendelseIkon';

const HendelseTittel = (props) => {
    let titteltekst = getLedetekst(`${props.tekstkey}`, props.ledetekster);
    if (props.type === 'FØRSTE_SYKMELDINGSDAG') {
        titteltekst = getLedetekst(`${props.tekstkey}`, props.ledetekster, {
            '%DATO%': toDatePrettyPrint(props.data.startdato),
        });
    }

    return (<div className="hendelse hendelse-rad js-hendelse">
        <div className="hendelse-status">
            <HendelseIkon type={props.type} />
        </div>
        <div className="hendelse-innhold">
            <div className="tidslinje-tittel">
                <h2>{titteltekst}</h2>
            </div>
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
