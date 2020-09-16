import { hentDialogmoteUrl } from './urlUtils';

export const MOTEBEHOV_SKJEMATYPE = {
    MELD_BEHOV: 'MELD_BEHOV',
    SVAR_BEHOV: 'SVAR_BEHOV',
};

export const hentMoteLandingssideUrl = (skalViseMotebehov) => {
    const moteVisning = skalViseMotebehov ? '' : '/mote';
    return hentDialogmoteUrl(moteVisning);
};

export const erMotebehovTilgjengelig = (motebehovReducer) => {
    if (motebehovReducer && motebehovReducer.hentingForbudt === true) {
        return false;
    }
    return motebehovReducer
        && motebehovReducer.data
        && motebehovReducer.data.visMotebehov
        && (
            motebehovReducer.data.skjemaType === MOTEBEHOV_SKJEMATYPE.MELD_BEHOV
            || motebehovReducer.data.skjemaType === MOTEBEHOV_SKJEMATYPE.SVAR_BEHOV
        );
};

export const erSvarMotebehovTilgjengelig = (motebehovReducer) => {
    if (motebehovReducer && motebehovReducer.hentingForbudt === true) {
        return false;
    }
    return motebehovReducer
        && motebehovReducer.data
        && motebehovReducer.data.visMotebehov
        && motebehovReducer.data.skjemaType === MOTEBEHOV_SKJEMATYPE.SVAR_BEHOV;
};

export const erMotebehovUbesvart = (motebehovReducer) => {
    const skalVise = erSvarMotebehovTilgjengelig(motebehovReducer);
    if (skalVise) {
        return !motebehovReducer.data.motebehov;
    }
    return false;
};
