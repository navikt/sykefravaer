import { getFormValues } from 'redux-form';

export const hentSkjemaVerdier = (state, skjemanavn) => getFormValues(skjemanavn)(state) || {};
