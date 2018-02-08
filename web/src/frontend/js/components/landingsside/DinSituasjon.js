import React from 'react';
import { getLedetekst, Hjelpetekst } from 'digisyfo-npm';
import PropTypes from 'prop-types';
import Arbeidssituasjoner from '../../components/landingsside/Arbeidssituasjoner';

const DinSituasjon = ({ arbeidsgivere, arbeidssituasjoner }) => {
    return (
        <div className={'din-situasjon__panel'}>
            <header className="din-situasjon__header">
                <img
                    className="din-situasjon__ikon"
                    src="/sykefravaer/img/svg/landingsside/arbeidssituasjon.svg"
                    alt="Arbeidssituasjon" />
                <h2 className="din-situasjon__tittel">{getLedetekst('din-situasjon.tittel.2')}</h2>
                <Hjelpetekst
                    tittel={getLedetekst('din-situasjon.hjelpetekst.tittel')}
                    tekst={getLedetekst('din-situasjon.hjelpetekst.tekst')} />
            </header>
            <Arbeidssituasjoner arbeidsgivere={arbeidsgivere} arbeidssituasjoner={arbeidssituasjoner} />
        </div>);
};

DinSituasjon.propTypes = {
    arbeidsgivere: PropTypes.arrayOf(PropTypes.string),
    arbeidssituasjoner: PropTypes.arrayOf(PropTypes.string),
};

export default DinSituasjon;
