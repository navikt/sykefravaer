import 'whatwg-fetch';
import 'babel-polyfill';
import { render } from 'react-dom';
import React from 'react';
import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {
    hentLedetekster,
    ledetekster,
    sykeforlopsPerioder,
    tidslinjer,
    toggles,
    setPerformOnHttpCalls,
    timeout,
    forlengInnloggetSesjon,
    sjekkInnloggingssesjon,
} from 'digisyfo-npm';
import { svar, mote } from 'moter-npm';
import {
    oppfolgingsdialogerAt as oppfolgingsdialoger,
    arbeidsoppgaver,
    kommentar,
    kopierDialog as kopierDialogReducer,
    dokument,
    samtykke,
    tilgangAt as tilgang,
    tiltak,
    navigasjontoggles,
    nullstill,
    avbrytdialogReducer,
    arbeidsforhold,
    nyNaermesteLeder,
    delmednav,
    fastlegeDeling,
    person,
    virksomhet,
    kontaktinfo,
    forrigenaermesteleder,
    naermesteleder,
    setPerformOnOppDialogHttpCalls,
} from 'oppfolgingsdialog-npm';
import AppRouter from './routers/AppRouter';
import dineSykmeldinger from './reducers/dineSykmeldinger';
import sykepengesoknader from './reducers/sykepengesoknader';
import arbeidsgiversSykmeldinger from './reducers/arbeidsgiversSykmeldinger';
import brukerinfo from './reducers/brukerinfo';
import arbeidsgivere from './reducers/arbeidsgivere';
import { hentVedlikehold } from './actions/vedlikehold_actions';
import ledere from './reducers/ledere';
import history from './history';
import rootSaga from './sagas';
import vedlikehold from './reducers/vedlikehold';
import reduxFormMeta from './reducers/reduxFormMeta';
import '../styles/styles.less';
import forskutteringssporsmal from './reducers/forskutteringssporsmal';
import arbeidsgiverperiodeberegning from './reducers/arbeidsgiverperiodeberegning';
import hendelser from './reducers/hendelser';
import aktivitetskrav from './reducers/aktivitetskrav';
import sykeforloep from './reducers/sykeforloep';
import sykmeldingMeta from './reducers/sykmeldingMeta';
import './logging';

const rootReducer = combineReducers({
    arbeidsforhold,
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
    kommentar,
    kopierDialogReducer,
    ledetekster,
    mote,
    navigasjontoggles,
    nullstill,
    nyNaermesteLeder,
    oppfolgingsdialoger,
    samtykke,
    svar,
    sykepengesoknader,
    toggles,
    fastlegeDeling,
    delmednav,
    tidslinjer,
    tilgang,
    tiltak,
    vedlikehold,
    hendelser,
    aktivitetskrav,
    person,
    virksomhet,
    kontaktinfo,
    sykeforlopsPerioder,
    forrigenaermesteleder,
    naermesteleder,
    timeout,
    form: formReducer,
    formMeta: reduxFormMeta,
    sykeforloep,
    sykmeldingMeta,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer,
    applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

// <OBS>: Minimer antall kall som gjøres her!
store.dispatch(hentLedetekster());
store.dispatch(hentVedlikehold());
store.dispatch(forlengInnloggetSesjon());
// </OBS>

setPerformOnHttpCalls(() => { store.dispatch(forlengInnloggetSesjon()); });
setPerformOnOppDialogHttpCalls(() => { store.dispatch(forlengInnloggetSesjon()); });

setInterval(() => {
    store.dispatch(sjekkInnloggingssesjon());
}, 5000);

if (window.location.href.indexOf('visLedetekster=true') > -1) {
    window.APP_SETTINGS.VIS_LEDETEKSTNOKLER = true;
} else if (window.location.href.indexOf('visLedetekster=false') > -1) {
    window.APP_SETTINGS.VIS_LEDETEKSTNOKLER = false;
}

render(<Provider store={store}>
    <AppRouter history={history} />
</Provider>, document.getElementById('maincontent'));

export {
    store,
    history,
};
