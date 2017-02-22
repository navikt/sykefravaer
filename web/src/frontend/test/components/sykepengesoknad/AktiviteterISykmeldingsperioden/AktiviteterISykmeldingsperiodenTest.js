import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';

chai.use(chaiEnzyme());
const expect = chai.expect;

import { AktiviteterISykmeldingsperioden, UtdanningStartDato } from '../../../../js/components/sykepengesoknad/AktiviteterISykmeldingsperioden/AktiviteterISykmeldingsperioden';
import { Field, FieldArray } from 'redux-form';
import Aktiviteter from '../../../../js/components/sykepengesoknad/AktiviteterISykmeldingsperioden/Aktiviteter';
import JaEllerNei, { JaEllerNeiRadioknapper, parseJaEllerNei } from '../../../../js/components/sykepengesoknad/JaEllerNei';
import AndreInntektskilder from '../../../../js/components/sykepengesoknad/AktiviteterISykmeldingsperioden/AndreInntektskilder';
import Datovelger from '../../../../js/components/skjema/Datovelger';
import { Link } from 'react-router';
import ledetekster from '../../../mockLedetekster';

import { getSoknad } from '../../../mockSoknader';

describe("AktiviteterISykmeldingsperioden", () => {

    let sykepengesoknad = getSoknad({
        id: "min-soknad"
    });
    let handleSubmit;
    let component;
    let untouch;
    let autofill;

    beforeEach(() => {
        handleSubmit = sinon.spy();
        autofill = sinon.spy();
        untouch = sinon.spy();
        component = shallow(<AktiviteterISykmeldingsperioden
            ledetekster={ledetekster}
            sykepengesoknad={sykepengesoknad}
            handleSubmit={handleSubmit}
            autofill={autofill}
            untouch={untouch} />)
    });

    it("Skal inneholde et FieldArray for aktiviteter", () => {
        const arr = component.find(FieldArray);
        expect(arr.prop("component")).to.deep.equal(Aktiviteter);
        expect(arr.prop("fields")).to.deep.equal(sykepengesoknad.aktiviteter);
        expect(arr.prop("name")).to.equal("aktiviteter");
        expect(arr.prop("ledetekster")).to.deep.equal(ledetekster);
        expect(arr.prop("arbeidsgiver")).to.equal("BYGGMESTER BLOM AS")
        expect(arr.prop("autofill")).to.deep.equal(autofill);
        expect(arr.prop("untouch")).to.deep.equal(untouch);
    });

    it("Skal inneholde JaEllerNei med name=harAndreInntektskilder", () => {
        const jaEllerNei = component.find(JaEllerNei).first();
        expect(jaEllerNei.prop("name")).to.equal("harAndreInntektskilder");
        expect(jaEllerNei.find(AndreInntektskilder)).to.have.length(1)
    });

    it("Skal inneholde JaEllerNei med name=utdanning.underUtdanningISykmeldingsperioden", () => {
        const jaEllerNei = component.find(JaEllerNei).last();
        expect(jaEllerNei.prop("name")).to.equal("utdanning.underUtdanningISykmeldingsperioden");
        expect(jaEllerNei.prop("spoersmal")).to.equal("Har du vært under utdanning i løpet av perioden 01.01.2017 - 25.01.2017?")

        const startdato = jaEllerNei.find(UtdanningStartDato);
        expect(startdato).to.have.length(1);

        const fulltidField = jaEllerNei.find(Field);
        expect(fulltidField).to.have.length(1);
        expect(fulltidField.prop("name")).to.equal("utdanning.erUtdanningFulltidsstudium");
    });

    it("Skal inneholde spørsmål om utdanningen er et fulltidsstudium", () => {
        const jaEllerNei = component.find(JaEllerNei).last();
        expect(component.contains(<Field
            component={JaEllerNeiRadioknapper}
            name="utdanning.erUtdanningFulltidsstudium"
            parse={parseJaEllerNei}
            spoersmal="Er utdanningen et fulltidsstudium?"
            Overskrift="h4" />)).to.be.true;
    });

    it("Skal inneholde en Link til forrige side", () => {
        expect(component.find(Link).prop("to")).to.equal("/sykefravaer/soknader/min-soknad/fravaer-og-friskmelding")
    })

    describe("UtdanningStartDato", () => {

        let datovelger;
        let component;
        let tidligsteFom;
        let senesteTom;

        beforeEach(() =>  {
            tidligsteFom = new Date("2017-01-20");
            senesteTom = new Date("2017-01-30");
            component = shallow(<UtdanningStartDato ledetekster={ledetekster} tidligsteFom={tidligsteFom} senesteTom={senesteTom} />)
        });

        it("Skal inneholde Datovelger med tidligsteFom og senesteTom", () => {
            datovelger = component.find(Datovelger);
            expect(datovelger).to.have.length(1);
            expect(datovelger.prop("name")).to.equal("utdanning.utdanningStartdato");
            expect(datovelger.prop("tidligsteFom")).to.equal(tidligsteFom);
            expect(datovelger.prop("senesteTom")).to.equal(senesteTom);
        });

        it("Skal inneholde label med riktig spørsmål", () => {
            expect(component.find("label").text()).to.equal("Når startet du på utdanningen?")
        });

    });

});
