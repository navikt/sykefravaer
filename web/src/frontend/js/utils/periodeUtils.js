
export const tidligsteFom = (perioder) => {
    return perioder.map(p => p.fom).sort((p1,p2) => p1 > p2)[0]
};

export const senesteTom = (perioder) => {
    return perioder.map(p => p.tom).sort((p1,p2) => p1 < p2)[0]
};