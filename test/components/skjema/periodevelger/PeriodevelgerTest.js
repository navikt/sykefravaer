import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import Periode from '../../../../js/components/skjema/periodevelger/Periode';
import { PeriodelisteComponent } from '../../../../js/components/skjema/periodevelger/Periodeliste';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('PeriodelisteComponent', () => {
    let fields;

    beforeEach(() => {
        fields = [];
    });

    it('Skal legge til en periode dersom det ikke finnes noen perioder', () => {
        const push = sinon.spy();
        fields.push = push;

        shallow(<PeriodelisteComponent fields={fields} meta={{ form: 'testskjema ' }} />);
        expect(push.calledOnce).to.equal(true);
        expect(push.calledWith({})).to.equal(true);
    });

    it('Skal ikke legge til en periode dersom det ikke finnes noen perioder', () => {
        fields = [{}];
        const push = sinon.spy();
        fields.push = push;

        shallow(<PeriodelisteComponent fields={fields} meta={{ form: 'testskjema ' }} />);
        expect(push.calledOnce).to.equal(false);
        expect(push.calledWith({})).to.equal(false);
    });

    it('Skal inneholde en Periode per periode ', () => {
        fields = [{}, {}];
        const compo = shallow(<PeriodelisteComponent fields={fields} meta={{ form: 'testskjema ' }} />);
        expect(compo.find(Periode)).to.have.length(2);
    });
});
