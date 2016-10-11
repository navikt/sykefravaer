import { expect } from 'chai';
import { sorterSykmeldinger, sorterPerioderEldsteFoerst, sorterSykmeldingerEldsteFoerst, getSykmeldingStartdato } from '../../js/utils/sorterSykmeldingerUtils';
import getSykmelding from '../mockSykmeldinger';

describe("sorterSykmeldinger", function () {

    let sykmeldinger = [{
        "id": 1,
        "arbeidsgiver": "Drammen Frisør",
        "mulighetForArbeid": {
            "perioder": [{
                "fom": { year: 2014, monthValue: 1, dayOfMonth: 24 },
                "tom": { year: 2014, monthValue: 2, dayOfMonth: 9 },
                "grad": "80"
            }]
        }
    }, {
        "id": 2,
        "arbeidsgiver": "Ålesund Frisør",
        "mulighetForArbeid": {
            "perioder": [{
                "fom": { year: 2014, monthValue: 12, dayOfMonth: 31 },
                "tom": { year: 2015, monthValue: 1, dayOfMonth: 30 },
                "grad": "25"
            }]
        }
    }, {
        "id": 3,
        "arbeidsgiver": "Alnabru Frisør",
        "mulighetForArbeid": {
            "perioder": [{
                "fom": { year: 2015, monthValue: 4, dayOfMonth: 8 },
                "tom": { year: 2015, monthValue: 4, dayOfMonth: 15 },
                "grad": "100"
            }]
        }
    }, {
        "id": 4,
        "arbeidsgiver": "Alnabru Frisør",
        "mulighetForArbeid": {
            "perioder": [{
                "fom": { year: 2015, monthValue: 5, dayOfMonth: 17 },
                "tom": { year: 2015, monthValue: 5, dayOfMonth: 31 },
                "grad": "100"
            }]
        }
    }, {
        "id": 5,
        "arbeidsgiver": "Alnabru Frisør",
        "mulighetForArbeid": {
            "perioder": [{
                "fom": { year: 2015, monthValue: 8, dayOfMonth: 31 },
                "tom": { year: 2015, monthValue: 9, dayOfMonth: 13 },
                "grad": "100"
            }]
        }
    }, {
        "id": 6,
        "arbeidsgiver": "Bærum Idrettslag",
        "mulighetForArbeid": {
            "perioder": [{
                "fom": { year: 2016, monthValue: 3, dayOfMonth: 31 },
                "tom": { year: 2016, monthValue: 8, dayOfMonth: 13 },
                "grad": "29"
            }]
        }
    }]

    it("Skal sortere etter startdato for første periode som standard", () => {
        var s = sorterSykmeldinger(sykmeldinger);
        expect(s).to.deep.equal([{
            "id": 6,
            "arbeidsgiver": "Bærum Idrettslag",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2016, monthValue: 3, dayOfMonth: 31 },
                    "tom": { year: 2016, monthValue: 8, dayOfMonth: 13 },
                    "grad": "29"
                }]
            }
        }, {
            "id": 5,
            "arbeidsgiver": "Alnabru Frisør",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2015, monthValue: 8, dayOfMonth: 31 },
                    "tom": { year: 2015, monthValue: 9, dayOfMonth: 13 },
                    "grad": "100"
                }]
            }
        }, {
            "id": 4,
            "arbeidsgiver": "Alnabru Frisør",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2015, monthValue: 5, dayOfMonth: 17 },
                    "tom": { year: 2015, monthValue: 5, dayOfMonth: 31 },
                    "grad": "100"
                }]
            }
        }, {
            "id": 3,
            "arbeidsgiver": "Alnabru Frisør",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2015, monthValue: 4, dayOfMonth: 8 },
                    "tom": { year: 2015, monthValue: 4, dayOfMonth: 15 },
                    "grad": "100"
                }]
            }
        }, {
            "id": 2,
            "arbeidsgiver": "Ålesund Frisør",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2014, monthValue: 12, dayOfMonth: 31 },
                    "tom": { year: 2015, monthValue: 1, dayOfMonth: 30 },
                    "grad": "25"
                }]
            }
        }, {
            "id": 1,
            "arbeidsgiver": "Drammen Frisør",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2014, monthValue: 1, dayOfMonth: 24 },
                    "tom": { year: 2014, monthValue: 2, dayOfMonth: 9 },
                    "grad": "80"
                }]
            }
        }]);
    });


    it("Skal sortere periodene etter sluttdato dersom to perioder har samme startdato", () => {
        var s = sorterSykmeldinger([{
            "id": 6,
            "arbeidsgiver": "Bærum Idrettslag",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2016, monthValue: 8, dayOfMonth: 31 },
                    "tom": { year: 2016, monthValue: 9, dayOfMonth: 13 },
                    "grad": "100"
                }, {
                    "fom": { year: 2016, monthValue: 8, dayOfMonth: 31 },
                    "tom": { year: 2016, monthValue: 12, dayOfMonth: 13 },
                    "grad": "29"
                }, {
                    "fom": { year: 2015, monthValue: 7, dayOfMonth: 9 },
                    "tom": { year: 2015, monthValue: 7, dayOfMonth: 13 },
                    "grad": "60"
                }]
            }
        }]);
        expect(s).to.deep.equal([{
            "id": 6,
            "arbeidsgiver": "Bærum Idrettslag",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2015, monthValue: 7, dayOfMonth: 9 },
                    "tom": { year: 2015, monthValue: 7, dayOfMonth: 13 },
                    "grad": "60"
                }, {
                    "fom": { year: 2016, monthValue: 8, dayOfMonth: 31 },
                    "tom": { year: 2016, monthValue: 9, dayOfMonth: 13 },
                    "grad": "100"
                }, {
                    "fom": { year: 2016, monthValue: 8, dayOfMonth: 31 },
                    "tom": { year: 2016, monthValue: 12, dayOfMonth: 13 },
                    "grad": "29"
                }]
            }
        }]);
    });

    it("Skal sortere periodene slik at første periode kommer først", () => {

        var s = sorterSykmeldinger([{
            "id": 6,
            "arbeidsgiver": "Bærum Idrettslag",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2016, monthValue: 8, dayOfMonth: 31 },
                    "tom": { year: 2016, monthValue: 12, dayOfMonth: 22 },
                    "grad": "100"
                }, {
                    "fom": { year: 2016, monthValue: 3, dayOfMonth: 31 },
                    "tom": { year: 2016, monthValue: 8, dayOfMonth: 13 },
                    "grad": "29"
                }, {
                    "fom": { year: 2015, monthValue: 7, dayOfMonth: 9 },
                    "tom": { year: 2015, monthValue: 7, dayOfMonth: 13 },
                    "grad": "60"
                }]
            }
        }]);
        expect(s).to.deep.equal([{
            "id": 6,
            "arbeidsgiver": "Bærum Idrettslag",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2015, monthValue: 7, dayOfMonth: 9 },
                    "tom": { year: 2015, monthValue: 7, dayOfMonth: 13 },
                    "grad": "60"
                }, {
                    "fom": { year: 2016, monthValue: 3, dayOfMonth: 31 },
                    "tom": { year: 2016, monthValue: 8, dayOfMonth: 13 },
                    "grad": "29"
                }, {
                    "fom": { year: 2016, monthValue: 8, dayOfMonth: 31 },
                    "tom": { year: 2016, monthValue: 12, dayOfMonth: 22 },
                    "grad": "100"
                }]
            }
        }]);

    });

    it("Skal sortere periodene etter sluttdato dersom to perioder har samme startdato", () => {
        var s = sorterSykmeldinger([{
            "id": 6,
            "arbeidsgiver": "Bærum Idrettslag",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2016, monthValue: 8, dayOfMonth: 31 },
                    "tom": { year: 2016, monthValue: 9, dayOfMonth: 13 },
                    "grad": "100"
                }, {
                    "fom": { year: 2016, monthValue: 8, dayOfMonth: 31 },
                    "tom": { year: 2016, monthValue: 12, dayOfMonth: 13 },
                    "grad": "29"
                }, {
                    "fom": { year: 2015, monthValue: 7, dayOfMonth: 9 },
                    "tom": { year: 2015, monthValue: 7, dayOfMonth: 13 },
                    "grad": "60"
                }]
            }
        }]);
        expect(s).to.deep.equal([{
            "id": 6,
            "arbeidsgiver": "Bærum Idrettslag",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2015, monthValue: 7, dayOfMonth: 9 },
                    "tom": { year: 2015, monthValue: 7, dayOfMonth: 13 },
                    "grad": "60"
                }, {
                    "fom": { year: 2016, monthValue: 8, dayOfMonth: 31 },
                    "tom": { year: 2016, monthValue: 9, dayOfMonth: 13 },
                    "grad": "100"
                }, {
                    "fom": { year: 2016, monthValue: 8, dayOfMonth: 31 },
                    "tom": { year: 2016, monthValue: 12, dayOfMonth: 13 },
                    "grad": "29"
                }]
            }
        }]);
    });

    it("Skal sortere etter innsendt kriterium uansett hva det er (arbeidsgiver)", () => {
        let sykmeldinger = [{
            "id": 3,
            "arbeidsgiver": "Alnabru Frisør",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2015, monthValue: 4, dayOfMonth: 8 },
                    "tom": { year: 2015, monthValue: 4, dayOfMonth: 15 },
                    "grad": "100"
                }]
            }
        }, {
            "id": 2,
            "arbeidsgiver": "Ålesund Frisør",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2014, monthValue: 12, dayOfMonth: 31 },
                    "tom": { year: 2015, monthValue: 1, dayOfMonth: 30 },
                    "grad": "25"
                }]
            }
        }, {
            "id": 1,
            "arbeidsgiver": "Drammen Frisør",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2014, monthValue: 1, dayOfMonth: 24 },
                    "tom": { year: 2014, monthValue: 2, dayOfMonth: 9 },
                    "grad": "80"
                }]
            }
        }];
        let s = sorterSykmeldinger(sykmeldinger, "arbeidsgiver");
        expect(s).to.deep.equal([{
            "id": 3,
            "arbeidsgiver": "Alnabru Frisør",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2015, monthValue: 4, dayOfMonth: 8 },
                    "tom": { year: 2015, monthValue: 4, dayOfMonth: 15 },
                    "grad": "100"
                }]
            }
        }, {
            "id": 1,
            "arbeidsgiver": "Drammen Frisør",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2014, monthValue: 1, dayOfMonth: 24 },
                    "tom": { year: 2014, monthValue: 2, dayOfMonth: 9 },
                    "grad": "80"
                }]
            }
        }, {
            "id": 2,
            "arbeidsgiver": "Ålesund Frisør",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2014, monthValue: 12, dayOfMonth: 31 },
                    "tom": { year: 2015, monthValue: 1, dayOfMonth: 30 },
                    "grad": "25"
                }]
            }
        }]);
    });

    it("Skal sortere etter innsendt kriterium uansett hva det er (sykmelder)", () => {
        let sykmeldinger = [{
            "id": 3,
            "arbeidsgiver": "Alnabru Frisør",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2015, monthValue: 4, dayOfMonth: 8 },
                    "tom": { year: 2015, monthValue: 4, dayOfMonth: 15 },
                    "grad": "100"
                }]
            },
            "bekreftelse": {
                "sykmelder": "Aslak Aslaksen"
            }
        }, {
            "id": 2,
            "arbeidsgiver": "Ålesund Frisør",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2014, monthValue: 12, dayOfMonth: 31 },
                    "tom": { year: 2015, monthValue: 1, dayOfMonth: 30 },
                    "grad": "25"
                }]
            },
            "bekreftelse": {
                "sykmelder": "Åse Åsnes"
            }
        }, {
            "id": 1,
            "arbeidsgiver": "Drammen Frisør",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2014, monthValue: 1, dayOfMonth: 24 },
                    "tom": { year: 2014, monthValue: 2, dayOfMonth: 9 },
                    "grad": "80"
                }]
            },
            "bekreftelse": {
                "sykmelder": "Dirk Derrick"
            }
        }];
        let s = sorterSykmeldinger(sykmeldinger, "bekreftelse.sykmelder");
        expect(s).to.deep.equal([{
            "id": 3,
            "arbeidsgiver": "Alnabru Frisør",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2015, monthValue: 4, dayOfMonth: 8 },
                    "tom": { year: 2015, monthValue: 4, dayOfMonth: 15 },
                    "grad": "100"
                }]
            },
            "bekreftelse": {
                "sykmelder": "Aslak Aslaksen"
            }
        }, {
            "id": 1,
            "arbeidsgiver": "Drammen Frisør",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2014, monthValue: 1, dayOfMonth: 24 },
                    "tom": { year: 2014, monthValue: 2, dayOfMonth: 9 },
                    "grad": "80"
                }]
            },
            "bekreftelse": {
                "sykmelder": "Dirk Derrick"
            }
        }, {
            "id": 2,
            "arbeidsgiver": "Ålesund Frisør",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2014, monthValue: 12, dayOfMonth: 31 },
                    "tom": { year: 2015, monthValue: 1, dayOfMonth: 30 },
                    "grad": "25"
                }]
            },
            "bekreftelse": {
                "sykmelder": "Åse Åsnes"
            }
        }]);

    });

    it("Skal sekundært sortere etter startdato dersom to sykmeldinger har samme arbeidsgiver", () => {
        let sykmeldinger = [{
            "id": 3,
            "arbeidsgiver": "Alnabru Frisør",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2015, monthValue: 4, dayOfMonth: 8 },
                    "tom": { year: 2015, monthValue: 4, dayOfMonth: 15 },
                    "grad": "100"
                }]
            }
        }, {
            "id": 2,
            "arbeidsgiver": "Alnabru Frisør",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2015, monthValue: 11, dayOfMonth: 20 },
                    "tom": { year: 2015, monthValue: 11, dayOfMonth: 30 },
                    "grad": "25"
                }]
            }
        }, {
            "id": 1,
            "arbeidsgiver": "Drammen Frisør",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2014, monthValue: 1, dayOfMonth: 24 },
                    "tom": { year: 2014, monthValue: 2, dayOfMonth: 9 },
                    "grad": "80"
                }]
            }
        }];
        let s = sorterSykmeldinger(sykmeldinger, "arbeidsgiver");
        expect(s).to.deep.equal([{
            "id": 2,
            "arbeidsgiver": "Alnabru Frisør",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2015, monthValue: 11, dayOfMonth: 20 },
                    "tom": { year: 2015, monthValue: 11, dayOfMonth: 30 },
                    "grad": "25"
                }]
            }
        }, {
            "id": 3,
            "arbeidsgiver": "Alnabru Frisør",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2015, monthValue: 4, dayOfMonth: 8 },
                    "tom": { year: 2015, monthValue: 4, dayOfMonth: 15 },
                    "grad": "100"
                }]
            }
        }, {
            "id": 1,
            "arbeidsgiver": "Drammen Frisør",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2014, monthValue: 1, dayOfMonth: 24 },
                    "tom": { year: 2014, monthValue: 2, dayOfMonth: 9 },
                    "grad": "80"
                }]
            }
        }]);
    });

    it("Skal sekundært sortere etter sluttdato for siste periode dersom to sykmeldinger har samme startdato", () => {
        let sykmeldinger = [{
            "id": 3,
            "arbeidsgiver": "Alnabru Frisør",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2015, monthValue: 4, dayOfMonth: 8 },
                    "tom": { year: 2015, monthValue: 4, dayOfMonth: 15 },
                    "grad": "100"
                }, {
                    "fom": { year: 2015, monthValue: 5, dayOfMonth: 8 },
                    "tom": { year: 2015, monthValue: 5, dayOfMonth: 15 },
                    "grad": "100"
                }, {
                    "fom": { year: 2015, monthValue: 8, dayOfMonth: 8 },
                    "tom": { year: 2015, monthValue: 8, dayOfMonth: 15 },
                    "grad": "100"
                }]
            }
        }, {
            "id": 2,
            "arbeidsgiver": "Alnabru Frisør",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2015, monthValue: 4, dayOfMonth: 8 },
                    "tom": { year: 2015, monthValue: 4, dayOfMonth: 22 },
                    "grad": "100"
                }, {
                    "fom": { year: 2015, monthValue: 6, dayOfMonth: 8 },
                    "tom": { year: 2015, monthValue: 6, dayOfMonth: 15 },
                    "grad": "100"
                }, {
                    "fom": { year: 2015, monthValue: 11, dayOfMonth: 8 },
                    "tom": { year: 2015, monthValue: 11, dayOfMonth: 15 },
                    "grad": "100"
                }]
            }
        }, {
            "id": 2,
            "arbeidsgiver": "Alnabru Frisør",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2015, monthValue: 4, dayOfMonth: 8 },
                    "tom": { year: 2015, monthValue: 4, dayOfMonth: 22 },
                    "grad": "100"
                }, {
                    "fom": { year: 2015, monthValue: 3, dayOfMonth: 8 },
                    "tom": { year: 2015, monthValue: 3, dayOfMonth: 15 },
                    "grad": "100"
                }, {
                    "fom": { year: 2015, monthValue: 1, dayOfMonth: 8 },
                    "tom": { year: 2015, monthValue: 1, dayOfMonth: 15 },
                    "grad": "100"
                }]
            }
        }, {
            "id": 1,
            "arbeidsgiver": "Drammen Frisør",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2014, monthValue: 1, dayOfMonth: 24 },
                    "tom": { year: 2014, monthValue: 2, dayOfMonth: 9 },
                    "grad": "80"
                }]
            }
        }];
        let s = sorterSykmeldinger(sykmeldinger);
        expect(s).to.deep.equal([{
            "id": 2,
            "arbeidsgiver": "Alnabru Frisør",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2015, monthValue: 4, dayOfMonth: 8 },
                    "tom": { year: 2015, monthValue: 4, dayOfMonth: 22 },
                    "grad": "100"
                }, {
                    "fom": { year: 2015, monthValue: 6, dayOfMonth: 8 },
                    "tom": { year: 2015, monthValue: 6, dayOfMonth: 15 },
                    "grad": "100"
                }, {
                    "fom": { year: 2015, monthValue: 11, dayOfMonth: 8 },
                    "tom": { year: 2015, monthValue: 11, dayOfMonth: 15 },
                    "grad": "100"
                }]
            }
        }, {
            "id": 3,
            "arbeidsgiver": "Alnabru Frisør",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2015, monthValue: 4, dayOfMonth: 8 },
                    "tom": { year: 2015, monthValue: 4, dayOfMonth: 15 },
                    "grad": "100"
                }, {
                    "fom": { year: 2015, monthValue: 5, dayOfMonth: 8 },
                    "tom": { year: 2015, monthValue: 5, dayOfMonth: 15 },
                    "grad": "100"
                }, {
                    "fom": { year: 2015, monthValue: 8, dayOfMonth: 8 },
                    "tom": { year: 2015, monthValue: 8, dayOfMonth: 15 },
                    "grad": "100"
                }]
            }
        }, {
            "id": 2,
            "arbeidsgiver": "Alnabru Frisør",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2015, monthValue: 1, dayOfMonth: 8 },
                    "tom": { year: 2015, monthValue: 1, dayOfMonth: 15 },
                    "grad": "100"
                }, {
                    "fom": { year: 2015, monthValue: 3, dayOfMonth: 8 },
                    "tom": { year: 2015, monthValue: 3, dayOfMonth: 15 },
                    "grad": "100"
                }, {
                    "fom": { year: 2015, monthValue: 4, dayOfMonth: 8 },
                    "tom": { year: 2015, monthValue: 4, dayOfMonth: 22 },
                    "grad": "100"
                }]
            }
        }, {
            "id": 1,
            "arbeidsgiver": "Drammen Frisør",
            "mulighetForArbeid": {
                "perioder": [{
                    "fom": { year: 2014, monthValue: 1, dayOfMonth: 24 },
                    "tom": { year: 2014, monthValue: 2, dayOfMonth: 9 },
                    "grad": "80"
                }]
            }
        }]);
    });


    it("Skal sortere perioder så eldste perioder fom kommer først og hvis lik fom så kommer eldste tom nederst", () => {
        let perioder = [{
            "fom": { year: 2015, monthValue: 4, dayOfMonth: 8 },
            "tom": { year: 2015, monthValue: 4, dayOfMonth: 15 },
            "grad": "100"
        }, {
            "fom": { year: 2015, monthValue: 4, dayOfMonth: 6 },
            "tom": { year: 2015, monthValue: 4, dayOfMonth: 16 },
            "grad": "100"
        }, {
            "fom": { year: 2015, monthValue: 4, dayOfMonth: 8 },
            "tom": { year: 2015, monthValue: 4, dayOfMonth: 14 },
            "grad": "100"
        }];

        const p = sorterPerioderEldsteFoerst(perioder);
        expect(p).to.deep.equal([{
            "fom": { year: 2015, monthValue: 4, dayOfMonth: 6 },
            "tom": { year: 2015, monthValue: 4, dayOfMonth: 16 },
            "grad": "100"
        }, {
            "fom": { year: 2015, monthValue: 4, dayOfMonth: 8 },
            "tom": { year: 2015, monthValue: 4, dayOfMonth: 14 },
            "grad": "100"
        }, {
            "fom": { year: 2015, monthValue: 4, dayOfMonth: 8 },
            "tom": { year: 2015, monthValue: 4, dayOfMonth: 15 },
            "grad": "100"
        }]);
    });

    it("Skal sortere perioder slik at den korteste perioden kommer først dersom flere perioder har samme startdato", () => {
        let perioder = [{
            "fom": { year: 2015, monthValue: 1, dayOfMonth: 1 },
            "tom": { year: 2015, monthValue: 1, dayOfMonth: 30 },
            "grad": "100"
        }, {
            "fom": { year: 2015, monthValue: 1, dayOfMonth: 1 },
            "tom": { year: 2015, monthValue: 1, dayOfMonth: 15 },
            "grad": "100"
        }, {
            "fom": { year: 2015, monthValue: 1, dayOfMonth: 1},
            "tom": { year: 2015, monthValue: 1, dayOfMonth: 20 },
            "grad": "100"
        }];

        const p = sorterPerioderEldsteFoerst(perioder);
        expect(p).to.deep.equal([{
            "fom": { year: 2015, monthValue: 1, dayOfMonth: 1 },
            "tom": { year: 2015, monthValue: 1, dayOfMonth: 15 },
            "grad": "100"
        }, {
            "fom": { year: 2015, monthValue: 1, dayOfMonth: 1 },
            "tom": { year: 2015, monthValue: 1, dayOfMonth: 20 },
            "grad": "100"
        }, {
            "fom": { year: 2015, monthValue: 1, dayOfMonth: 1 },
            "tom": { year: 2015, monthValue: 1, dayOfMonth: 30 },
            "grad": "100"
        }]);
    });
    
    describe("sorterSykmeldingerEldsteFoerst", () => {
        it("Skal sortere etter startdato for første periode med eldste først dersom eldsteForst === true", () => {
            const eldsteForst = true;
            var s = sorterSykmeldingerEldsteFoerst(sykmeldinger);
            expect(s.reverse()).to.deep.equal([{
                "id": 6,
                "arbeidsgiver": "Bærum Idrettslag",
                "mulighetForArbeid": {
                    "perioder": [{
                        "fom": { year: 2016, monthValue: 3, dayOfMonth: 31 },
                        "tom": { year: 2016, monthValue: 8, dayOfMonth: 13 },
                        "grad": "29"
                    }]
                }
            }, {
                "id": 5,
                "arbeidsgiver": "Alnabru Frisør",
                "mulighetForArbeid": {
                    "perioder": [{
                        "fom": { year: 2015, monthValue: 8, dayOfMonth: 31 },
                        "tom": { year: 2015, monthValue: 9, dayOfMonth: 13 },
                        "grad": "100"
                    }]
                }
            }, {
                "id": 4,
                "arbeidsgiver": "Alnabru Frisør",
                "mulighetForArbeid": {
                    "perioder": [{
                        "fom": { year: 2015, monthValue: 5, dayOfMonth: 17 },
                        "tom": { year: 2015, monthValue: 5, dayOfMonth: 31 },
                        "grad": "100"
                    }]
                }
            }, {
                "id": 3,
                "arbeidsgiver": "Alnabru Frisør",
                "mulighetForArbeid": {
                    "perioder": [{
                        "fom": { year: 2015, monthValue: 4, dayOfMonth: 8 },
                        "tom": { year: 2015, monthValue: 4, dayOfMonth: 15 },
                        "grad": "100"
                    }]
                }
            }, {
                "id": 2,
                "arbeidsgiver": "Ålesund Frisør",
                "mulighetForArbeid": {
                    "perioder": [{
                        "fom": { year: 2014, monthValue: 12, dayOfMonth: 31 },
                        "tom": { year: 2015, monthValue: 1, dayOfMonth: 30 },
                        "grad": "25"
                    }]
                }
            }, {
                "id": 1,
                "arbeidsgiver": "Drammen Frisør",
                "mulighetForArbeid": {
                    "perioder": [{
                        "fom": { year: 2014, monthValue: 1, dayOfMonth: 24 },
                        "tom": { year: 2014, monthValue: 2, dayOfMonth: 9 },
                        "grad": "80"
                    }]
                }
            }]);
        });

        it("Skal legge sykmeldingen med kortest periode øverst (den som avsluttes først) når eldsteForst === true dersom flere sykmeldinger har samme startdato", () => {
            const eldsteForst = true;
            const sykmeldinger = [
                getSykmelding({
                    id: 1,
                    "mulighetForArbeid": {
                        "perioder": [{
                            "fom": { year: 2014, monthValue: 1, dayOfMonth: 1 },
                            "tom": { year: 2014, monthValue: 1, dayOfMonth: 10 },
                            "grad": "80"
                        }]
                    }
                }), 
                getSykmelding({
                    id: 2,
                    "mulighetForArbeid": {
                        "perioder": [{
                            "fom": { year: 2014, monthValue: 1, dayOfMonth: 1 },
                            "tom": { year: 2014, monthValue: 1, dayOfMonth: 9 },
                            "grad": "80"
                        }]
                    }
                }), 
                getSykmelding({
                    id: 3,
                    "mulighetForArbeid": {
                        "perioder": [{
                            "fom": { year: 2014, monthValue: 1, dayOfMonth: 1 },
                            "tom": { year: 2014, monthValue: 1, dayOfMonth: 11 },
                            "grad": "80"
                        }]
                    }
                })
            ]
            var s = sorterSykmeldingerEldsteFoerst(sykmeldinger);
            expect(s[0].id).to.equal(2);
            expect(s[1].id).to.equal(1);
            expect(s[2].id).to.equal(3);
        });

        it("Skal legge sykmeldingen med kortest total periode øverst (den som avsluttes først) dersom flere sykmeldinger har samme startdato", () => {
            const sykmeldinger = [{
                "id": 0,
                "mulighetForArbeid": {
                    "perioder": [{
                        "fom": { year: 2014, monthValue: 1, dayOfMonth: 1 },
                        "tom": { year: 2014, monthValue: 1, dayOfMonth: 10 }, // 1.1-20.1
                        "grad": "80"
                    }, {
                        "fom": { year: 2014, monthValue: 1, dayOfMonth: 15 },
                        "tom": { year: 2014, monthValue: 1, dayOfMonth: 20 }, 
                        "grad": "80"
                    }]
                }
            }, {
                "id": 1,
                "mulighetForArbeid": {
                    "perioder": [{
                        "fom": { year: 2014, monthValue: 1, dayOfMonth: 1 },
                        "tom": { year: 2014, monthValue: 1, dayOfMonth: 10 }, // 1.1-5.2
                        "grad": "80"
                    }, {
                        "fom": { year: 2014, monthValue: 2, dayOfMonth: 2 },
                        "tom": { year: 2014, monthValue: 2, dayOfMonth: 5 }, 
                        "grad": "80"
                    }]
                }
            }, {
                "id": 2,
                "mulighetForArbeid": {
                    "perioder": [{
                        "fom": { year: 2014, monthValue: 1, dayOfMonth: 1 }, // 1.1-10.3
                        "tom": { year: 2014, monthValue: 3, dayOfMonth: 10 },
                        "grad": "80"
                    }, {
                        "fom": { year: 2014, monthValue: 2, dayOfMonth: 2 },
                        "tom": { year: 2014, monthValue: 2, dayOfMonth: 9 }, 
                        "grad": "80"
                    }]
                }
            }, {
                "id": 3,
                "mulighetForArbeid": {
                    "perioder": [{
                        "fom": { year: 2014, monthValue: 1, dayOfMonth: 1 }, // 1.1-11.2
                        "tom": { year: 2014, monthValue: 1, dayOfMonth: 11 },
                        "grad": "80"
                    }, {
                        "fom": { year: 2014, monthValue: 2, dayOfMonth: 2 },
                        "tom": { year: 2014, monthValue: 2, dayOfMonth: 11 },
                        "grad": "80"
                    }]
                }
            }, {
                "id": 4,
                "mulighetForArbeid": {
                    "perioder": [{
                        "fom": { year: 2014, monthValue: 1, dayOfMonth: 1 }, // 1.1-1.8
                        "tom": { year: 2014, monthValue: 1, dayOfMonth: 11 },
                        "grad": "80"
                    }, {
                        "fom": { year: 2014, monthValue: 2, dayOfMonth: 2 },
                        "tom": { year: 2014, monthValue: 8, dayOfMonth: 1 },
                        "grad": "80"
                    }]
                }
            }];
            var s = sorterSykmeldingerEldsteFoerst(sykmeldinger);
            expect(s[0].id).to.equal(0);
            expect(s[1].id).to.equal(1);
            expect(s[2].id).to.equal(3);
            expect(s[3].id).to.equal(2);
            expect(s[4].id).to.equal(4);
        });
    })

});
