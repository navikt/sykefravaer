import React from 'react';
import { Hjelpetekst, toDatePrettyPrint, getLedetekst } from 'digisyfo-npm';
import JaEllerNei from '../JaEllerNei';
import Periodevelger from '../../skjema/Periodevelger';
import { sykepengesoknad as sykepengesoknadPt } from '../../../propTypes';

const EgenmeldingsDager = ({ sykepengesoknad }) => {
    const identdato = sykepengesoknad.identdato;
    const senesteTom = new Date(identdato);
    senesteTom.setDate(identdato.getDate() - 1);
    const tidligsteFom = new Date(senesteTom);
    tidligsteFom.setMonth(senesteTom.getMonth() - 6);

    const hjelpetekst = (<Hjelpetekst
        id="egenmeldingsdager-hjelpetekst"
        tittel={getLedetekst('sykepengesoknad.egenmeldingsdager.hjelpetekst.tittel')}
        tekst={getLedetekst('sykepengesoknad.egenmeldingsdager.hjelpetekst.tekst', {
            '%DATO%': toDatePrettyPrint(identdato),
        })} />);

    return (
        <JaEllerNei
            spoersmal={getLedetekst('sykepengesoknad.egenmeldingsdager.janei.sporsmal', {
                '%DATO%': toDatePrettyPrint(identdato),
            })}
            name="bruktEgenmeldingsdagerFoerLegemeldtFravaer"
            hjelpetekst={hjelpetekst}>
            <Periodevelger
                name="egenmeldingsperioder"
                spoersmal={getLedetekst('sykepengesoknad.egenmeldingsdager.dato.sporsmal')}
                tidligsteFom={tidligsteFom}
                senesteTom={senesteTom} />
        </JaEllerNei>);
};

EgenmeldingsDager.propTypes = {
    sykepengesoknad: sykepengesoknadPt.isRequired,
};

export default EgenmeldingsDager;
