import erSykmeldingGyldigForOppfolgingMedGrensedato from '../oppfolgingsdialogNpm/erSykmeldingGyldigForOppfolgingMedGrensedato';

const finnNyesteGodkjenning = (godkjenninger) => {
    return godkjenninger.sort((g1, g2) => {
        return new Date(g2.godkjenningsTidspunkt) - new Date(g1.godkjenningsTidspunkt);
    })[0];
};

const erOppfolgingsdialogKnyttetTilGyldigSykmelding = (oppfolgingsdialog, sykmeldinger) => {
    const dagensDato = new Date();
    return sykmeldinger.filter((sykmelding) => {
        return oppfolgingsdialog.virksomhet.virksomhetsnummer === sykmelding.orgnummer
            && erSykmeldingGyldigForOppfolgingMedGrensedato(sykmelding, dagensDato);
    }).length > 0;
};

const idAlleredeFunnet = (planer, id) => {
    return planer.filter((plan) => {
        return plan.id === id;
    }).length > 0;
};

const beregnOppgaverOppfoelgingsdialoger = (oppfolgingsdialoger, sykmeldinger) => {
    const oppfolgingdialogerKnyttetTilGyldigSykmelding = oppfolgingsdialoger.filter((plan) => {
        return erOppfolgingsdialogKnyttetTilGyldigSykmelding(plan, sykmeldinger);
    });
    const avventendeGodkjenninger = oppfolgingdialogerKnyttetTilGyldigSykmelding
        .filter((plan) => {
            return plan.godkjenninger.length > 0 &&
                plan.arbeidstaker.fnr !== finnNyesteGodkjenning(plan.godkjenninger).godkjentAv.fnr &&
                finnNyesteGodkjenning(plan.godkjenninger).godkjent;
        });
    const nyePlaner = oppfolgingdialogerKnyttetTilGyldigSykmelding
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
