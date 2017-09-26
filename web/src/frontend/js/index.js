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
import { oppfolgingsdialogerAt as oppfolgingsdialoger, arbeidsoppgaver, dokument, samtykke, tilgang, tiltak, navigasjontoggles, nullstillGodkjenning, avbrytdialogReducer } from 'oppfolgingsdialog-npm';
import { hentLedetekster, ledetekster, tidslinjer, toggles } from 'digisyfo-npm';
import { hentVedlikehold } from './actions/vedlikehold_actions';
import history from './history';
import { reducer as formReducer } from 'redux-form';
import rootSaga from './sagas';
import { svar, mote } from 'moter-npm';
import vedlikehold from './reducers/vedlikehold';
import reduxFormMeta from './reducers/reduxFormMeta';
import '../styles/styles.less';
import forskutteringssporsmal from './reducers/forskutteringssporsmal';
import arbeidsgiverperiodeberegning from './reducers/arbeidsgiverperiodeberegning';
import hendelser from './reducers/hendelser';
import aktivitetskrav from './reducers/aktivitetskrav';
import './logging';

const rootReducer = combineReducers({
    arbeidsgivere,
    arbeidsgiverperiodeberegning,
    arbeidsgiversSykmeldinger,
    arbeidsoppgaver,
    avbrytdialogReducer,
    brukerinfo,
    dineSykmeldinger,
    forskutteringssporsmal,
    history,
    ledere,
    dokument,
    ledetekster,
    mote,
    navigasjontoggles,
    nullstillGodkjenning,
    oppfolgingsdialoger,
    samtykke,
    svar,
    sykepengesoknader,
    toggles,
    tidslinjer,
    tilgang,
    tiltak,
    vedlikehold,
    hendelser,
    aktivitetskrav,
    form: formReducer,
    formMeta: reduxFormMeta,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

// <OBS>: Minimer antall kall som gjøres her!
store.dispatch(hentLedetekster());
store.dispatch(hentVedlikehold());
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
