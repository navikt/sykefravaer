import "babel-polyfill";
import {render} from 'react-dom';
import React from 'react';
import AppRouter from './routers/AppRouter.js';
import paths from './routers/paths.js';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import sykmeldinger from './reducers';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { setSykmeldinger, addSykmelding } from "./actions/action_creators.js";
import useScroll from 'scroll-behavior/lib/useStandardScroll';

const history = useScroll(() => browserHistory)();

const store = createStore(combineReducers({
	sykmeldinger,
	history
}));

store.dispatch(setSykmeldinger([]));

$.get("http://localhost:8182/syforest/sykmeldinger", function(response) {
	store.dispatch(setSykmeldinger(response));
}); 

render(<Provider store={store}><AppRouter history={history} /></Provider>, document.getElementById('root'));