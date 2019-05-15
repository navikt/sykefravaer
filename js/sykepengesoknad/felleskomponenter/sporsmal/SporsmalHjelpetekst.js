import React from 'react';
import PropTypes from 'prop-types';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { getLedetekst } from '@navikt/digisyfo-npm';
import { fjernIndexFraTag } from './fieldUtils';
import { EGENMELDINGER, FERIE_PERMISJON_UTLAND, FERIE_V2 } from '../../enums/tagtyper';
import { soknadPt } from '../../prop-types/soknadProptype';

const tagsMedHjelpetekst = [
    EGENMELDINGER,
    FERIE_PERMISJON_UTLAND,
    FERIE_V2,
];

export const harHjelpetekst = (tag) => {
    return tagsMedHjelpetekst.includes(fjernIndexFraTag(tag));
};

const hentHjelpetekst = (tag) => {
    const tagUtenIndex = fjernIndexFraTag(tag);
    const nokkel = `soknad.hjelpetekst.${tagUtenIndex.toLowerCase()}`;
    return getLedetekst(nokkel);
};

const SporsmalHjelpetekst = ({ tag, soknad }) => {
    return harHjelpetekst(tag, soknad)
        ? <Hjelpetekst>{hentHjelpetekst(tag)}</Hjelpetekst>
        : null;
};

SporsmalHjelpetekst.propTypes = {
    tag: PropTypes.string,
    soknad: soknadPt,
};

export default SporsmalHjelpetekst;
