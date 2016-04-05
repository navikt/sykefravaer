export default function applikasjon(state = {}, action) {
	switch (action.type) {
	case 'SET_LASTER':
		state.laster = action.laster;
		return state;
	default:
		return state;
	}
}