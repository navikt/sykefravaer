import { expect } from 'chai';
import sinon from 'sinon';
import {
    finnNyesteAlternativ,
    finnDeltakerByType,
    getSvarsideModus,
    getNyeAlternativer,
    getTidligereAlternativer,
    brukerHarSvart,
    getSvar,
} from '../../js/utils/moteUtils';
import {
    moteBekreftet,
    moteAvbrutt,
    moteIkkeBesvart,
    bareEtAlternativ,
    moteBekreftetFlereAlternativer,
    moteBesvartAvArbeidsgiver,
    moteBesvartAlleAlternativer,
    moteBesvartMedNyeAlternativerBesvart,
    moteBesvartMedNyeAlternativerIkkeBesvart,
} from '../mock/mockMote';
import { ARBEIDSGIVER } from '../../js/enums/moteplanleggerDeltakerTyper';

describe('moteUtils', () => {
    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers(new Date('2018-02-01'));
    });

    afterEach(() => {
        clock.restore();
    });

    describe('finnerDeltakerByType', () => {
        let deltakere;

        beforeEach(() => {
            deltakere = [
                {
                    navn: 'Sygve Sykmeldt',
                    type: 'Bruker',
                    svar: [{
                        id: 273,
                        tid: new Date('2017-09-09T07:09:00Z'),
                        created: new Date('2017-09-09T07:09:00Z'),
                        valgt: false,
                        sted: 'Oslo',
                    }, {
                        id: 272,
                        tid: new Date('2017-09-08T07:09:00Z'),
                        created: new Date('2017-09-09T07:09:00Z'),
                        valgt: false,
                        sted: 'Oslo',
                    }],
                    svartidspunkt: null,
                }, {
                    navn: 'Are Arbeidsgiver',
                    type: 'arbeidsgiver',
                    svar: [{
                        id: 273,
                        tid: new Date('2017-09-09T07:09:00Z'),
                        created: new Date('2017-09-09T07:09:00Z'),
                        valgt: false,
                        sted: 'Oslo',
                    }, {
                        id: 272,
                        tid: new Date('2017-09-08T07:09:00Z'),
                        created: new Date('2017-09-09T07:09:00Z'),
                        valgt: false,
                        sted: 'Oslo',
                    }],
                },
            ];
        });

        it('Finner riktig deltaker - Bruker', () => {
            const d = finnDeltakerByType(deltakere, 'Bruker');
            expect(d.navn).to.equal('Sygve Sykmeldt');
        });

        it('Finner riktig deltaker - arbeidsgiver', () => {
            const d = finnDeltakerByType(deltakere, 'arbeidsgiver');
            expect(d.navn).to.equal('Are Arbeidsgiver');
        });
    });

    describe('getSvarsideModus', () => {
        it('Skal returnere SKJEMA ved moteIkeBesvart', () => {
            const res = getSvarsideModus(moteIkkeBesvart);
            expect(res).to.equal('SKJEMA');
        });

        it('Skal returnere AVBRUTT ved moteAvbrutt', () => {
            const res = getSvarsideModus(moteAvbrutt);
            expect(res).to.equal('AVBRUTT');
        });

        it('Skal returnere BEKREFTET ved moteBekreftet', () => {
            const res = getSvarsideModus(moteBekreftet);
            expect(res).to.equal('BEKREFTET');
        });

        it('Skal returnere SKJEMA ved moteBekreftet, men så har det blitt lagt til flere alternativer', () => {
            const res = getSvarsideModus(moteBekreftetFlereAlternativer);
            expect(res).to.equal('SKJEMA');
        });

        it('Skal returnere MØTESTATUS ved moteBesvartAlleAlternativer', () => {
            const res = getSvarsideModus(moteBesvartAlleAlternativer);
            expect(res).to.equal('MØTESTATUS');
        });

        it('Skal returnere MØTESTATUS ved moteBesvartMedNyeAlternativerBesvart', () => {
            const res = getSvarsideModus(moteBesvartMedNyeAlternativerBesvart);
            expect(res).to.equal('MØTESTATUS');
        });

        it('Skal returnere SKJEMA ved moteBesvartMedNyeAlternativerIkkeBesvart', () => {
            const res = getSvarsideModus(moteBesvartMedNyeAlternativerIkkeBesvart);
            expect(res).to.equal('SKJEMA');
        });

        it('Skal ta hensyn til innsendt bruker', () => {
            const res = getSvarsideModus(moteBesvartAvArbeidsgiver, 'arbeidsgiver');
            expect(res).to.equal('MØTESTATUS');
        });

        it('Skal ta hensyn til innsendt bruker', () => {
            const res = getSvarsideModus(bareEtAlternativ(), 'arbeidsgiver');
            expect(res).to.equal('SKJEMA');
        });
    });

    describe('getNyeAlternativer', () => {
        describe('Når innlogget bruker === "Bruker"', () => {
            it('Skal returnere alle dersom bruker ikke har svart tidligere', () => {
                const res = getNyeAlternativer(moteIkkeBesvart);
                expect(res).to.deep.equal(moteIkkeBesvart.alternativer);
            });

            it('Skal returnere ingen dersom bruker har svart', () => {
                const res = getNyeAlternativer(moteBesvartAlleAlternativer);
                expect(res).to.deep.equal([]);
            });

            it('Skal returnere ingen dersom bruker har svart på nye alternativer', () => {
                const res = getNyeAlternativer(moteBesvartMedNyeAlternativerBesvart);
                expect(res).to.deep.equal([]);
            });

            it('Skal returnere nye dersom bruker ikke har svart på nye alternativer', () => {
                const res = getNyeAlternativer(moteBesvartMedNyeAlternativerIkkeBesvart);
                // Tidspunkt opprettet etter at innlogget bruker har svart anses som nye
                expect(res).to.deep
                    .equal([{
                        id: 3,
                        tid: new Date('2017-03-13T14:04:59.524'),
                        created: new Date('2017-02-28T14:04:59.524'),
                        sted: 'Testveien 2',
                        valgt: false,
                    }, {
                        id: 4,
                        tid: new Date('2017-03-14T14:04:59.524'),
                        created: new Date('2017-02-28T14:04:59.524'),
                        sted: 'Testveien 2',
                        valgt: false,
                    }]);
            });
        });

        describe('Når innlogget bruker === "arbeidsgiver" og arbeidstaker har svart', () => {
            let mote;

            beforeEach(() => {
                mote = {
                    moteUuid: '22c139fb-a901-488a-8bab-2f0f30aa8221',
                    status: 'OPPRETTET',
                    fnr: '01010101010',
                    opprettetTidspunkt: new Date('2017-03-28T13:14:30.514'),
                    bekreftetTidspunkt: null,
                    deltakere: [{
                        navn: 'Are Arbeidsgiver',
                        orgnummer: '123456789',
                        type: 'arbeidsgiver',
                        svartidspunkt: null,
                        svar: [{
                            id: 4273,
                            tid: new Date('2017-03-30T10:00:00'),
                            created: new Date('2017-03-28T13:14:30.517'),
                            sted: 'Oslo',
                            valgt: false,
                        }, {
                            id: 4274,
                            tid: new Date('2017-03-30T12:00:00'),
                            created: new Date('2017-03-28T13:14:30.517'),
                            sted: 'Oslo',
                            valgt: false,
                        }],
                    }, {
                        navn: 'Sigve Sykmeldt',
                        orgnummer: null,
                        type: 'Bruker',
                        svartidspunkt: new Date('2017-03-28T13:15:07.363'),
                        svar: [{
                            id: 4273,
                            tid: new Date('2017-03-30T10:00:00'),
                            created: new Date('2017-03-28T13:14:30.517'),
                            sted: 'Oslo',
                            valgt: false,
                        }, {
                            id: 4274,
                            tid: new Date('2017-03-30T12:00:00'),
                            created: new Date('2017-03-28T13:14:30.517'),
                            sted: 'Oslo',
                            valgt: false,
                        }],
                    }],
                    bekreftetAlternativ: null,
                    alternativer: [{
                        id: 4273,
                        tid: new Date('2017-03-30T10:00:00'),
                        created: new Date('2017-03-28T13:14:30.517'),
                        sted: 'Oslo',
                        valgt: false,
                    }, {
                        id: 4274,
                        tid: new Date('2017-03-30T12:00:00'),
                        created: new Date('2017-03-28T13:14:30.517'),
                        sted: 'Oslo',
                        valgt: false,
                    }],
                };
            });

            it('Skal returnere alle alternativer', () => {
                const res = getNyeAlternativer(mote, ARBEIDSGIVER);
                expect(res).to.deep
                    .equal([{
                        id: 4273,
                        tid: new Date('2017-03-30T10:00:00'),
                        created: new Date('2017-03-28T13:14:30.517'),
                        sted: 'Oslo',
                        valgt: false,
                    }, {
                        id: 4274,
                        tid: new Date('2017-03-30T12:00:00'),
                        created: new Date('2017-03-28T13:14:30.517'),
                        sted: 'Oslo',
                        valgt: false,
                    }]);
            });
        });
    });

    describe('getTidligereAlternativer', () => {
        describe('Når innlogget bruker er "Bruker"', () => {
            it('Skal returnere ingen dersom bruker ikke har svart tidligere', () => {
                const res = getTidligereAlternativer(moteIkkeBesvart);
                expect(res).to.deep.equal([]);
            });

            it('Skal returnere alle dersom bruker har svart', () => {
                const res = getTidligereAlternativer(moteBesvartAlleAlternativer);
                expect(res).to.deep.equal(moteBesvartAlleAlternativer.alternativer);
            });

            it('Skal returnere alle dersom bruker har svart på nye alternativer', () => {
                const res = getTidligereAlternativer(moteBesvartMedNyeAlternativerBesvart);
                expect(res).to.deep.equal(moteBesvartMedNyeAlternativerBesvart.alternativer);
            });

            it('Skal returnere gamle dersom bruker ikke har svart på nye alternativer', () => {
                const res = getTidligereAlternativer(moteBesvartMedNyeAlternativerIkkeBesvart);
                // Tidspunkt opprettet før innlogget bruker svarte anses som gamle
                expect(res).to.deep
                    .equal([{
                        id: 1,
                        tid: new Date('2017-03-08T14:04:59.524'),
                        created: new Date('2017-02-23T14:04:59.524'),
                        sted: 'Testveien 2',
                        valgt: true,
                    }, {
                        id: 2,
                        tid: new Date('2017-03-10T14:04:59.524'),
                        created: new Date('2017-02-23T14:04:59.524'),
                        sted: 'Testveien 2',
                        valgt: false,
                    }]);
            });
        });
    });

    describe('brukerHarSvart', () => {
        it('Skal returnere false hvis created er etter svartidspunkt', () => {
            const created = new Date('2017-02-25T12:57:11.906');
            const svartidspunkt = new Date('2017-02-23T12:57:11.906');
            expect(brukerHarSvart(svartidspunkt, created)).to.be.equal(false);
        });

        it('Skal returnere false hvis svartidspunkt er null', () => {
            const svartidspunkt = null;
            const created = new Date('2017-02-25T12:57:11.906');
            expect(brukerHarSvart(svartidspunkt, created)).to.be.equal(false);
        });

        it('Skal returnere true hvis created er før svartidspunkt', () => {
            const created = new Date('2017-02-23T12:57:11.906');
            const svartidspunkt = new Date('2017-02-25T12:57:11.906');
            expect(brukerHarSvart(svartidspunkt, created)).to.be.equal(true);
        });
    });

    describe('getSvar', () => {
        it('Skal returnere "Ikke svart" hvis svartidspunkt ikke finnes', () => {
            const res = getSvar({}, null);
            expect(res).to.equal('IKKE_SVART');
        });

        it('Skal returnere Ikke svart hvis bruker ikke har svart', () => {
            const created = new Date('2017-02-25T12:57:11.906');
            const svartidspunkt = new Date('2017-02-23T12:57:11.906');
            const res = getSvar({ created }, svartidspunkt);
            expect(res).to.equal('IKKE_SVART');
        });

        it('Skal returnere Passer hvis bruker har svart, og det passer', () => {
            const valgt = true;
            const created = new Date('2017-02-24T12:57:11.906');
            const svartidspunkt = new Date('2017-02-25T12:57:11.906');
            const res = getSvar({ created, valgt }, svartidspunkt);
            expect(res).to.equal('PASSER');
        });

        it('Skal returnere Passer ikke hvis bruker har svart, og det ikke passer', () => {
            const valgt = false;
            const created = new Date('2017-02-24T12:57:11.906');
            const svartidspunkt = new Date('2017-02-25T12:57:11.906');
            const res = getSvar({ created, valgt }, svartidspunkt);
            expect(res).to.equal('PASSER_IKKE');
        });
    });


    describe('finnNyesteAlternativ', () => {
        it('Skal returnere false hvis created er etter svartidspunkt', () => {
            const alternativer = [
                {
                    id: 1,
                    created: new Date('2017-02-25T12:57:11.906'),
                },
                {
                    id: 2,
                    created: new Date('2017-04-25T12:57:11.906'),
                },
                {
                    id: 3,
                    created: new Date('2017-03-25T12:57:11.906'),
                },
            ];
            expect(finnNyesteAlternativ(alternativer)).to.deep.equal(alternativer[1]);
        });
    });
});
