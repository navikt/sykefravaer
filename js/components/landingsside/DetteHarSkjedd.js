import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { getLedetekst, tilLesbarDatoMedArstall } from '@navikt/digisyfo-npm';
import Landingspanel from './Landingspanel';
import { hendelse } from '../../propTypes';

const DetteHarSkjedd = ({ hendelser }) => {
    return (<Landingspanel tittel={getLedetekst('sykefravaer.dette-har-skjedd.tittel')} ikon={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/landingsside/hake.svg`} ikonAlt="Hake">
        <ol className="inngangsliste">
            {
                hendelser.map((h, index) => {
                    return (<li className="js-hendelse" key={index}>
                        <strong className="inngangsliste__meta">{tilLesbarDatoMedArstall(h.inntruffetdato)} </strong>
                        <Link to={`${process.env.REACT_APP_CONTEXT_ROOT}/aktivitetsplikt`}>
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
