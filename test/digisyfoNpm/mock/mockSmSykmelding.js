const sykmelding = {
    id: '645e9b82-c022-4096-96e9-192e939199cb',
    bekreftetDato: null,
    behandlingsutfall: {
        status: 'INVALID',
        ruleHits: [
            {
                ruleName: 'BACKDATED_MORE_THEN_8_DAYS_FIRST_SICK',
                messageForSender: 'Det må begrunnes hvorfor sykmeldingen er tilbakedatert.',
                messageForUser: 'Første sykmelding er tilbakedatert mer enn det som er tillatt.',
            },
        ],
    },
    legekontorOrgnummer: '223456789',
    legeNavn: 'Frida Perma Frost',
    arbeidsgiverNavn: 'LOMMEN BARNEHAVE',
    sykmeldingsperioder: [
        {
            fom: new Date('2019-04-01'),
            tom: new Date('2019-09-01'),
        },
        {
            fom: new Date('2015-04-01'),
            tom: new Date('2015-04-06'),
        },
        {
            fom: new Date('2019-01-25'),
            tom: new Date('2019-05-01'),
        },
    ],
};

const mockSmSykmelding = (sykmeldingArg = {}) => {
    return {
        ...sykmelding,
        ...sykmeldingArg,
    };
};

export default mockSmSykmelding;
