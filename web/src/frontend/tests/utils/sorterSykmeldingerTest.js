import { expect } from 'chai';
import { sorterSykmeldinger } from '../../js/utils';

describe("sorterSykmeldinger", function() {

    let sykmeldinger = [{
        "id": 1,
        "fnr": "01017500000",
        "fornavn": "Ola",
        "etternavn": "Nordmann",
        "sykmelder": "Hans Olsen",
        "arbeidsgiver": "Drammen Frisør",
        "diagnose": "Kronisk uflaks",
        "friskmeldt": "100",
        "status": "BEKREFTET",
        "perioder": [{
            "fom": "2014-01-24T23:00:00.000Z",
            "tom": "2014-02-09T23:00:00.000Z",
            "grad": "80"
        }]
    }, {
        "id": 2,
        "fnr": "01017500000",
        "fornavn": "Ola",
        "etternavn": "Nordmann",
        "sykmelder": "Kari Hansen",
        "arbeidsgiver": "Ålesund Frisør",
        "diagnose": "Manglende bukse",
        "friskmeldt": "0",
        "status": "AVVIST",
        "perioder": [{
            "fom": "2014-12-31T23:00:00.000Z",
            "tom": "2015-01-30T23:00:00.000Z",
            "grad": "25"
        }]
    }, {
        "id": 3,
        "fnr": "01017500000",
        "fornavn": "Ola",
        "etternavn": "Nordmann",
        "sykmelder": "Jens Nilsen",
        "arbeidsgiver": "Alnabru Frisør",
        "diagnose": "Lavt blodtrykk",
        "friskmeldt": "100",
        "status": "UBEKREFTET",
        "perioder": [{
            "fom": "2015-04-08T22:00:00.000Z",
            "tom": "2015-04-15T22:00:00.000Z",
            "grad": "100"
        }]
    }, {
        "id": 4,
        "fnr": "01017500000",
        "fornavn": "Ola",
        "etternavn": "Nordmann",
        "sykmelder": "Truls Knutsen",
        "arbeidsgiver": "Alnabru Frisør",
        "diagnose": "Hodepine",
        "friskmeldt": "100",
        "status": "UBEKREFTET",
        "perioder": [{
            "fom": "2015-05-17T22:00:00.000Z",
            "tom": "2015-05-31T22:00:00.000Z",
            "grad": "100"
        }]
    }, {
        "id": 5,
        "fnr": "01017500000",
        "fornavn": "Ola",
        "etternavn": "Nordmann",
        "sykmelder": "Petra Fransen",
        "arbeidsgiver": "Alnabru Frisør",
        "diagnose": "Halsbetennelse",
        "friskmeldt": "100",
        "status": "UBEKREFTET",
        "perioder": [{
            "fom": "2015-08-31T22:00:00.000Z",
            "tom": "2015-09-13T22:00:00.000Z",
            "grad": "100"
        }]
    }, {
        "id": 6,
        "fnr": "01017500000",
        "fornavn": "Ola",
        "etternavn": "Nordmann",
        "sykmelder": "Nina Nilsen",
        "arbeidsgiver": "Bærum Idrettslag",
        "diagnose": "Gule bein",
        "friskmeldt": "100",
        "status": "UBEKREFTET",
        "perioder": [{
            "fom": "2016-03-31T22:00:00.000Z",
            "tom": "2016-08-13T22:00:00.000Z",
            "grad": "29"
        }]
    }]

    it("Skal sortere etter startdato for første periode som standard", () => {

        var s = sorterSykmeldinger(sykmeldinger);
        expect(s).to.deep.equal([{
            "id": 6,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Nina Nilsen",
            "arbeidsgiver": "Bærum Idrettslag",
            "diagnose": "Gule bein",
            "friskmeldt": "100",
            "status": "UBEKREFTET",
            "perioder": [{
                "fom": "2016-03-31T22:00:00.000Z",
                "tom": "2016-08-13T22:00:00.000Z",
                "grad": "29"
            }]
        }, {
            "id": 5,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Petra Fransen",
            "arbeidsgiver": "Alnabru Frisør",
            "diagnose": "Halsbetennelse",
            "friskmeldt": "100",
            "status": "UBEKREFTET",
            "perioder": [{
                "fom": "2015-08-31T22:00:00.000Z",
                "tom": "2015-09-13T22:00:00.000Z",
                "grad": "100"
            }]
        }, {
            "id": 4,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Truls Knutsen",
            "arbeidsgiver": "Alnabru Frisør",
            "diagnose": "Hodepine",
            "friskmeldt": "100",
            "status": "UBEKREFTET",
            "perioder": [{
                "fom": "2015-05-17T22:00:00.000Z",
                "tom": "2015-05-31T22:00:00.000Z",
                "grad": "100"
            }]
        }, {
            "id": 3,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Jens Nilsen",
            "arbeidsgiver": "Alnabru Frisør",
            "diagnose": "Lavt blodtrykk",
            "friskmeldt": "100",
            "status": "UBEKREFTET",
            "perioder": [{
                "fom": "2015-04-08T22:00:00.000Z",
                "tom": "2015-04-15T22:00:00.000Z",
                "grad": "100"
            }]
        }, {
            "id": 2,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Kari Hansen",
            "arbeidsgiver": "Ålesund Frisør",
            "diagnose": "Manglende bukse",
            "friskmeldt": "0",
            "status": "AVVIST",
            "perioder": [{
                "fom": "2014-12-31T23:00:00.000Z",
                "tom": "2015-01-30T23:00:00.000Z",
                "grad": "25"
            }]
        }, {
            "id": 1,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Hans Olsen",
            "arbeidsgiver": "Drammen Frisør",
            "diagnose": "Kronisk uflaks",
            "friskmeldt": "100",
            "status": "BEKREFTET",
            "perioder": [{
                "fom": "2014-01-24T23:00:00.000Z",
                "tom": "2014-02-09T23:00:00.000Z",
                "grad": "80"
            }]
        }]);

    });

    it("Skal sortere periodene slik at første periode kommer først", () => {

        var s = sorterSykmeldinger([{
            "id": 6,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Nina Nilsen",
            "arbeidsgiver": "Bærum Idrettslag",
            "diagnose": "Gule bein",
            "friskmeldt": "100",
            "status": "UBEKREFTET",
            "perioder": [{
                "fom": "2016-08-31T22:00:00.000Z",
                "tom": "2016-22-13T22:00:00.000Z",
                "grad": "100"
            }, {
                "fom": "2016-03-31T22:00:00.000Z",
                "tom": "2016-08-13T22:00:00.000Z",
                "grad": "29"
            }, {
                "fom": "2015-07-09T22:00:00.000Z",
                "tom": "2015-07-13T22:00:00.000Z",
                "grad": "60"
            }]
        }]);
        expect(s).to.deep.equal([{
            "id": 6,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Nina Nilsen",
            "arbeidsgiver": "Bærum Idrettslag",
            "diagnose": "Gule bein",
            "friskmeldt": "100",
            "status": "UBEKREFTET",
            "perioder": [{
                "fom": "2015-07-09T22:00:00.000Z",
                "tom": "2015-07-13T22:00:00.000Z",
                "grad": "60"
            }, {
                "fom": "2016-03-31T22:00:00.000Z",
                "tom": "2016-08-13T22:00:00.000Z",
                "grad": "29"
            }, {
                "fom": "2016-08-31T22:00:00.000Z",
                "tom": "2016-22-13T22:00:00.000Z",
                "grad": "100"
            }]

        }]);

    });

    it("Skal sortere periodene etter sluttdato dersom to perioder har samme startdato", () => {

        var s = sorterSykmeldinger([{
            "id": 6,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Nina Nilsen",
            "arbeidsgiver": "Bærum Idrettslag",
            "diagnose": "Gule bein",
            "friskmeldt": "100",
            "status": "UBEKREFTET",
            "perioder": [{
                "fom": "2016-08-31T22:00:00.000Z",
                "tom": "2016-09-13T22:00:00.000Z",
                "grad": "100"
            }, {
                "fom": "2016-08-31T22:00:00.000Z",
                "tom": "2016-14-13T22:00:00.000Z",
                "grad": "29"
            }, {
                "fom": "2015-07-09T22:00:00.000Z",
                "tom": "2015-07-13T22:00:00.000Z",
                "grad": "60"
            }]
        }]);
        expect(s).to.deep.equal([{
            "id": 6,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Nina Nilsen",
            "arbeidsgiver": "Bærum Idrettslag",
            "diagnose": "Gule bein",
            "friskmeldt": "100",
            "status": "UBEKREFTET",
            "perioder": [{
                "fom": "2015-07-09T22:00:00.000Z",
                "tom": "2015-07-13T22:00:00.000Z",
                "grad": "60"
            }, {
                "fom": "2016-08-31T22:00:00.000Z",
                "tom": "2016-09-13T22:00:00.000Z",
                "grad": "100"
            }, {
                "fom": "2016-08-31T22:00:00.000Z",
                "tom": "2016-14-13T22:00:00.000Z",
                "grad": "29"
            }]

        }]);

    });

    it("Skal sortere etter innsendt kriterium uansett hva det er (arbeidsgiver)", () => {
        let sykmeldinger = [{
            "id": 3,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Jens Nilsen",
            "arbeidsgiver": "Alnabru Frisør",
            "diagnose": "Lavt blodtrykk",
            "friskmeldt": "100",
            "status": "UBEKREFTET",
            "perioder": [{
                "fom": "2015-04-08T22:00:00.000Z",
                "tom": "2015-04-15T22:00:00.000Z",
                "grad": "100"
            }]
        }, {
            "id": 2,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Kari Hansen",
            "arbeidsgiver": "Ålesund Frisør",
            "diagnose": "Manglende bukse",
            "friskmeldt": "0",
            "status": "AVVIST",
            "perioder": [{
                "fom": "2014-12-31T23:00:00.000Z",
                "tom": "2015-01-30T23:00:00.000Z",
                "grad": "25"
            }]
        }, {
            "id": 1,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Hans Olsen",
            "arbeidsgiver": "Drammen Frisør",
            "diagnose": "Kronisk uflaks",
            "friskmeldt": "100",
            "status": "BEKREFTET",
            "perioder": [{
                "fom": "2014-01-24T23:00:00.000Z",
                "tom": "2014-02-09T23:00:00.000Z",
                "grad": "80"
            }]
        }];
        let s = sorterSykmeldinger(sykmeldinger, "arbeidsgiver");
        expect(s).to.deep.equal([{
            "id": 3,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Jens Nilsen",
            "arbeidsgiver": "Alnabru Frisør",
            "diagnose": "Lavt blodtrykk",
            "friskmeldt": "100",
            "status": "UBEKREFTET",
            "perioder": [{
                "fom": "2015-04-08T22:00:00.000Z",
                "tom": "2015-04-15T22:00:00.000Z",
                "grad": "100"
            }]
        }, {
            "id": 1,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Hans Olsen",
            "arbeidsgiver": "Drammen Frisør",
            "diagnose": "Kronisk uflaks",
            "friskmeldt": "100",
            "status": "BEKREFTET",
            "perioder": [{
                "fom": "2014-01-24T23:00:00.000Z",
                "tom": "2014-02-09T23:00:00.000Z",
                "grad": "80"
            }]
        }, {
            "id": 2,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Kari Hansen",
            "arbeidsgiver": "Ålesund Frisør",
            "diagnose": "Manglende bukse",
            "friskmeldt": "0",
            "status": "AVVIST",
            "perioder": [{
                "fom": "2014-12-31T23:00:00.000Z",
                "tom": "2015-01-30T23:00:00.000Z",
                "grad": "25"
            }]
        }]);
    });

    it("Skal sortere etter innsendt kriterium uansett hva det er (sykmelder)", () => {
        let sykmeldinger = [{
            "id": 3,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Jens Nilsen",
            "arbeidsgiver": "Alnabru Frisør",
            "diagnose": "Lavt blodtrykk",
            "friskmeldt": "100",
            "status": "UBEKREFTET",
            "perioder": [{
                "fom": "2015-04-08T22:00:00.000Z",
                "tom": "2015-04-15T22:00:00.000Z",
                "grad": "100"
            }]
        }, {
            "id": 2,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Kari Hansen",
            "arbeidsgiver": "Ålesund Frisør",
            "diagnose": "Manglende bukse",
            "friskmeldt": "0",
            "status": "AVVIST",
            "perioder": [{
                "fom": "2014-12-31T23:00:00.000Z",
                "tom": "2015-01-30T23:00:00.000Z",
                "grad": "25"
            }]
        }, {
            "id": 1,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Hans Olsen",
            "arbeidsgiver": "Drammen Frisør",
            "diagnose": "Kronisk uflaks",
            "friskmeldt": "100",
            "status": "BEKREFTET",
            "perioder": [{
                "fom": "2014-01-24T23:00:00.000Z",
                "tom": "2014-02-09T23:00:00.000Z",
                "grad": "80"
            }]
        }];
        let s = sorterSykmeldinger(sykmeldinger, "sykmelder");
        expect(s).to.deep.equal([{
            "id": 1,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Hans Olsen",
            "arbeidsgiver": "Drammen Frisør",
            "diagnose": "Kronisk uflaks",
            "friskmeldt": "100",
            "status": "BEKREFTET",
            "perioder": [{
                "fom": "2014-01-24T23:00:00.000Z",
                "tom": "2014-02-09T23:00:00.000Z",
                "grad": "80"
            }]
        }, {
            "id": 3,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Jens Nilsen",
            "arbeidsgiver": "Alnabru Frisør",
            "diagnose": "Lavt blodtrykk",
            "friskmeldt": "100",
            "status": "UBEKREFTET",
            "perioder": [{
                "fom": "2015-04-08T22:00:00.000Z",
                "tom": "2015-04-15T22:00:00.000Z",
                "grad": "100"
            }]
        }, {
            "id": 2,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Kari Hansen",
            "arbeidsgiver": "Ålesund Frisør",
            "diagnose": "Manglende bukse",
            "friskmeldt": "0",
            "status": "AVVIST",
            "perioder": [{
                "fom": "2014-12-31T23:00:00.000Z",
                "tom": "2015-01-30T23:00:00.000Z",
                "grad": "25"
            }]
        }]);

    });

    it("Skal sekundært sortere etter startdato dersom to sykmeldinger har samme arbeidsgiver", () => {
        let sykmeldinger = [{
            "id": 3,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Jens Nilsen",
            "arbeidsgiver": "Alnabru Frisør",
            "diagnose": "Lavt blodtrykk",
            "friskmeldt": "100",
            "status": "UBEKREFTET",
            "perioder": [{
                "fom": "2015-04-08T22:00:00.000Z",
                "tom": "2015-04-15T22:00:00.000Z",
                "grad": "100"
            }]
        }, {
            "id": 2,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Kari Hansen",
            "arbeidsgiver": "Alnabru Frisør",
            "diagnose": "Manglende bukse",
            "friskmeldt": "0",
            "status": "AVVIST",
            "perioder": [{
                "fom": "2015-11-20T23:00:00.000Z",
                "tom": "2015-11-30T23:00:00.000Z",
                "grad": "25"
            }]
        }, {
            "id": 1,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Hans Olsen",
            "arbeidsgiver": "Drammen Frisør",
            "diagnose": "Kronisk uflaks",
            "friskmeldt": "100",
            "status": "BEKREFTET",
            "perioder": [{
                "fom": "2014-01-24T23:00:00.000Z",
                "tom": "2014-02-09T23:00:00.000Z",
                "grad": "80"
            }]
        }];
        let s = sorterSykmeldinger(sykmeldinger, "arbeidsgiver");
        expect(s).to.deep.equal([{
            "id": 2,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Kari Hansen",
            "arbeidsgiver": "Alnabru Frisør",
            "diagnose": "Manglende bukse",
            "friskmeldt": "0",
            "status": "AVVIST",
            "perioder": [{
                "fom": "2015-11-20T23:00:00.000Z",
                "tom": "2015-11-30T23:00:00.000Z",
                "grad": "25"
            }]
        }, {
            "id": 3,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Jens Nilsen",
            "arbeidsgiver": "Alnabru Frisør",
            "diagnose": "Lavt blodtrykk",
            "friskmeldt": "100",
            "status": "UBEKREFTET",
            "perioder": [{
                "fom": "2015-04-08T22:00:00.000Z",
                "tom": "2015-04-15T22:00:00.000Z",
                "grad": "100"
            }]
        }, {
            "id": 1,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Hans Olsen",
            "arbeidsgiver": "Drammen Frisør",
            "diagnose": "Kronisk uflaks",
            "friskmeldt": "100",
            "status": "BEKREFTET",
            "perioder": [{
                "fom": "2014-01-24T23:00:00.000Z",
                "tom": "2014-02-09T23:00:00.000Z",
                "grad": "80"
            }]
        }]);
    });

    it("Skal sekundært sortere etter sluttdato for siste periode dersom to sykmeldinger har samme startdato", () => {
        let sykmeldinger = [{
            "id": 3,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Jens Nilsen",
            "arbeidsgiver": "Alnabru Frisør",
            "diagnose": "Lavt blodtrykk",
            "friskmeldt": "100",
            "status": "UBEKREFTET",
            "perioder": [{
                "fom": "2015-04-08T22:00:00.000Z",
                "tom": "2015-04-15T22:00:00.000Z",
                "grad": "100"
            }, {
                "fom": "2015-05-08T22:00:00.000Z",
                "tom": "2015-05-15T22:00:00.000Z",
                "grad": "100"
            }, {
                "fom": "2015-08-08T22:00:00.000Z",
                "tom": "2015-08-15T22:00:00.000Z",
                "grad": "100"
            }]
        }, {
            "id": 2,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Kari Hansen",
            "arbeidsgiver": "Alnabru Frisør",
            "diagnose": "Manglende bukse",
            "friskmeldt": "0",
            "status": "AVVIST",
            "perioder": [{
                "fom": "2015-04-08T22:00:00.000Z",
                "tom": "2015-04-22T22:00:00.000Z",
                "grad": "100"
            }, {
                "fom": "2015-06-08T22:00:00.000Z",
                "tom": "2015-06-15T22:00:00.000Z",
                "grad": "100"
            }, {
                "fom": "2015-11-08T22:00:00.000Z",
                "tom": "2015-11-15T22:00:00.000Z",
                "grad": "100"
            }]
        }, {
            "id": 2,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Kari Hansen",
            "arbeidsgiver": "Alnabru Frisør",
            "diagnose": "Manglende bukse",
            "friskmeldt": "0",
            "status": "AVVIST",
            "perioder": [{
                "fom": "2015-04-08T22:00:00.000Z",
                "tom": "2015-04-22T22:00:00.000Z",
                "grad": "100"
            }, {
                "fom": "2015-03-08T22:00:00.000Z",
                "tom": "2015-03-15T22:00:00.000Z",
                "grad": "100"
            }, {
                "fom": "2015-01-08T22:00:00.000Z",
                "tom": "2015-01-15T22:00:00.000Z",
                "grad": "100"
            }]
        }, {
            "id": 1,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Hans Olsen",
            "arbeidsgiver": "Drammen Frisør",
            "diagnose": "Kronisk uflaks",
            "friskmeldt": "100",
            "status": "BEKREFTET",
            "perioder": [{
                "fom": "2014-01-24T23:00:00.000Z",
                "tom": "2014-02-09T23:00:00.000Z",
                "grad": "80"
            }]
        }];
        let s = sorterSykmeldinger(sykmeldinger);
        expect(s).to.deep.equal([{
            "id": 2,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Kari Hansen",
            "arbeidsgiver": "Alnabru Frisør",
            "diagnose": "Manglende bukse",
            "friskmeldt": "0",
            "status": "AVVIST",
            "perioder": [{
                "fom": "2015-04-08T22:00:00.000Z",
                "tom": "2015-04-22T22:00:00.000Z",
                "grad": "100"
            }, {
                "fom": "2015-06-08T22:00:00.000Z",
                "tom": "2015-06-15T22:00:00.000Z",
                "grad": "100"
            }, {
                "fom": "2015-11-08T22:00:00.000Z",
                "tom": "2015-11-15T22:00:00.000Z",
                "grad": "100"
            }]
        },{
            "id": 3,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Jens Nilsen",
            "arbeidsgiver": "Alnabru Frisør",
            "diagnose": "Lavt blodtrykk",
            "friskmeldt": "100",
            "status": "UBEKREFTET",
            "perioder": [{
                "fom": "2015-04-08T22:00:00.000Z",
                "tom": "2015-04-15T22:00:00.000Z",
                "grad": "100"
            }, {
                "fom": "2015-05-08T22:00:00.000Z",
                "tom": "2015-05-15T22:00:00.000Z",
                "grad": "100"
            }, {
                "fom": "2015-08-08T22:00:00.000Z",
                "tom": "2015-08-15T22:00:00.000Z",
                "grad": "100"
            }]
        }, {
            "id": 2,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Kari Hansen",
            "arbeidsgiver": "Alnabru Frisør",
            "diagnose": "Manglende bukse",
            "friskmeldt": "0",
            "status": "AVVIST",
            "perioder": [{
                "fom": "2015-01-08T22:00:00.000Z",
                "tom": "2015-01-15T22:00:00.000Z",
                "grad": "100"
            }, {
                "fom": "2015-03-08T22:00:00.000Z",
                "tom": "2015-03-15T22:00:00.000Z",
                "grad": "100"
            }, {
                "fom": "2015-04-08T22:00:00.000Z",
                "tom": "2015-04-22T22:00:00.000Z",
                "grad": "100"
            }]
        }, {
            "id": 1,
            "fnr": "01017500000",
            "fornavn": "Ola",
            "etternavn": "Nordmann",
            "sykmelder": "Hans Olsen",
            "arbeidsgiver": "Drammen Frisør",
            "diagnose": "Kronisk uflaks",
            "friskmeldt": "100",
            "status": "BEKREFTET",
            "perioder": [{
                "fom": "2014-01-24T23:00:00.000Z",
                "tom": "2014-02-09T23:00:00.000Z",
                "grad": "80"
            }]
        }]);
    });


});