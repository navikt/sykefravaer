import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, arbeidssituasjoner as situasjoner } from '@navikt/digisyfo-npm';
import classNames from 'classnames';
import Arbeidssituasjon from './Arbeidssituasjon';
import NaermesteLederContainer from './NaermesteLederContainer';

const { ARBEIDSTAKER, NAERINGSDRIVENDE, FRILANSER } = situasjoner;

export function mapArbeidssituasjonTilIkonSrc(arbeidssituasjon) {
    const base = `${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/landingsside/`;
    switch (arbeidssituasjon) {
        case ARBEIDSTAKER:
            return `${base}arbeidsgiver.svg`;
        case NAERINGSDRIVENDE:
        case FRILANSER:
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
                        className={classNames({ situasjon__arbeidsgiver: index > 0 })}
                        ikonSrc={mapArbeidssituasjonTilIkonSrc(ARBEIDSTAKER)}
                        ikonAlt={getLedetekst(`din-situasjon.${ARBEIDSTAKER}`)}
                        situasjon={<Arbeidsgiver arbeidsgiver={arbeidsgiver} />}
                    />);
            })}
            {arbeidssituasjoner.map((arbeidssituasjon) => {
                const arbeidssituasjonLedetekst = getLedetekst(`din-situasjon.${arbeidssituasjon}`);
                return (
                    <Arbeidssituasjon
                        key={arbeidssituasjon}
                        className="situasjon__arbeidssituasjon"
                        ikonSrc={mapArbeidssituasjonTilIkonSrc(arbeidssituasjon)}
                        ikonAlt={arbeidssituasjonLedetekst}
                        situasjon={<p className="situasjon__tittel">{arbeidssituasjonLedetekst}</p>} />
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
