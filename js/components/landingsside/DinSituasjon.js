import React from 'react';
import { getLedetekst } from '@navikt/digisyfo-npm';
import PropTypes from 'prop-types';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import Arbeidssituasjoner from '../../components/landingsside/Arbeidssituasjoner';

const DinSituasjon = ({ arbeidsgivere, arbeidssituasjoner }) => {
    return (
        <div className="landingspanel din-situasjon">
            <header className="din-situasjon__header">
                <img
                    className="din-situasjon__ikon"
                    src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/landingsside/arbeidssituasjon.svg`}
                    alt="Arbeidssituasjon" />
                <h2 className="din-situasjon__tittel">{getLedetekst('din-situasjon.tittel.2')}</h2>
                <Hjelpetekst>{getLedetekst('din-situasjon.hjelpetekst.tekst')}</Hjelpetekst>
            </header>
            <Arbeidssituasjoner arbeidsgivere={arbeidsgivere} arbeidssituasjoner={arbeidssituasjoner} />
        </div>);
};

DinSituasjon.propTypes = {
    arbeidsgivere: PropTypes.arrayOf(PropTypes.string),
    arbeidssituasjoner: PropTypes.arrayOf(PropTypes.string),
};

export default DinSituasjon;
