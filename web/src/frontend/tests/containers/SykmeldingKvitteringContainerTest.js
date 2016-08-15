import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import { KvitteringSide, mapStateToProps } from "../../js/containers/SykmeldingKvitteringContainer.js";
import SykmeldingKvittering from '../../js/components/sykmelding/SykmeldingKvittering.js';

const sykmeldinger = [{
    id: 2,
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
        }
        ownProps.params = {
            sykmeldingId: 1,
        };
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