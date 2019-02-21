import React from 'react';
import PropTypes from 'prop-types';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { getLedetekst } from '@navikt/digisyfo-npm';
import { fjernIndexFraTag } from './fieldUtils';
import { BETALER_ARBEIDSGIVER, EGENMELDINGER, FERIE_PERMISJON_UTLAND } from '../../../enums/tagtyper';

const tagsMedHjelpetekst = [
    EGENMELDINGER,
    FERIE_PERMISJON_UTLAND,
    BETALER_ARBEIDSGIVER,
];

const harHjelpetekst = (tag) => {
    return tagsMedHjelpetekst.indexOf(fjernIndexFraTag(tag)) > -1;
};

const hentHjelpetekst = (tag) => {
    const tagUtenIndex = fjernIndexFraTag(tag);
    const nokkel = `soknad.hjelpetekst.${tagUtenIndex.toLowerCase()}`;
    return getLedetekst(nokkel);
};

const SporsmalHjelpetekst = ({ tag }) => {
    return harHjelpetekst(tag)
        ? <Hjelpetekst>{hentHjelpetekst(tag)}</Hjelpetekst>
        : null;
};

SporsmalHjelpetekst.propTypes = {
    tag: PropTypes.string,
};

export default SporsmalHjelpetekst;
