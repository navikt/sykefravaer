
export const tidligsteFom = (perioder) => {
    return perioder.map(p => { return p.fom; }).sort((p1, p2) => { return p1 > p2; })[0];
};

export const senesteTom = (perioder) => {
    return perioder.map(p => { return p.tom; }).sort((p1, p2) => { return p1 < p2; })[0];
};
