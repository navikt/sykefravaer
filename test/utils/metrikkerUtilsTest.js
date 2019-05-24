import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import sinon from 'sinon';
import { beregnVarighet } from '../../js/utils/metrikkerUtils';
import { TID_INNSENDING_SYKMELDING, UTFYLLING_STARTET } from '../../js/enums/metrikkerEnums';

describe('metrikkerUtils', () => {
    let state;
    let event1;
    let event2;
    let event3;
    let event4;
    let event5;
    let tid1;
    let tid2;
    let tid3;
    let tid4;
    let tid5;
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

        state = {
            metrikker: {
                data: [event2, event1, event3, event4, event5],
            },
        };
    });

    afterEach(() => {
        clock.restore();
    });

    describe('beregnVarighet', () => {
        it('Skal returnere riktig tid for innsending av sykmeldinger', () => {
            const tid = beregnVarighet(deepFreeze(state), {
                type: TID_INNSENDING_SYKMELDING,
                ressursId: 'min-sykmelding-id',
            });
            expect(tid).to.equal(45632);
        });
    });
});
