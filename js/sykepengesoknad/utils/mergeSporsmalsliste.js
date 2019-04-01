export const flatSporsmal = (sporsmalsliste) => {
    return sporsmalsliste.reduce((acc, cur) => {
        return [
            ...acc,
            cur,
            ...flatSporsmal(cur.undersporsmal),
        ];
    }, []);
};

export const finnSporsmal = (sporsmalsliste, sporsmalsid) => {
    const alleSporsmal = flatSporsmal(sporsmalsliste);
    return alleSporsmal.find((sporsmal) => {
        return sporsmal.id === sporsmalsid;
    });
};

const mergeSporsmalsliste = (nySporsmalsliste, gammelSporsmalsliste) => {
    return nySporsmalsliste.map((nyttSporsmal) => {
        const gammeltSporsmal = finnSporsmal(gammelSporsmalsliste, nyttSporsmal.id);
        const sporsmal = gammeltSporsmal || nyttSporsmal;
        return {
            ...nyttSporsmal,
            svar: sporsmal.svar,
            undersporsmal: mergeSporsmalsliste(nyttSporsmal.undersporsmal, gammelSporsmalsliste),
        };
    });
};

export default mergeSporsmalsliste;
