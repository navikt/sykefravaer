import chai from 'chai';

const { expect } = chai;

describe('Object.byString', () => {
    it('Returnerer verdi fra streng', () => {
        const o = {
            person: {
                fornavn: 'Eli',
                adresse: {
                    gate: 'Portveien',
                    nummer: '2',
                },
            },
        };
        expect(Object.byString(o, 'person.adresse.nummer')).to.equal('2');
    });

    it('Returnerer verdi fra streng ved array av strenger', () => {
        const o = {
            person: {
                fornavn: 'Eli',
                adresse: {
                    gate: 'Portveien',
                    nummer: '2',
                },
                hobbyer: ['hage', 'giraffer', 'jarl'],
            },
        };
        expect(Object.byString(o, 'person.hobbyer[0]')).to.equal('hage');
    });

    it('Returnerer verdi fra streng ved array av objekter', () => {
        const o = {
            person: {
                fornavn: 'Eli',
                adresse: {
                    gate: 'Portveien',
                    nummer: '2',
                },
                hobbyer: ['hage', 'giraffer', 'jarl'],
                barn: [{
                    fornavn: 'Titten',
                    etternavn: 'Tei',
                }, {
                    fornavn: 'Ole',
                    etternavn: 'Tei',
                }],
            },
        };
        expect(Object.byString(o, 'person.barn[1].fornavn')).to.equal('Ole');
        expect(Object.byString(o, 'person.barn[1].etternavn')).to.equal('Tei');
    });
});
