
export const vedtak1 = {
    id: '57896853-d5c3-4599-a77f-aff1f2cbc411',
    opprettet: '2020-04-03',
    lest: false,
    vedtak: {
        fom: '2020-04-03',
        tom: '2020-06-19',
        dokumenter: [],
        utbetalinger: [{
            mottaker: 'Bruker',
            fagområde: 'Sykepenger',
            totalbeløp: 13317,
            utbetalingslinjer: [{
                fom: '2020-03-05',
                tom: '2020-04-04',
                grad: 0.17292301879845517,
                beløp: 13317,
                dagsats: 774,
                sykedager: 9817,
            }],
        }],
        forbrukteSykedager: 4,
        gjenståendeSykedager: 12,
    },
};

const parseVedtak1 = {
    id: '57896853-d5c3-4599-a77f-aff1f2cbc411',
    opprettet: '2020-04-03',
    lest: false,
    vedtak: {
        fom: '2020-04-03',
        tom: '2020-06-19',
        dokumenter: [],
        utbetalinger: [{
            mottaker: 'Bruker',
            fagområde: 'Sykepenger',
            totalbeløp: 13317,
            utbetalingslinjer: [{
                fom: '2020-03-05',
                tom: '2020-04-04',
                grad: 0.17292301879845517,
                beløp: 13317,
                dagsats: 774,
                sykedager: 9817,
            }],
        }],
        forbrukteSykedager: 4,
        gjenståendeSykedager: 12,
    },
};

export const vedtakRespons = [vedtak1];

export default [parseVedtak1];
