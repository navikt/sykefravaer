import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Varselstripe, { getIkon } from '../../js/components/Varselstripe';

describe("Varselstripe", () => {

    it("Skal vise children", () => {
        const comp = mount(<Varselstripe><p>Info</p></Varselstripe>);
        expect(comp.contains(<p>Info</p>)).to.be.true;
    });

    it("Skal vise ikon som img", () => {
        const comp = mount(<Varselstripe><p>Info</p></Varselstripe>);
        expect(comp.find("img")).to.have.length(1);
    })

    describe("getIkon", () => {

        it("Skal vise riktig ikon når type === suksess", () => {
            expect(getIkon('suksess')).to.deep.equal({
                "ikonAlt": "Suksess",
                "typeIkon": "/sykefravaer/img/modig-frontend/ikoner-svg/ikon-suksess.svg"
            })
        });

        it("Skal vise riktig ikon når type === feil", () => {
            expect(getIkon('feil')).to.deep.equal({
                "ikonAlt": "Info",
                "typeIkon": "/sykefravaer/img/svg/utropstegn-hvit.svg"
            })
        });

        it("Skal vise riktig ikon når type === info", () => {
            expect(getIkon('info')).to.deep.equal({
                "ikonAlt": "Info",
                "typeIkon": "/sykefravaer/img/svg/utropstegn-hvit.svg"
            })
        });

        it("Skal vise riktig ikon når type === avbrutt", () => {
            expect(getIkon('avbrutt')).to.deep.equal({
                "ikonAlt": "Avbrutt",
                "typeIkon": "/sykefravaer/img/svg/avbryt-sykmelding-roed.svg"
            })
        });


        it("Skal vise riktig ikon når type === undefined", () => {
            expect(getIkon()).to.deep.equal({
                "ikonAlt": "Info",
                "typeIkon": "/sykefravaer/img/modig-frontend/ikoner-svg/ikon-informasjon.svg"
            })
        });

    });

});