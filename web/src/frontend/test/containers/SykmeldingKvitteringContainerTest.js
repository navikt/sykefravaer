import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock";

chai.use(chaiEnzyme());
const expect = chai.expect;

import { KvitteringSide, mapStateToProps, getLedetekstNokkel } from "../../js/containers/SykmeldingKvitteringContainer";
import SykmeldingKvittering from '../../js/components/sykmelding/SykmeldingKvittering';

const sykmeldinger = [{
    id: 2,
    fnr: "12",
    fornavn: "Per",
    etternavn: "Person",
    sykmelder: "Ove Olsen",
    arbeidsgiver: "Selskapet AS",
    mulighetForArbeid: {
        perioder: [{
            fom: { year: 2015, monthValue: 12, dayOfMonth: 31 },
            tom: { year: 2016, monthValue: 1, dayOfMonth: 6 },
            grad: 67
        }],
    },
    hoveddiagnose: {
        diagnose: "Influensa",
        diagnosesystem: "ICPC",
        diagnosekode: "LP2"
    },
    arbeidsfoerEtterPerioden: true
}, {
    id: 1,
    fnr: "12",
    fornavn: "Per",
    etternavn: "Person",
    sykmelder: "Ove Olsen",
    arbeidsgiver: "Selskapet AS",
    perioder: [{
        fom: { year: 2015, monthValue: 12, dayOfMonth: 31 },
        tom: { year: 2016, monthValue: 1, dayOfMonth: 6 },
        grad: 67
    }],
    hoveddiagnose: {
        diagnose: "Influensa",
        diagnosesystem: "ICPC",
        diagnosekode: "LP2"
    },
    arbeidsfoerEtterPerioden: true
}, {
    id: 3,
    fnr: "12",
    fornavn: "Per",
    etternavn: "Person",
    sykmelder: "Ove Olsen",
    arbeidsgiver: "Selskapet AS",
    mulighetForArbeid: {
        perioder: [{
            fom: { year: 2015, monthValue: 12, dayOfMonth: 31 },
            tom: { year: 2016, monthValue: 1, dayOfMonth: 6 },
            grad: 67
        }],
    },
    hoveddiagnose: {
        diagnose: "Influensa",
        diagnosesystem: "ICPC",
        diagnosekode: "LP2"
    },
    arbeidsfoerEtterPerioden: true
}, {
    id: 4,
    status: 'BEKREFTET',
    fnr: "12",
    fornavn: "Per",
    etternavn: "Person",
    sykmelder: "Ove Olsen",
    arbeidsgiver: "Selskapet AS",
    hoveddiagnose: {
        diagnose: "Influensa",
        diagnosesystem: "ICPC",
        diagnosekode: "LP2"
    },
    arbeidsfoerEtterPerioden: true,
    mulighetForArbeid: {
        perioder: [{
            fom: { year: 2015, monthValue: 12, dayOfMonth: 31 },
            tom: { year: 2016, monthValue: 1, dayOfMonth: 6 },
            grad: 67
        }],
    }
}, {
    "id": 5,
    "status": "BEKREFTET",
    "innsendtArbeidsgivernavn": null,
    "orgnummer": null,
    "arbeidsgiver": "LOMMEN BARNEHAVE",
    "valgtArbeidssituasjon": 'arbeidstaker',
    "mulighetForArbeid": {
        "perioder": [{
            "fom": { "year": 2015, "monthValue": 12, "dayOfMonth": 31 },
            "tom": { "year": 2016, "monthValue": 1, "dayOfMonth": 6 },
            "grad": 67
        }],
    }
}]

