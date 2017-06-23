import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;

import Soknader from "../../../js/components/sykepengesoknader/Soknader";
import SoknaderTeasere from "../../../js/components/sykepengesoknader/SoknaderTeasere";
import Sidetopp from "../../../js/components/Sidetopp";
import { setLedetekster } from 'digisyfo-npm';

describe("Soknader", () => {

    const ledetekster = {
        'soknader.introduksjonstekst': 'introtekst',
        'soknader.sidetittel': 'tittel',
    };

    let component;

    beforeEach(() => {
        setLedetekster(ledetekster);
    });

    it('skal vise tittel', () => {
        component = shallow(<Soknader soknader={[]} />);
        expect(component.find(Sidetopp)).to.have.length(1);
    });

    it('skal vise søknader til behandlings boks', () => {
        component = shallow(<Soknader soknader={[]} />);
        expect(component.find(SoknaderTeasere)).to.have.length(1);
    });

    it('viser ikke innsendte om innsendte soknader er tom', () => {
        component = shallow(<Soknader soknader={[]} />);
        expect(component.find(".js-sendt")).to.have.length(0);
    });

    it('Bare nye soknader og utkast sendes videre til SoknaderTeasere', () => {
        component = shallow(<Soknader soknader={[
            {
                id: "1", 
                status: 'SENDT',
                sendtTilNAVDato: new Date(),
                sendtTilArbeidsgiverDato: null,
            },
            {
                id: "2", 
                status: 'NY',
                sendtTilNAVDato: new Date(),
                sendtTilArbeidsgiverDato: null,
            },
            {
                id: "3", 
                status: 'NY',
                sendtTilNAVDato: new Date(),
                sendtTilArbeidsgiverDato: null,
            },
            {
                id: "4", 
                status: 'UTGAATT',
                sendtTilNAVDato: new Date(),
                sendtTilArbeidsgiverDato: null,
            },
            {
                id: "5", 
                status: 'LAGRET',
                sendtTilNAVDato: new Date(),
                sendtTilArbeidsgiverDato: null,
            }, {
                id: "6", 
                status: 'UTKAST_TIL_KORRIGERING',
                sendtTilNAVDato: null,
                sendtTilArbeidsgiverDato: null,
            }]} />);
        expect(component.find('.js-til-behandling').props().soknader).to.have.length(3);
    });

    it('Viser innsendte søknader om vi har noen', () => {
        const soknad = {id: "1", status: 'SENDT', fom: '01.01.2017', tom: '01.20.2017', arbeidsgiver: 'BEKK Consulting AS', innsendingsDato: '02.01.2017'}

        component = shallow(<Soknader soknader={[soknad]} />);
        expect(component.find(".js-sendt")).to.have.length(1);
    });

    it('Sender søknader videre til SoknaderTeasere', () => {
        component = shallow(<Soknader soknader={[
            {id: "1", status: 'SENDT', sendtTilNAVDato: new Date(), sendtTilArbeidsgiverDato: null },
            {id: "2", status: 'NY', sendtTilNAVDato: null, sendtTilArbeidsgiverDato: null },
            {id: "3", status: 'NY', sendtTilNAVDato: null, sendtTilArbeidsgiverDato: null },
            {id: "4", status: 'UTGAATT', sendtTilNAVDato: new Date(), sendtTilArbeidsgiverDato: null },
            {id: "5", status: 'LAGRET', sendtTilNAVDato: new Date() }]} />);
        expect(component.find('.js-til-behandling').props().soknader).to.have.length(2);
        expect(component.find('.js-sendt').props().soknader).to.have.length(2);
    });

}); 