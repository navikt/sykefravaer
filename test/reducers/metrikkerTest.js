import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import sinon from 'sinon';
import metrikker from '../../js/reducers/metrikker';
import { utfyllingStartet } from '../../js/actions/metrikker_actions';
import { UTFYLLING_STARTET } from '../../js/enums/metrikkerEnums';
import { sykmeldingBekreftet, sykmeldingSendt } from '../../js/sykmeldinger/data/din-sykmelding/dinSykmeldingActions';

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
});
