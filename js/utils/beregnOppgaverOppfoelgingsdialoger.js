const finnNyesteGodkjenning = (godkjenninger) => {
    return godkjenninger.sort((g1, g2) => {
        return new Date(g2.godkjenningsTidspunkt) - new Date(g1.godkjenningsTidspunkt);
    })[0];
};

const idAlleredeFunnet = (planer, id) => {
    return planer.filter((plan) => {
        return plan.id === id;
    }).length > 0;
};

const beregnOppgaverOppfoelgingsdialoger = (oppfolgingsdialoger) => {
    const avventendeGodkjenninger = oppfolgingsdialoger
        .filter((plan) => {
            return plan.godkjenninger.length > 0 &&
                plan.arbeidstaker.fnr !== finnNyesteGodkjenning(plan.godkjenninger).godkjentAv.fnr &&
                finnNyesteGodkjenning(plan.godkjenninger).godkjent;
        });
    const nyePlaner = oppfolgingsdialoger
        .filter((plan) => {
            return plan.arbeidstaker.sistInnlogget === null
                && plan.status === 'UNDER_ARBEID'
                && plan.sistEndretAv.fnr !== plan.arbeidstaker.fnr
                && !idAlleredeFunnet(avventendeGodkjenninger, plan.id);
        });

    return {
        nyePlaner,
        avventendeGodkjenninger,
    };
};

export default beregnOppgaverOppfoelgingsdialoger;
