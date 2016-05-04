import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import Tilbakedatering from "../../js/components/Tilbakedatering.js";

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

describe("Tilbakedatering", () => {

    describe("dokumenterbarPasientkontakt", () => {

        it("Skal vise dersom sykmelding.dokumenterbarPasientkontakt === (dato)", () => {
            let component = shallow(<Tilbakedatering sykmelding={getSykmelding({
                dokumenterbarPasientkontakt: "2015-12-31T00:00:00Z"
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-dokumenterbarPasientkontakt").text()).to.equal("31.12.2015")
        });

        it("Skal ikke vise dersom sykmelding.dokumenterbarPasientkontakt !== (dato)", () => {
            let component = shallow(<Tilbakedatering sykmelding={getSykmelding({
                dokumenterbarPasientkontakt: null
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-dokumenterbarPasientkontakt").length).to.equal(0);
        });        

    }); 

    describe("tilbakedatertBegrunnelse", () => {

            it("Skal vise dersom sykmelding.tilbakedatertBegrunnelse === (dato)", () => {
            let component = shallow(<Tilbakedatering sykmelding={getSykmelding({
                tilbakedatertBegrunnelse: "God grunn"
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-tilbakedatertBegrunnelse").text()).to.equal("God grunn")
        });

        it("Skal ikke vise dersom sykmelding.tilbakedatertBegrunnelse !== (dato)", () => {
            let component = shallow(<Tilbakedatering sykmelding={getSykmelding({
                tilbakedatertBegrunnelse: null
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-tilbakedatertBegrunnelse").length).to.equal(0);
        });        

    });     
     
}); 