export const HENT_MOTE_FEILET = 'HENT_MOTER_FEILET';
export const MOTE_HENTET = 'MOTE_HENTET';
export const HENTER_MOTE = 'HENTER_MOTE';
export const HENT_MOTE_FORESPURT = 'HENT_MOTE_FORESPURT';
export const MOTE_IKKE_FUNNET = 'MOTE_IKKE_FUNNET';

export const hentMote = () => ({
    type: HENT_MOTE_FORESPURT,
});

export const moteHentet = data => ({
    type: MOTE_HENTET,
    data,
});

export const henterMote = () => ({
    type: HENTER_MOTE,
});

export const hentMoteFeilet = () => ({
    type: HENT_MOTE_FEILET,
});

export const moteIkkeFunnet = () => ({
    type: MOTE_IKKE_FUNNET,
});
