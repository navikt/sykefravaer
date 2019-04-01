import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import sinon from 'sinon';
import * as actions from '../soknader/soknaderActions';
import { getSendtSoknadArbeidstaker } from '../../../../test/mock/mockSendtSoknadArbeidstaker';
import ettersendingArbeidsgiver, { ettersenderSoknadTilArbeidsgiver, ettersendSoknadTilArbeidsgiverFeilet, soknadEttersendtTilArbeidsgiver } from './ettersendingArbeidsgiver';

describe('ettersending arbeidsgiver', () => {
    let getStateMedDataHentet;
    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers(new Date('2018-03-15').getTime());
        getStateMedDataHentet = () => {
            const state = ettersendingArbeidsgiver();
            const action = actions.soknaderHentet(getSendtSoknadArbeidstaker());
            return ettersendingArbeidsgiver(deepFreeze(state), action);
        };
    });

    afterEach(() => {
        clock.restore();
    });

    it('Håndterer ettersenderSoknadTilArbeidsgiver', () => {
        const initState = getStateMedDataHentet();
        const action = ettersenderSoknadTilArbeidsgiver();
        const state = ettersendingArbeidsgiver(deepFreeze(initState), action);
        expect(state.sender)
            .to
            .equal(true);
    });

    it('Håndterer soknadEttersendtTilArbeidsgiver', () => {
        const initState = getStateMedDataHentet();
        const action2 = ettersenderSoknadTilArbeidsgiver();
        const initState2 = ettersendingArbeidsgiver(deepFreeze(initState), action2);
        const action = soknadEttersendtTilArbeidsgiver();
        const state = ettersendingArbeidsgiver(deepFreeze(initState2), action);
        expect(state.sender)
            .to
            .equal(false);
    });

    it('Håndterer ettersendSoknadTilArbeidsgiverFeilet', () => {
        const initState = getStateMedDataHentet();
        const action = ettersendSoknadTilArbeidsgiverFeilet();
        const nextState = ettersendingArbeidsgiver(deepFreeze(initState), action);
        expect(nextState.sendingFeilet)
            .to
            .equal(true);
    });
});
