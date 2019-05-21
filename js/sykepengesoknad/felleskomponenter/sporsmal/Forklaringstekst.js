import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from '@navikt/digisyfo-npm';
import { HVOR_MANGE_TIMER_PER_UKE } from '../../enums/tagtyper';
import { fjernIndexFraTag, tagMatcher } from './fieldUtils';

const tagsMedForklaringstekst = [
    HVOR_MANGE_TIMER_PER_UKE,
];

export const Forklaringstekst = ({ tag }) => {
    const tagUtenIndex = fjernIndexFraTag(tag);
    return tagMatcher(tagsMedForklaringstekst, tagUtenIndex)
        ? <p>{getLedetekst(`soknad.forklaringstekst.${tagUtenIndex.toLowerCase()}.tekst`)}</p>
        : null;
};

Forklaringstekst.propTypes = {
    tag: PropTypes.string,
};
