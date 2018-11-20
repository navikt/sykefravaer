import { newDate } from './datoUtils';

export const erMotePassert = (mote) => {
    if (!mote) {
        return false;
    }
    if (mote.bekreftetAlternativ && mote.bekreftetAlternativ.tid <= newDate()) {
        return true;
    }
    const antallAlternativer = mote.alternativer.length;
    return mote.alternativer.filter((alternativ) => {
        return alternativ.tid <= newDate();
    }).length === antallAlternativer;
};

export const getMote = (state) => {
    const moter = state.moter
        && state.moter.data
        && state.moter.data
            .sort((m1, m2) => {
                return new Date(m1.opprettetTidspunkt).getTime() <= new Date(m2.opprettetTidspunkt).getTime() ? 1 : -1;
            });
    return moter && moter.length > 0
        ? moter[0]
        : null;
};
