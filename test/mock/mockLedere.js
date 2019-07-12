export const getLedere = [
    {
        navn: 'Navn-Navnolini Navnesen',
        epost: 'epost@epost.no',
        mobil: '99988777',
        orgnummer: '123456789',
        organisasjonsnavn: 'Arbeidsgiver AS',
        aktivTom: null,
    },
    {
        navn: 'Navn Navnesen',
        epost: 'epost@epost.no',
        mobil: '99988777',
        orgnummer: '123456788',
        organisasjonsnavn: 'Arbeidsgiver',
        aktivTom: null,
    },
];

const naermesteLeder = {
    navn: 'Navn-Navnolini Navnesen',
    epost: 'epost@epost.no',
    mobil: '99988777',
    orgnummer: '123456789',
    organisasjonsnavn: 'Arbeidsgiver AS',
    aktivTom: null,
};

const getLeder = (leder = {}) => Object.assign({}, naermesteLeder, leder);

export default getLeder;
