import 'babel-polyfill';
import { render } from 'react-dom';
import React from 'react';
import AppRouter from './routers/AppRouter.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import dineSykmeldinger from './reducers/dineSykmeldinger.js';
import arbeidsgiversSykmeldinger from './reducers/arbeidsgiversSykmeldinger.js';
import ledetekster from './reducers/ledetekster.js';
import brukerinfo from './reducers/brukerinfo.js';
import arbeidsgivere from './reducers/arbeidsgivere.js';
import hendelser from './reducers/hendelser.js';
import { hentDineSykmeldinger } from './actions/dineSykmeldinger_actions.js';
import { hentLedetekster } from './actions/ledetekster_actions.js';
import { hentBrukerinfo } from './actions/brukerinfo_actions.js';
import history from './history.js';

const rootReducer = combineReducers({
    dineSykmeldinger,
    arbeidsgivere,
    arbeidsgiversSykmeldinger,
    ledetekster,
    brukerinfo,
    hendelser,
    history,
});

const store = createStore(rootReducer,
    applyMiddleware(thunkMiddleware)
);

store.dispatch(hentLedetekster());
store.dispatch(hentDineSykmeldinger());
store.dispatch(hentBrukerinfo());

render(<Provider store={store}>
        <AppRouter history={history} /></Provider>,
    document.getElementById('maincontent'));

export {
    store,
    history,
};
