import React, { PropTypes } from 'react';
import JaEllerNei from '../JaEllerNei';
import Periodevelger from '../../skjema/Periodevelger';
import { Hjelpetekst, toDatePrettyPrint, getLedetekst } from 'digisyfo-npm';

const EgenmeldingsDager = ({ sykepengesoknad, ledetekster }) => {
    const identdato = sykepengesoknad.identdato;
    const senesteTom = new Date(identdato);
    senesteTom.setDate(identdato.getDate() - 1);
    const tidligsteFom = new Date(senesteTom);
    tidligsteFom.setMonth(senesteTom.getMonth() - 6);

    const hjelpetekst = (<Hjelpetekst
        id="egenmeldingsdager-hjelpetekst"
        tittel={getLedetekst('sykepengesoknad.egenmeldingsdager.hjelpetekst.tittel', ledetekster)}
        tekst={getLedetekst('sykepengesoknad.egenmeldingsdager.hjelpetekst.tekst', ledetekster)} />);

    return (
        <JaEllerNei
            spoersmal={getLedetekst('sykepengesoknad.egenmeldingsdager.janei.sporsmal', ledetekster, {
                '%DATO%': toDatePrettyPrint(identdato),
            })}
            name="bruktEgenmeldingsdagerFoerLegemeldtFravaer"
            hjelpetekst={hjelpetekst}>
            <Periodevelger
                name="egenmeldingsperioder"
                spoersmal={getLedetekst('sykepengesoknad.egenmeldingsdager.dato.sporsmal', ledetekster)}
                tidligsteFom={tidligsteFom}
                senesteTom={senesteTom} />
    </JaEllerNei>);
};

EgenmeldingsDager.propTypes = {
    sykepengesoknad: PropTypes.object.isRequired,
    ledetekster: PropTypes.object.isRequired,
};

export default EgenmeldingsDager;
