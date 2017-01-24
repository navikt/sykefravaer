import React from 'react';
import JaEllerNei from '../JaEllerNei';
import Datovelger from '../../skjema/Datovelger';

const GjenopptattArbeidFulltUt = () => {
    return (<JaEllerNei
        spoersmal="Har du gjenopptatt arbeidet ditt hos SOLSTRÅLEN BARNEHAGE fullt ut?"
        name="harGjenopptattArbeidFulltUt">
        <label htmlFor="gjenopptattArbeidFulltUtDato" className="skjema__sporsmal">Når gjorde du det?</label>
        <Datovelger id="gjenopptattArbeidFulltUtDato" name="gjenopptattArbeidFulltUtDato" />
    </JaEllerNei>);
};

export default GjenopptattArbeidFulltUt;
