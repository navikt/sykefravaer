import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
const expect = chai.expect;

import FravaerOgFriskmelding from '../../../../js/components/sykepengesoknad/Oppsummering/FravaerOgFriskmelding';
import { soknad } from './soknad';

describe("Oppsummering - FravaerOgFriskmelding", () => {

    let component;
    let getSoknad = (_soknad) => {
      return Object.assign({}, soknad, _soknad);
    }

    it("Skal vise egenmeldingsdager hvis det er krysset av for egenmeldingsdager", () => {
      component = mount(<FravaerOgFriskmelding soknad={getSoknad({
        bruktEgenmeldingsdagerFoerLegemeldtFravaer: true
      })} />)
      const fragment = component.find(".js-egenmeldingsdager");
      expect(fragment.text()).to.contain("Brukte du egenmeldingsdager før du ble sykmeldt den 01.12.2016?");
      expect(fragment.text()).to.contain("Ja");
      expect(fragment.text()).to.contain("Fra 27.12.2016");
      expect(fragment.text()).to.contain("Til 31.12.2016");
    });

    it("Skal ikke vise egenmeldingsdager hvis det er krysset av for ikke egenmeldingsdager", () => {
      component = mount(<FravaerOgFriskmelding soknad={getSoknad({
        bruktEgenmeldingsdagerFoerLegemeldtFravaer: false,
      })} />)
      const fragment = component.find(".js-egenmeldingsdager");
      expect(fragment.text()).to.contain("Brukte du egenmeldingsdager før du ble sykmeldt den 01.12.2016?");
      expect(fragment.text()).to.contain("Nei");
      expect(fragment.text()).not.to.contain("Fra 27.12.2016");
      expect(fragment.text()).not.to.contain("Til 31.12.2016");
    });

    it("Skal vise gjenopptatt arbeid fullt ut", () => {
      component = mount(<FravaerOgFriskmelding soknad={getSoknad({
        harGjenopptattArbeidFulltUt: true,
      })} />);
      const fragment = component.find(".js-gjenopptattArbeid");
      expect(fragment.text()).to.contain("Har du gjenopptatt arbeidet ditt hos SOLSTRÅLEN BARNEHAGE fullt ut?");
      expect(fragment.text()).to.contain("Ja");
      expect(fragment.text()).to.contain("Den 15.01.2017")    
    });

    it("Skal vise gjenopptatt arbeid fullt ut dersom det er krysset av for nei", () => {
      component = mount(<FravaerOgFriskmelding soknad={getSoknad({
        harGjenopptattArbeidFulltUt: false,
      })} />);
      const fragment = component.find(".js-gjenopptattArbeid");
      expect(fragment.text()).to.contain("Har du gjenopptatt arbeidet ditt hos SOLSTRÅLEN BARNEHAGE fullt ut?");
      expect(fragment.text()).to.contain("Nei");
      expect(fragment.text()).not.to.contain("Den 15.01.2017")    
    });

    describe("Ferie, permisjon eller utenlandsopphold", () => {

      let getFragment;

      beforeEach(() => {
        getFragment = (soknad = {}) => {
          const c = mount(<FravaerOgFriskmelding soknad={getSoknad(soknad)} />);
          return c.find(".js-feriePermisjonUtenlandsopphold");
        }
      })

      describe("Dersom svaret er nei", () => {
        let fragment; 

        beforeEach(() => {
          fragment = getFragment({
            harHattFeriePermisjonEllerUtenlandsopphold: false,
          })
        });

        it("Skal vise ferie, permisjon eller utenlandsopphold", () => {
          expect(fragment.text()).to.contain("Har du hatt ferie, permisjon eller oppholdt deg i utlandet i perioden 01.01.2017 - 31.01.2017?");
          expect(fragment.text()).to.contain("Nei");
        });

      })

      describe("Dersom svaret er ja", () => {

        let fragment;

        beforeEach(() => {
          fragment = getFragment({
            harHattFeriePermisjonEllerUtenlandsopphold: true,
          })
        })
        
        it("Skal vise ferie, permisjon eller utenlandsopphold", () => {
          expect(fragment.text()).to.contain("Har du hatt ferie, permisjon eller oppholdt deg i utlandet i perioden 01.01.2017 - 31.01.2017?");
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
            "ferie": {
              "avkrysset": true,
              "perioder": [{
                "fom": "12.01.2017",
                "tom": "15.01.2017"
              }]
            }
          });
        });

        it("Skal vise informasjon om ferien", () => {
          expect(fragment.text()).to.contain("tatt ut ferie");
          expect(fragment.text()).to.contain("Fra 12.01.2017");
          expect(fragment.text()).to.contain("Til 15.01.2017");
        });

      });

      describe("Dersom svaret er ja og man har hatt permisjon", () => {

        let fragment;

        beforeEach(() => {
          fragment = getFragment({
            "harHattFeriePermisjonEllerUtenlandsopphold": true,
            "permisjon": {
              "avkrysset": true,
              "perioder": [{
                "fom": "12.01.2017",
                "tom": "15.01.2017"
              }]
            }
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
            "utenlandsoppholdSoktOmSykepenger": false,
            "utenlandsopphold": {
              "avkrysset": true,
              "perioder": [{
                "fom": "12.01.2017",
                "tom": "15.01.2017"
              }]
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

})