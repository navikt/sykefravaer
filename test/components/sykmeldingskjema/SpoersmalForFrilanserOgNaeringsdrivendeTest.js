import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { Field } from 'redux-form';
import { setLedetekster } from '@navikt/digisyfo-npm';
import JaEllerNei from '../../../js/components/sykepengesoknad-arbeidstaker/JaEllerNei';
import Periodevelger from '../../../js/components/skjema/datovelger/Periodevelger';
import { Spoersmal, Egenmeldingssporsmal, Forsikringssporsmal } from '../../../js/components/sykmeldingskjema/SpoersmalForFrilanserOgNaeringsdrivende';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('SpoersmalForFrilanserOgNaeringsdrivende', () => {
    it('Skal inneholde et Egenmeldingssporsmal', () => {
        const component = shallow(<Spoersmal />);
        expect(component.find(Egenmeldingssporsmal)).to.have.length(1);
    });

    it('Skal inneholde et Forsikringssporsmal', () => {
        const component = shallow(<Spoersmal />);
        expect(component.find(Forsikringssporsmal)).to.have.length(1);
    });

    describe('Egenmeldingssporsmal', () => {
        it('Skal inneholde en JaEllerNei med riktig spørsmål', () => {
            setLedetekster({
                // eslint-disable-next-line max-len
                'din-sykmelding.egenmeldingsperioder.janei.sporsmal': 'Vi har registrert at du ble sykmeldt %DATO%. Brukte du egenmelding eller noen annen sykmelding før denne datoen?',
            });
            const component = shallow(<Egenmeldingssporsmal oppfolgingstilfelleStartdato={new Date('2017-02-14')} />);
            expect(component.find(JaEllerNei).prop('spoersmal'))
                .to.equal('Vi har registrert at du ble sykmeldt 14. februar 2017. Brukte du egenmelding eller noen annen sykmelding før denne datoen?');
            expect(component.find(JaEllerNei).prop('name')).to.equal('harAnnetFravaer');
        });

        it('Skal inneholde en Periodevelger med riktige props', () => {
            setLedetekster({
                'din-sykmelding.egenmeldingsperioder.perioder.sporsmal': 'Hvilke dager var du borte fra jobb før %DATO%?',
            });
            const component = shallow(<Egenmeldingssporsmal oppfolgingstilfelleStartdato={new Date('2017-02-14')} />);
            const periodevelger = component.find(JaEllerNei).find(Periodevelger);
            expect(periodevelger.prop('spoersmal')).to.equal('Hvilke dager var du borte fra jobb før 14. februar 2017?');
            expect(periodevelger.prop('name')).to.equal('fravaersperioder');
            expect(periodevelger.prop('senesteTom').getTime()).to.equal(new Date('2017-02-13').getTime());
        });
    });

    describe('Forsikringssporsmal', () => {
        it('Skal inneholde en JaEllerNei med riktig spørsmål', () => {
            setLedetekster({
                'din-sykmelding.forsikring.janei.sporsmal': 'Har du forsikring som gjelder de første 16 dagene av sykefraværet?',
            });
            const component = shallow(<Forsikringssporsmal />);
            expect(component.find(Field).prop('spoersmal')).to.equal('Har du forsikring som gjelder de første 16 dagene av sykefraværet?');
            expect(component.find(Field).prop('name')).to.equal('harForsikring');
        });
    });
});
