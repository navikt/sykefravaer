import erSykmeldingGyldigForOppfolgingMedGrensedato from '../oppfolgingsdialogNpm/erSykmeldingGyldigForOppfolgingMedGrensedato';

const finnNyesteGodkjenning = godkjenninger => godkjenninger.sort((g1, g2) => new Date(g2.godkjenningsTidspunkt) - new Date(g1.godkjenningsTidspunkt))[0];

const erOppfolgingsdialogKnyttetTilGyldigSykmelding = (oppfolgingsdialog, sykmeldinger) => {
    const dagensDato = new Date();
    return sykmeldinger.filter(sykmelding => oppfolgingsdialog.virksomhet.virksomhetsnummer === sykmelding.orgnummer
            && erSykmeldingGyldigForOppfolgingMedGrensedato(sykmelding, dagensDato)).length > 0;
};

const idAlleredeFunnet = (planer, id) => planer.filter(plan => plan.id === id).length > 0;

const beregnOppgaverOppfoelgingsdialoger = (oppfolgingsdialoger, sykmeldinger) => {
    const oppfolgingdialogerKnyttetTilGyldigSykmelding = oppfolgingsdialoger.filter(plan => erOppfolgingsdialogKnyttetTilGyldigSykmelding(plan, sykmeldinger));
    const avventendeGodkjenninger = oppfolgingdialogerKnyttetTilGyldigSykmelding
        .filter(plan => plan.godkjenninger.length > 0
                && plan.arbeidstaker.fnr !== finnNyesteGodkjenning(plan.godkjenninger).godkjentAv.fnr
                && finnNyesteGodkjenning(plan.godkjenninger).godkjent);
    const nyePlaner = oppfolgingdialogerKnyttetTilGyldigSykmelding
        .filter(plan => plan.arbeidstaker.sistInnlogget === null
                && plan.status === 'UNDER_ARBEID'
                && plan.sistEndretAv.fnr !== plan.arbeidstaker.fnr
                && !idAlleredeFunnet(avventendeGodkjenninger, plan.id));

    return {
        nyePlaner,
        avventendeGodkjenninger,
    };
};

export default beregnOppgaverOppfoelgingsdialoger;
