import React from 'react';
import PropTypes from 'prop-types';
import { Bjorn } from 'digisyfo-npm';
import { fjernIndexFraTag } from './fieldUtils';
import { JOBBET_DU_100_PROSENT, JOBBET_DU_GRADERT } from '../../enums/tagtyper';
import getContextRoot from '../../utils/getContextRoot';

const tagsMedBjorn = [
    JOBBET_DU_GRADERT,
    JOBBET_DU_100_PROSENT,
];

const harBjorntekst = (tag) => {
    return tagsMedBjorn.indexOf(fjernIndexFraTag(tag)) > -1;
};

const hentBjornNokkel = (tag) => {
    const tagUtenIndex = fjernIndexFraTag(tag);
    return `soknad.bjorn.${tagUtenIndex.toLowerCase()}`;
};

const SporsmalBjorn = ({ tag, className }) => {
    return harBjorntekst(tag)
        ? <Bjorn className={className} rootUrl={getContextRoot()} nokkel={hentBjornNokkel(tag)} />
        : null;
};

SporsmalBjorn.propTypes = {
    tag: PropTypes.string,
    className: PropTypes.string,
};

export default SporsmalBjorn;
