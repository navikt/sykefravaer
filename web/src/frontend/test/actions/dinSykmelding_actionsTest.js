import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../js/actions/dinSykmelding_actions';
import * as actiontyper from '../../js/actions/actiontyper';
chai.use(chaiEnzyme());
const expect = chai.expect;

describe("dinSykmelding_actions", () => {

    beforeEach(() => {
        window = window || {};
        window.APP_SETTINGS = {
            REST_ROOT: 'http://tjenester.nav.no/syforest'
        }
    });

    it("Skal ha en setArbeidssituasjon()-funksjon som returnerer riktig action", () => {

        const arbeidssituasjon = 'test';
        const sykmeldingId = 23;

        var action = actions.setArbeidssituasjon(arbeidssituasjon, sykmeldingId);

        expect(action.type).to.equal(actiontyper.SET_ARBEIDSSITUASJON);
        expect(action.arbeidssituasjon).to.equal('test');
        expect(action.sykmeldingId).to.equal(23);
    });

    it("Skal ha en setArbeidsgiver som returnerer riktig action", () => {

        const arbeidsgiver = {
            orgnummer: 12345678,
            navn: "Mosveens Sykkelverksted & Hipstercafe"
        };
        const sykmeldingId = 23;

        var action = actions.setArbeidsgiver(sykmeldingId, arbeidsgiver);

        expect(action.type).to.equal(actiontyper.SET_ARBEIDSGIVER);
        expect(action.arbeidsgiver).to.deep.equal({
            orgnummer: 12345678,
            navn: "Mosveens Sykkelverksted & Hipstercafe"
        });
        expect(action.sykmeldingId).to.equal(23);        

    });

    it("Skal ha en setOpplysningeneErRiktige()-funksjon som returnerer riktig action", () => {
        const action = actions.setOpplysningeneErRiktige(1234, true);
        expect(action).to.deep.equal({
            type: actiontyper.SET_OPPLYSNINGENE_ER_RIKTIGE,
            erRiktige: true,
            sykmeldingId: 1234
        });

        const action2 = actions.setOpplysningeneErRiktige(465, false);
        expect(action2).to.deep.equal({
            type: actiontyper.SET_OPPLYSNINGENE_ER_RIKTIGE,
            erRiktige: false,
            sykmeldingId: 465
        });
    })

    it("Skal ha en setFeilaktigOpplysning som returnerer riktig action", () => {
        const action = actions.setFeilaktigOpplysning(88, "periode", true); 
        expect(action.type).to.equal(actiontyper.SET_FEILAKTIG_OPPLYSNING);
        expect(action.opplysning).to.equal("periode");
        expect(action.erFeilaktig).to.equal(true);
        expect(action.sykmeldingId).to.equal(88)
    })

    describe("Send sykmelding", () => {

        it("Skal ha en senderSykmelding()-funksjon som returnerer riktig action", () => {
            const sykmeldingId = 12;
            const action = actions.senderSykmelding(sykmeldingId);
            expect(action).to.deep.equal({
                sykmeldingId: 12,
                type: actiontyper.SENDER_SYKMELDING,
            });
        });

        it("Skal ha en sendSykmeldingFeilet()-funksjon som returnerer riktig action", () => {
            const sykmeldingId = 12;
            const action = actions.sendSykmeldingFeilet(sykmeldingId);
            expect(action).to.deep.equal({
                sykmeldingId: 12, 
                type: actiontyper.SEND_SYKMELDING_FEILET,
            });
        });

        it("Skal ha en sykmeldingSendt()-funksjon som returnerer riktig action", () => {
            const action = actions.sykmeldingSendt(14);
            expect(action).to.deep.equal({
                sykmeldingId: 14,
                type: actiontyper.SYKMELDING_SENDT,
            });
        });

        it("Skal ha en sendSykmeldingTilArbeidsgiver()-funksjon som returnerer rikig action", () => {
            const action = actions.sendSykmeldingTilArbeidsgiver(14, "344");
            expect(action).to.deep.equal({
                type: actiontyper.SEND_SYKMELDING_TIL_ARBEIDSGIVER_FORESPURT,
                sykmeldingId: 14,
                feilaktigeOpplysninger: {},
                orgnummer: "344",
                beOmNyNaermesteLeder: true,
            });
        });

        it("Skal ha en sendSykmeldingTilArbeidsgiver()-funksjon som returnerer rikig action når man har feilaktigeOpplysninger", () => {
            const action = actions.sendSykmeldingTilArbeidsgiver(14, "344", {
                periode: true,
                sykmeldingsgrad: false,
            });
            expect(action).to.deep.equal({
                type: actiontyper.SEND_SYKMELDING_TIL_ARBEIDSGIVER_FORESPURT,
                sykmeldingId: 14,
                feilaktigeOpplysninger: {
                    periode: true,
                    sykmeldingsgrad: false,
                },
                orgnummer: "344",
                beOmNyNaermesteLeder: true,
            });
        });   

    });

    describe("Bekreft sykmelding", () => {

        it("Skal ha en bekrefterSykmelding()-funksjon som returnerer rikig action", () => {
            const sykmeldingId = 12;
            const action = actions.bekrefterSykmelding(sykmeldingId, "arbeidstaker");
            expect(action).to.deep.equal({
                type: actiontyper.BEKREFTER_SYKMELDING,
            });        
        });

        it("Skal ha en bekreftSykmeldingFeilet()-funksjon som returnerer rikig action", () => {
            const sykmeldingId = 12;
            const action = actions.bekreftSykmeldingFeilet(sykmeldingId);
            expect(action).to.deep.equal({
                type: actiontyper.BEKREFT_SYKMELDING_FEILET,
            });        
        });

        it("Skal ha en sykmeldingBekreftet()-funksjon som returnerer riktig action", () => {
            const action = actions.sykmeldingBekreftet(14);
            expect(action).to.deep.equal({
                sykmeldingId: 14, 
                type: actiontyper.SYKMELDING_BEKREFTET,
            });
        }); 

        it("Skal ha en bekreftSykmelding()-funksjon som returnerer rikig action", () => {
            const action = actions.bekreftSykmelding(14, "frilanser");
            expect(action).to.deep.equal({
                type: actiontyper.BEKREFT_SYKMELDING_FORESPURT,
                arbeidssituasjon: "frilanser",
                feilaktigeOpplysninger: {},
                sykmeldingId: 14
            })
        });   

        it("Skal ha en bekreftSykmelding()-funksjon som returnerer rikig action når man har feilaktigeOpplysninger", () => {
            const action = actions.bekreftSykmelding(14, "frilanser", {
                periode: true,
            });
            expect(action).to.deep.equal({
                type: actiontyper.BEKREFT_SYKMELDING_FORESPURT,
                arbeidssituasjon: "frilanser",
                feilaktigeOpplysninger: {
                    periode: true,
                },
                sykmeldingId: 14
            })
        });
          
    });    

    describe("avbrytSykmelding()", () => {

        it("Skal ha en avbryterSykmelding()-funksjon som returnerer rikig action", () => {
            const sykmeldingId = 12;
            const action = actions.avbryterSykmelding(sykmeldingId);
            expect(action).to.deep.equal({
                type: actiontyper.AVBRYTER_SYKMELDING,
            });        
        });

        it("Skal ha en avbrytSykmeldingFeilet()-funksjon som returnerer rikig action", () => {
            const sykmeldingId = 12;
            const action = actions.avbrytSykmeldingFeilet(sykmeldingId);
            expect(action).to.deep.equal({
                type: actiontyper.AVBRYT_SYKMELDING_FEILET,
            });        
        });

        it("Skal ha en sykmeldingAvbrutt()-funksjon som returnerer riktig action", () => {
            const action = actions.sykmeldingAvbrutt(14);
            expect(action).to.deep.equal({
                sykmeldingId: 14, 
                type: actiontyper.SYKMELDING_AVBRUTT,
            });
        }); 

        it("Skal ha en avbrytSykmelding()-funksjon som returnerer rikig action", () => {
            const action = actions.avbrytSykmelding(14);
            expect(action).to.deep.equal({
                type: actiontyper.AVBRYT_SYKMELDING_FORESPURT,
                feilaktigeOpplysninger: {},
                sykmeldingId: 14
            })
        });   

        it("Skal ha en avbrytSykmelding()-funksjon som returnerer rikig action når man har feilaktigeOpplysninger", () => {
            const action = actions.avbrytSykmelding(14, {
                periode: true,
            });
            expect(action).to.deep.equal({
                type: actiontyper.AVBRYT_SYKMELDING_FORESPURT,
                feilaktigeOpplysninger: {
                    periode: true,
                },
                sykmeldingId: 14
            })
        });        

    })
});
