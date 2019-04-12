/* eslint-disable */
export const pushToDataAOLayer = (action) => {
    window.dataLayer.push({
        'event': 'SYKEFRAVAER_ARBEIDSRETTET_OPPFOLGING',
        'action': action,
    });
};
/* eslint-enable */
