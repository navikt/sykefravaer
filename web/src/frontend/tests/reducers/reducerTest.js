import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import sykmeldinger from '../../js/reducers';

describe('sykmeldinger', () => {

  it('handles SET_SYKMELDINGER ', () => {
    const initialState = {};
    const action = {
      type: 'SET_SYKMELDINGER',
      sykmeldinger: [{
        pair: ['Trainspotting', '28 Days Later'], 
        tally: {Trainspotting: 1}
      }]
    };
    const nextState = sykmeldinger(initialState, action);

    expect(nextState).to.deep.equal([{ 
      pair: [ 'Trainspotting', '28 Days Later' ],
      tally: { Trainspotting: 1 }  
    }]);
  });

  it("handles ADD_SYKMELDING", () => {
    const initialState =[{ 
      id: 0, 
      title: "My first sickleave"
    }]; 
    const afterState = [{ 
      id: 0, 
      title: "My first sickleave"
    }, {
      id: 1,
      title: "My second sickleave"
    }];
    
    deepFreeze(initialState);

    const action = {
      type: "ADD_SYKMELDING",
      sykmelding: {
        id: 1,
        title: "My second sickleave"
      }
    };
    const nextState = sykmeldinger(initialState, action);

    expect(nextState).to.deep.equal(afterState);
  });

  it("handles BEKREFT_SYKMELDING", () => {
    const initialState = [{ 
      id: 0, 
      status: "MOTTATT"
    }, {
      id: 1,
      status: "MOTTATT"
    }];
    const afterState = [{ 
      id: 0, 
      status: "BEKREFTET"
    }, {
      id: 1,
      status: "MOTTATT"
    }]
    
    deepFreeze(initialState);

    const action = {
      type: "BEKREFT_SYKMELDING",
      sykmeldingId: 0
    };
    const nextState = sykmeldinger(initialState, action);

    expect(nextState).to.deep.equal(afterState);
  });

  it("handles SET_EGENVALGT_ARBEIDSGIVER", () => {
    const initialState = [{ 
      id: 0, 
      arbeidsgiver: "NAV"
    }, {
      id: 1,
      arbeidsgiver: "OLSEN TRANSPORT"
    }];
    const afterState = [{ 
      id: 0, 
      arbeidsgiver: "NAV",
      egenvalgtArbeidsgiver: "Arbeids- og velferdsdirektoratet"
    }, {
      id: 1,
      arbeidsgiver: "OLSEN TRANSPORT"
    }];
    deepFreeze(initialState);

    const action = {
      type: "SET_EGENVALGT_ARBEIDSGIVER",
      sykmeldingId: 0,
      egenvalgtArbeidsgiver: "Arbeids- og velferdsdirektoratet"
    }
    const nextState = sykmeldinger(initialState, action);
    expect(nextState).to.deep.equal(afterState);

  })

});