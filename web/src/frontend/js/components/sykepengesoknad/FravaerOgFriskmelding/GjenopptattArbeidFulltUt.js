import React from 'react';
import { getLedetekst, tidligsteFom, senesteTom, toDatePrettyPrint } from 'digisyfo-npm';
import JaEllerNei from '../JaEllerNei';
import Datovelger from '../../skjema/Datovelger';
import { sykepengesoknad as sykepengesoknadPt } from '../../../propTypes';

const GjenopptattArbeidFulltUt = ({ sykepengesoknad }) => {
    const perioder = sykepengesoknad.aktiviteter.map((aktivitet) => {
        return aktivitet.periode;
    });
    return (<JaEllerNei
        spoersmal={getLedetekst('sykepengesoknad.gjenopptatt-arbeid-fullt-ut.janei.sporsmal-2', {
            '%ARBEIDSGIVER%': sykepengesoknad.arbeidsgiver.navn,
            '%DATO%': toDatePrettyPrint(senesteTom(perioder)),
        })}
        name="harGjenopptattArbeidFulltUt">
        <div>
            <label htmlFor="gjenopptattArbeidFulltUtDato" className="skjema__sporsmal">
                {getLedetekst('sykepengesoknad.gjenopptatt-arbeid-fullt-ut.dato.sporsmal')}
            </label>
            <Datovelger id="gjenopptattArbeidFulltUtDato" name="gjenopptattArbeidFulltUtDato" tidligsteFom={tidligsteFom(perioder)} senesteTom={senesteTom(perioder)} />
        </div>
    </JaEllerNei>);
};

GjenopptattArbeidFulltUt.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

export default GjenopptattArbeidFulltUt;
