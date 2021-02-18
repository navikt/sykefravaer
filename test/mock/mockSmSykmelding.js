const smSykmelding = {
    id: '60fb7e58-3918-4a3f-8973-ab505b3407b0',
    behandlingsutfall: {
        status: 'INVALID',
        ruleHits: [
            {
                ruleName: 'TOO_MANY_TREATMENT_DAYS',
                messageForSender: null,
                messageForUser: 'Det er angitt for mange behandlingsdager. Det kan bare angis én behandlingsdag per uke. ',
                ruleStatus: 'INVALID',
            },
        ],
    },
    sykmeldingStatus: {
        timestamp: new Date(),
        statusEvent: 'APEN',
    },
    behandler: {
        fornavn: 'Frida',
        mellomnavn: 'Perma',
        etternavn: 'Frost',
    },
};

const mockSmSykmelding = (smSykmeldingArg = {}) => {
    return {
        ...smSykmelding,
        ...smSykmeldingArg,
    };
};

export default mockSmSykmelding;
