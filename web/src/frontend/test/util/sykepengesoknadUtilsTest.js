import chai from "chai";
const expect = chai.expect;

import * as utils from '../../js/utils/sykepengesoknadUtils';

describe("sykepengesoknadUtils", () => {
    let soknad1;
    let soknad2;
    let soknad3;
    let soknad4;
    let soknad5;
    let data;

    beforeEach(() => {
        soknad1 = {
            id: "1",
            status: "KORRIGERT",
            sendtTilNAVDato: new Date("2017-02-04"),
        };

        soknad2 = {
            id: "2",
            status: "SENDT",
            sendtTilNAVDato: new Date("2017-02-06"),
            sendtTilArbeidsgiverDato: new Date("2017-02-08"),
        };

        soknad3 = {
            id: "3",
            korrigerer: "1",
            status: "KORRIGERT",
            sendtTilNAVDato: new Date("2017-02-05"),
            sendtTilArbeidsgiverDato: new Date("2017-02-10")
        };

        soknad4 = {
            id: "4",
            korrigerer: "3",
            status: "SENDT",
            sendtTilNAVDato: new Date("2017-02-08"),
            sendtTilArbeidsgiverDato: new Date("2017-02-11")
        };

        soknad5 = {
            id: "5",
            status: "NY",
            sendtTilArbeidsgiverDato: new Date("2017-02-01")
        };
    });

    describe("getTidligsteSendtDato", () => {

        it("Skal returnere tidligste dato hvis det er to datoer", () => {
            expect(utils.getTidligsteSendtDato(soknad4)).to.deep.equal(new Date("2017-02-08"))
        });

        it("Skal returnere tidligste dato hvis det er to datoer", () => {
            expect(utils.getTidligsteSendtDato(soknad2)).to.deep.equal(new Date("2017-02-06"))
        });

        it("Skal returnere dato hvis bare sendtTilArbeidsgiverDato er oppgitt", () => {
            expect(utils.getTidligsteSendtDato(soknad5)).to.deep.equal(new Date("2017-02-01"));
        });

        it("Skal returnere dato hvis bare sendtTilNAVDato er oppgitt", () => {
            expect(utils.getTidligsteSendtDato(soknad1)).to.deep.equal(new Date("2017-02-04"));
        });

    });


    describe("sorterEtterDato", () => {

        beforeEach(() => {
            data = [soknad1, soknad2, soknad3, soknad4, soknad5];
        })

        it("Skal sortere etter tidligste datoer", () => {
            const res = data.sort(utils.sorterEtterDato);
            expect(res).to.deep.equal([soknad4, soknad2, soknad3, soknad1, soknad5])
        })

    });

    describe("erSendtTilBeggeMenIkkeSamtidig", () => {

        let soknadSendtTilNAV;
        let soknadSendtTilArbeidsgiver;
        let soknadSendtTilBeggeSamtidig;
        let soknadSendtTilBeggeMenIkkeSamtidig;

        beforeEach(() => {
            soknadSendtTilNAV = {
                sendtTilArbeidsgiverDato: null,
                sendtTilNAVDato: new Date("2017-02-10"),
            };

            soknadSendtTilArbeidsgiver = {
                sendtTilNAVDato: null,
                sendtTilArbeidsgiverDato: new Date("2017-02-10"),
            };

            soknadSendtTilBeggeSamtidig = {
                sendtTilArbeidsgiverDato: new Date("2017-02-10"),  
                sendtTilNAVDato: new Date("2017-02-10"),
            };

            soknadSendtTilBeggeMenIkkeSamtidig = {
                sendtTilArbeidsgiverDato: new Date("2017-02-10"),  
                sendtTilNAVDato: new Date("2017-02-12"),
            }
        });

        it("Skal returnere true hvis søknad er sendt til begge men ikke samtidig", () => {
            expect(utils.erSendtTilBeggeMenIkkeSamtidig(soknadSendtTilBeggeMenIkkeSamtidig)).to.be.true;
        });

        it("Skal returnere false i alle andre tilfeller", () => {
            expect(utils.erSendtTilBeggeMenIkkeSamtidig(soknadSendtTilNAV));
            expect(utils.erSendtTilBeggeMenIkkeSamtidig(soknadSendtTilArbeidsgiver));
            expect(utils.erSendtTilBeggeMenIkkeSamtidig(soknadSendtTilBeggeSamtidig));
        });

    });

})