import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import tidslinjer, {
    leggTilBilder,
    settHendelseIder,
    leggTilTidshendelser,
    sorterHendelser,
} from '../../../js/digisyfoNpm/reducers/tidslinjer';
import * as actions from '../../../js/digisyfoNpm/actions/tidslinjer_actions';
import * as hendelserActions from '../../../js/digisyfoNpm/actions/hendelser_actions';
import {
    TIDSLINJE_TYPER,
    hentStatiskTidslinje,
    hentTidslinjerFraSykeforloep,
} from '../../../js/digisyfoNpm/utils/tidslinjeUtils';

describe('tidslinjer', () => {
    describe('settHendelseIder', () => {
        it('Setter ID', () => {
            const tidslinjerData = deepFreeze([{
                hendelser: [{}, {}],
            }, {
                hendelser: [{}, {}, {}],
            }]);
            const res = settHendelseIder(tidslinjerData);
            expect(res).to.deep.equal([{
                hendelser: [{ id: '00' }, { id: '01' }],
            }, {
                hendelser: [{ id: '10' }, { id: '11' }, { id: '12' }],
            }]);
        });
    });

    describe('leggTilTidshendelser', () => {
        it('Legger til tidshendelser', () => {
            const data = deepFreeze([{
                hendelser: [{
                    antallDager: 0,
                }, {
                    antallDager: 29,
                }, {
                    antallDager: 50,
                }],
            }]);
            const res = leggTilTidshendelser(data);
            expect(res).to.deep.equal([{
                hendelser: [{
                    antallDager: 0,
                    type: 'TITTEL',
                    tekstkey: 'tidslinje.sykefravaeret-starter',
                }, {
                    antallDager: 28,
                    type: 'TID',
                    tekstkey: 'tidslinje.antall-uker.4',
                }, {
                    antallDager: 29,
                }, {
                    antallDager: 49,
                    type: 'TID',
                    tekstkey: 'tidslinje.antall-uker.7',
                }, {
                    antallDager: 50,
                }, {
                    antallDager: 119,
                    type: 'TID',
                    tekstkey: 'tidslinje.antall-uker.17',
                }, {
                    antallDager: 182,
                    type: 'TID',
                    tekstkey: 'tidslinje.antall-uker.26',
                }, {
                    antallDager: 273,
                    type: 'TID',
                    tekstkey: 'tidslinje.antall-uker.39',
                }],
            }]);
        });
    });

    it('Sorterer hendelser', () => {
        const hendelser = deepFreeze([{ antallDager: 52 }, { antallDager: 0 }, { antallDager: 80 }]);
        const res = sorterHendelser(hendelser);
        expect(res).to.deep.equal([{ antallDager: 0 }, { antallDager: 52 }, { antallDager: 80 }]);
    });

    it('Sorterer på ID dersom antallDager er likt', () => {
        const hendelser = deepFreeze([
            { antallDager: 7, id: 'nl2' },
            { antallDager: 7, id: 'nl1' },
            { antallDager: 7, id: 'nl3' },
        ]);
        const res = sorterHendelser(hendelser);
        expect(res).to.deep.equal([
            { antallDager: 7, id: 'nl1' },
            { antallDager: 7, id: 'nl2' },
            { antallDager: 7, id: 'nl3' },
        ]);
    });

    it('Håndterer SET_TIDSLINJER når det ikke eksisterer sykeforløp og arbeidssituasjon er MED_ARBEIDSGIVER', () => {
        const arbeidssituasjon = TIDSLINJE_TYPER.MED_ARBEIDSGIVER;
        const initiellState = deepFreeze({});
        const action = actions.setTidslinjer(
            arbeidssituasjon, [],
        );
        const nextState = tidslinjer(initiellState, action);
        expect(nextState).to.deep.equal({
            data: leggTilBilder(settHendelseIder(leggTilTidshendelser([hentStatiskTidslinje(arbeidssituasjon)], arbeidssituasjon))),
        });
    });

    it('Håndterer SET_TIDSLINJER når det ikke eksisterer sykeforløp og arbeidssituasjon er UTEN_ARBEIDSGIVER', () => {
        const arbeidssituasjon = TIDSLINJE_TYPER.UTEN_ARBEIDSGIVER;
        const initiellState = deepFreeze({});
        const action = actions.setTidslinjer(
            arbeidssituasjon, [],
        );
        const nextState = tidslinjer(initiellState, action);
        expect(nextState).to.deep.equal({
            data: leggTilBilder(settHendelseIder(leggTilTidshendelser([hentStatiskTidslinje(arbeidssituasjon)], arbeidssituasjon))),
        });
    });

    it('Håndterer SET_TIDSLINJER når det eksisterer sykeforløp og arbeidssituasjon er MED_ARBEIDSGIVER', () => {
        const arbeidssituasjon = TIDSLINJE_TYPER.MED_ARBEIDSGIVER;
        const sykeforloep = [
            {
                sykmeldinger: null,
                hendelser: null,
                oppfoelgingsdato: '2018-01-05',
            },
        ];
        const initiellState = deepFreeze({});
        const action = actions.setTidslinjer(
            arbeidssituasjon, sykeforloep,
        );
        const nextState = tidslinjer(initiellState, action);
        expect(nextState).to.deep.equal({
            data: leggTilBilder(settHendelseIder(leggTilTidshendelser(hentTidslinjerFraSykeforloep(sykeforloep, arbeidssituasjon), arbeidssituasjon))),
        });
    });

    it('Håndterer SET_TIDSLINJER når det eksisterer sykeforløp og arbeidssituasjon er UTEN_ARBEIDSGIVER', () => {
        const arbeidssituasjon = TIDSLINJE_TYPER.UTEN_ARBEIDSGIVER;
        const sykeforloep = [
            {
                sykmeldinger: null,
                hendelser: null,
                oppfoelgingsdato: '2018-01-05',
            },
        ];
        const initiellState = deepFreeze({});
        const action = actions.setTidslinjer(
            arbeidssituasjon, sykeforloep,
        );
        const nextState = tidslinjer(initiellState, action);
        expect(nextState).to.deep.equal({
            data: leggTilBilder(settHendelseIder(leggTilTidshendelser(hentTidslinjerFraSykeforloep(sykeforloep, arbeidssituasjon), arbeidssituasjon))),
        });
    });

    it('Håndterer ÅPNE_HENDELSER', () => {
        const initiellState = deepFreeze({
            data: [{
                hendelser: [{
                    id: 0,
                    erApen: false,
                }, {
                    id: 1,
                    erApen: false,
                }, {
                    id: 2,
                    erApen: false,
                }, {
                    id: 3,
                    erApen: false,
                }, {
                    id: 4,
                    erApen: false,
                }],
            }],
        });
        const action = hendelserActions.apneHendelser([0, 2, 3]);
        const nextState = tidslinjer(initiellState, action);
        expect(nextState).to.deep.equal({
            data: [{
                hendelser: [{
                    id: 0,
                    erApen: true,
                    hoyde: 'auto',
                    visBudskap: true,
                }, {
                    id: 1,
                    erApen: false,
                }, {
                    id: 2,
                    erApen: true,
                    hoyde: 'auto',
                    visBudskap: true,
                }, {
                    id: 3,
                    erApen: true,
                    hoyde: 'auto',
                    visBudskap: true,
                }, {
                    id: 4,
                    erApen: false,
                }],
            }],
        });
    });

    it('Håndterer SET_HENDELSEDATA', () => {
        const initiellState = deepFreeze({
            data: [{
                hendelser: [{
                    id: 0,
                    erApen: true,
                }, {
                    id: 1,
                    erApen: true,
                }, {
                    id: 2,
                    erApen: false,
                }],
            }],
        });
        const action = hendelserActions.setHendelseData(1, {
            ikon: 'helge.jpg',
            hoyde: 55,
        });
        const nextState = tidslinjer(initiellState, action);

        expect(nextState).to.deep.equal({
            data: [{
                hendelser: [{
                    id: 0,
                    erApen: true,
                }, {
                    id: 1,
                    erApen: true,
                    ikon: 'helge.jpg',
                    hoyde: 55,
                }, {
                    id: 2,
                    erApen: false,
                }],
            }],
        });
    });
});
