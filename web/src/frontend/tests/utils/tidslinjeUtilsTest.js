import { expect } from 'chai';
import { mapTidslinjeTilMilepaeler } from '../../js/utils/tidslinjeUtils';
import deepFreeze from 'deep-freeze';

describe("mapTidslinjeTilMilepaeler", () => {

    let tidslinje;

    beforeEach(() => {
        tidslinje = deepFreeze({
            "antalldager": 90,
            "startdato": {
                "year": 2016,
                "month": "MARCH",
                "era": "CE",
                "dayOfMonth": 30,
                "dayOfWeek": "WEDNESDAY",
                "dayOfYear": 90,
                "leapYear": true,
                "monthValue": 3,
                "chronology": {
                    "id": "ISO",
                    "calendarType": "iso8601"
                }
            },
            "hendelser": [{
                "dato": {
                    "year": 2016,
                    "month": "MAY",
                    "era": "CE",
                    "dayOfMonth": 11,
                    "dayOfWeek": "WEDNESDAY",
                    "dayOfYear": 132,
                    "leapYear": true,
                    "monthValue": 5,
                    "chronology": {
                        "id": "ISO",
                        "calendarType": "iso8601"
                    }
                },
                "type": "AKTIVITETSKRAV_VARSEL_SENDT"
            }]
        });
    })

    it("Skal mappe startdato for sykefraværet", () => {
        const res = mapTidslinjeTilMilepaeler(tidslinje, "med-arbeidsgiver");

        expect(res[0]).to.deep.equal({
            ledetekst: 'tidslinje.med-arbeidsgiver.sykefravaer-startet',
            visning: ['MED_ARBEIDSGIVER', 'UTEN_ARBEIDSGIVER'],
            type: 'START',
            id: 'start',
            dager: 0,
            data: {
                startdato: {
                    "year": 2016,
                    "month": "MARCH",
                    "era": "CE",
                    "dayOfMonth": 30,
                    "dayOfWeek": "WEDNESDAY",
                    "dayOfYear": 90,
                    "leapYear": true,
                    "monthValue": 3,
                    "chronology": {
                        "id": "ISO",
                        "calendarType": "iso8601"
                    }
                }
            }
        })

    });

    it("Skal mappe hendelse for sykefraværet", () => {
        const res = mapTidslinjeTilMilepaeler(tidslinje, "med-arbeidsgiver");
        expect(res[1]).to.deep.equal({
            ledetekst: 'tidslinje.med-arbeidsgiver.aktivitetskrav-varsel',
            visning: ['MED_ARBEIDSGIVER', 'UTEN_ARBEIDSGIVER'],
            type: 'VARSEL',
            id: 'aktivitetskrav-varsel',
            dager: 42,
        });
    });

    it("Skal mappe dersom bruker ikke har tidslinje", () => {
        const res = mapTidslinjeTilMilepaeler(deepFreeze({}), "med-arbeidsgiver");
        expect(res).to.deep.equal([]);
    });

});