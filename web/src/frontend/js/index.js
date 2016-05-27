import 'babel-polyfill';
import { render } from 'react-dom';
import React from 'react';
import AppRouter from './routers/AppRouter.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import sykmeldinger from './reducers/sykmeldinger.js';
import ledetekster from './reducers/ledetekster.js';
import brukerinfo from './reducers/brukerinfo.js';
import informasjon from './reducers/informasjon.js';
import { browserHistory } from 'react-router';
import { hentSykmeldinger } from './actions/sykmeldinger_actions.js';
import { hentLedetekster } from './actions/ledetekster_actions.js';
import { hentBrukerinfo } from './actions/brukerinfo_actions.js';
import { setInformasjon } from './actions/informasjon_actions.js';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import informasjonsdata from './informasjonsdata';

const history = useScroll(() => {
    return browserHistory;
})();

const rootReducer = combineReducers({
    sykmeldinger,
    ledetekster,
    brukerinfo,
    informasjon,
    history,
});

const store = createStore(rootReducer,
    applyMiddleware(thunkMiddleware)
);

store.dispatch(hentLedetekster());
store.dispatch(hentSykmeldinger());
store.dispatch(hentBrukerinfo());
store.dispatch(setInformasjon(informasjonsdata));

render(<Provider store={store}>
        <AppRouter history={history} /></Provider>,
    document.getElementById('maincontent'));

export {
    store,
};
