import 'babel-polyfill';
import { render } from 'react-dom';
import React from 'react';
import AppRouter from './routers/AppRouter.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import sykmeldinger from './reducers/sykmeldinger.js';
import ledetekster from './reducers/ledetekster.js';
import localStorage from './reducers/localStorage.js';
import { browserHistory } from 'react-router';
import { setSykmeldinger, hentSykmeldinger, hentSykmeldingerFeilet } from './actions/sykmeldinger_actions.js';
import { setLedetekster, hentLedetekster, hentLedeteksterFeilet } from './actions/ledetekster_actions.js';
import { skjulUnderUtviklingVarsel } from './actions/localStorage_actions.js';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';

const history = useScroll(() => {
    return browserHistory;
})();

const reducer = storage.reducer(combineReducers({
    sykmeldinger,
    ledetekster,
    history,
    localStorage,
}));

const engine = createEngine("digisyfo-test-key");


const middleware = storage.createMiddleware(engine, [], [{"type": "SKJUL_UNDER_UTVIKLING_VARSEL"}]);
const createStoreWithMiddleware = applyMiddleware(middleware)(createStore);
const store = createStoreWithMiddleware(reducer);

const load = storage.createLoader(engine);

load(store)
    .then((newState) => console.log("newstate", newState))
    .catch(() => console.log("Feil ved load"))

store.dispatch(hentSykmeldinger());
store.dispatch(hentLedetekster()); 

$.get(window.SYFO_SETTINGS.REST_ROOT + '/sykmeldinger', (response) => {
    store.dispatch(setSykmeldinger(response));
}).fail(() => {
    store.dispatch(hentSykmeldingerFeilet());
});

$.get(window.SYFO_SETTINGS.REST_ROOT + '/informasjon/tekster', (response) => {
    store.dispatch(setLedetekster(response));
}).fail(() => {
    store.dispatch(hentLedeteksterFeilet());
});

render(<Provider store={store}>
        <AppRouter history={history} /></Provider>,
    document.getElementById('maincontent'));
