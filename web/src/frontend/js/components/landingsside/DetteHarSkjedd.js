import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { getLedetekst, toDatePrettyPrint } from 'digisyfo-npm';
import Landingspanel from './Landingspanel';
import { hendelse } from '../../propTypes';

const DetteHarSkjedd = ({ hendelser }) => {
    return (<Landingspanel tittel={getLedetekst('sykefravaer.dette-har-skjedd.tittel')} ikon="/sykefravaer/img/svg/landingsside/hake.svg" ikonAlt="Hake">
        <ol className="inngangsliste">
            {
                hendelser.map((h, index) => {
                    return (<li key={index}>
                        <strong className="inngangsliste__meta">{toDatePrettyPrint(h.inntruffetdato)} </strong>
                        <Link to="/sykefravaer/aktivitetsplikt">
                            {getLedetekst(`sykefravaer.dette-har-skjedd.${h.type}`)}
                        </Link>
                    </li>);
                })
            }
        </ol>
    </Landingspanel>);
};

DetteHarSkjedd.propTypes = {
    hendelser: PropTypes.arrayOf(hendelse),
};

export default DetteHarSkjedd;
