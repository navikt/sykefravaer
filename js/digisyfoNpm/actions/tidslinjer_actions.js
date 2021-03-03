import * as actiontyper from './actiontyper';
import { TIDSLINJE_TYPER } from '../utils/tidslinjeUtils';

export function hentTidslinjer(apneHendelseIder = [], arbeidssituasjon = TIDSLINJE_TYPER.MED_ARBEIDSGIVER, sykeforloep = []) {
    return {
        type: actiontyper.HENT_TIDSLINJER_FORESPURT,
        apneHendelseIder,
        arbeidssituasjon,
        sykeforloep,
    };
}

export function setTidslinjer(arbeidssituasjon, sykeforloep = []) {
    return {
        type: actiontyper.SET_TIDSLINJER,
        arbeidssituasjon,
        sykeforloep,
    };
}
