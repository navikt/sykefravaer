import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import dineSykmeldinger from '../../js/reducers/dineSykmeldinger';
import * as actiontyper from '../../js/actions/actiontyper';
import * as actions from '../../js/actions/dineSykmeldinger_actions';
import * as dinSykmeldingActions from '../../js/actions/dinSykmelding_actions';
import * as brukerActions from '../../js/actions/brukerinfo_actions';
import * as metaActions from '../../js/actions/sykmeldingMeta_actions';

describe('dineSykmeldingerReducer', () => {

    it('håndterer SET_DINE_SYKMELDINGER når man ikke har sykmeldinger fra før', () => {
        const initialState = deepFreeze({
            data: []
        });
        const action = actions.setDineSykmeldinger([getSykmelding()])
        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [getParsetSykmelding()],
            henter: false,
            hentingFeilet: false,
            hentet: true,
        });
    });

    it('håndterer SET_DINE_SYKMELDINGER når datofelter er null', () => {
        const initialState = deepFreeze({
            data: []
        });
        const action = actions.setDineSykmeldinger([getSykmelding({identdato: null})])
        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [getParsetSykmelding({identdato: null})],
            henter: false,
            hentingFeilet: false,
            hentet: true,
        });
    });

    it('håndterer SET_DINE_SYKMELDINGER når man har sykmeldinger fra før, ved å kun overskrive properties som finnes', () => {
        const initialState = deepFreeze({
            hentet: false,
            data: [getParsetSykmelding({id: "55"}), getParsetSykmelding({id: "44"})]
        });
        const action = actions.setDineSykmeldinger([getSykmelding({id: "55", navn: "Harald"}), getSykmelding({id: "44"})])
        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [getParsetSykmelding({id: "55", navn: "Harald"}), getParsetSykmelding({id: "44"})],
            henter: false,
            hentingFeilet: false,
            hentet: true,
        });
    });

    it("Parser datofelter", () => {
        const initialState = deepFreeze({
            hentet: false,
            data: []
        });
        const action = actions.setDineSykmeldinger([getSykmelding()]);
        const nextState = dineSykmeldinger(initialState, action);
        expect(nextState.data).to.deep.equal([getParsetSykmelding()]);
    })

    it("Håndterer HENTER_DINE_SYKMELDINGER når man ikke har data fra før", () => {
        const initialState = deepFreeze({
            data: []
        });
        const action = actions.henterDineSykmeldinger();
        const nextState = dineSykmeldinger(initialState, action);
        expect(nextState).to.deep.equal({
            data: [],
            henter: true,
            hentingFeilet: false,
            hentet: false,
        });
    });

    it("Håndterer HENTER_DINE_SYKMELDINGER når man har data fra før", () => {
        const initialState = deepFreeze({
            data: [{
                id: 77, 
            }, {
                id: 6789
            }]
        });
        const action = actions.henterDineSykmeldinger();
        const nextState = dineSykmeldinger(initialState, action);
        expect(nextState).to.deep.equal({
            data: [{
                id: 77, 
            }, {
                id: 6789
            }],
            henter: true,
            hentet: false,
            hentingFeilet: false,
        });
    });

    it("Håndterer HENT_DINE_SYKMELDINGER_FEILET", () => {
        const initialState = deepFreeze({
            hentet: true,
        });
        const action = actions.hentDineSykmeldingerFeilet();
        const nextState = dineSykmeldinger(initialState, action);
        expect(nextState).to.deep.equal({
            data: [],
            henter: false,
            hentingFeilet: true,
            hentet: true,
        });
    });

    it("håndterer SET_SORTERING dersom man ikke har sortering fra før", () => {
        const initialState = deepFreeze({});
        const action = actions.sorterSykmeldinger("arbeidsgiver", "tidligere");
        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            sortering: {
                tidligere: "arbeidsgiver"
            }
        });
    });

    it("håndterer SET_SORTERING dersom man har sortering fra før", () => {
        const initialState = deepFreeze({
            sortering: {
                tidligere: "dato"
            }
        });
        const action = actions.sorterSykmeldinger("arbeidsgiver", "tidligere");
        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            sortering: {
                tidligere: "arbeidsgiver"
            }
        });
    });

    it("håndterer SET_SORTERING dersom man har sortering fra før, men ikke for den innsendte statusen", () => {
        const initialState = deepFreeze({
            sortering: {
                tidligere: "dato"
            }
        });
        const action = actions.sorterSykmeldinger("arbeidsgiver", "nye");
        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            sortering: {
                tidligere: "dato",
                nye: "arbeidsgiver"
            }
        });
    });


    it('håndterer SET_ARBEIDSSITUASJON', () => {
        const initialState = deepFreeze({
            data: [{
                id: 23,
            }, {
                id: 24,
            }]
        });
        const action = dinSykmeldingActions.setArbeidssituasjon("test", 23);
        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 23,
                valgtArbeidssituasjon: 'test'
            }, {
                id: 24,
            }]
        });
    });

    it("Håndterer SYKMELDING_BEKREFTET", () => {
        const initialState = deepFreeze({
            data: [{
                id: 23,
            }, {
                id: 24,
            }]
        });
        const action = dinSykmeldingActions.sykmeldingBekreftet(23);
        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            sender: false,
            sendingFeilet: false,
            data: [{
                id: 23,
                status: 'BEKREFTET',
            }, {
                id: 24,
            }]
        });        
    });

    it("Håndterer AVBRYTER_SYKMELDING", () => {
        const initialState = deepFreeze({
            data: [{
                id: 23,
            }, {
                id: 24,
            }]
        });
        const action = dinSykmeldingActions.avbryterSykmelding();
        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 23,
            }, {
                id: 24,
            }],
            avbryter: true,
            avbrytFeilet: false,
        });           
    });

    it("Håndterer SYKMELDING_AVBRUTT", () => {
        const initialState = deepFreeze({
            data: [{
                id: 23,
            }, {
                id: 24,
            }],
        });
        const action = dinSykmeldingActions.sykmeldingAvbrutt(23);
        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 23,
                status: 'AVBRUTT'
            }, {
                id: 24,
            }],
            avbryter: false,
            avbrytFeilet: false,
        });        
    });

    it("Håndterer AVBRYT_SYKMELDING_FEILET", () => {
        const initialState = deepFreeze({
            data: [{
                id: 23,
            }, {
                id: 24,
            }],
            avbryter: true
        });
        const action = dinSykmeldingActions.avbrytSykmeldingFeilet();
        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 23,
            }, {
                id: 24,
            }],
            avbryter: false,
            avbrytFeilet: true,
        });        
    });


    it("Håndterer SET_FEILAKTIG_OPPLYSNING dersom opplysningen ikke er feilaktig fra før", () => {

        const initialState = deepFreeze({
            data: [{
                id: 23,
            }, {
                id: 24
            }]
        });
        const action = dinSykmeldingActions.setFeilaktigOpplysning(23, "periode", true);
        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 23,
                feilaktigeOpplysninger: {
                    "periode": true
                }
            }, {
                id: 24
            }]
        });

    });


    it("Håndterer SET_FEILAKTIG_OPPLYSNING dersom opplysningen er feilaktig fra før", () => {

        const initialState = deepFreeze({
            data: [{
                id: 23,
                feilaktigeOpplysninger: {
                    "periode": true
                }
            }, {
                id: 24
            }]
        });
        const action = dinSykmeldingActions.setFeilaktigOpplysning(23, "periode", false);

        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 23,
                feilaktigeOpplysninger: {
                    "periode": false
                }
            }, {
                id: 24
            }]
        });

    });

    it("Håndterer SET_FEILAKTIG_OPPLYSNING dersom opplysningen er feilaktig fra før og man prøver å sette den til feilaktig", () => {

        const initialState = deepFreeze({
            data: [{
                id: 23,
                feilaktigeOpplysninger: {
                    "periode": true
                }
            }, {
                id: 24
            }]
        });
        const action = dinSykmeldingActions.setFeilaktigOpplysning(23, "periode", true);

        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 23,
                feilaktigeOpplysninger: {
                    "periode": true
                }
            }, {
                id: 24
            }]
        });

    });

    it("Håndterer SET_FEILAKTIG_OPPLYSNING dersom den settes til false", () => {

        const initialState = deepFreeze({
            data: [{
                id: 23,
                feilaktigeOpplysninger: {
                    "periode": true
                }
            }, {
                id: 24
            }]
        });
        const action = dinSykmeldingActions.setFeilaktigOpplysning(23, "periode", false);

        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 23,
                feilaktigeOpplysninger: {
                    "periode": false
                }
            }, {
                id: 24
            }]
        });

    });

    it("Håndterer SET_FEILAKTIG_OPPLYSNING dersom det finnes en (annen) feilaktig opplysning fra før", () => {

        const initialState = deepFreeze({
            data: [{
                id: 23,
                feilaktigeOpplysninger: {
                    "banan": true,
                }
            }, {
                id: 24
            }]
        });
        const action = dinSykmeldingActions.setFeilaktigOpplysning(23, "periode", true);

        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 23,
                feilaktigeOpplysninger: {
                    "banan": true,
                    "periode": true
                }
            }, {
                id: 24
            }]
        });

    });

    it("Håndterer SET_OPPLYSNINGENE_ER_RIKTIGE", () => {
        const initialState = deepFreeze({
            data: [{
                id: 23,
                feilaktigeOpplysninger: {
                    "banan": true,
                }
            }, {
                id: 24
            }]
        });
        const action = dinSykmeldingActions.setOpplysningeneErRiktige(23, true);

        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 23,
                feilaktigeOpplysninger: {
                    "banan": true,
                },
                opplysningeneErRiktige: true,
            }, {
                id: 24
            }]
        });

        const initialState2 = deepFreeze({
            data: [{
                id: 23,
            }, {
                id: 24
            }]
        });
        const action2 = dinSykmeldingActions.setOpplysningeneErRiktige(23, false);

        const nextState2 = dineSykmeldinger(initialState2, action2);

        expect(nextState2).to.deep.equal({
            data: [{
                id: 23,
                opplysningeneErRiktige: false,
            }, {
                id: 24
            }]
        });

    });

    it("Håndterer BRUKER_ER_UTLOGGET", () => {
        const initialState = deepFreeze({
            data: [{id: "5566"}],
            henter: false,
            hentingFeilet: false
        });
        const action = brukerActions.setErUtlogget();
        const nextState = dineSykmeldinger(initialState, action);
        expect(nextState).to.deep.equal({
            henter: false,
            hentingFeilet: false,
            data: []
        })
    });

    it("Håndterer SYKMELDING_SENDT", () => {
        const initialState = deepFreeze({
            data: [{id: 56}],
            henter: false,
            hentingFeilet: false
        });
        const action = dinSykmeldingActions.sykmeldingSendt(56);
        const nextState = dineSykmeldinger(initialState, action);
        expect(nextState).to.deep.equal({
            data: [{
                id: 56,
                status: 'SENDT',
            }],
            henter: false,
            hentingFeilet: false,
            sender: false,
            sendingFeilet: false
        });
    });

    it("Håndterer ventetidHentet({})", () => {
        const initialState = deepFreeze({
            data: [{id: 'min-sykmelding-id'}, {id: 'min-sykmelding-id-2'}],
        });
        const action = metaActions.ventetidHentet('min-sykmelding-id', true);
        const nextState = dineSykmeldinger(initialState, action);
        expect(nextState.data).to.deep.equal([
            {id: 'min-sykmelding-id', erUtenforVentetid: true}, {id: 'min-sykmelding-id-2'}
        ])
    });

    it("Håndterer skalOppretteSoknadHentet({})", () => {
        const initialState = deepFreeze({
            data: [{id: 'min-sykmelding-id'}, {id: 'min-sykmelding-id-2'}],
        });
        const action = metaActions.skalOppretteSoknadHentet('min-sykmelding-id', false);
        const nextState = dineSykmeldinger(initialState, action);
        expect(nextState.data).to.deep.equal([{id: 'min-sykmelding-id', skalOppretteSoknad: false}, {id: 'min-sykmelding-id-2'}])
    });

}); 

