import { SENDT } from '../../enums/soknadstatuser';

export const skalHenteSoknader = state => !state.soknader.hentet
        && !state.soknader.henter
        && !state.soknader.hentingFeilet;

export const skalHenteSoknaderHvisIkkeHenter = state => !state.soknader.henter;

export const sykmeldingHarBehandletSoknad = (state, sykmeldingId) => state.soknader.data
    .filter(soknad => soknad.sykmeldingId === sykmeldingId && soknad.status === SENDT).length > 0;
