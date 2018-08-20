export const hentEvents = (state, ressursId) => {
    return [...state.metrikker.data]
        .filter((e) => {
            return e.ressursId === ressursId;
        })
        .sort((a, b) => {
            return a.tid > b.tid;
        });
};

export const hentEvent = (state, kriterier) => {
    return hentEvents(state, kriterier.ressursId)
        .filter((s) => {
            return s.type === kriterier.type;
        })
        .reverse()[0];
};
