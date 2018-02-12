import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from 'digisyfo-npm';
import Arbeidssituasjon from '../../components/landingsside/Arbeidssituasjon';
import NaermesteLederContainer from '../../containers/landingsside/NaermesteLederContainer';

export function mapArbeidssituasjonTilIkonSrc(arbeidssituasjon) {
    const base = '/sykefravaer/img/svg/landingsside/';
    switch (arbeidssituasjon) {
        case 'Arbeidstaker':
            return `${base}arbeidsgiver.svg`;
        case 'Selvstendig næringsdrivende':
        case 'Frilanser':
            return `${base}id-kort.svg`;
        default:
            return `${base}skilt.svg`;
    }
}

export const Arbeidsgiver = ({ arbeidsgiver }) => {
    return (<div className="situasjon__innhold">
        <p className="situasjon__tittel">
            {getLedetekst('din-situasjon.ansatt', {
                '%ORGANISASJONSNAVN%': arbeidsgiver,
            })}
        </p>
        <NaermesteLederContainer organisasjonsnavn={arbeidsgiver} />
    </div>);
};

const Arbeidssituasjoner = ({ arbeidsgivere, arbeidssituasjoner }) => {
    return (
        <div className="arbeidssituasjon-panel">
            {arbeidsgivere.map((arbeidsgiver, index) => {
                return (
                    <Arbeidssituasjon
                        key={arbeidsgiver}
                        className={index > 0 ? 'situasjon__arbeidsgiver-border' : ''}
                        ikonSrc={mapArbeidssituasjonTilIkonSrc('Arbeidstaker')}
                        ikonAlt="Arbeidstaker"
                        situasjon={<Arbeidsgiver arbeidsgiver={arbeidsgiver} />}
                    />);
            })}
            {arbeidssituasjoner.map((arbeidssituasjon) => {
                return (
                    <Arbeidssituasjon
                        key={arbeidssituasjon}
                        className="situasjon__margin"
                        ikonSrc={mapArbeidssituasjonTilIkonSrc(arbeidssituasjon)}
                        ikonAlt={arbeidssituasjon}
                        situasjon={<p className="situasjon__tittel">{arbeidssituasjon}</p>} />
                );
            })}
        </div>
    );
};

Arbeidsgiver.propTypes = {
    arbeidsgiver: PropTypes.string,
};

Arbeidssituasjoner.propTypes = {
    arbeidsgivere: PropTypes.arrayOf(PropTypes.string),
    arbeidssituasjoner: PropTypes.arrayOf(PropTypes.string),
};

export default Arbeidssituasjoner;
