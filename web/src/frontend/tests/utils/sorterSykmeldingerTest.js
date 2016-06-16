import { expect } from 'chai';
import { sorterSykmeldinger, sorterPerioder } from '../../js/utils/datoUtils';

describe("sorterSykmeldinger", function() {

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
        },{
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


    it("Skal sorterer perioder så eldste perioder fom kommer først og hvis lik fom så kommer eldste tom nederst", () => {
            let sykmelding = {
                "id": 3,
                "arbeidsgiver": "Alnabru Frisør",
                "mulighetForArbeid": {
                    "perioder": [{
                        "fom": { year: 2015, monthValue: 4, dayOfMonth: 8 },
                        "tom": { year: 2015, monthValue: 4, dayOfMonth: 15 },
                        "grad": "100"
                    }, {
                        "fom": { year: 2015, monthValue: 4, dayOfMonth: 8 },
                        "tom": { year: 2015, monthValue: 4, dayOfMonth: 16 },
                        "grad": "100"
                    }]
                }
            };
            let s = sorterPerioder(sykmelding);
            expect(s).to.deep.equal({
                "perioder": [{
                    "fom": { year: 2015, monthValue: 4, dayOfMonth: 8 },
                    "tom": { year: 2015, monthValue: 4, dayOfMonth: 15 },
                    "grad": "100"
                }, {
                    "fom": { year: 2015, monthValue: 4, dayOfMonth: 8 },
                    "tom": { year: 2015, monthValue: 4, dayOfMonth: 16 },
                    "grad": "100"
                }]
            });
        }
    );
});
