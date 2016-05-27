import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const createMockStore = () => {
    const middlewares = [ thunk ];
    const mockStore = configureMockStore(middlewares);
    return mockStore();
};

export default createMockStore;