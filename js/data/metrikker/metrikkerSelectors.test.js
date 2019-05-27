import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import sinon from 'sinon';
import { UTFYLLING_STARTET } from '../../enums/metrikkerEnums';
import { hentEvent, hentEvents } from './metrikkerSelectors';

describe('metrikkerSelectors', () => {
    let state;
    let event1;
    let event2;
    let event3;
    let event4;
    let event5;
    let event6;
    let tid1;
    let tid2;
    let tid3;
    let tid4;
    let tid5;
    let tid6;
    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers(new Date('2018-02-17'));

        tid1 = new Date();
        clock.tick(500);
        tid2 = new Date();
        clock.tick(500);
        tid3 = new Date();
        clock.tick(45632);

        tid4 = new Date();
        clock.tick(800);
        tid5 = new Date();
        clock.tick(1401);
        tid6 = new Date();

        event1 = {
            type: UTFYLLING_STARTET,
            ressursId: 'min-sykmelding-id',
            tid: tid1,
        };
        event2 = {
            type: UTFYLLING_STARTET,
            ressursId: 'min-sykmelding-id-2',
            tid: tid2,
        };
        event3 = {
            type: UTFYLLING_STARTET,
            ressursId: 'min-sykmelding-id',
            tid: tid3,
        };
        event4 = {
            type: 'SYKMELDING_SENDT',
            ressursId: 'min-sykmelding-id',
            tid: tid4,
        };
        event5 = {
            type: 'UTFYLLING_STARTET',
            ressursId: 'min-selvstendig-soknadPt-id',
            tid: tid5,
        };
        event6 = {
            type: 'SOKNAD_SENDT',
            ressursId: 'min-selvstendig-soknadPt-id',
            tid: tid6,
        };

        state = {
            metrikker: {
                data: [event2, event1, event3, event4, event6, event5],
            },
        };
    });

    afterEach(() => {
        clock.restore();
    });

    describe('hentEvents', () => {
        it('Skal returnere alle event for en gitt ressursId i sortert rekkefølge', () => {
            const events = hentEvents(deepFreeze(state), 'min-sykmelding-id');
            expect(events).to.deep.equal([event1, event3, event4]);
        });
    });

    describe('hentEvent', () => {
        it('Skal returnere siste event med type/ressursId', () => {
            const event = hentEvent(deepFreeze(state), {
                ressursId: 'min-sykmelding-id',
                type: UTFYLLING_STARTET,
            });
            expect(event).to.deep.equal(event3);
        });
    });
});