export const getSykmelding = (soknad = {}) => {
    return Object.assign({}, {
        "id": "73970c89-1173-4d73-b1cb-e8445c2840e2",
        "startLegemeldtFravaer": "2017-07-07",
        "skalViseSkravertFelt": true,
        "identdato": "2017-07-07",
        "status": "SENDT",
        "naermesteLederStatus": null,
        "innsendtArbeidsgivernavn": "ARBEIDS- OG VELFERDSDIREKTORATET, AVD SANNERGATA",
        "valgtArbeidssituasjon": null,
        "orgnummer": "***REMOVED***",
        "sendtdato": "2017-07-24T10:19:15",
        "pasient": {
          "fnr": "***REMOVED***",
          "fornavn": "Frida",
          "etternavn": "Frost"
        },
        "arbeidsgiver": "LOMMEN BARNEHAVE",
        "diagnose": {
          "hoveddiagnose": {
            "diagnose": "TENDINITT INA",
            "diagnosekode": "L87",
            "diagnosesystem": "ICPC-2"
          },
          "bidiagnoser": [
            {
              "diagnose": "GANGLION SENE",
              "diagnosekode": "L87",
              "diagnosesystem": "ICPC-2"
            }
          ],
          "fravaersgrunnLovfestet": null,
          "fravaerBeskrivelse": "Medising årsak i kategorien annet",
          "svangerskap": true,
          "yrkesskade": true,
          "yrkesskadeDato": "2017-07-07"
        },
        "mulighetForArbeid": {
          "perioder": [
            {
              "fom": "2017-07-07",
              "tom": "2017-07-23",
              "grad": 100,
              "behandlingsdager": null,
              "reisetilskudd": null,
              "avventende": null
            }
          ],
          "aktivitetIkkeMulig433": [
            "Annet"
          ],
          "aktivitetIkkeMulig434": [
            "Annet"
          ],
          "aarsakAktivitetIkkeMulig433": "andre årsaker til sykefravær",
          "aarsakAktivitetIkkeMulig434": "andre årsaker til sykefravær"
        },
        "friskmelding": {
          "arbeidsfoerEtterPerioden": true,
          "hensynPaaArbeidsplassen": "Må ta det pent",
          "antarReturSammeArbeidsgiver": true,
          "antattDatoReturSammeArbeidsgiver": "2017-07-07",
          "antarReturAnnenArbeidsgiver": true,
          "tilbakemeldingReturArbeid": "2017-07-07",
          "utenArbeidsgiverAntarTilbakeIArbeid": false,
          "utenArbeidsgiverAntarTilbakeIArbeidDato": "2017-03-10",
          "utenArbeidsgiverTilbakemelding": "2017-03-10"
        },
        "utdypendeOpplysninger": {
          "sykehistorie": null,
          "paavirkningArbeidsevne": null,
          "resultatAvBehandling": null,
          "henvisningUtredningBehandling": null
        },
        "arbeidsevne": {
          "tilretteleggingArbeidsplass": "Fortsett som sist.",
          "tiltakNAV": "Pasienten har plager som er kommet tilbake etter operasjon. Det er nylig tatt MR bildet som viser forandringer i hånd som mulig må opereres. Venter på time. Det er mulig sykemledingen vil vare utover aktuell sm periode. ",
          "tiltakAndre": null
        },
        "meldingTilNav": {
          "navBoerTaTakISaken": false,
          "navBoerTaTakISakenBegrunnelse": null
        },
        "innspillTilArbeidsgiver": null,
        "tilbakedatering": {
          "dokumenterbarPasientkontakt": "2017-03-12",
          "tilbakedatertBegrunnelse": null
        },
        "bekreftelse": {
          "utstedelsesdato": "2017-07-24",
          "sykmelder": "Frida Frost",
          "sykmelderTlf": "94431152"
        }
      }, soknad);
};

