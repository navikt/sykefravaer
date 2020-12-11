
export const reisetilskudd = {
    fnr: '01010112345',
    fom: '2020-08-03',
    tom: '2020-08-03',
    orgNavn: 'Mock Arbeid AS',
    orgNummer: '123123123',
    utbetalingTilArbeidsgiver: false,
    går: false,
    sykler: false,
    kollektivtransport: 0,
    egenBil: 0,
    reisetilskuddId: '28fa10b8-c9af-4a7a-a0b2-90caed65ab4c',
    sykmeldingId: '7e90121c-b64b-4a1c-b7a5-93c9d95aba47',
    kvitteringer: [],
};

const parseReisetilskudd1 = {
    fnr: '01010112345',
    fom: '2020-08-03',
    tom: '2020-08-03',
    orgNavn: 'Mock Arbeid AS',
    orgNummer: '123123123',
    utbetalingTilArbeidsgiver: false,
    går: false,
    sykler: false,
    kollektivtransport: 0,
    egenBil: 0,
    reisetilskuddId: '28fa10b8-c9af-4a7a-a0b2-90caed65ab4c',
    sykmeldingId: '7e90121c-b64b-4a1c-b7a5-93c9d95aba47',
    kvitteringer: [],
};

export const reisetilskuddSoknaderRespons = [reisetilskudd];

export default [parseReisetilskudd1];
