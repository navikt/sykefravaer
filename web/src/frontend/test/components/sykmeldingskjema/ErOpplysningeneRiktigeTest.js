import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { FieldArray } from 'redux-form';
import ErOpplysningeneRiktige, { feilaktigeOpplysninger } from '../../../js/components/sykmeldingskjema/ErOpplysningeneRiktige';
import HvilkeOpplysningerErIkkeRiktige from '../../../js/components/sykmeldingskjema/HvilkeOpplysningerErIkkeRiktige';
import JaEllerNei from '../../../js/components/sykepengesoknad/JaEllerNei';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('ErOpplysningeneRiktige -', () => {
    it('Inneholder en ja/nei', () => {
        const comp = shallow(<ErOpplysningeneRiktige />);
        expect(comp.find(JaEllerNei)).to.be.length(1);
    });

    it('inneholder et fieldarray', () => {
        const comp = shallow(<ErOpplysningeneRiktige />);
        const array = comp.find(FieldArray);

        expect(array.prop('component')).to.deep.equal(HvilkeOpplysningerErIkkeRiktige);
        expect(array.prop('name')).to.equal('feilaktigeOpplysninger');
        expect(array.prop('fields')).to.deep.equal(feilaktigeOpplysninger);
        expect(comp.find(FieldArray)).to.be.length(1);
    });

    it('skal vise riktig spoersmal', () => {
        const comp = shallow(<ErOpplysningeneRiktige />);
        expect(comp.find(JaEllerNei).prop('spoersmal')).to.equal('Er opplysningene i sykmeldingen riktige?');
    });
});
