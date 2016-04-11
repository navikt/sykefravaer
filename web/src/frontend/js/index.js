import 'babel-polyfill';
import { render } from 'react-dom';
import React from 'react';
import AppRouter from './routers/AppRouter.js';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import sykmeldinger from './reducers/sykmeldinger.js';
import ledetekster from './reducers/ledetekster.js';
import { browserHistory } from 'react-router';
import { setSykmeldinger, hentSykmeldinger, hentSykmeldingerFeilet } from './actions/sykmeldinger_actions.js';
import { setLedetekster, hentLedetekster, hentLedeteksterFeilet } from './actions/ledetekster_actions.js';
import useScroll from 'scroll-behavior/lib/useStandardScroll';

const history = useScroll(() => { return browserHistory; })();

const store = createStore(combineReducers({
	sykmeldinger,
    ledetekster,
	history,
}));

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
