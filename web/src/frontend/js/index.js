import 'whatwg-fetch';
import 'babel-polyfill';
import { render } from 'react-dom';
import React from 'react';
import AppRouter from './routers/AppRouter';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import dineSykmeldinger from './reducers/dineSykmeldinger';
import sykepengesoknader from './reducers/sykepengesoknader';
import arbeidsgiversSykmeldinger from './reducers/arbeidsgiversSykmeldinger';
import brukerinfo from './reducers/brukerinfo';
import arbeidsgivere from './reducers/arbeidsgivere';
import ledere from './reducers/ledere';
import { hentDineSykmeldinger } from './actions/dineSykmeldinger_actions';
import { hentSykepengesoknader } from './actions/sykepengesoknader_actions';
import { hentLedetekster, ledetekster, tidslinjer } from 'digisyfo-npm';
import { hentBrukerinfo } from './actions/brukerinfo_actions';
import { hentVedlikehold } from './actions/vedlikehold_actions';
import history from './history';
import { reducer as formReducer } from 'redux-form';
import rootSaga from './sagas';
import { deltakerActions, svar, deltaker } from 'moter-npm';
import pilot from './reducers/pilot';
import vedlikehold from './reducers/vedlikehold';

const rootReducer = combineReducers({
    dineSykmeldinger,
    sykepengesoknader,
    arbeidsgivere,
    arbeidsgiversSykmeldinger,
    ledetekster,
    tidslinjer,
    brukerinfo,
    history,
    ledere,
    svar,
    deltaker,
    pilot,
    vedlikehold,
    form: formReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

store.dispatch(hentLedetekster());
store.dispatch(hentDineSykmeldinger());
store.dispatch(hentSykepengesoknader());
store.dispatch(hentBrukerinfo());
store.dispatch(hentVedlikehold());
store.dispatch(deltakerActions.hentDeltaker());

render(<Provider store={store}>
        <AppRouter history={history} /></Provider>,
    document.getElementById('maincontent'));

export {
    store,
    history,
};
