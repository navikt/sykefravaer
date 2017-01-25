import React, { PropTypes } from 'react';
import JaEllerNei from '../JaEllerNei';
import Datovelger from '../../skjema/Datovelger';
import { getLedetekst } from 'digisyfo-npm';

const GjenopptattArbeidFulltUt = ({ sykepengesoknad, ledetekster }) => {
    return (<JaEllerNei
        spoersmal={getLedetekst('sykepengesoknad.gjenopptatt-arbeid-fullt-ut.janei.sporsmal', ledetekster, {
            '%ARBEIDSGIVER%': sykepengesoknad.arbeidsgiver.navn,
        })}
        name="harGjenopptattArbeidFulltUt">
        <div>
            <label htmlFor="gjenopptattArbeidFulltUtDato" className="skjema__sporsmal">{getLedetekst('sykepengesoknad.gjenopptatt-arbeid-fullt-ut.dato.sporsmal', ledetekster)}</label>
            <Datovelger id="gjenopptattArbeidFulltUtDato" name="gjenopptattArbeidFulltUtDato" />
        </div>
    </JaEllerNei>);
};

GjenopptattArbeidFulltUt.propTypes = {
    sykepengesoknad: PropTypes.object.isRequired,
    ledetekster: PropTypes.object.isRequired,
};

export default GjenopptattArbeidFulltUt;
