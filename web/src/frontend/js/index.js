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
import { oppfolgingsdialogerAt as oppfolgingsdialoger, arbeidsoppgaver, samtykke } from 'oppfolgingsdialog-npm';
import { hentLedetekster, ledetekster, tidslinjer, toggles } from 'digisyfo-npm';
import { hentVedlikehold } from './actions/vedlikehold_actions';
import { hentOppfolgingsdialogerAt as hentOppfolgingsdialoger } from 'oppfolgingsdialog-npm';
import history from './history';
import { reducer as formReducer } from 'redux-form';
import rootSaga from './sagas';
import { svar, mote } from 'moter-npm';
import pilot from './reducers/pilot';
import vedlikehold from './reducers/vedlikehold';
import reduxFormMeta from './reducers/reduxFormMeta';
import '../styles/styles.less';
import forskutteringssporsmal from './reducers/forskutteringssporsmal';

const rootReducer = combineReducers({
    dineSykmeldinger,
    sykepengesoknader,
    arbeidsgivere,
    arbeidsgiversSykmeldinger,
    arbeidsoppgaver,
    ledetekster,
    tidslinjer,
    brukerinfo,
    history,
    ledere,
    oppfolgingsdialoger,
    samtykke,
    svar,
    pilot,
    vedlikehold,
    mote,
    toggles,
    form: formReducer,
    formMeta: reduxFormMeta,
    forskutteringssporsmal,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

// <OBS>: Minimer antall kall som gjøres her!
store.dispatch(hentLedetekster());
store.dispatch(hentVedlikehold());
store.dispatch(hentOppfolgingsdialoger());
// </OBS>

if (window.location.href.indexOf('visLedetekster=true') > -1) {
    window.localStorage.setItem('visLedetekster', true);
} else if (window.location.href.indexOf('visLedetekster=false') > -1) {
    window.localStorage.removeItem('visLedetekster');
}

render(<Provider store={store}>
        <AppRouter history={history} /></Provider>,
    document.getElementById('maincontent'));

export {
    store,
    history,
};
