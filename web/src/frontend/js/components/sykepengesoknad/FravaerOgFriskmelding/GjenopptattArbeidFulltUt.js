import React from 'react';
import JaEllerNei from '../JaEllerNei';
import Datovelger from '../../skjema/Datovelger';
import { getLedetekst } from 'digisyfo-npm';
import { tidligsteFom, senesteTom } from '../../../utils/periodeUtils';
import { sykepengesoknad as sykepengesoknadPt } from '../../../propTypes';

const GjenopptattArbeidFulltUt = ({ sykepengesoknad }) => {
    const perioder = sykepengesoknad.aktiviteter.map((aktivitet) => {
        return aktivitet.periode;
    });
    return (<JaEllerNei
        spoersmal={getLedetekst('sykepengesoknad.gjenopptatt-arbeid-fullt-ut.janei.sporsmal', {
            '%ARBEIDSGIVER%': sykepengesoknad.arbeidsgiver.navn,
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
