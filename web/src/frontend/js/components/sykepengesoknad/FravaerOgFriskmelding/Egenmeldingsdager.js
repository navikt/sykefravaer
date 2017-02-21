import React, { PropTypes } from 'react';
import JaEllerNei from '../JaEllerNei';
import Periodevelger from '../../skjema/Periodevelger';
import { Hjelpetekst, toDatePrettyPrint, getLedetekst } from 'digisyfo-npm';
import * as periodeUtils from '../../../utils/periodeUtils';

const EgenmeldingsDager = ({ sykepengesoknad, ledetekster }) => {
    const perioder = sykepengesoknad.aktiviteter.map((aktivitet) => {
        return aktivitet.periode;
    });
    const tidligsteFom = periodeUtils.tidligsteFom(perioder);

    const hjelpetekst = (<Hjelpetekst
        id="velg-arbeidssituasjon-hjelpetekst"
        tittel={getLedetekst('sykepengesoknad.egenmeldingsdager.hjelpetekst.tittel', ledetekster)}
        tekst={getLedetekst('sykepengesoknad.egenmeldingsdager.hjelpetekst.tekst', ledetekster)} />);

    return (
        <JaEllerNei
            spoersmal={getLedetekst('sykepengesoknad.egenmeldingsdager.janei.sporsmal', ledetekster, {
                '%DATO%': toDatePrettyPrint(sykepengesoknad.identdato),
            })}
            name="bruktEgenmeldingsdagerFoerLegemeldtFravaer"
            hjelpetekst={hjelpetekst}>
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