describe("SykmeldingKvitteringContainer", () => {

    let ownProps = {};
    let state = {};

    beforeEach(() => {
        state.dineSykmeldinger = {
            data: sykmeldinger
        };
        state.arbeidsgiversSykmeldinger = {
            data: sykmeldinger
        };
        state.ledetekster = {
            data: ledetekster
        }; 
        state.brukerinfo = {
            bruker: {
                data: {
                    strengtFortroligAdresse: false
                }
            }
        };
        ownProps.params = {
            sykmeldingId: 1,
        };
        state.pilot = {
            data: {
                pilotSykepenger: false
            }
        };
    }); 

    describe("getLedetekstNokkel", () => {
        const sykmelding = {};
        it("Skal returnere null dersom sykmelding === undefined", () => {
            const nokkel = getLedetekstNokkel(undefined, null, {});
            expect(nokkel).to.equal(null);
        });

        it("Skal returnere null dersom sykmelding === (ukjent status)", () => {
            const _sykmelding = Object.assign({}, sykmelding, { status: '(en eller annen status som jeg ikke kan noe om)' });
            const nokkel = getLedetekstNokkel(_sykmelding, 'nokkel', {});
            expect(nokkel).to.equal(null);
        });

        it("Skal returnere arbeidstaker-uten-arbeidsgiver om bruker er arbeidstaker", () => {
            const _sykmelding = Object.assign({}, sykmelding, { status: 'BEKREFTET', valgtArbeidssituasjon: 'ARBEIDSTAKER' });
            const alternativer = {};
            const nokkel = getLedetekstNokkel(_sykmelding, 'ostepop', alternativer);
            expect(nokkel).to.equal('bekreft-sykmelding.arbeidstaker-uten-arbeidsgiver.ostepop');
        });

        it("Skal returnere riktig nokkel dersom sykmelding.status === 'BEKREFTET'", () => {
            const nokkel = getLedetekstNokkel({ status: 'BEKREFTET'}, 'ostepop');
            expect(nokkel).to.equal('bekreft-sykmelding.ostepop');
        });

        it("Skal returnere riktig nokkel dersom sykmelding.status === 'AVBRUTT'", () => {
            const nokkel = getLedetekstNokkel({ status: 'AVBRUTT'}, 'ostepop');
            expect(nokkel).to.equal('avbryt-sykmelding.ostepop');
        });

        it("Skal returnere send-til-arbeidstaker om arbeidsgiver ikke forskutterer lønn", () => {
            const _sykmelding = Object.assign({}, sykmelding, { status: 'SENDT', arbeidsgiverForskutterer: false });
            const alternativer = {};
            const nokkel = getLedetekstNokkel(_sykmelding, 'ostepop', alternativer);
            expect(nokkel).to.equal('send-til-arbeidsgiver.ostepop');
        });

        it("Skal returnere send-til-arbeidstaker om bruker ikke er i piloten", () => {
            const _sykmelding = Object.assign({}, sykmelding, { status: 'SENDT', arbeidsgiverForskutterer: true });
            const alternativer = {};
            const nokkel = getLedetekstNokkel(_sykmelding, 'ostepop', alternativer, false);
            expect(nokkel).to.equal('send-til-arbeidsgiver.ostepop');
        });

        it("Skal returnere riktig nokkel dersom perioder ikke er passert", () => {
            const fom = new Date();
            fom.setDate(fom.getDate() - 2);
            const tom = new Date();
            tom.setDate(tom.getDate() + 2);
            const _sykmelding = Object.assign({}, sykmelding, {
                status: 'SENDT',
                arbeidsgiverForskutterer: true,
                mulighetForArbeid: {
                    perioder: [{fom: fom, tom: tom}],
                }
            });
            const alternativer = {};
            const nokkel = getLedetekstNokkel(_sykmelding, 'ostepop', alternativer, true);
            expect(nokkel).to.equal('send-til-arbeidsgiver.pilot.ostepop');
        });

        it("Skal returnere riktig nokkel dersom perioder er passert", () => {
            const fom = new Date();
            fom.setDate(fom.getDate() - 10);
            const tom = new Date();
            tom.setDate(tom.getDate() -8);
            const _sykmelding = Object.assign({}, sykmelding, {
                status: 'SENDT',
                arbeidsgiverForskutterer: true,
                mulighetForArbeid: {
                    perioder: [{fom: fom, tom: tom}],
                }
            });
            const alternativer = {};
            const nokkel = getLedetekstNokkel(_sykmelding, 'ostepop', alternativer, true);
            expect(nokkel).to.equal('send-til-arbeidsgiver.pilot.sok.ostepop');
        });

        it("Skal returnere riktig nokkel dersom sykmelding.status === 'BEKREFTET' og bruker har strengt fortrolig adresse", () => {
            const nokkel = getLedetekstNokkel({ status: 'BEKREFTET'}, 'ostepop', {
                harStrengtFortroligAdresse: true
            });
            expect(nokkel).to.equal('bekreft-sykmelding.skjermingskode-6.ostepop');
        });




    });

    describe("mapStateToProps", () => {      

        it("Skal returnere sykmelding", () => {
            const res = mapStateToProps(state, ownProps);
            expect(res.sykmelding).to.deep.equal(sykmeldinger[1]);
        });

        it("Skal returnere henter === true dersom sykmeldinger hentes", () => {
            state.dineSykmeldinger.henter = true; 

            const res = mapStateToProps(state, ownProps);
            expect(res.henter).to.be.true;
        });

        it("Skal returnere henter === true dersom ledetekster hentes", () => {
            state.ledetekster.henter = true; 
            const res = mapStateToProps(state, ownProps);
            expect(res.henter).to.be.true;
        });

        it("Skal returnere ledetekster", () => {
            const res = mapStateToProps(state, ownProps);
            expect(res.ledetekster).to.deep.equal(ledetekster)
        });

        it("Skal returnere sykmelding === undefined dersom sykmeldingen ikke finnes", () => {
            ownProps.params = {
                sykmeldingId: "Ukjent_ID"
            };
            const res = mapStateToProps(state, ownProps);
            expect(res.sykmelding).to.be.undefined;
        });

        it("Skal returnere feil dersom det oppstår en feil med sykmeldinger", () => {
            state.dineSykmeldinger.hentingFeilet = true;
            const res = mapStateToProps(state, ownProps);
            expect(res.hentingFeilet).to.be.true;
        });


        it("Skal returnere feil dersom det oppstår en feil med ledetekster", () => {
            state.ledetekster.hentingFeilet = true;
            const res = mapStateToProps(state, ownProps);
            expect(res.hentingFeilet).to.be.true;
        });

        it("Skal returnere riktig tekst dersom bruker har strengt fortrolig adresse", () => {
            ownProps.params.sykmeldingId = 4;
            state.ledetekster.data = Object.assign({}, state.ledetekster.data, {
                'bekreft-sykmelding.kvittering.tittel': 'Min fine tittel',
                'bekreft-sykmelding.skjermingskode-6.kvittering.undertekst': '<p>Min fine tekst</p>'
            })
            state.brukerinfo = {
                bruker: {
                    data: {
                        strengtFortroligAdresse: true
                    }
                }
            };
            const res = mapStateToProps(state, ownProps);
            expect(res.brodtekst).to.deep.equal({__html: '<p>Min fine tekst</p>'});
            expect(res.tittel).to.deep.equal('Min fine tittel');
        });

        it("Skal returnere riktig sykepengerTekst dersom bruker har valgt har valgt arbeidssituasjon arbeidstaker og arbeidsgiveren min er ikke her og bekreftet sykmeldingen", () => {
            ownProps.params.sykmeldingId = 5;
            state.ledetekster.data = Object.assign({}, state.ledetekster.data, {
                'bekreft-sykmelding.arbeidstaker-uten-arbeidsgiver.kvittering.undertekst': '<p>Min fine tekst</p>'
            });
            const res = mapStateToProps(state, ownProps);
            expect(res.brodtekst).to.deep.equal({__html: '<p>Min fine tekst</p>'});
        });

        it("Skal returnere brødsmuler", () => {
            const res = mapStateToProps(state, ownProps);
            expect(res.brodsmuler).to.deep.equal([{
                tittel: "Ditt sykefravær",
                sti: '/',
                erKlikkbar: true,
            }, {
                tittel: "Dine sykmeldinger",
                sti: '/sykmeldinger',
                erKlikkbar: true,
            }, {
                tittel: "Sykmelding",
                sti: '/sykmeldinger/1',
                erKlikkbar: true,
            }, {
                tittel: "Kvittering",
            }]);

        })

    });

});