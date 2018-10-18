import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import dineSykmeldinger from '../js/reducers/dineSykmeldinger';

const defaultState = {
    dineSykmeldinger: dineSykmeldinger(),
};

const mountWithStore = (child, _state = {}) => {
    const state = {
        ...defaultState,
        _state,
    };
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore(state);
    return mount(<Provider store={store}>{child}</Provider>);
};

export default mountWithStore;
