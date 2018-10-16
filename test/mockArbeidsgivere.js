export const getArbeidsgivere = [
    {
        virksomhetsnummer: '123456789',
        navn: 'Lommen Barnehave',
        harNaermesteLeder: false,
    },
    {
        virksomhetsnummer: '123456788',
        navn: 'Skogen Barnehave',
        harNaermesteLeder: true,
    },
];

const arbeidsgiver = {
    virksomhetsnummer: '123456788',
    navn: 'Skogen Barnehave',
    harNaermesteLeder: true,
};

const getArbeidsgiver = (arbsgiver = {}) => {
    return Object.assign({}, arbeidsgiver, arbsgiver);
};

export default getArbeidsgiver;
