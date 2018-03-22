import chai from 'chai';
import React from 'react'
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import getSykmelding from "../../mockSykmeldinger";
import SykmeldingKvittering, { Kvitteringsteg, Standardkvittering, HtmlAvsnitt, KvitteringSokNa, KvitteringSokSenere, Soknadsdatoliste } from "../../../js/components/sykmelding/SykmeldingKvittering";
import Sidetopp from "../../../js/components/Sidetopp";
import history from "../../../js/history";
import sinon from 'sinon';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("SykmeldingKvittering", () => {

    beforeEach(() => {
        window.APP_SETTINGS = {
            APP_ROOT: "/sykefravaer"
        }
    })

    it("Skal vise en Standardkvittering hvis kvitteringtype er STANDARDKVITTERING", () => {
        const comp = shallow(<SykmeldingKvittering kvitteringtype="STANDARDKVITTERING" />);
        expect(comp.find(Standardkvittering)).to.have.length(1);
    });

    it("Skal vise en KvitteringSokSenere hvis kvitteringtype er KVITTERING_MED_SYKEPENGER_SØK_SENERE", () => {
        const comp = shallow(<SykmeldingKvittering kvitteringtype="KVITTERING_MED_SYKEPENGER_SØK_SENERE" />);
        expect(comp.find(KvitteringSokSenere)).to.have.length(1);
    });

    it("Skal vise en KvitteringSokNa hvis kvitteringtype er KVITTERING_MED_SYKEPENGER_SØK_NÅ", () => {
        const comp = shallow(<SykmeldingKvittering kvitteringtype="KVITTERING_MED_SYKEPENGER_SØK_NÅ" />);
        expect(comp.find(KvitteringSokNa)).to.have.length(1);
    });

    describe("KvitteringSokSenere", () => {
        let comp;

        beforeEach(() => {
            comp = shallow(<KvitteringSokSenere sykmelding={getSykmelding()} />);
        });

        it("Skal vise tre stk Kvitteringsteg", () => {
            expect(comp.find(Kvitteringsteg)).to.have.length(3);
        });

    });

    describe("KvitteringSokNa", () => {
        let comp;
        let hentSykepengesoknader;

        beforeEach(() => {
            hentSykepengesoknader = sinon.spy();
            comp = shallow(<KvitteringSokNa hentSykepengesoknader={hentSykepengesoknader} />);
        });

        it("Skal vise to stk Kvitteringsteg", () => {
            expect(comp.find(Kvitteringsteg)).to.have.length(2);
        });

    });

    describe("Kvitteringsteg", () => {
        let comp; 

        beforeEach(() => {
            comp = shallow(<Kvitteringsteg ikon="banan.svg" tittel="Min fine tittel"><p>Hei på deg</p></Kvitteringsteg>);
        });

        it("Skal vise et ikon", () => {
            expect(comp.find("img").prop("src")).to.equal("/sykefravaer/img/svg/banan.svg")
        });

        it("Skal vise en tittel", () => {
            expect(comp.find(".js-tittel").text()).to.equal("Min fine tittel");
        });

        it("Skal vise children", () => {
            expect(comp.find(".js-tekst")).to.contain(<p>Hei på deg</p>);
        });

    });

    describe("Soknadsdatoliste", () => {
        let comp;

        let soknad1 = {
            tom: new Date("2017-10-14"),
        };

        let soknad2 = {
            tom: new Date("2017-10-12"),
        };

        let soknad3 = {
            tom: new Date("2017-10-13"),
        }

        beforeEach(() => {
            
        });

        it("Skal sortere etter tom", () => {
            comp = shallow(<Soknadsdatoliste sykepengesoknader={[soknad1, soknad2, soknad3]} />)
            expect(comp.find("li").at(0).text()).to.equal("12.10.2017");
            expect(comp.find("li").at(1).text()).to.equal("13.10.2017");
            expect(comp.find("li").at(2).text()).to.equal("14.10.2017");
        })


    })


}); 

