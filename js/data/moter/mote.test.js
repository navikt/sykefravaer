import { expect } from 'chai';
import sinon from 'sinon';
import deepFreeze from 'deep-freeze';
import * as actions from './mote_actions';
import mote from './mote';

describe('mote', () => {
    let clock;
    let data;
    let res;

    beforeEach(() => {
        clock = sinon.useFakeTimers(new Date('2017-02-01T15:18:24.000').getTime());
        data = {
            status: 'OPPRETTET',
            opprettetTidspunkt: '2017-02-22T15:18:24.000',
            bekreftetTidspunkt: null,
            deltakere: [{
                hendelser: [],
                deltakerUuid: 'uuid1',
                navn: 'Are Arbeidsgiver',
                orgnummer: '123456789',
                epost: 'are.arbeidsgiver@nav.no',
                type: 'arbeidsgiver',
                svartidspunkt: '2017-03-07T15:18:24.000',
                svar: [{
                    id: 1,
                    tid: '2017-03-07T15:18:24.000',
                    created: '2017-02-22T15:18:24.000',
                    sted: 'Testveien 2',
                    valgt: false,
                }, {
                    id: 2,
                    tid: '2017-03-09T15:18:24.000',
                    created: '2017-02-22T15:18:24.000',
                    sted: 'Testveien 2',
                    valgt: false,
                }],
            }, {
                hendelser: [],
                deltakerUuid: 'uuid2',
                navn: 'Sygve Sykmeldt',
                orgnummer: null,
                epost: null,
                type: 'Bruker',
                svartidspunkt: null,
                svar: [{
                    id: 1,
                    tid: '2017-03-07T15:18:24.000',
                    created: '2017-02-22T15:18:24.000',
                    sted: 'Testveien 2',
                    valgt: false,
                }, {
                    id: 2,
                    tid: '2017-03-09T15:18:24.000',
                    created: '2017-02-22T15:18:24.000',
                    sted: 'Testveien 2',
                    valgt: false,
                }],
            }],
            valgtAlternativ: null,
            alternativer: [{
                id: 1,
                tid: '2017-03-07T15:18:24.000',
                created: '2017-02-22T15:18:24.000',
                sted: 'Testveien 2',
                valgt: false,
            }, {
                id: 2,
                tid: '2017-03-09T15:18:24.000',
                created: '2017-02-22T15:18:24.000',
                sted: 'Testveien 2',
                valgt: false,
            }],
        };
    });

    afterEach(() => {
        clock.restore();
    });


    it('Skal ha en initialState', () => {
        res = mote();
        expect(res).to.deep.equal({
            data: null,
            henter: false,
            hentingFeilet: false,
            hentet: false,
        });
    });

    it('Skal returnere riktig state ved henterMote()', () => {
        const action = actions.henterMote();
        res = mote(deepFreeze(res), action);
        expect(res).to.deep.equal({
            data: null,
            henter: true,
            hentingFeilet: false,
            hentet: false,
        });
    });

    it('Skal returnere riktig state ved moteHentet()', () => {
        const action = actions.moteHentet(data);
        res = mote(deepFreeze(res), action);
        expect(res).to.deep.equal({
            hentet: true,
            data: {
                status: 'OPPRETTET',
                opprettetTidspunkt: new Date('2017-02-22T15:18:24.000'),
                bekreftetTidspunkt: null,
                bekreftetAlternativ: null,
                deltakere: [{
                    hendelser: [],
                    deltakerUuid: 'uuid1',
                    navn: 'Are Arbeidsgiver',
                    orgnummer: '123456789',
                    epost: 'are.arbeidsgiver@nav.no',
                    type: 'arbeidsgiver',
                    svartidspunkt: new Date('2017-03-07T15:18:24.000'),
                    svar: [{
                        id: 1,
                        tid: new Date('2017-03-07T15:18:24.000'),
                        created: new Date('2017-02-22T15:18:24.000'),
                        sted: 'Testveien 2',
                        valgt: false,
                    }, {
                        id: 2,
                        tid: new Date('2017-03-09T15:18:24.000'),
                        created: new Date('2017-02-22T15:18:24.000'),
                        sted: 'Testveien 2',
                        valgt: false,
                    }],
                }, {
                    hendelser: [],
                    deltakerUuid: 'uuid2',
                    navn: 'Sygve Sykmeldt',
                    orgnummer: null,
                    epost: null,
                    type: 'Bruker',
                    svartidspunkt: null,
                    svar: [{
                        id: 1,
                        tid: new Date('2017-03-07T15:18:24.000'),
                        created: new Date('2017-02-22T15:18:24.000'),
                        sted: 'Testveien 2',
                        valgt: false,
                    }, {
                        id: 2,
                        tid: new Date('2017-03-09T15:18:24.000'),
                        created: new Date('2017-02-22T15:18:24.000'),
                        sted: 'Testveien 2',
                        valgt: false,
                    }],
                }],
                valgtAlternativ: null,
                alternativer: [{
                    id: 1,
                    tid: new Date('2017-03-07T15:18:24.000'),
                    created: new Date('2017-02-22T15:18:24.000'),
                    sted: 'Testveien 2',
                    valgt: false,
                }, {
                    id: 2,
                    tid: new Date('2017-03-09T15:18:24.000'),
                    created: new Date('2017-02-22T15:18:24.000'),
                    sted: 'Testveien 2',
                    valgt: false,
                }],
            },
            henter: false,
            hentingFeilet: false,
        });
    });

    it('Skal returnere riktig state ved hentMoteFeilet()', () => {
        const action = actions.hentMoteFeilet();
        res = mote(deepFreeze(res), action);
        expect(res).to.deep.equal({
            data: null,
            henter: false,
            hentingFeilet: true,
            hentet: true,
        });
    });

    it('Skal returnere riktig state ved moteIkkeFunnet()', () => {
        const action = actions.moteIkkeFunnet();
        res = mote(deepFreeze(res), action);
        expect(res).to.deep.equal({
            data: null,
            henter: false,
            hentingFeilet: false,
            moteIkkeFunnet: true,
            hentet: true,
        });
    });
});
