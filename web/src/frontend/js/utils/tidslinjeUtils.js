export function mapTidslinjeTilMilepaeler(tidslinje = {}, type = 'med-arbeidsgiver') {
    const milepaeler = [];
    let hendelser = [];

    if (tidslinje.startdato) {
        milepaeler.push({
            ledetekst: `tidslinje.${type}.sykefravaer-startet`,
            visning: ['MED_ARBEIDSGIVER', 'UTEN_ARBEIDSGIVER'],
            type: 'START',
            id: 'start',
            dager: 0,
            data: {
                startdato: tidslinje.startdato,
            },
        });
    }

    if (tidslinje.hendelser) {
        hendelser = tidslinje.hendelser.map((hendelse) => {
            switch (hendelse.type) {
                case 'AKTIVITETSKRAV_VARSEL_SENDT':
                    return {
                        ledetekst: `tidslinje.${type}.aktivitetskrav-varsel`,
                        visning: ['MED_ARBEIDSGIVER', 'UTEN_ARBEIDSGIVER'],
                        type: 'VARSEL',
                        id: 'aktivitetskrav-varsel',
                        dager: 42,
                    };
                default:
                    return {};
            }
        });
    }

    return [...milepaeler, ...hendelser];
}
