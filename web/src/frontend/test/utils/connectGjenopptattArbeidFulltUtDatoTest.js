import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
const expect = chai.expect;

import { mapStateToProps } from '../../js/utils/connectGjenopptattArbeidFulltUtDato';

describe("mapStateToProps", () => {

  let state; 

  beforeEach(() => {
    state = {
      form: {
        SYKEPENGERSKJEMA: {
          values: {
            harGjenopptattArbeidFulltUt: true,
          }
        }
      }
    };
  });

  it("Skal returnere null hvis harGjenopptattArbeidFulltUt er false og gjenopptattArbeidFulltUtDato er riktig fylt ut", () => {
    state.form.SYKEPENGERSKJEMA.values.harGjenopptattArbeidFulltUt = false;
    state.form.SYKEPENGERSKJEMA.values.gjenopptattArbeidFulltUtDato = "20.02.2017";
    const props = mapStateToProps(state);
    expect(props.gjenopptattArbeidFulltUtDato).to.be.null;
  })

  it("Skal returnere gjenopptattArbeidFulltUtDato = null hvis gjenopptattArbeidFulltUtDato ikke er fylt ut", () => {
    const props = mapStateToProps(state);
    expect(props.gjenopptattArbeidFulltUtDato).to.be.null;
  });

  it("Skal returnere gjenopptattArbeidFulltUtDato = null hvis gjenopptattArbeidFulltUtDato er noe ugyldig (1)", () => {
    state.form.SYKEPENGERSKJEMA.values.gjenopptattArbeidFulltUtDato = "02.02"
    const props = mapStateToProps(state);
    expect(props.gjenopptattArbeidFulltUtDato).to.be.null;
  });

  it("Skal returnere gjenopptattArbeidFulltUtDato = null hvis gjenopptattArbeidFulltUtDato er en ugyldig streng", () => {
    state.form.SYKEPENGERSKJEMA.values.gjenopptattArbeidFulltUtDato = "0_.__.____"
    const props = mapStateToProps(state);
    expect(props.gjenopptattArbeidFulltUtDato).to.be.null;
  });

  it("Skal returnere gjenopptattArbeidFulltUtDato = null hvis gjenopptattArbeidFulltUtDato er noe gyldig", () => {
    state.form.SYKEPENGERSKJEMA.values.gjenopptattArbeidFulltUtDato = "23.12.2017";
    const props = mapStateToProps(state);
    expect(props.gjenopptattArbeidFulltUtDato).to.deep.equal(new Date("2017-12-23"));
  });

}); 