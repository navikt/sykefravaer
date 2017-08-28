import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../mockLedetekster";

chai.use(chaiEnzyme());
const expect = chai.expect;

import { KvitteringSide, getKvitteringtype, mapStateToProps, getLedetekstNokkel } from "../../js/containers/SykmeldingKvitteringContainer";
import SykmeldingKvittering, { SykmeldingKvitteringSokNa, SykmeldingKvitteringSokSenere } from '../../js/components/sykmelding/SykmeldingKvittering';
import sinon from 'sinon';
import getSykmelding from '../mockSykmeldinger';
import { setLedetekster } from 'digisyfo-npm';

const sykmeldinger = [{
    id: "2",
    fnr: "12",
    fornavn: "Per",
    etternavn: "Person",
    sykmelder: "Ove Olsen",
    arbeidsgiver: "Selskapet AS",
    mulighetForArbeid: {
        perioder: [{
            fom: "2015-12-31",
            tom: "2016-01-06",
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
    id: "1",
    fnr: "12",
    fornavn: "Per",
    etternavn: "Person",
    sykmelder: "Ove Olsen",
    arbeidsgiver: "Selskapet AS",
    perioder: [{
        fom: "2015-12-31",
        tom: "2016-01-06",
        grad: 67
    }],
    hoveddiagnose: {
        diagnose: "Influensa",
        diagnosesystem: "ICPC",
        diagnosekode: "LP2"
    },
    arbeidsfoerEtterPerioden: true
}, {
    id: "3",
    fnr: "12",
    fornavn: "Per",
    etternavn: "Person",
    sykmelder: "Ove Olsen",
    arbeidsgiver: "Selskapet AS",
    mulighetForArbeid: {
        perioder: [{
            fom: "2015-12-31",
            tom: "2016-01-06",
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
    id: "4",
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
            fom: "2015-12-31",
            tom: "2016-01-06",
            grad: 67
        }],
    }
}, {
    "id": "5",
    "status": "BEKREFTET",
    "innsendtArbeidsgivernavn": null,
    "orgnummer": null,
    "arbeidsgiver": "LOMMEN BARNEHAVE",
    "valgtArbeidssituasjon": 'arbeidstaker',
    "mulighetForArbeid": {
        "perioder": [{
            "fom": "2015-12-31",
            "tom": "2016-01-06",
            "grad": 67
        }],
    }
}]

describe("SykmeldingKvitteringContainer", () => {

    let ownProps = {};
    let state = {};
    let soknad1;
    let soknad2;
    let soknad3; 
    let soknad4;
    let soknad5;
    let soknad6;

    beforeEach(() => {

        soknad1 = {
            sykmeldingId: "1",
            status: 'NY',
        };

        soknad2 = {
            sykmeldingId: "2",
            status: 'NY',
        };

        soknad3 = {
            sykmeldingId: "1",
            status: 'NY',
        };

        soknad4 = {
            sykmeldingId: "1",
            status: 'NY',
        };

        soknad5 = {
            sykmeldingId: "1",
            status: 'FREMTIDIG',
        };

        soknad6 = {
            sykmeldingId: "3",
            status: 'FREMTIDIG',
        };

        state.dineSykmeldinger = {
            data: sykmeldinger
        };
        state.arbeidsgiversSykmeldinger = {
            data: sykmeldinger.map((s) => {
                return Object.assign({}, s, {
                    valgtArbeidsgiver: {}
                })
            })
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
        state.sykepengesoknader = {
            data: [soknad1, soknad2, soknad3, soknad4, soknad5]
        };
        ownProps.params = {
            sykmeldingId: "1",
        };
    });

    describe("getKvitteringtype", () => {

        let sykmelding;
        let clock;


        beforeEach(() => {
            clock = sinon.useFakeTimers(1484524800000); // 16. januar 2017
        });

        afterEach(() => {
            clock.restore();
        });

        beforeEach(() => {
            sykmelding = {
                id: "1",
            };
        });

        it("Skal returnere STANDARDKVITTERING hvis det ikke finnes soknader", () => {
            const sykepengesoknader = [];
            const kvitteringtype = getKvitteringtype(sykmelding, sykepengesoknader);
            expect(kvitteringtype).to.equal("STANDARDKVITTERING");
        });

        it("Skal returnere STANDARDKVITTERING hvis det finnes søknad som ikke er tilknyttet denne sykmeldingen", () => {
            const sykepengesoknader = [soknad1, soknad2, soknad3];
            const sykmelding = {
                id: "3"
            };
            const kvitteringtype = getKvitteringtype(sykmelding, sykepengesoknader);
            expect(kvitteringtype).to.equal("STANDARDKVITTERING"); 
        });

        it("Skal returnere 'KVITTERING_MED_SYKEPENGER_SOK_SENERE' dersom søknaden gjelder for en periode som går ut i fremtiden", () => {
            const sykepengesoknader = [soknad5];
            const kvitteringtype = getKvitteringtype(sykmelding, sykepengesoknader);
            expect(kvitteringtype).to.equal("KVITTERING_MED_SYKEPENGER_SØK_SENERE");
        });

        it("Skal returnere 'KVITTERING_MED_SYKEPENGER_SOK_SENERE' dersom det finnes fremtidige søknader men ikke for denne sykmeldingen", () => {
            sykmelding.id = "3";
            const sykepengesoknader = [soknad1, soknad2, soknad3, soknad4, soknad5, soknad6];
            const kvitteringtype = getKvitteringtype(sykmelding, sykepengesoknader);
            expect(kvitteringtype).to.equal("KVITTERING_MED_SYKEPENGER_SØK_SENERE");
        });


        it("Skal returnere 'KVITTERING_MED_SYKEPENGER_SØK_NÅ' dersom søknaden gjelder for en periode som går ut i dag", () => {
            const sykepengesoknader = [soknad4, soknad5, soknad2];
            const kvitteringtype = getKvitteringtype(sykmelding, sykepengesoknader);
            expect(kvitteringtype).to.equal("KVITTERING_MED_SYKEPENGER_SØK_NÅ");
        });


        it("Skal returnere 'KVITTERING_MED_SYKEPENGER_SØK_NÅ' dersom søknaden gjelder for en periode som er gått ut", () => {
            const sykepengesoknader = [soknad1, soknad2, soknad3];
            const kvitteringtype = getKvitteringtype(sykmelding, sykepengesoknader);
            expect(kvitteringtype).to.equal("KVITTERING_MED_SYKEPENGER_SØK_NÅ");
        });


    })

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

        it("Skal returnere send-til-arbeidsgiver om arbeidsgiver ikke forskutterer lønn", () => {
            const _sykmelding = Object.assign({}, sykmelding, { status: 'SENDT', arbeidsgiverForskutterer: false });
            const alternativer = {};
            const nokkel = getLedetekstNokkel(_sykmelding, 'ostepop', alternativer);
            expect(nokkel).to.equal('send-til-arbeidsgiver.ostepop');
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

        it("Skal returnere fremtidige soknader", () => {
            const res = mapStateToProps(state, ownProps);
            expect(res.sykepengesoknader).to.deep.equal([soknad5]);
        });

        it("Skal returnere kvitteringtype", () => {
            const res = mapStateToProps(state, ownProps);
            expect(res.kvitteringtype).to.equal("KVITTERING_MED_SYKEPENGER_SØK_NÅ")
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

        it("Skal returnere henter === true dersom sykepengesoknader hentes", () => {
            state.sykepengesoknader.henter = true;
            const res = mapStateToProps(state, ownProps);
            expect(res.henter).to.be.true;
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
            const ledetekster = Object.assign({}, state.ledetekster.data, {
                'bekreft-sykmelding.kvittering.tittel': 'Min fine tittel',
                'bekreft-sykmelding.skjermingskode-6.kvittering.undertekst': '<p>Min fine tekst</p>'
            })
            setLedetekster(ledetekster);
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
            const ledetekster = Object.assign({}, state.ledetekster.data, {
                'bekreft-sykmelding.arbeidstaker-uten-arbeidsgiver.kvittering.undertekst': '<p>Min fine tekst</p>'
            });
            setLedetekster(ledetekster);
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

    describe("KvitteringSide", () => {
        let props;

        beforeEach(() => {
            props = {};
            props.sykmelding = getSykmelding({
                status: 'BEKREFTET'
            });
        })

        it("Skal inneholde en SykmeldingKvittering hvis sykmeldingen er BEKREFTET", () => {
            const component = shallow(<KvitteringSide {...props} />);
            expect(component.find(SykmeldingKvittering)).to.have.length(1);
        });

    })

});