import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
const expect = chai.expect;
import sinon from 'sinon';
import { Field } from 'redux-form';

import { validate, OppsummeringSide, SendingFeilet } from '../../../../js/components/sykepengesoknad/Oppsummering/OppsummeringSkjema';
import { getSoknad } from '../../../mockSoknader';
import mapSkjemasoknadToBackendsoknad from '../../../../js/components/sykepengesoknad/mapSkjemasoknadToBackendsoknad';
import { Soknad, setLedetekster } from 'digisyfo-npm';
import { Link } from 'react-router';

import CheckboxSelvstendig from '../../../../js/components/skjema/CheckboxSelvstendig';

describe("OppsummeringSkjema", () => {

    let sendTilFoerDuBegynner;
    let gyldigeVerdier;

    describe("OppsummeringSide", () => {
        
        let component; 
        let skjemasoknad;
        let sykepengesoknad;
        let ledetekster;
        let handleSubmit;

        beforeEach(() => {
          skjemasoknad = getSoknad({
            utdanning: {}
          });
          sykepengesoknad = getSoknad({
            id: "olsen"
          });
          setLedetekster({ tekst: "test" });
          handleSubmit = sinon.spy();

          component = shallow(<OppsummeringSide
            handleSubmit={handleSubmit}
            skjemasoknad={skjemasoknad}
            sykepengesoknad={sykepengesoknad} />);
        });

        it("Skal inneholde et Field med riktig name", () => {
          expect(component.find(Field)).to.have.length(1);
          expect(component.find(Field).prop("component")).to.deep.equal(CheckboxSelvstendig);
          expect(component.find(Field).prop("name")).to.equal("bekreftetKorrektInformasjon");
        });

        it("Skal inneholde en Soknad med riktige props", () => {
          const mappaSoknad = mapSkjemasoknadToBackendsoknad(skjemasoknad);
          expect(component.find(Soknad)).to.have.length(1);
          expect(component.find(Soknad).prop("ledetekster")).to.deep.equal(ledetekster);
          expect(component.find(Soknad).prop("sykepengesoknad")).to.deep.equal(mappaSoknad)
        });

        it("Skal inneholde en Link til forrige side", () => {
          expect(component.find(Link).prop("to")).to.equal("/sykefravaer/soknader/olsen/aktiviteter-i-sykmeldingsperioden")
        });

        it("SKal inneholde en SendingFeilet hvis sendingFeilet", () => {
          const component2 = shallow(<OppsummeringSide handleSubmit={handleSubmit} skjemasoknad={skjemasoknad} sykepengesoknad={sykepengesoknad} sendingFeilet={true} />);
          expect(component2.find(SendingFeilet)).to.have.length(1); 
        });

        it("SKal ikke vise en SendingFeilet hvis sending ikke feilet", () => {
          expect(component.find(SendingFeilet)).to.have.length(0);
        })

    });

})