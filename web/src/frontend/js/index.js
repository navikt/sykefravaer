import './utils/init/globals';
import { render } from 'react-dom';
import React from 'react';
import AppRouter from './routers/AppRouter.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import dineSykmeldinger from './reducers/dineSykmeldinger.js';
import arbeidsgiversSykmeldinger from './reducers/arbeidsgiversSykmeldinger.js';
import ledetekster from './reducers/ledetekster.js';
import brukerinfo from './reducers/brukerinfo.js';
import arbeidsgivere from './reducers/arbeidsgivere.js';
import tidslinjer from './reducers/tidslinjer.js';
import { hentDineSykmeldinger } from './actions/dineSykmeldinger_actions.js';
import { hentLedetekster } from './actions/ledetekster_actions.js';
import { hentBrukerinfo } from './actions/brukerinfo_actions.js';
import history from './history.js';
import { reducer as formReducer } from 'redux-form';
import rootSaga from './sagas';

const rootReducer = combineReducers({
    dineSykmeldinger,
    arbeidsgivere,
    arbeidsgiversSykmeldinger,
    ledetekster,
    tidslinjer,
    brukerinfo,
    history,
    form: formReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

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
