import logger from '../logging';

/* eslint-disable */
export const pushToDataAOLayer = (action) => {
    logger.event(`SYKEFRAVAER_ARBEIDSRETTET_OPPFOLGING__${action}`);
    window.dataLayer.push({
        'event': 'SYKEFRAVAER_ARBEIDSRETTET_OPPFOLGING',
        'action': action,
    });
};
/* eslint-enable */
