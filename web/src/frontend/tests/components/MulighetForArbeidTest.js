import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import MulighetForArbeid from "../../js/components/MulighetForArbeid.js";

let component;

const sykmelding = {
    id: 3456789,
    fnr: "12",
    fornavn: "Per",
    etternavn: "Person",
    sykmelder: "Ove Olsen",
    arbeidsgiver: "Selskapet AS",
    perioder: [{
        fom: "2015-12-31T00:00:00Z",
        tom: "2016-01-06T00:00:00Z",
        grad: 67
    }],
    hoveddiagnose: {
        diagnose: "Influensa",
        diagnosesystem: "ICPC",
        diagnosekode: "LP2"
    },
    arbeidsfoerEtterPerioden: true
};

const getSykmelding = (skmld = {}) => {
    return Object.assign({}, sykmelding, skmld);
}

describe("Mulighet for arbeid", () => {

    describe("Når startet det legemeldte fraværet?", () => {

        it("Skal ikke vise dersom sykmelding.startLegemeldtFravaer === null", () => {
            component = mount(<MulighetForArbeid sykmelding={getSykmelding({
                startLegemeldtFravaer: null
            })} ledetekster={ledetekster}/>)
            expect(component.find(".js-startLegemeldtFravaer").length).to.equal(0); 
        });

        it("Skal vise dersom sykmelding.startLegemeldtFravaer er en dato", () => {
            component = mount(<MulighetForArbeid sykmelding={getSykmelding({
                startLegemeldtFravaer: "2016-04-27T22:00:00.000Z"
            })} ledetekster={ledetekster}/>)
            expect(component.find(".js-startLegemeldtFravaer").length).to.equal(1); 
            expect(component.find(".js-startLegemeldtFravaer").text()).to.equal("28.04.2016");
        });

    });

    describe("aarsakAktivitetIkkeMulig433", () => {
        it("Skal ikke vise dersom sykmelder.aarsakAktivitetIkkeMulig433 === null", () => {
            component = mount(<MulighetForArbeid sykmelding={getSykmelding({
                aarsakAktivitetIkkeMulig433: null
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-aarsakAktivitetIkkeMulig433").length).to.equal(0);
        });

        it("Skal vise dersom sykmelder.aarsakAktivitetIkkeMulig433 === 'Helsetilstanden hindrer pasienten i å være i aktivitet'", () => {
            component = mount(<MulighetForArbeid sykmelding={getSykmelding({
                aarsakAktivitetIkkeMulig433: "Helsetilstanden hindrer pasienten i å være i aktivitet"
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-aarsakAktivitetIkkeMulig433").text()).to.contain("Det er medisinske årsaker som hindrer arbeidsrelatert aktivitet");
            expect(component.find(".js-aarsakAktivitetIkkeMulig433hvisJa").text()).to.contain("Helsetilstanden hindrer pasienten i å være i aktivitet");
        });
    });

    // describe.skip("aarsakAktivitetIkkeMulig434", () => {
    //     it("Skal ikke vise dersom sykmelder.aarsakAktivitetIkkeMulig434 === null", () => {
    //         component = mount(<MulighetForArbeid sykmelding={getSykmelding({
    //             aarsakAktivitetIkkeMulig434: null
    //         })} ledetekster={ledetekster} />);
    //         expect(component.find(".js-aarsakAktivitetIkkeMulig434").length).to.equal(0);
    //     });

    //     it("Skal vise dersom sykmelder.aarsakAktivitetIkkeMulig434 === 'Har vondt i foten'", () => {
    //         component = mount(<MulighetForArbeid sykmelding={getSykmelding({
    //             aarsakAktivitetIkkeMulig434: "Har vondt i foten"
    //         })} ledetekster={ledetekster} />);
    //         expect(component.find(".js-aarsakAktivitetIkkeMulig434").text()).to.contain("Har vondt i foten")
    //     });
    // });

});