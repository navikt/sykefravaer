import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {
    datoMedKlokkeslett,
    erGyldigDato,
    tilLesbarDatoMedArstallOgUkedag,
    visKlokkeslett,
    visKortDato,
} from '../../js/utils/datoUtils';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('datoUtils', () => {
    it('skal formattere dato', () => {
        const datotekst = datoMedKlokkeslett('2017-02-16T11:00:00');
        expect(datotekst).to.be.equal('16/2 klokken 11:00');
    });

    it('skal formattere dato', () => {
        const datotekst = datoMedKlokkeslett('2017-02-02T11:00:00');
        expect(datotekst).to.be.equal('2/2 klokken 11:00');
    });

    it('skal ikke krasje ved bad input', () => {
        let datotekst = datoMedKlokkeslett(undefined);
        expect(datotekst).to.be.equal('');

        datotekst = datoMedKlokkeslett(null);
        expect(datotekst).to.be.equal('');
    });

    describe('erGyldigDato', () => {
        it("Skal returnere false ved 'dd.mm.yy'", () => {
            const d = erGyldigDato('02.01.17');
            expect(d).to.equal(false);
        });

        it("Skal returnere true ved 'dd.mm.yyyy'", () => {
            const d = erGyldigDato('02.01.2017');
            expect(d).to.equal(true);
        });

        it('Skal returnere false ved ugyldige datoer', () => {
            const d = erGyldigDato('31.11.2017');
            expect(d).to.equal(false);
        });
    });

    describe('tilLesbarDatoMedArstallOgUkedag', () => {
        it('Skal returnere dato med ukedag og tall for dag, uten null foran, når datoen er mellom 1 og 9', () => {
            const dato = new Date('2018-01-02');
            expect(tilLesbarDatoMedArstallOgUkedag(dato)).to.equal('Tirsdag 2. januar 2018');

            const dato2 = new Date('2019-03-09');
            expect(tilLesbarDatoMedArstallOgUkedag(dato2)).to.equal('Lørdag 9. mars 2019');
        });
    });

    describe('visKlokkeslett', () => {
        it('Skal vise klokkeslett på riktig format', () => {
            const d = visKlokkeslett(new Date(2017, 4, 3, 9, 0));
            expect(d).to.equal('09.00');
        });
    });

    describe('visKortDato', () => {
        it('Skal vise kort dato på riktig format', () => {
            const d = visKortDato(new Date(2017, 10, 19, 9, 0));
            expect(d).to.equal('19.11.2017');
        });

        it('Skal vise kort dato med 0 foran dersom det bare er et siffer', () => {
            const d = visKortDato(new Date(2002, 8, 9, 9, 0));
            expect(d).to.equal('09.09.2002');
        });
    });
});

