import chai from 'chai';
import React from 'react'
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { setLedetekster, Hjelpetekst } from 'digisyfo-npm';
import NaermesteLeder from '../../../js/components/landingsside/NaermesteLeder';
import BekreftFeilLederContainer from '../../../js/containers/landingsside/BekreftFeilLederContainer';
import Lightbox from '../../../js/components/Lightbox';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("NaermesteLeder", () => {

    let leder;

    beforeEach(() => {
        setLedetekster({
            'din-situasjon.naermeste-leder': "Din nærmeste leder er %LEDER%.",
            'din-situasjon.naermeste-leder.meld-feil': "Meld fra om endring",
            'din-situasjon.arbeidsgiver-forskutterer-ikke': "Arbeidsgiveren din betaler ikke lønn etter de første 16 dagene.",
            'din-situasjon.arbeidsgiver-forskutterer': "Arbeidsgiveren din betaler lønn også etter de 16 første dagene."
        });
        leder = {
            navn: "Ole Olsen",
            avkreftet: false,
            arbeidsgiverForskuttererLoenn: true
        }
    });

    it("Skal vise leder", () => {
        const compo = shallow(<NaermesteLeder leder={leder} />);
        expect(compo.html()).to.contain("Ole Olsen");
    });

    it("Skal vise avkreftet leder som avkreftet", () => {
        leder.avkreftet = true;
        const compo = shallow(<NaermesteLeder leder={leder} />);
        expect(compo.find(".leder--avkreftet")).to.have.length(1);
    });

    it("Skal ikke vise aktiv leder som avkreftet", () => {
        const compo = shallow(<NaermesteLeder leder={leder} />);
        expect(compo.find(".leder--avkreftet")).to.have.length(0);
    });

    it("Skal vise feil-knapp for aktiv leder", () => {
        const compo = shallow(<NaermesteLeder leder={leder} />);
        expect(compo.find(".js-feil")).to.have.length(1);
    });

    it("Skal ikke vise feil-knapp for avkreftet leder", () => {
        leder.avkreftet = true;
        const compo = shallow(<NaermesteLeder leder={leder} />);
        expect(compo.find(".js-feil")).to.have.length(0);
    });

    it("Skal vise en lightbox når man klikker på `Meld fra om endring`", () => {
        const compo = shallow(<NaermesteLeder leder={leder} />);
        compo.find(".js-feil").simulate("click");
        expect(compo.find(Lightbox)).to.have.length(1);
    });

    it("Skal vise BekreftFeilLederContainer når man klikker på `Meld fra om endring`", () => {
       const compo = shallow(<NaermesteLeder leder={leder} />);
       compo.find(".js-feil").simulate("click");
       expect(compo.find(BekreftFeilLederContainer)).to.have.length(1); 
    });

    it("Skal vise tekst om lederen", () => {
        const compo = shallow(<NaermesteLeder leder={leder} />);
        expect(compo.html()).to.contain("Din nærmeste leder er Ole Olsen.");
        expect(compo.text()).to.contain("Meld fra om endring");
        expect(compo.text()).to.contain("Arbeidsgiveren din betaler lønn også etter de 16 første dagene.");
    });

    it("Skal vise tekst om at arbeidsgiver forskutterer lønn", () => {
        const compo = shallow(<NaermesteLeder leder={leder} />);
        expect(compo.text()).to.contain("Arbeidsgiveren din betaler lønn også etter de 16 første dagene.");
    });

    it("Skal vise tekst om at arbeidsgiver ikke forskutterer lønn", () => {
        leder.arbeidsgiverForskuttererLoenn = false;
        const compo = shallow(<NaermesteLeder leder={leder} />);
        expect(compo.text()).to.contain("Arbeidsgiveren din betaler ikke lønn etter de første 16 dagene.");
    });

    it("Skal vise Hjelpetekst", () => {
        const compo = shallow(<NaermesteLeder leder={leder} />);
        expect(compo.find(Hjelpetekst)).to.have.length(1);
    });

});