import chai from 'chai';
import React from 'react'
import {shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { Field, FieldArray } from 'redux-form';
import { FeriePermisjonEllerUtenlandsoppholdComp, RendreFeriePermisjonEllerUtenlandsopphold, mapStateToProps } from '../../../../js/components/sykepengesoknad/FravaerOgFriskmelding/FeriePermisjonEllerUtenlandsopphold';
import SoktOmSykepenger from '../../../../js/components/sykepengesoknad/FravaerOgFriskmelding/SoktOmSykepengerIUtenlandsopphold';
import JaEllerNei, { parseJaEllerNei } from '../../../../js/components/sykepengesoknad/JaEllerNei';
import { getSoknad } from '../../../mockSoknader';
import { ledetekster } from '../../../mockLedetekster';
import Checkbox from '../../../../js/components/skjema/Checkbox';
import Periodevelger from '../../../../js/components/skjema/datovelger/Periodevelger';
import Radioknapper from '../../../../js/components/skjema/Radioknapper';
import { setLedetekster } from 'digisyfo-npm';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("FeriePermisjonEllerUtenlandsopphold", () => {

  let _ledetekster;
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

    compo = shallow(<FeriePermisjonEllerUtenlandsoppholdComp sykepengesoknad={getSoknad()} />);
  });

  it("Skal inneholde en JaEllerNei med riktig name", () => {
    compo = shallow(<FeriePermisjonEllerUtenlandsoppholdComp sykepengesoknad={getSoknad()} />);
    expect(compo.find(JaEllerNei)).to.have.length(1);
    expect(compo.find(JaEllerNei).prop("name")).to.equal("harHattFeriePermisjonEllerUtenlandsopphold")
  });

  it("Skal vise riktig spørsmål", () => {
    compo = shallow(<FeriePermisjonEllerUtenlandsoppholdComp sykepengesoknad={getSoknad({
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

  it("Skal vise riktig spørsmål dersom forrigeSykeforloepTom er satt og del er 1", () => {
    const soknad = getSoknad({
      forrigeSykeforloepTom: "2016-12-22",
      del: 1,
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
    compo = shallow(<FeriePermisjonEllerUtenlandsoppholdComp sykepengesoknad={soknad} />);
    expect(compo.find(JaEllerNei).prop("spoersmal")).to.equal("Har du hatt ferie, permisjon eller oppholdt deg i utlandet i perioden 22.12.2016 – 30.01.2017?");
  });

  it("Skal vise riktig spørsmål dersom forrigeSykeforloepTom er satt og forrigeSendteSoknadTom er satt", () => {
    const soknad = getSoknad({
      forrigeSykeforloepTom: "2016-12-22",
      forrigeSendteSoknadTom: "2016-12-31",
      del: 2,
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
    compo = shallow(<FeriePermisjonEllerUtenlandsoppholdComp sykepengesoknad={soknad} />);
    expect(compo.find(JaEllerNei).prop("spoersmal")).to.equal("Har du hatt ferie, permisjon eller oppholdt deg i utlandet i perioden 01.01.2017 – 30.01.2017?");
  });

  it("Skal bruke FOM i søknaden om forrigeSendteSoknadTom er nærmere i tid enn forrigeSykeforloepTom", () => {
    const soknad = getSoknad({
        forrigeSykeforloepTom: "2016-11-01",
        forrigeSendteSoknadTom: "2016-12-28",
        del: 1,
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
      compo = shallow(<FeriePermisjonEllerUtenlandsoppholdComp sykepengesoknad={soknad} />);
      expect(compo.find(JaEllerNei).prop("spoersmal")).to.equal("Har du hatt ferie, permisjon eller oppholdt deg i utlandet i perioden 01.01.2017 – 30.01.2017?");
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
    compo = shallow(<FeriePermisjonEllerUtenlandsoppholdComp sykepengesoknad={getSoknad()} ledetekster={_ledetekster} gjenopptattArbeidFulltUtDato={gjenopptattArbeidFulltUtDato} />);
    expect(compo.find(FieldArray).prop("senesteTom")).to.deep.equal(new Date("2017-12-22"));
  });

  it("Skal inneholde et FieldArray med senesteTom === gjenopptattArbeidFulltUtDato hvis gjenopptattArbeidFulltUtDato er en dato som er samme dag som tidligsteFom", () => {
    const gjenopptattArbeidFulltUtDato = new Date("2017-01-01");
    compo = shallow(<FeriePermisjonEllerUtenlandsoppholdComp sykepengesoknad={getSoknad()} ledetekster={_ledetekster} gjenopptattArbeidFulltUtDato={gjenopptattArbeidFulltUtDato} />);
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

  });

});