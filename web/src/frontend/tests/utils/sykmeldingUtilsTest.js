import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import * as utils from '../../js/utils/sykmeldingUtils';

describe("getSykmelding", () => {
    it("Skal returnere undefined dersom den ikke finner sykmeldingen", () => {
        const res = utils.getSykmelding([], 123);
        expect(res).to.deep.equal(undefined);
    });

    it("Skal returnere sykmeldingen dersom den finner sykmeldingen", () => {
        const sykmeldinger = deepFreeze([{id: 123}, {id: 345}, {id: 888}]);
        const res = utils.getSykmelding(sykmeldinger, 123);
        expect(res).to.deep.equal({
            id: 123
        });
    });
})

describe("getPeriodeSpenn", () => {
    it("skal returnere antall dager mellom startdato i første periode og sluttdato i siste periode", () => {
        const perioder = [{
            "fom": { year: 2015, monthValue: 1, dayOfMonth: 1 },
            "tom": { year: 2015, monthValue: 1, dayOfMonth: 2 },
            "grad": "100"
        }, {
            "fom": { year: 2015, monthValue: 1, dayOfMonth: 1 },
            "tom": { year: 2015, monthValue: 1, dayOfMonth: 3 },
            "grad": "100"
        }, {
            "fom": { year: 2015, monthValue: 1, dayOfMonth: 1},
            "tom": { year: 2015, monthValue: 1, dayOfMonth: 20 },
            "grad": "100"
        }];
        const p = utils.getPeriodeSpenn(perioder);
        expect(p).to.equal(20)
    });
});

describe("getSykmeldingStartdato", () => {
    it("skal returnere startdato for første periode", () => {
        const res1 = utils.getSykmeldingStartdato({
            "id": 1,
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2014, monthValue: 1, dayOfMonth: 1 },
                    "tom": { year: 2014, monthValue: 1, dayOfMonth: 10 },
                    "grad": "80"
                }, {
                    "fom": { year: 2014, monthValue: 2, dayOfMonth: 2 },
                    "tom": { year: 2014, monthValue: 2, dayOfMonth: 5 }, 
                    "grad": "80"
                }]
            }
        })
        expect(res1).to.deep.equal({ year: 2014, monthValue: 1, dayOfMonth: 1 });

        const res2 = utils.getSykmeldingStartdato({
            "id": 1,
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2014, monthValue: 1, dayOfMonth: 1 },
                    "tom": { year: 2014, monthValue: 1, dayOfMonth: 10 },
                    "grad": "80"
                }, {
                    "fom": { year: 2012, monthValue: 2, dayOfMonth: 2 },
                    "tom": { year: 2014, monthValue: 2, dayOfMonth: 5 }, 
                    "grad": "80"
                }]
            }
        })
        expect(res2).to.deep.equal({ year: 2012, monthValue: 2, dayOfMonth: 2 })
    });
});

    