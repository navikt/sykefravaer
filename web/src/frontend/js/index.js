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
import { hentDineSykmeldinger } from './actions/dineSykmeldinger_actions';
import { hentSykepengesoknader } from './actions/sykepengesoknader_actions';
import { hentLedetekster, hentToggles, ledetekster, tidslinjer, toggles } from 'digisyfo-npm';
import { hentBrukerinfo } from './actions/brukerinfo_actions';
import { hentVedlikehold } from './actions/vedlikehold_actions';
import { hentLedere } from './actions/ledere_actions';
import { hentOppfolgingsdialogerAt as hentOppfolgingsdialoger } from 'oppfolgingsdialog-npm';
import history from './history';
import { reducer as formReducer } from 'redux-form';
import rootSaga from './sagas';
import { svar, mote, moteActions } from 'moter-npm';
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

store.dispatch(hentLedetekster());
store.dispatch(hentDineSykmeldinger());
store.dispatch(hentSykepengesoknader());
store.dispatch(hentBrukerinfo());
store.dispatch(hentVedlikehold());
store.dispatch(moteActions.hentMote());
store.dispatch(hentOppfolgingsdialoger());
store.dispatch(hentLedere());
store.dispatch(hentToggles());

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
