import 'babel-polyfill';
import { render } from 'react-dom';
import React from 'react';
import AppRouter from './routers/AppRouter.js';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import sykmeldinger from './reducers/sykmeldinger.js';
import applikasjon from './reducers/applikasjon.js';
import { browserHistory } from 'react-router';
import { setSykmeldinger, setLaster } from './actions/action_creators.js';
import useScroll from 'scroll-behavior/lib/useStandardScroll';

const history = useScroll(() => { return browserHistory; })();

const store = createStore(combineReducers({
	sykmeldinger,
	applikasjon,
	history,
}));

store.dispatch(setLaster(true));

$.get(window.SYFO_SETTINGS.REST_ROOT + '/sykmeldinger', (response) => {
	store.dispatch(setLaster(false));
	store.dispatch(setSykmeldinger(response));
});

render(<Provider store={store}>
	<AppRouter history={history} /></Provider>,
	document.getElementById('root'));