import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
const expect = chai.expect;

import FravaerOgFriskmelding, { FeriePermisjonEllerUtenlandsopphold } from '../../../../js/components/sykepengesoknad/Oppsummering/FravaerOgFriskmelding';
import { getSoknad } from '../../../mockSoknader';

describe("Oppsummering - FravaerOgFriskmelding -", () => {

    let component;

    it("Skal vise egenmeldingsdager hvis det er krysset av for egenmeldingsdager", () => {
      const soknad = getSoknad({
        egenmeldingsperioder: [{
            fom: "2016-12-27",
            tom: "2016-12-31"
        }]
      });
      component = mount(<FravaerOgFriskmelding sykepengesoknad={soknad} />);
      const fragment = component.find(".js-egenmeldingsdager");
      expect(fragment.text()).to.contain("Brukte du egenmeldingsdager før du ble sykmeldt den 15.07.2016?");
      expect(fragment.text()).to.contain("Ja");
      expect(fragment.text()).to.contain("Fra 27.12.2016");
      expect(fragment.text()).to.contain("Til 31.12.2016");
      expect(fragment.find(".js-perioder")).to.have.length(1);
    });

    it("Skal ikke vise egenmeldingsdager hvis det ikke er krysset av for egenmeldingsdager", () => {
      component = mount(<FravaerOgFriskmelding sykepengesoknad={getSoknad({
        egenmeldingsperioder: []
      })} />)
      const fragment = component.find(".js-egenmeldingsdager");
      expect(fragment.text()).to.contain("Brukte du egenmeldingsdager før du ble sykmeldt den 15.07.2016?");
      expect(fragment.text()).to.contain("Nei");
      expect(fragment.find(".js-perioder")).to.have.length(0);
    });

    it("Skal vise gjenopptatt arbeid fullt ut", () => {
      const soknad = getSoknad({
        gjenopptattArbeidFulltUtDato: "2017-01-15"
      });
      component = mount(<FravaerOgFriskmelding sykepengesoknad={soknad} />);
      const fragment = component.find(".js-gjenopptattArbeid");
      expect(fragment.text()).to.contain("Har du gjenopptatt arbeidet ditt hos BYGGMESTER BLOM AS fullt ut?");
      expect(fragment.text()).to.contain("Ja");
      expect(fragment.text()).to.contain("Den 15.01.2017")    
    });

    it("Skal vise gjenopptatt arbeid fullt ut dersom det er krysset av for nei", () => {
      component = mount(<FravaerOgFriskmelding sykepengesoknad={getSoknad({
        gjenopptattArbeidFulltUtDato: null,
      })} />);
      const fragment = component.find(".js-gjenopptattArbeid");
      expect(fragment.text()).to.contain("Har du gjenopptatt arbeidet ditt hos BYGGMESTER BLOM AS fullt ut?");
      expect(fragment.text()).to.contain("Nei");
      expect(fragment.text()).not.to.contain("Den 15.01.2017")    
    });

    describe("Ferie, permisjon eller utenlandsopphold", () => {

      let getFragment;

      beforeEach(() => {
        getFragment = (soknad = {}) => {
          return mount(<FeriePermisjonEllerUtenlandsopphold sykepengesoknad={getSoknad(soknad)} />);
        }
      })

      it("Skal vise riktig spørsmål", () => {

      })

      describe("Dersom svaret er nei pga tomme array", () => {
        let fragment; 

        beforeEach(() => {
          fragment = getFragment({
            ferie: [],
            permisjon: [],
            utenlandsopphold: null
          })
        });

        it("Skal vise ferie, permisjon eller utenlandsopphold", () => {
          expect(fragment.text()).to.contain("Har du hatt ferie, permisjon eller oppholdt deg i utlandet i perioden 01.01.2017 - 25.01.2017?");
          expect(fragment.text()).to.contain("Nei");
        });

      });

      describe("Dersom svaret er ja", () => {

        let fragment;

        beforeEach(() => {
          fragment = getFragment({
            ferie: [{
              fom: "2017-01-02",
              tom: "2017-01-10"
            }]
          })
        })
        
        it("Skal vise ferie, permisjon eller utenlandsopphold", () => {
          expect(fragment.text()).to.contain("Har du hatt ferie, permisjon eller oppholdt deg i utlandet i perioden 01.01.2017 - 25.01.2017?");
          expect(fragment.text()).to.contain("Ja");
        });

        it("Skal vise Jeg har ...", () => {
          expect(fragment.text()).to.contain("Jeg har ...")
        });

      });

      describe("Dersom svaret er ja og man har hatt ferie", () => {

        let fragment;

        beforeEach(() => {
          fragment = getFragment({
            "harHattFeriePermisjonEllerUtenlandsopphold": true,
            "ferie": [{
              fom: "2017-01-02",
              tom: "2017-01-10"
            }]
          });
        });

        it("Skal vise informasjon om ferien", () => {
          expect(fragment.text()).to.contain("tatt ut ferie");
          expect(fragment.text()).to.contain("Fra 02.01.2017");
          expect(fragment.text()).to.contain("Til 10.01.2017");
        });

      });

      describe("Dersom svaret er ja og man har hatt permisjon", () => {

        let fragment;

        beforeEach(() => {
          fragment = getFragment({
            "permisjon": [{
              fom: "2017-01-12",
              tom: "2017-01-15"
            }]
          });
        });

        it("Skal vise informasjon om permisjonen", () => {
          expect(fragment.text()).to.contain("hatt permisjon");
          expect(fragment.text()).to.contain("Fra 12.01.2017");
          expect(fragment.text()).to.contain("Til 15.01.2017");
        });

      });

      describe("Dersom svaret er ja og man har oppholdt seg utenfor Norge", () => {

        let fragment;

        beforeEach(() => {
          fragment = getFragment({
            "utenlandsopphold": {
              "perioder": [{
                fom: "2017-01-12",
                tom: "2017-01-15"
              }],
              "soektOmSykepengerIPerioden": false,
            }
          });
        });

        it("Skal vise informasjon om utenlandsoppholdet", () => {
          expect(fragment.text()).to.contain("oppholdt meg utenfor Norge");
          expect(fragment.text()).to.contain("Fra 12.01.2017");
          expect(fragment.text()).to.contain("Til 15.01.2017");
        });

        it("Skal vise spørsmål om man har søkt om sykepenger", () => {
          const subfragment = fragment.find(".js-utenlandsoppholdSoktOmSykepenger");
          expect(subfragment.text()).to.contain("Har du søkt om å beholde sykepenger under dette oppholdet utenfor Norge?");
          expect(subfragment.text()).to.contain("Nei");
        });

      });

    });

});