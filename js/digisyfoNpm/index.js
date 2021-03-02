import Ajax from 'simple-ajax';
import ArbeidsgiversSykmeldingOpplysninger from './components/sykmeldingOpplysninger/ArbeidsgiversSykmeldingOpplysninger';
import ArbeidsgiversNokkelopplysninger from './components/sykmeldingOpplysninger/ArbeidsgiversNokkelopplysninger';
import FlereOpplysninger from './components/sykmeldingOpplysninger/FlereOpplysninger';
import SykmeldingUtdrag from './components/sykepengesoknadOppsummering/SykmeldingUtdrag';
import Utvidbar from './components/Utvidbar';
import TimeoutBox from './components/timeout/TimeoutBox';
import SykmeldingPerioder from './components/sykmeldingOpplysninger/SykmeldingPerioder';
import ledetekster from './reducers/ledetekster';
import tidslinjer from './reducers/tidslinjer';
import toggles from './reducers/toggles';
import timeout from './reducers/timeout';
import sykeforlopsPerioder from './reducers/sykeforlopsPerioder';
import ledeteksterSagas from './sagas/ledeteksterSagas';
import tidslinjerSagas from './sagas/tidslinjerSagas';
import togglesSagas from './sagas/togglesSagas';
import sykeforlopsPerioderSagas from './sagas/sykeforlopsPerioderSagas';
import Tidslinje from './components/tidslinje/Tidslinje';
import TidslinjeVelgArbeidssituasjon from './components/tidslinje/TidslinjeVelgArbeidssituasjon';
import { TIDSLINJE_TYPER } from './utils/tidslinjeUtils';
import Radiofaner from './components/Radiofaner';
import { Bjorn } from './components/Hjelpeboble';
import Stegnavigasjon from './components/Stegnavigasjon';
import DineSykmeldingOpplysninger from './components/sykmeldingOpplysninger/DineSykmeldingOpplysninger';
import DineKoronaSykmeldingOpplysninger from './components/sykmeldingOpplysninger/DineKoronaSykmeldingOpplysninger';
import Video from './components/Video';
import { get, post } from '../data/gateway-api';

export { ArbeidsgiversSykmeldingOpplysninger };
export { ArbeidsgiversNokkelopplysninger };
export { FlereOpplysninger };
export { DineSykmeldingOpplysninger };
export { DineKoronaSykmeldingOpplysninger };
export { SykmeldingUtdrag };
export { Utvidbar };
export { Video };
export * from './components/sykmeldingOpplysninger/SykmeldingOpplysning';
export { SykmeldingPerioder };
export * from './ledetekster';
export * from './actions/hendelser_actions';
export * from './actions/ledetekster_actions';
export * from './actions/tidslinjer_actions';
export * from './actions/toggles_actions';
export * from './actions/timeout_actions';
export * from './actions/actiontyper';
export * from './actions/sykeforlopsPerioder_actions';
export * from './propTypes';
export * from './utils';
export { ledetekster };
export { tidslinjer };
export { toggles };
export { timeout };
export { sykeforlopsPerioder };
export { ledeteksterSagas };
export { tidslinjerSagas };
export { sykeforlopsPerioderSagas };
export { Tidslinje };
export { TidslinjeVelgArbeidssituasjon };
export { TIDSLINJE_TYPER };
export { togglesSagas };
export { Radiofaner };
export { Bjorn };
export { Stegnavigasjon };
export * from './enums';
export * from './components/sykepengesoknadOppsummering/Soknad';
export { TimeoutBox };
export { get, post };

// eslint-disable-next-line no-unused-vars
let performOnHttpCalls = () => { return undefined; };
export const setPerformOnHttpCalls = (_performOnHttpCalls) => {
    performOnHttpCalls = _performOnHttpCalls;
};

export const getAjax = (url) => {
    const ajax = new Ajax(url);
    const promise = new Promise((resolve, reject) => {
        ajax.on('success', (respons, responsTekst) => {
            resolve(responsTekst);
        });
        ajax.on('error', reject);
    });
    ajax.send();
    return promise;
};
