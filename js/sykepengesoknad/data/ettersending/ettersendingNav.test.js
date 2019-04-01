import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import sinon from 'sinon';
import * as actions from '../soknader/soknaderActions';
import { getSendtSoknadArbeidstaker } from '../../../../test/mock/mockSendtSoknadArbeidstaker';
import ettersendingNav, { ettersenderSoknadTilNav, ettersendSoknadTilNavFeilet, soknadEttersendtTilNav } from './ettersendingNav';

describe('ettersending NAV', () => {
    let getStateMedDataHentet;
    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers(new Date('2018-03-15').getTime());
        getStateMedDataHentet = () => {
            const state = ettersendingNav();
            const action = actions.soknaderHentet(getSendtSoknadArbeidstaker());
            return ettersendingNav(deepFreeze(state), action);
        };
    });

    afterEach(() => {
        clock.restore();
    });

    it('Håndterer ettersenderSoknadTilNav', () => {
        const initState = getStateMedDataHentet();
        const action = ettersenderSoknadTilNav();
        const state = ettersendingNav(deepFreeze(initState), action);
        expect(state.sender)
            .to
            .equal(true);
    });

    it('Håndterer soknadEttersendtTilNav', () => {
        const initState = getStateMedDataHentet();
        const action2 = ettersenderSoknadTilNav();
        const initState2 = ettersendingNav(deepFreeze(initState), action2);
        const action = soknadEttersendtTilNav();
        const state = ettersendingNav(deepFreeze(initState2), action);
        expect(state.sender)
            .to
            .equal(false);
    });

    it('Håndterer ettersendSoknadTilNavFeilet', () => {
        const initState = getStateMedDataHentet();
        const action = ettersendSoknadTilNavFeilet();
        const nextState = ettersendingNav(deepFreeze(initState), action);
        expect(nextState.sendingFeilet)
            .to
            .equal(true);
    });
});
