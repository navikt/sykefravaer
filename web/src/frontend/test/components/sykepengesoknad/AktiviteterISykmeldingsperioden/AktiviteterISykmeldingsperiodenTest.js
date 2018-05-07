import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import { Field, FieldArray } from 'redux-form';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import { Link } from 'react-router';
import { setLedetekster } from 'digisyfo-npm';
import {
    AktiviteterISykmeldingsperiodenSkjema,
    UtdanningStartDato,
} from '../../../../js/components/sykepengesoknad/AktiviteterISykmeldingsperioden/AktiviteterISykmeldingsperioden';
import Aktiviteter from '../../../../js/components/sykepengesoknad/AktiviteterISykmeldingsperioden/Aktiviteter';
import JaEllerNei, { JaEllerNeiRadioknapper, parseJaEllerNei } from '../../../../js/components/sykepengesoknad/JaEllerNei';
import AndreInntektskilder from '../../../../js/components/sykepengesoknad/AktiviteterISykmeldingsperioden/AndreInntektskilder';
import Datovelger from '../../../../js/components/skjema/datovelger/Datovelger';
import ledetekster from '../../../mockLedetekster';
import AvbrytSoknadContainer from '../../../../js/containers/sykepengesoknad/AvbrytSoknadContainer';
import { getSoknad } from '../../../mockSoknader';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('AktiviteterISykmeldingsperioden', () => {
    const sykepengesoknad = getSoknad({
        id: 'min-soknad',
    });
    let handleSubmit;
    let component;
    let untouch;
    let autofill;

    beforeEach(() => {
        handleSubmit = sinon.spy();
        autofill = sinon.spy();
        untouch = sinon.spy();
        setLedetekster(ledetekster);
        component = shallow(<AktiviteterISykmeldingsperiodenSkjema
            sykepengesoknad={sykepengesoknad}
            handleSubmit={handleSubmit}
            autofill={autofill}
            untouch={untouch} />);
    });

    it('Skal inneholde et FieldArray for aktiviteter', () => {
        const arr = component.find(FieldArray);
        expect(arr.prop('component')).to.deep.equal(Aktiviteter);
        expect(arr.prop('fields')).to.deep.equal(sykepengesoknad.aktiviteter);
        expect(arr.prop('name')).to.equal('aktiviteter');
        expect(arr.prop('arbeidsgiver')).to.equal('BYGGMESTER BLOM AS');
        expect(arr.prop('autofill')).to.deep.equal(autofill);
        expect(arr.prop('untouch')).to.deep.equal(untouch);
    });

    it('Skal inneholde JaEllerNei med name=harAndreInntektskilder', () => {
        const jaEllerNei = component.find(JaEllerNei).first();
        expect(jaEllerNei.prop('name')).to.equal('harAndreInntektskilder');
        expect(jaEllerNei.find(AndreInntektskilder)).to.have.length(1);
    });

    it('Skal inneholde JaEllerNei med name=utdanning.underUtdanningISykmeldingsperioden', () => {
        const jaEllerNei = component.find(JaEllerNei).last();
        expect(jaEllerNei.prop('name')).to.equal('utdanning.underUtdanningISykmeldingsperioden');
        expect(jaEllerNei.prop('spoersmal')).to.equal('Har du vært under utdanning i løpet av perioden 01.01.2017 - 25.01.2017?');

        const startdato = jaEllerNei.find(UtdanningStartDato);
        expect(startdato).to.have.length(1);
        expect(startdato.prop('senesteTom')).to.deep.equal(new Date('2017-01-25'));

        const fulltidField = jaEllerNei.find(Field);
        expect(fulltidField).to.have.length(1);
        expect(fulltidField.prop('name')).to.equal('utdanning.erUtdanningFulltidsstudium');
    });

    it('Skal inneholde JaEllerNei for utdanning med riktig dato dersom gjenopptattArbeidFulltUtDato er oppgitt', () => {
        const dato = new Date('2017-01-23');
        component = shallow(<AktiviteterISykmeldingsperiodenSkjema
            gjenopptattArbeidFulltUtDato={dato}
            sykepengesoknad={sykepengesoknad}
            handleSubmit={handleSubmit}
            autofill={autofill}
            untouch={untouch} />);
        const jaEllerNei = component.find(JaEllerNei).last();
        expect(jaEllerNei.prop('name')).to.equal('utdanning.underUtdanningISykmeldingsperioden');
        expect(jaEllerNei.prop('spoersmal')).to.equal('Har du vært under utdanning i løpet av perioden 01.01.2017 - 22.01.2017?');
    });

    it('Skal ikke inneholde JaEllerNei for utdanning med riktig dato dersom gjenopptattArbeidFulltUtDato er oppgitt som samme dag som tidligsteFom', () => {
        const dato = new Date('2017-01-01');
        component = shallow(<AktiviteterISykmeldingsperiodenSkjema
            gjenopptattArbeidFulltUtDato={dato}
            sykepengesoknad={sykepengesoknad}
            handleSubmit={handleSubmit}
            autofill={autofill}
            untouch={untouch} />);
        const jaEllerNei = component.find(JaEllerNei).last();
        expect(jaEllerNei.prop('name')).not.to.equal('utdanning.underUtdanningISykmeldingsperioden');
    });

    it('Skal sette senesteTom til gjenopptattArbeidFulltUtDato - 1 dag hvis gjenopptattArbeidFulltUtDato er oppgitt', () => {
        const dato = new Date('2017-01-20');
        component = shallow(<AktiviteterISykmeldingsperiodenSkjema
            ledetekster={ledetekster}
            sykepengesoknad={sykepengesoknad}
            handleSubmit={handleSubmit}
            gjenopptattArbeidFulltUtDato={dato}
            autofill={autofill}
            untouch={untouch} />);
        expect(component.find(UtdanningStartDato).prop('senesteTom')).to.deep.equal(new Date('2017-01-19'));
    });

    it('Skal sette fjerne utdanningsspørsmålet om gjenopptattArbeidFulltUtDato er oppgitt som samme dato som tidligsteFom', () => {
        const dato = new Date('2017-01-01');
        component = shallow(<AktiviteterISykmeldingsperiodenSkjema
            ledetekster={ledetekster}
            sykepengesoknad={sykepengesoknad}
            handleSubmit={handleSubmit}
            gjenopptattArbeidFulltUtDato={dato}
            autofill={autofill}
            untouch={untouch} />);
        expect(component.find(UtdanningStartDato)).to.be.length(0);
    });

    it('Skal inneholde spørsmål om utdanningen er et fulltidsstudium', () => {
        expect(component.contains(<Field
            component={JaEllerNeiRadioknapper}
            name="utdanning.erUtdanningFulltidsstudium"
            parse={parseJaEllerNei}
            spoersmal="Er utdanningen et fulltidsstudium?"
            Overskrift="h4" />)).to.equal(true);
    });

    it('Skal inneholde en Link til forrige side', () => {
        expect(component.find(Link).prop('to')).to.equal('/sykefravaer/soknader/min-soknad/fravaer-og-friskmelding');
    });

    it('Skal inneholde en AvbrytSoknadContainer', () => {
        expect(component.contains(<AvbrytSoknadContainer sykepengesoknad={sykepengesoknad} />)).to.equal(true);
    });

    describe('UtdanningStartDato', () => {
        let datovelger;
        let senesteTom;

        beforeEach(() => {
            senesteTom = new Date('2017-01-30');
            component = shallow(<UtdanningStartDato senesteTom={senesteTom} />);
        });

        it('Skal inneholde Datovelger uten tidligsteFom men med senesteTom', () => {
            datovelger = component.find(Datovelger);
            expect(datovelger).to.have.length(1);
            expect(datovelger.prop('name')).to.equal('utdanning.utdanningStartdato');
            expect(datovelger.prop('tidligsteFom')).to.equal(undefined);
            expect(datovelger.prop('senesteTom')).to.equal(senesteTom);
        });

        it('Skal inneholde label med riktig spørsmål', () => {
            expect(component.find('label').text()).to.equal('Når startet du på utdanningen?');
        });
    });
});
