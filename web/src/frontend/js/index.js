import 'babel-polyfill';
import { render } from 'react-dom';
import React from 'react';
import AppRouter from './routers/AppRouter.js';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import sykmeldinger from './reducers/sykmeldinger.js';
import applikasjon from './reducers/applikasjon.js';
import { browserHistory } from 'react-router';
import { setSykmeldinger, hentSykmeldinger, hentSykmeldingerFeilet } from './actions/action_creators.js';
import useScroll from 'scroll-behavior/lib/useStandardScroll';

const history = useScroll(() => { return browserHistory; })();

const store = createStore(combineReducers({
	sykmeldinger,
	applikasjon,
	history,
}));

store.dispatch(hentSykmeldinger());

$.get(window.SYFO_SETTINGS.REST_ROOT + '/sykmeldinger', (response) => {
	store.dispatch(setSykmeldinger(response));
}).fail(() => {
	store.dispatch(hentSykmeldingerFeilet())
});

render(<Provider store={store}>
	<AppRouter history={history} /></Provider>,
	document.getElementById('maincontent'));