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