import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import sinon from 'sinon';
import metrikker from '../../js/reducers/metrikker';
import { utfyllingStartet } from '../../js/actions/metrikker_actions';
import { TID_INNSENDING_SYKMELDING, UTFYLLING_STARTET } from '../../js/enums/metrikkerEnums';
import { sykmeldingBekreftet, sykmeldingSendt } from '../../js/actions/dinSykmelding_actions';
import { hentEvent, hentEvents } from '../../js/selectors/metrikkerSelectors';
import { beregnVarighet } from '../../js/utils/metrikkerUtils';

describe('metrikker', () => {
    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers(new Date('2018-02-17'));
    });

    afterEach(() => {
        clock.restore();
    });

    it('Skal håndtere utfyllingStartet', () => {
        const action = utfyllingStartet('min-sykmelding-id');
        const state = metrikker(deepFreeze({
            data: [],
        }), action);
        expect(state.data).to.deep.equal([{
            type: UTFYLLING_STARTET,
            ressursId: 'min-sykmelding-id',
            tid: new Date(),
        }]);
    });

    it('Skal håndtere utfyllingStartet med flere sykmeldinger', () => {
        const tid = new Date();
        const action = utfyllingStartet('min-sykmelding-id');
        const state = metrikker(deepFreeze({
            data: [],
        }), action);
        clock.tick(200);
        const nesteTid = new Date();
        const nesteAction = utfyllingStartet('min-sykmelding-id-2');
        const nesteState = metrikker(deepFreeze(state), nesteAction);
        expect(nesteState.data).to.deep.equal([{
            type: UTFYLLING_STARTET,
            ressursId: 'min-sykmelding-id',
            tid,
        }, {
            type: UTFYLLING_STARTET,
            ressursId: 'min-sykmelding-id-2',
            tid: nesteTid,
        }]);
    });

    it('Skal håndtere sykmeldingSendt', () => {
        const tid = new Date();
        const action = utfyllingStartet('min-sykmelding-id');
        const state = metrikker(deepFreeze({
            data: [],
        }), action);
        clock.tick(200);
        const nesteTid = new Date();
        const nesteAction = sykmeldingSendt('min-sykmelding-id');
        const nesteState = metrikker(deepFreeze(state), nesteAction);
        expect(nesteState.data).to.deep.equal([{
            type: UTFYLLING_STARTET,
            ressursId: 'min-sykmelding-id',
            tid,
        }, {
            type: 'SYKMELDING_SENDT',
            ressursId: 'min-sykmelding-id',
            tid: nesteTid,
        }]);
    });

    it('Skal håndtere sykmeldingBekreftet', () => {
        const tid = new Date();
        const action = utfyllingStartet('min-sykmelding-id');
        const state = metrikker(deepFreeze({
            data: [],
        }), action);
        clock.tick(200);
        const nesteTid = new Date();
        const nesteAction = sykmeldingBekreftet('min-sykmelding-id');
        const nesteState = metrikker(deepFreeze(state), nesteAction);
        expect(nesteState.data).to.deep.equal([{
            type: UTFYLLING_STARTET,
            ressursId: 'min-sykmelding-id',
            tid,
        }, {
            type: 'SYKMELDING_SENDT',
            ressursId: 'min-sykmelding-id',
            tid: nesteTid,
        }]);
    });

    describe("metrikkerSelectors", () => {
        let state;
        let event1;
        let event2;
        let event3;
        let event4;
        let tid1;
        let tid2;
        let tid3;
        let tid4;

        beforeEach(() => {
            tid1 = new Date();
            clock.tick(500);
            tid2 = new Date();
            clock.tick(500);
            tid3 = new Date();
            clock.tick(45632);
            tid4 = new Date();

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

            state = {
                metrikker: {
                    data: [event2, event1, event3, event4],
                },
            };
        });

        describe("hentEvents", () => {
            it("Skal returnere alle event for en gitt ressursId i sortert rekkefølge", () => {
                const events = hentEvents(state, 'min-sykmelding-id');
                expect(events).to.deep.equal([event1, event3, event4]);
            });
        });

        describe("hentEvent", () => {
            it("Skal returnere siste event med type/ressursId", () => {
                const event = hentEvent(state, {
                    ressursId: 'min-sykmelding-id',
                    type: UTFYLLING_STARTET,
                });
                expect(event).to.deep.equal(event3);
            });
        });

        describe("beregnVarighet", () => {
            it("Skal returnere riktig tid for innsending av sykmeldinger", () => {
                const tid = beregnVarighet(state, {
                    type: TID_INNSENDING_SYKMELDING,
                    ressursId: 'min-sykmelding-id',
                });
                expect(tid).to.equal(45632);
            });

            it("Skal returnere riktig tid for innsending av sykmeldinger ved race-conditions", () => {
                const tid = beregnVarighet(state, {
                    type: TID_INNSENDING_SYKMELDING,
                    ressursId: 'min-sykmelding-id-2',
                });
                expect(tid).to.equal(45632 + 500);
            });
        });


    });

});
