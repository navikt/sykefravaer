import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;

import HendelseIkon, { getIkon } from "../../js/components/HendelseIkon.js";

describe("HendelseIkon", () => {

    it("Skal vise to bilder; ett vanlig og ett for høykontrast", () => {
        let component = shallow(<HendelseIkon />);
        expect(component.find("img")).to.have.length(2);
    });

    describe("getIkon", () => {

        it("Skal returnere riktig ikon hvis type === 'FØRSTE_SYKMELDINGSDAG'", () => {
            const ikon = getIkon('FØRSTE_SYKMELDINGSDAG');
            expect(ikon).to.deep.equal({
                bilde: "plaster",
                className: "hendelse-ikon-start"
            });
        });

        it("Skal returnere riktig ikon hvis type === 'AKTIVITETSKRAV_VARSEL'", () => {
            const ikon = getIkon('AKTIVITETSKRAV_VARSEL');
            expect(ikon).to.deep.equal({
                bilde: "varsel",
                className: "hendelse-ikon-varsel"
            });
        });

        it("Skal returnere riktig ikon hvis type === 'TITTEL'", () => {
            const ikon = getIkon('TITTEL');
            expect(ikon).to.deep.equal({
                bilde: "klokke",
                className: "hendelse-ikon-klokke"
            });
        });

        it("Skal returnere riktig ikon hvis type === 'TID'", () => {
            const ikon = getIkon('TID');
            expect(ikon).to.deep.equal({
                bilde: "klokke",
                className: "hendelse-ikon-klokke"
            });
        });

        it("Skal returnere riktig ikon hvis type === ''", () => {
            const ikon = getIkon('');
            expect(ikon).to.deep.equal({
                bilde: "sirkel",
                className: "hendelse-ikon-sirkel"
            });
        });
    })

});