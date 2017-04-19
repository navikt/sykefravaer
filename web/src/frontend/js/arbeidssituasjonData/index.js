import { DEFAULT, ARBEIDSTAKER, NAERINGSDRIVENDE, FRILANSER, ARBEIDSLEDIG, ANNET } from '../enums/arbeidssituasjoner';

const arbeidssituasjoner = [
    {
        tekst: 'Velg arbeidssituasjon',
        verdi: DEFAULT,
        skjult: true,
    },
    {
        tekst: 'Arbeidstaker',
        verdi: ARBEIDSTAKER,
    },
    {
        tekst: 'Selvstendig næringsdrivende',
        verdi: NAERINGSDRIVENDE,
    },
    {
        tekst: 'Frilanser',
        verdi: FRILANSER,
    },
    {
        tekst: 'Arbeidsledig',
        verdi: ARBEIDSLEDIG,
    },
    {
        tekst: 'Annet',
        verdi: ANNET,
    },
];

export default arbeidssituasjoner;
