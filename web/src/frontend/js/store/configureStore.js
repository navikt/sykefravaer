import { createStore } from 'redux';
import { sykmeldinger } from '../reducers/sykmeldinger.js';

export default function configureStore(initialState) {
	const store = createStore(
		sykmeldinger,
		initialState
		);
	return store;
}
