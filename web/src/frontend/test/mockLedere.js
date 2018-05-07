export const getLedere = [
    {
        navn: 'Geir-Espen Fygle',
        epost: 'morten.tholander@nav.no',
        mobil: '***REMOVED***',
        orgnummer: '***REMOVED***',
        organisasjonsnavn: 'BEKK CONSULTING AS',
        aktivTom: null,
    },
    {
        navn: 'Geir Fygle',
        epost: 'morten.tholand@nav.no',
        mobil: '***REMOVED***',
        orgnummer: '***REMOVED***',
        organisasjonsnavn: 'BEKK CONSULTING',
        aktivTom: null,
    },
];

const naermesteLeder = {
    navn: 'Geir-Espen Fygle',
    epost: 'morten.tholander@nav.no',
    mobil: '***REMOVED***',
    orgnummer: '***REMOVED***',
    organisasjonsnavn: 'BEKK CONSULTING AS',
    aktivTom: null,
};

const getLeder = (leder = {}) => {
    return Object.assign({}, naermesteLeder, leder);
};

export default getLeder;
