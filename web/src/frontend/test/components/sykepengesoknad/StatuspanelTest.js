import Statuspanel from '../../../js/components/sykepengesoknad/Statuspanel';
import { Hjelpetekst } from 'digisyfo-npm';
import chai from 'chai';
import React from 'react';
import {mount, render, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
const expect = chai.expect;

describe("Sykepengesoknad - Statuspanel", () => {
    it("Skal vise hjelpetekst om den er med", () => {
        const opplysninger = [[{
            tittel: 'tittel',
            opplysning: 'opplysning',
            hjelpetekst: <Hjelpetekst />,
        }]];

        const comp = shallow(<Statuspanel opplysninger={opplysninger} />);
        expect(comp.find(Hjelpetekst)).to.have.length(1);
    });

    it("Skal ikke vise hjelpetekst om den ikke er med", () => {
        it("Skal vise hjelpetekst om den er med", () => {
            const opplysninger = [[{
                tittel: 'tittel',
                opplysning: 'opplysning',
            }]];

            const comp = shallow(<Statuspanel opplysninger={opplysninger} />);
            expect(comp.find(Hjelpetekst)).to.have.length(0);
        });
    });
});
