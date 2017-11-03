import React from 'react';
import { getLedetekst } from 'digisyfo-npm';
import {
    OppfolgingsdialogInfoboks,
} from 'oppfolgingsdialog-npm';
import { getContextRoot } from '../../routers/paths';

const IngenledereInfoboks = () => {
    return (<OppfolgingsdialogInfoboks
        svgUrl={`${getContextRoot()}/img/svg/oppfolgingsdialog-ingenleder.svg`}
        svgAlt="Ingen Leder"
        tittel={getLedetekst('oppfolgingsdialog.arbeidstaker.ingenledereInfoboks.tittel')}
        tekst={getLedetekst('oppfolgingsdialog.arbeidstaker.ingenledereInfoboks.tekst')}
    />);
};

export default IngenledereInfoboks;
