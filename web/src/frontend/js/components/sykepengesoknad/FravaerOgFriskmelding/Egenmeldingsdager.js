import React, { PropTypes } from 'react';
import JaEllerNei from '../JaEllerNei';
import Periodevelger from '../../skjema/Periodevelger';
import { toDatePrettyPrint, getLedetekst } from 'digisyfo-npm';

const EgenmeldingsDager = ({ sykepengesoknad, ledetekster }) => {
    const tidligsteFom = new Date(sykepengesoknad.identdato);
    tidligsteFom.setMonth(tidligsteFom.getMonth() - 6);
    return (<JaEllerNei
        spoersmal={getLedetekst('sykepengesoknad.egenmeldingsdager.janei.sporsmal', ledetekster, {
            '%DATO%': toDatePrettyPrint(sykepengesoknad.identdato),
        })}
        name="bruktEgenmeldingsdagerFoerLegemeldtFravaer">
        <Periodevelger
            name="egenmeldingsperioder"
            spoersmal={getLedetekst('sykepengesoknad.egenmeldingsdager.dato.sporsmal', ledetekster)}
            tidligsteFom={tidligsteFom}
            senesteTom={sykepengesoknad.identdato} />
    </JaEllerNei>);
};

EgenmeldingsDager.propTypes = {
    sykepengesoknad: PropTypes.object.isRequired,
    ledetekster: PropTypes.object.isRequired,
};

export default EgenmeldingsDager;
