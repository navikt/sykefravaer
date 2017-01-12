import './utils/init/globals';
import { render } from 'react-dom';
import React from 'react';
import AppRouter from './routers/AppRouter';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import dineSykmeldinger from './reducers/dineSykmeldinger';
import sykepengesoknad from './reducers/sykepengesoknad';
import arbeidsgiversSykmeldinger from './reducers/arbeidsgiversSykmeldinger';
import brukerinfo from './reducers/brukerinfo';
import arbeidsgivere from './reducers/arbeidsgivere';
import ledere from './reducers/ledere';
import { hentDineSykmeldinger } from './actions/dineSykmeldinger_actions';
import { hentLedetekster, ledetekster, tidslinjer } from 'digisyfo-npm';
import { hentBrukerinfo } from './actions/brukerinfo_actions';
import history from './history';
import { reducer as formReducer } from 'redux-form';
import rootSaga from './sagas';
import { svar, deltaker } from 'moter-npm';

const rootReducer = combineReducers({
    dineSykmeldinger,
    sykepengesoknad,
    arbeidsgivere,
    arbeidsgiversSykmeldinger,
    ledetekster,
    tidslinjer,
    brukerinfo,
    history,
    ledere,
    svar,
    deltaker,
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
