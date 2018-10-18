import {sykmeldingHarBehandletSoknad} from "./soknaderSelectors";
import {toggleSykmeldingEndreArbeidssituasjon} from "./unleashTogglesSelectors";

export const skalHenteDineSykmeldinger = (state) => {
    return !state.dineSykmeldinger.henter
        && !state.dineSykmeldinger.hentet
        && !state.dineSykmeldinger.hentingFeilet;
};

export const kanEndreSykmeldingArbeidssituasjon = (state, sykmelding) => {
    const FIRE_MANEDER_SIDEN = new Date();
    FIRE_MANEDER_SIDEN.setMonth(FIRE_MANEDER_SIDEN.getMonth() - 4);
    return sykmelding.sendtdato > FIRE_MANEDER_SIDEN
        && !sykmeldingHarBehandletSoknad(state, sykmelding.id)
        && toggleSykmeldingEndreArbeidssituasjon(state);
};
