import { getCookie } from '../utils/index';
import * as dineSykmeldingerActions from './dineSykmeldinger_actions.js';
import * as arbeidsgiversSykmeldingerActions from './arbeidsgiversSykmeldinger_actions.js';

export function setArbeidssituasjon(arbeidssituasjon, sykmeldingId) {
    return {
        type: 'SET_ARBEIDSSITUASJON',
        arbeidssituasjon,
        sykmeldingId,
    };
}

export function setArbeidsgiver(sykmeldingId, arbeidsgiver) {
    return {
        type: 'SET_ARBEIDSGIVER',
        sykmeldingId,
        arbeidsgiver,
    };
}

export function senderSykmelding(sykmeldingId) {
    return {
        type: 'SENDER_SYKMELDING',
        sykmeldingId,
    };
}

export function sendSykmeldingFeilet(sykmeldingId) {
    return {
        type: 'SEND_SYKMELDING_FEILET',
        sykmeldingId,
    };
}

export function sykmeldingSendt(sykmeldingId, orgnummer) {
    return {
        type: 'SYKMELDING_SENDT',
        sykmeldingId,
        orgnummer,
    };
}

export function bekrefterSykmelding() {
    return {
        type: 'BEKREFTER_SYKMELDING',
    };
}

export function bekreftSykmeldingFeilet() {
    return {
        type: 'BEKREFT_SYKMELDING_FEILET',
    };
}

export function sykmeldingBekreftet(sykmeldingId) {
    return {
        type: 'SYKMELDING_BEKREFTET',
        sykmeldingId,
    };
}

export function bekreftSykmelding(sykmeldingId, arbeidssituasjon) {
    return function bekreft(dispatch) {
        dispatch(bekrefterSykmelding());
        return fetch(`${window.SYFO_SETTINGS.REST_ROOT}/sykmeldinger/${sykmeldingId}/actions/bekreft`,
            {
                credentials: 'include',
                method: 'POST',
                body: arbeidssituasjon,
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': getCookie('XSRF-TOKEN-SYFOREST'),
                }),
            })
        .then((response) => {
            if (response.status > 400) {
                dispatch(bekreftSykmeldingFeilet());
            } else {
                dispatch(sykmeldingBekreftet(sykmeldingId));
                dispatch(dineSykmeldingerActions.hentDineSykmeldinger());
                dispatch(arbeidsgiversSykmeldingerActions.hentArbeidsgiversSykmeldinger());
            }
            return response;
        })
        .catch(() => {
            return dispatch(bekreftSykmeldingFeilet());
        });
    };
}

export function sendSykmeldingTilArbeidsgiver(sykmeldingId, orgnummer) {
    return function send(dispatch) {
        dispatch(senderSykmelding(sykmeldingId));
        return fetch(`${window.SYFO_SETTINGS.REST_ROOT}/sykmeldinger/${sykmeldingId}/actions/send`,
            {
                credentials: 'include',
                method: 'POST',
                body: orgnummer,
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': getCookie('XSRF-TOKEN-SYFOREST'),
                }),
            })
        .then((response) => {
            if (response.status > 400) {
                dispatch(sendSykmeldingFeilet(sykmeldingId));
            } else {
                dispatch(sykmeldingSendt(sykmeldingId, orgnummer));
                dispatch(dineSykmeldingerActions.hentDineSykmeldinger());
                dispatch(arbeidsgiversSykmeldingerActions.hentArbeidsgiversSykmeldinger());
            }
            return response;
        })
        .catch(() => {
            return dispatch(sendSykmeldingFeilet(sykmeldingId));
        });
    };
}
