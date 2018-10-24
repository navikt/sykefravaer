const sykeforloep = {
    sykmeldinger: null,
    hendelser: null,
    oppfoelgingsdato: '2018-01-05',
};

const getSykeforloep = (forloep = {}) => {
    return Object.assign({}, sykeforloep, forloep);
};

export default getSykeforloep;