export const getParsetSykmelding = (soknad = {}) => {
    return Object.assign({}, {
        "id": "73970c89-1173-4d73-b1cb-e8445c2840e2",
        "startLegemeldtFravaer": new Date("2017-07-07"),
        "skalViseSkravertFelt": true,
        "identdato": new Date("2017-07-07"),
        "status": "SENDT",
        "naermesteLederStatus": null,
        "innsendtArbeidsgivernavn": "ARBEIDS- OG VELFERDSDIREKTORATET, AVD SANNERGATA",
        "valgtArbeidssituasjon": null,
        "orgnummer": "***REMOVED***",
        "sendtdato": new Date("2017-07-24T10:19:15"),
        "pasient": {
          "fnr": "***REMOVED***",
          "fornavn": "Frida",
          "etternavn": "Frost"
        },
        "arbeidsgiver": "LOMMEN BARNEHAVE",
        "diagnose": {
          "hoveddiagnose": {
            "diagnose": "TENDINITT INA",
            "diagnosekode": "L87",
            "diagnosesystem": "ICPC-2"
          },
          "bidiagnoser": [
            {
              "diagnose": "GANGLION SENE",
              "diagnosekode": "L87",
              "diagnosesystem": "ICPC-2"
            }
          ],
          "fravaersgrunnLovfestet": null,
          "fravaerBeskrivelse": "Medising årsak i kategorien annet",
          "svangerskap": true,
          "yrkesskade": true,
          "yrkesskadeDato": new Date("2017-07-07")
        },
        "mulighetForArbeid": {
          "perioder": [
            {
              "fom": new Date("2017-07-07"),
              "tom": new Date("2017-07-23"),
              "grad": 100,
              "behandlingsdager": null,
              "reisetilskudd": null,
              "avventende": null
            }
          ],
          "aktivitetIkkeMulig433": [
            "Annet"
          ],
          "aktivitetIkkeMulig434": [
            "Annet"
          ],
          "aarsakAktivitetIkkeMulig433": "andre årsaker til sykefravær",
          "aarsakAktivitetIkkeMulig434": "andre årsaker til sykefravær"
        },
        "friskmelding": {
          "arbeidsfoerEtterPerioden": true,
          "hensynPaaArbeidsplassen": "Må ta det pent",
          "antarReturSammeArbeidsgiver": true,
          "antattDatoReturSammeArbeidsgiver": new Date("2017-07-07"),
          "antarReturAnnenArbeidsgiver": true,
          "tilbakemeldingReturArbeid": new Date("2017-07-07"),
          "utenArbeidsgiverAntarTilbakeIArbeid": false,
          "utenArbeidsgiverAntarTilbakeIArbeidDato": new Date("2017-03-10"),
          "utenArbeidsgiverTilbakemelding": new Date("2017-03-10")
        },
        "utdypendeOpplysninger": {
          "sykehistorie": null,
          "paavirkningArbeidsevne": null,
          "resultatAvBehandling": null,
          "henvisningUtredningBehandling": null
        },
        "arbeidsevne": {
          "tilretteleggingArbeidsplass": "Fortsett som sist.",
          "tiltakNAV": "Pasienten har plager som er kommet tilbake etter operasjon. Det er nylig tatt MR bildet som viser forandringer i hånd som mulig må opereres. Venter på time. Det er mulig sykemledingen vil vare utover aktuell sm periode. ",
          "tiltakAndre": null
        },
        "meldingTilNav": {
          "navBoerTaTakISaken": false,
          "navBoerTaTakISakenBegrunnelse": null
        },
        "innspillTilArbeidsgiver": null,
        "tilbakedatering": {
          "dokumenterbarPasientkontakt": new Date("2017-03-12"),
          "tilbakedatertBegrunnelse": null
        },
        "bekreftelse": {
          "utstedelsesdato": new Date("2017-07-24"),
          "sykmelder": "Frida Frost",
          "sykmelderTlf": "94431152"
        }
      }, soknad);
};
