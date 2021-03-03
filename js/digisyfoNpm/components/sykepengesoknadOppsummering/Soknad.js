import React from 'react';
import SoknadOppsummering, { Sporsmal, Tilleggstekst } from './Oppsummering';
import { oppsummeringsoknad as oppsummeringsoknadPt } from '../../propTypes';

export const VaerKlarOverAt = ({ oppsummeringsoknad }) => {
    return (<Tilleggstekst tilleggstekst={oppsummeringsoknad.vaerKlarOverAt} stylingklasser="js-vaer-klar-over-at" />);
};

VaerKlarOverAt.propTypes = {
    oppsummeringsoknad: oppsummeringsoknadPt,
};

export const BekreftetKorrektInformasjon = ({ oppsummeringsoknad }) => {
    return <Sporsmal sporsmal={oppsummeringsoknad.bekreftetKorrektInformasjon} />;
};

BekreftetKorrektInformasjon.propTypes = {
    oppsummeringsoknad: oppsummeringsoknadPt,
};

export { SoknadOppsummering };
