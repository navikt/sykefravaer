import { expect } from 'chai';
import {
    TIDSLINJE_TYPER,
    HENDELSE_TYPER,
    hentId,
    hentAntallDager,
    hentHendelserMedArbeidsgiver,
    hentHendelserUtenArbeidsgiver,
    hentStatiskeHendelser,
    hentStatiskTidslinje,
    hentTidslinjerFraSykeforloep,
    leggTilFelterForSykeforloepHendelser,
    leggTypePaaTekstnokkel,
    sorterTidslinjerSisteFoerst,
} from '../../../js/digisyfoNpm/utils/tidslinjeUtils';

describe('tidslinjeUtils', () => {
    describe('sorterTidslinjerSisteFoerst', () => {
        it('sorterer Tidslinjer etter startdato', () => {
            const tidslinjer = [
                { startdato: new Date('2018-01-01') },
                { startdato: new Date('2018-01-02') },
            ];
            expect(sorterTidslinjerSisteFoerst(tidslinjer)[0].startdato).to.equal(tidslinjer[1].startdato);
        });
    });

    describe('hentId', () => {
        it('returnerer rett id for hendelsestype AKTIVITETSKRAV_VARSEL', () => {
            const hendelse = { type: HENDELSE_TYPER.AKTIVITETSKRAV_VARSEL };
            expect(hentId(1, hendelse)).to.equal('a1');
        });

        it('returnerer rett id for hendelsestype NY_NAERMESTE_LEDER', () => {
            const hendelse = { type: HENDELSE_TYPER.NY_NAERMESTE_LEDER };
            expect(hentId(1, hendelse)).to.equal('nl1');
        });
    });

    describe('hentAntallDager', () => {
        it('returnerer antall dager fra inntruffet hendelse siden startdato for oppfoelging av sykeforloep', () => {
            const sykeforloep = { oppfoelgingsdato: new Date('2018-01-01') };
            const hendelse = { inntruffetdato: new Date('2018-01-05') };
            expect(hentAntallDager(hendelse, sykeforloep)).to.equal(4);
        });
    });

    describe('leggTilFelterForSykeforloepHendelser', () => {
        it('returnerer hendelser fra sykeforloep, med rett felter for Id og antallDager lagt til', () => {
            const sykeforloep = {
                hendelser: [
                    {
                        inntruffetdato: new Date('2018-01-05'),
                        type: HENDELSE_TYPER.AKTIVITETSKRAV_VARSEL,
                    },
                    {
                        inntruffetdato: new Date('2018-01-04'),
                        type: HENDELSE_TYPER.NY_NAERMESTE_LEDER,
                    },
                ],
                oppfoelgingsdato: new Date('2018-01-01'),
            };
            expect(leggTilFelterForSykeforloepHendelser(sykeforloep)).to.deep.equal([
                Object.assign({}, sykeforloep.hendelser[0], {
                    id: 'a1',
                    antallDager: 4,
                }),
                Object.assign({}, sykeforloep.hendelser[1], {
                    id: 'nl2',
                    antallDager: 3,
                }),
            ]);
        });

        it('returnerer ingen hendelser, om sykeforloep ikke har hendelser', () => {
            const sykeforloep = { hendelser: [] };
            expect(leggTilFelterForSykeforloepHendelser(sykeforloep).length).to.equal(0);
        });
    });

    describe('leggTypePaaTekstnokkel', () => {
        it('returnere hendelser med rett tidslinje type lagt paa tekstnoekler', () => {
            const tidslinjeType = TIDSLINJE_TYPER.MED_ARBEIDSGIVER;
            const hendelser = [
                { tekstkey: 'tekst.tekst1' },
                { tekstkey: 'tekst.tekst2' },
            ];
            expect(leggTypePaaTekstnokkel(hendelser, tidslinjeType)).to.deep.equal([
                { tekstkey: `${hendelser[0].tekstkey}.${tidslinjeType}` },
                { tekstkey: `${hendelser[1].tekstkey}.${tidslinjeType}` },
            ]);
        });
    });

    describe('hentStatiskeHendelser', () => {
        it('returnerer rett sett med statiske hendelser, om tidslinje type valgt er MED_ARBEIDSGIVER', () => {
            const tidslinjeType = TIDSLINJE_TYPER.MED_ARBEIDSGIVER;
            expect(hentStatiskeHendelser(tidslinjeType)).to.deep.equal(hentHendelserMedArbeidsgiver(tidslinjeType));
        });

        it('returnerer rett sett med statiske hendelser, om tidslinje type valgt er UTEN_ARBEIDSGIVER', () => {
            const tidslinjeType = TIDSLINJE_TYPER.UTEN_ARBEIDSGIVER;
            expect(hentStatiskeHendelser(tidslinjeType)).to.deep.equal(hentHendelserUtenArbeidsgiver(tidslinjeType));
        });
    });

    describe('hentStatiskTidslinje', () => {
        it('returnerer statisk tidslinje, med rett sett med hendelser hvor tekstnoekler har blitt endret ihht. type MED_ARBEIDSGIVER', () => {
            const tidslinjeType = TIDSLINJE_TYPER.MED_ARBEIDSGIVER;
            expect(hentStatiskTidslinje(tidslinjeType)).to.deep.equal({
                hendelser: leggTypePaaTekstnokkel(hentHendelserMedArbeidsgiver(tidslinjeType), tidslinjeType),
            });
        });
    });

    describe('hentTidslinjerFraSykeforloep', () => {
        let tidslinjeType;

        beforeEach(() => {
            tidslinjeType = TIDSLINJE_TYPER.MED_ARBEIDSGIVER;
        });

        it('returnerer tidslinjer med statiske hendelser og hendelser ifra sykeforloep, om det eksisterer sykeforloep', () => {
            const sykeforloep = [
                {
                    sykmeldinger: null,
                    hendelser: [
                        {
                            inntruffetdato: new Date('2018-01-05'),
                            type: HENDELSE_TYPER.AKTIVITETSKRAV_VARSEL,
                        },
                        {
                            inntruffetdato: new Date('2018-01-04'),
                            type: HENDELSE_TYPER.NY_NAERMESTE_LEDER,
                        },
                    ],
                    oppfoelgingsdato: new Date('2018-01-01'),
                },
            ];
            expect(hentTidslinjerFraSykeforloep(sykeforloep, tidslinjeType)).to.deep.equal([
                {
                    startdato: new Date(sykeforloep[0].oppfoelgingsdato),
                    hendelser: leggTypePaaTekstnokkel(
                        hentStatiskeHendelser(tidslinjeType).concat(leggTilFelterForSykeforloepHendelser(sykeforloep[0], tidslinjeType)),
                        tidslinjeType,
                    ),
                },
            ]);
        });

        it('returnerer tidslinjer kun med statisk hendelser, om det ikke eksisterer sykeforloep', () => {
            const sykeforloep = [];
            expect(hentTidslinjerFraSykeforloep(sykeforloep, tidslinjeType)).to.deep.equal([hentStatiskTidslinje(tidslinjeType)]);
        });
    });
});
