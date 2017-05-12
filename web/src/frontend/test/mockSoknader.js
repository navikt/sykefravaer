import * as actions from '../js/actions/sykepengesoknader_actions';
import sykepengesoknader from '../js/reducers/sykepengesoknader';

export const soknader = [{
  "id": "9997ab30-ce08-443c-87fe-e953c8a07cca",
  "status": "NY",
  "opprettetDato": "2017-01-19",
  "arbeidsgiver": {
    "navn": "BYGGMESTER BLOM AS",
    "orgnummer": "***REMOVED***",
    "naermesteLeder": null
  },
  "identdato": "2016-07-15",
  "ansvarBekreftet": false,
  "bekreftetKorrektInformasjon": false,
  "arbeidsgiverUtbetalerLoenn": false,
  "egenmeldingsperioder": [],
  "gjenopptattArbeidFulltUtDato": null,
  "ferie": [],
  "permisjon": [],
  "utenlandsopphold": {
    "perioder": [],
    "soektOmSykepengerIPerioden": null,
  },
  "aktiviteter": [{
    "periode": {
      "fom": "2016-07-15",
      "tom": "2017-01-19"
    },
    "grad": 100,
    "avvik": null
  }],
  "andreInntektskilder": [],
  "utdanning": null
}, {
  "id": "a0acb034-ea32-43cd-a71a-667ea02d9a9b",
  "status": "NY",
  "opprettetDato": "2017-01-18",
  "arbeidsgiver": {
    "navn": "BYGGMESTER BLOM AS",
    "orgnummer": "***REMOVED***",
    "naermesteLeder": null
  },
  "identdato": "2016-07-15",
  "ansvarBekreftet": false,
  "bekreftetKorrektInformasjon": false,
  "arbeidsgiverUtbetalerLoenn": false,
  "egenmeldingsperioder": [],
  "gjenopptattArbeidFulltUtDato": null,
  "ferie": [],
  "permisjon": [],
  "utenlandsopphold": {
    "perioder": [],
    "soektOmSykepengerIPerioden": null,
  },
  "aktiviteter": [{
    "periode": {
      "fom": "2016-07-15",
      "tom": "2016-07-20"
    },
    "grad": 100,
    "avvik": null
  }],
  "andreInntektskilder": [],
  "utdanning": null
}, {
  "id": "8224090d-d021-4bf3-8144-92439fc05605",
  "status": "NY",
  "opprettetDato": "2017-01-18",
  "arbeidsgiver": {
    "navn": "BYGGMESTER BLOM AS",
    "orgnummer": "***REMOVED***",
    "naermesteLeder": null
  },
  "identdato": "2016-07-15",
  "ansvarBekreftet": false,
  "bekreftetKorrektInformasjon": false,
  "arbeidsgiverUtbetalerLoenn": false,
  "egenmeldingsperioder": [],
  "gjenopptattArbeidFulltUtDato": null,
  "ferie": [],
  "permisjon": [],
  "utenlandsopphold": {
    "perioder": [],
    "soektOmSykepengerIPerioden": null,
  },
  "aktiviteter": [{
    "periode": {
      "fom": "2016-07-15",
      "tom": "2016-07-20"
    },
    "grad": 100,
    "avvik": null
  }],
  "andreInntektskilder": [],
  "utdanning": null
}, {
  "id": "66a8ec20-b813-4b03-916f-7a2f0751b600",
  "status": "NY",
  "opprettetDato": "2017-01-18",
  "arbeidsgiver": {
    "navn": "BYGGMESTER BLOM AS",
    "orgnummer": "***REMOVED***",
    "naermesteLeder": null
  },
  "identdato": "2016-07-15",
  "ansvarBekreftet": false,
  "bekreftetKorrektInformasjon": false,
  "arbeidsgiverUtbetalerLoenn": false,
  "egenmeldingsperioder": [],
  "gjenopptattArbeidFulltUtDato": null,
  "ferie": [],
  "permisjon": [],
  "utenlandsopphold": {
    "perioder": [],
    "soektOmSykepengerIPerioden": null,
  },
  "aktiviteter": [{
    "periode": {
      "fom": "2016-07-15",
      "tom": "2016-07-20"
    },
    "grad": 100,
    "avvik": null
  }],
  "andreInntektskilder": [],
  "utdanning": null
}];

export const getSoknad = (soknad = {}) => {
  const _soknad = Object.assign({}, {
    "id": "66a8ec20-b813-4b03-916f-7a2f0751b600",
    "status": "NY",

    "opprettetDato": "2017-01-18",
    "arbeidsgiver": {
      "navn": "BYGGMESTER BLOM AS",
      "orgnummer": "***REMOVED***",
      "naermesteLeder": null
    },
    "identdato": "2016-07-15",
    "ansvarBekreftet": false,
    "bekreftetKorrektInformasjon": false,
    "arbeidsgiverUtbetalerLoenn": false,
    "egenmeldingsperioder": [],
    "gjenopptattArbeidFulltUtDato": null,
    "ferie": [],
    "permisjon": [],
    "utenlandsopphold": {
      "perioder": [],
      "soektOmSykepengerIPerioden": null,
    },
    "aktiviteter": [{
      "periode": {
        "fom": "2017-01-01",
        "tom": "2017-01-15"
      },
      "grad": 100,
      "avvik": null
    }, {
      "periode": {
        "fom": "2017-01-01",
        "tom": "2017-01-25"
      },
      "grad": 50,
      "avvik": null
    }],
    "andreInntektskilder": [],
    "utdanning": null
  }, soknad);

  const action = actions.sykepengesoknaderHentet([_soknad]);
  const state = sykepengesoknader(undefined, action);
  return state.data[0];
};