import { tidligsteFom,
    senesteTom,
    periodeErHelg,
    perioderErHelg,
    periodeOverlapperMedPeriode,
    periodeOverlapperMedPerioder,
    perioderOverlapperMedPerioder,
    harOverlappendePerioder } from "../../js/utils/periodeUtils";
import chai from "chai";
import chaiEnzyme from "chai-enzyme";

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("periodeUtils", () => {

    describe("tidligsteFom og senesteTom", () => {
        
        it("Regner ut tidligsteFom og senesteTom", () => {
            const perioder = [
                {
                    fom: '2017-05-10',
                    tom: '2017-05-15',
                }, {
                    fom: '2017-05-01',
                    tom: '2017-05-09',
                }, {
                    fom: '2017-04-10',
                    tom: '2017-04-30',
                }, {
                    fom: '2017-05-16',
                    tom: '2017-05-20',
                }, {
                    fom: '2017-05-21',
                    tom: '2017-05-22',
                }, {

                }
            ];

            const fom = tidligsteFom(perioder);
            const tom = senesteTom(perioder);

            expect(fom).to.equal('2017-04-10');
            expect(tom).to.equal('2017-05-22');
        });

    });

    describe("periodeErHelg", () => {

        it("Returnerer true hvis perioden er en helg", () => {
            const periode = {
                fom: "16.07.2016",
                tom: "17.07.2016"
            };
            expect(periodeErHelg(periode)).to.be.true;
        });

        it("Returnerer false hvis perioden er delvis en helg", () => {
            const periode = {
                fom: "16.07.2016",
                tom: "18.07.2016"
            };
            expect(periodeErHelg(periode)).to.be.false;
        });

        it("Returnerer false hvis perioden er midt i uken", () => {
            const periode = {
                fom: "19.07.2016",
                tom: "20.07.2016"
            };
            expect(periodeErHelg(periode)).to.be.false;
        });

        it("Returnerer false hvis perioden mangler tom", () => {
            const periode = {
                fom: "19.07.2016",
            };
            expect(periodeErHelg(periode)).to.be.false;
        });

        it("Returnerer false hvis perioden mangler fom", () => {
            const periode = {
                tom: "19.07.2016",
            };
            expect(periodeErHelg(periode)).to.be.false;
        });

        it("Returnerer true hvis perioden er Ã©n dag i en helg", () => {
            const periodeLordag = {
                fom: "16.07.2016",
                tom: "16.07.2016"
            };
            const periodeSondag = {
                fom: "17.07.2016",
                tom: "17.07.2016"
            };
            expect(periodeErHelg(periodeLordag)).to.be.true;
            expect(periodeErHelg(periodeSondag)).to.be.true;
        });

        it("Returnerer false hvis perioden er Ã©n dag utenfor en helg (mandag)", () => {
            const periodeMandag = {
                fom: "18.07.2016",
                tom: "18.07.2016"
            };
            expect(periodeErHelg(periodeMandag)).to.be.false;
        });

        it("Returnerer false hvis perioden er Ã©n dag utenfor en helg (fredag)", () => {
            const periodeFredag = {
                fom: "22.07.2016",
                tom: "22.07.2016"
            };
            expect(periodeErHelg(periodeFredag)).to.be.false;
        });

        it("Returnerer false hvis perioden starter og slutter pÃ¥ en helgedag men i forskjellig helg", () => {
            const periode = {
                fom: "16.07.2016",
                tom: "23.07.2016"
            };
            expect(periodeErHelg(periode)).to.be.false;
        });

        it("Returnerer false hvis perioden verken har fom eller tom", () => {
            const periode = {};
            expect(periodeErHelg(periode)).to.be.false;
        });

    });

    describe("perioderErHelg", () => {

        const periodeHelg = {
            fom: "16.07.2016",
            tom: "17.07.2016"
        };

        const periodeIkkeHelg = {
            fom: "16.07.2016",
            tom: "23.07.2016"
        }

        it("Returnerer true hvis det sendes inn Ã©n periode og den er helg", () => {
            const perioder = [periodeHelg];
            expect(perioderErHelg(perioder)).to.be.true;
        });

        it("Returnerer false hvis det sendes inn Ã©n periode og den ikke er helg", () => {
            const perioder = [periodeIkkeHelg];
            expect(perioderErHelg(perioder)).to.be.false;
        });

        it("Returnerer false hvis det sendes inn to perioder og bare den ene er helg", () => {
            const perioder = [periodeHelg, periodeIkkeHelg];
            expect(perioderErHelg(perioder)).to.be.false;
        });

        it("Returnerer false hvis det sendes inn ingen perioder", () => {
            expect(perioderErHelg([])).to.be.false;
        });

        it("Returnerer false hvis det sendes inn en tom periode", () => {
            expect(perioderErHelg([{}])).to.be.false;
        })

    });

    describe("periodeOverlapperMedPeriode", () => {

        let periodeA, periodeB, periodeC, periodeD;

        beforeEach(() => {
            periodeA = {
                fom: "12.12.2012",
                tom: "15.12.2012"
            };
            periodeB = {
                fom: "16.12.2012",
                tom: "20.12.2012"
            };
            periodeC = {
                fom: "21.12.2012",
                tom: "25.12.2012"
            };
            periodeD = {
                fom: "13.12.2012",
                tom: "23.12.2012",
            };
        });

        it("Returnerer true hvis periodene overlapper fullstendig", () => {
            expect(periodeOverlapperMedPeriode(periodeA, periodeA)).to.be.true;
        });

        it("Returnerer false hvis periodene ikke overlapper i det hele tatt", () => {
            expect(periodeOverlapperMedPeriode(periodeA, periodeB)).to.be.false;
        });

        it("Returnerer true hvis periodene overlapper delvis", () => {
            expect(periodeOverlapperMedPeriode(periodeA, periodeD)).to.be.true;
        });

        it("Returnerer true hvis periodeA er innenfor periodeB", () => {
            expect(periodeOverlapperMedPeriode(periodeB, periodeD)).to.be.true;
        });

        it("Returnerer true hvis periodeB er innenfor periodeA", () => {
            expect(periodeOverlapperMedPeriode(periodeD, periodeB)).to.be.true;
        });

    });

    describe("periodeOverlapperMedPerioder", () => {
        let periodeA, periodeB, periodeC, periodeD;

        beforeEach(() => {
            periodeA = {
                fom: "12.12.2012",
                tom: "15.12.2012"
            };
            periodeB = {
                fom: "16.12.2012",
                tom: "20.12.2012"
            };
            periodeC = {
                fom: "21.12.2012",
                tom: "25.12.2012"
            };
            periodeD = {
                fom: "13.12.2012",
                tom: "23.12.2012",
            };
            periodeTom = {
                tom: "23.12.2012",
            };
            periodeFom = {
                fom: "23.12.2012",
            };
        });

        it("Returnerer true hvis perioden overlapper med periodene", () => {
            const perioder = [periodeA];
            expect(periodeOverlapperMedPerioder(periodeA, perioder)).to.be.true;
        });

        it("Returnerer false hvis perioden ikke overlapper med periodene", () => {
            const perioder = [periodeB];
            expect(periodeOverlapperMedPerioder(periodeA, perioder)).to.be.false;
        });

        it("Returnerer true hvis perioden overlapper med Ã©n av periodene", () => {
            const perioder = [periodeC, periodeD];
            expect(periodeOverlapperMedPerioder(periodeB, perioder)).to.be.true;
        });

        it("Returnerer false hvis perioden er ugyldig", () => {
            const perioder = [periodeC, periodeD];
            expect(periodeOverlapperMedPeriode(periodeFom, perioder)).to.be.false;
        });

        it("Returnerer false hvis en av periodene er ugyldig", () => {
            const perioder = [periodeTom, periodeD];
            expect(periodeOverlapperMedPeriode(periodeC, perioder)).to.be.false;
        });

        it("Returnerer true hvis senesteTom i ene perioden er samme dag som tidligsteFom i første perioden", () => {
            const a = {
                fom: "01.02.2017",
                tom: "22.02.2017"
            };
            const b = {
                fom: "22.02.2017",
                tom: "25.02.2017"
            }
            expect(periodeOverlapperMedPeriode(a, b)).to.be.true;
        });

        it("Hjelpetest 1", () => {
            const a = {
                fom: "06.07.2016",
                tom: "09.07.2016"
            };
            const b = {
                fom: "07.07.2016",
                tom: "10.07.2016"
            };
            const perioder = [a];
            expect(periodeOverlapperMedPerioder(a, [b])).to.be.true;
        });

    });

    describe("perioderOverlapperMedPerioder", () => {
        let periodeA, periodeB, periodeC, periodeD;

        beforeEach(() => {
            periodeA = {
                fom: "12.12.2012",
                tom: "15.12.2012"
            };
            periodeB = {
                fom: "16.12.2012",
                tom: "20.12.2012"
            };
            periodeC = {
                fom: "21.12.2012",
                tom: "25.12.2012"
            };
            periodeD = {
                fom: "13.12.2012",
                tom: "23.12.2012",
            };
        });

        it("Returnerer true hvis periodeneA overlapper med periodeneB", () => {
            expect(perioderOverlapperMedPerioder([periodeA], [periodeA])).to.be.true;
        });

        it("Returnerer true hvis periodeneA er innenfor periodeneB", () => {
            expect(perioderOverlapperMedPerioder([periodeB], [periodeD])).to.be.true;
        });

        it("Returnerer false hvis periodene ikke overlapper med periodene", () => {
            expect(perioderOverlapperMedPerioder([periodeA], [periodeB])).to.be.false;
        });

        it("Returnerer true hvis periodene overlapper med en av periodene", () => {
            expect(perioderOverlapperMedPerioder([periodeB], [periodeD, periodeA])).to.be.true;
        });

        it("Skal hÃ¥ndtere at det sendes inn undefined", () => {
            expect(perioderOverlapperMedPerioder(undefined, undefined)).to.be.false;
            expect(perioderOverlapperMedPerioder(undefined, [periodeA])).to.be.false;
            expect(perioderOverlapperMedPerioder([periodeA], undefined)).to.be.false;
        });

        it("Skal hÃ¥ndtere at det sendes tomme perioder-array", () => {
            expect(perioderOverlapperMedPerioder([], [])).to.be.false;
            expect(perioderOverlapperMedPerioder([], [periodeA])).to.be.false;
            expect(perioderOverlapperMedPerioder([periodeA], [])).to.be.false;
        });

    });

    describe("harOverlappendePerioder", () => {
        let periodeA, periodeB, periodeC, periodeD, periodeTom, periodeFom;

        beforeEach(() => {
            periodeA = {
                fom: "12.12.2012",
                tom: "15.12.2012"
            };
            periodeB = {
                fom: "16.12.2012",
                tom: "20.12.2012"
            };
            periodeC = {
                fom: "21.12.2012",
                tom: "25.12.2012"
            };
            periodeD = {
                fom: "13.12.2012",
                tom: "23.12.2012",
            };
            periodeTom = {
                tom: "23.12.2012",
            };
            periodeFom = {
                fom: "23.12.2012",
            };
        });

        it("Skal returnere false hvis det bare sendes inn én periode", () => {
            const perioder = [periodeA];
            expect(harOverlappendePerioder(perioder)).to.be.false;
        });


        it("Skal returnere false hvis det sendes inn perioder som ikke overlapper", () => {
            const perioder = [periodeA, periodeB];
            expect(harOverlappendePerioder(perioder)).to.be.false;
        });

        it("Skal returnere true hvis det sendes inn perioder som delvis overlapper", () => {
            const perioder = [periodeC, periodeD, periodeB];
            expect(harOverlappendePerioder(perioder)).to.be.true;
        });

        it("Skal returnere false hvis det sendes inn en gyldig og en ugyldig periode", () => {
            const perioder = [periodeC, periodeTom];
            expect(harOverlappendePerioder(perioder)).to.be.false;
        });

        it("Skal returnere false hvis det sendes inn to ugyldige perioder", () => {
            const perioder = [periodeFom, periodeTom];
            expect(harOverlappendePerioder(perioder)).to.be.false;
        });

        it("Skal returnere true hvis det sendes inn perioder som delvis overlapper og en ugyldig periode", () => {
            const perioder = [periodeC, periodeD, periodeB, periodeTom];
            expect(harOverlappendePerioder(perioder)).to.be.true;
        });

        it("Skal returnere true hvis det sendes inn to overlappende perioder (2)", () => {
            const a = {
                fom: "06.07.2016",
                tom: "09.07.2016"
            };
            const b = {
                fom: "07.07.2016",
                tom: "10.07.2016"
            };
            const perioder = [a, b];
            expect(harOverlappendePerioder(perioder)).to.be.true;
        });

    });

});