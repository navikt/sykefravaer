import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
const expect = chai.expect;

import { FeriePermisjonEllerUtenlandsopphold, RendreFeriePermisjonEllerUtenlandsopphold, SoktOmSykepenger, mapStateToProps } from '../../../../js/components/sykepengesoknad/FravaerOgFriskmelding/FeriePermisjonEllerUtenlandsopphold';
import JaEllerNei, { parseJaEllerNei } from '../../../../js/components/sykepengesoknad/JaEllerNei';
import { getSoknad } from '../../../mockSoknader';
import { ledetekster } from '../../../mockLedetekster';
import { Field, FieldArray } from 'redux-form';
import Checkbox from '../../../../js/components/skjema/Checkbox';
import Periodevelger from '../../../../js/components/skjema/Periodevelger';
import Radioknapper from '../../../../js/components/skjema/Radioknapper';
import { setLedetekster } from 'digisyfo-npm';


describe("FeriePermisjonEllerUtenlandsopphold", () => {

  let _ledetekster;
  let getSykepengesoknad;
  let compo;

  beforeEach(() => {
    _ledetekster = Object.assign({}, ledetekster, {
      'sykepengesoknad.ferie-permisjon-utenlandsopphold.janei.sporsmal': "Har du hatt ferie, permisjon eller oppholdt deg i utlandet i perioden %FOM% – %TOM%?",
      'sykepengesoknad.ferie-permisjon-utenlandsopphold.jeg-har': "Jeg har...",
      'sykepengesoknad.ferie-permisjon-utenlandsopphold.tatt-ut-ferie': "tatt ut ferie",
      'sykepengesoknad.ferie-permisjon-utenlandsopphold.hatt-permisjon': "hatt permisjon",
      'sykepengesoknad.ferie-permisjon-utenlandsopphold.oppholdt-meg-utenfor-norge': 'oppholdt meg utenfor Norge',
      'sykepengesoknad.ferie-permisjon-utenlandsopphold.sokt-om-sykepenger.sporsmal': 'Har du søkt om å beholde sykepenger under dette oppholdet utenfor Norge?',
      'sykepengesoknad.ferie-permisjon-utenlandsopphold.presisering-sykepenger-utlandet': 'Som hovedregel kan du bare få sykepenger når du oppholder deg i Norge. Du kan søke om å beholde sykepenger i en kort periode ved opphold utenfor Norge.'
    });
    setLedetekster(_ledetekster);

    compo = shallow(<FeriePermisjonEllerUtenlandsopphold sykepengesoknad={getSoknad()} />);
  });

  it("Skal inneholde en JaEllerNei med riktig name", () => {
    compo = shallow(<FeriePermisjonEllerUtenlandsopphold sykepengesoknad={getSoknad()} />);
    expect(compo.find(JaEllerNei)).to.have.length(1);
    expect(compo.find(JaEllerNei).prop("name")).to.equal("harHattFeriePermisjonEllerUtenlandsopphold")
  });

  it("Skal vise riktig spørsmål", () => {
    compo = shallow(<FeriePermisjonEllerUtenlandsopphold sykepengesoknad={getSoknad({
      aktiviteter: [{
        "periode": {
          "fom": "2017-01-01",
          "tom": "2017-01-15"
        },
        "grad": 100,
        "avvik": null
      }, {
        "periode": {
          "fom": "2017-01-16",
          "tom": "2017-01-30"
        },
        "grad": 50,
        "avvik": null
      }]
    })} />);
    expect(compo.find(JaEllerNei).prop("spoersmal")).to.equal("Har du hatt ferie, permisjon eller oppholdt deg i utlandet i perioden 01.01.2017 – 30.01.2017?");
  });

  it.only("Skal vise riktig spørsmål dersom forrigeSykeforloepTom er satt", () => {
    const soknad = getSoknad({
      forrigeSykeforloepTom: "2016-12-22",
      aktiviteter: [{
        "periode": {
          "fom": "2017-01-01",
          "tom": "2017-01-15"
        },
        "grad": 100,
        "avvik": null
      }, {
        "periode": {
          "fom": "2017-01-16",
          "tom": "2017-01-30"
        },
        "grad": 50,
        "avvik": null
      }]
    });
    compo = shallow(<FeriePermisjonEllerUtenlandsopphold sykepengesoknad={soknad} />);
    expect(compo.find(JaEllerNei).prop("spoersmal")).to.equal("Har du hatt ferie, permisjon eller oppholdt deg i utlandet i perioden 22.12.2016 – 30.01.2017?");
  });

  it("Skal inneholde et FieldArray", () => {
    const array = compo.find(FieldArray)
    expect(array.prop("component")).to.deep.equal(RendreFeriePermisjonEllerUtenlandsopphold);
    expect(array.prop("name")).to.equal("feriePermisjonEllerUtenlandsopphold");
    expect(array.prop("fields")).to.deep.equal(['ferie', 'permisjon', 'utenlandsopphold']);
    expect(array.prop("tidligsteFom")).to.deep.equal(new Date("2017-01-01"));
    expect(array.prop("senesteTom")).to.deep.equal(new Date("2017-01-25"));
  })

  it("Skal inneholde et FieldArray med senesteTom === gjenopptattArbeidFulltUtDato - 1 dag hvis gjenopptattArbeidFulltUtDato er en dato", () => {
    const gjenopptattArbeidFulltUtDato = new Date("2017-12-23");
    compo = shallow(<FeriePermisjonEllerUtenlandsopphold sykepengesoknad={getSoknad()} ledetekster={_ledetekster} gjenopptattArbeidFulltUtDato={gjenopptattArbeidFulltUtDato} />);
    expect(compo.find(FieldArray).prop("senesteTom")).to.deep.equal(new Date("2017-12-22"));
  });

  it("Skal inneholde et FieldArray med senesteTom === gjenopptattArbeidFulltUtDato hvis gjenopptattArbeidFulltUtDato er en dato som er samme dag som tidligsteFom", () => {
    const gjenopptattArbeidFulltUtDato = new Date("2017-01-01");
    compo = shallow(<FeriePermisjonEllerUtenlandsopphold sykepengesoknad={getSoknad()} ledetekster={_ledetekster} gjenopptattArbeidFulltUtDato={gjenopptattArbeidFulltUtDato} />);
    expect(compo.find(FieldArray).prop("senesteTom")).to.deep.equal(new Date("2017-01-01"));
  });

  describe("RendreFeriePermisjonEllerUtenlandsopphold", () => {
    let component; 
    let tidligsteFom;
    let senesteTom;

    beforeEach(() => {
      const meta = {
        error: "Feilmelding",
        touched: false,
      }
      const fields = ['ferie', 'permisjon', 'utenlandsopphold'];
      tidligsteFom = new Date("2017-01-10");
      senesteTom = new Date("2017-01-20");
      component = shallow(<RendreFeriePermisjonEllerUtenlandsopphold fields={fields} meta={meta} tidligsteFom={tidligsteFom} senesteTom={senesteTom} />);
    })

    it("Skal inneholde ett checkbox-Field med Peiodevelger per field", () => {
      expect(component.find(Field)).to.have.length(3);
      const names = ["harHattFerie", "harHattPermisjon", "harHattUtenlandsopphold"];
      for (let i = 0; i < 3; i++) {
        const c = component.find(Field).at(i);
        expect(c.prop("component")).to.deep.equal(Checkbox);
        expect(c.find(Periodevelger)).to.have.length(1);
        expect(c.prop("name")).to.equal(names[i]);
      }
    });

    it("Skal inneholde Periodevelger med riktig name, tidligsteFom og senesteTom", () => {
      const ferieCheckbox = component.find(Field).at(0);
      const permisjonCheckbox = component.find(Field).at(1);
      expect(ferieCheckbox.find(Periodevelger).prop("name")).to.equal("ferie");
      expect(permisjonCheckbox.find(Periodevelger).prop("tidligsteFom")).to.equal(tidligsteFom);
      expect(permisjonCheckbox.find(Periodevelger).prop("senesteTom")).to.equal(senesteTom);
    });

    describe("utenlandsopphold", () => {
      let utenlandsoppholdCheckbox; 
      beforeEach(() => {
        utenlandsoppholdCheckbox = component.find(Field).at(2);
      })

      it("Skal ha en periodevelger med riktig name, tidligsteFom og senesteTom", () => {
        expect(utenlandsoppholdCheckbox.find(Periodevelger).prop("name")).to.equal("utenlandsopphold.perioder");
        expect(utenlandsoppholdCheckbox.find(Periodevelger).prop("tidligsteFom")).to.equal(tidligsteFom);
        expect(utenlandsoppholdCheckbox.find(Periodevelger).prop("senesteTom")).to.equal(senesteTom);
      });

      it("Skal inneholde SoktOmSykepenger", () => {
        expect(utenlandsoppholdCheckbox.find(SoktOmSykepenger)).to.have.length(1);
      })

    });


    describe("SoktOmSykepenger", () => {
      let component; 
      let f;

      beforeEach(() => {
        component = shallow(<SoktOmSykepenger />)
        f = component.find(Field);
      })

      it("Skal inneholde et Field med riktig name og riktig component", () => {
        expect(f.prop("name")).to.equal("utenlandsopphold.soektOmSykepengerIPerioden");
        expect(f.prop("component")).to.deep.equal(Radioknapper);
        expect(f.prop("parse")).to.deep.equal(parseJaEllerNei);
      });

      it("Skal inneholde to input", () => {
        expect(f.find("input")).to.have.length(2);
        const ja = f.find("input").at(0);
        const nei = f.find("input").at(1);
        expect(ja.prop("value")).to.equal(true);
        expect(nei.prop("value")).to.equal(false)
      });

      it("Skal inneholde ja uten presisering og nei med presisering", () => {
        const ja = f.find("input").at(0);
        const nei = f.find("input").at(1);
        expect(ja.find(".js-presisering")).to.have.length(0);
        expect(nei.find(".js-presisering")).to.have.length(1);
      });

    });

  });

});