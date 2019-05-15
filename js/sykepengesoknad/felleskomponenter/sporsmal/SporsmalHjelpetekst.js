import React from 'react';
import PropTypes from 'prop-types';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { getLedetekst } from '@navikt/digisyfo-npm';
import { fjernIndexFraTag } from './fieldUtils';
import { EGENMELDINGER, FERIE, FERIE_PERMISJON_UTLAND } from '../../enums/tagtyper';
import { soknadPt } from '../../prop-types/soknadProptype';
import { ARBEIDSTAKERE } from '../../enums/soknadtyper';

const tagsMedHjelpetekst = {
    [ARBEIDSTAKERE]: [
        EGENMELDINGER,
        FERIE_PERMISJON_UTLAND,
        FERIE,
    ],
};

const harFeriePermisjonUtlandsoppholdSporsmal = (soknad) => {
    return soknad.sporsmal.find((sporsmal) => {
        return sporsmal.tag === FERIE_PERMISJON_UTLAND;
    }) !== undefined;
};

export const harHjelpetekst = (tag, soknad) => {
    const tagsMedHjelpetekstForSoknad = tagsMedHjelpetekst[soknad.soknadstype];
    if (tag === FERIE && soknad.soknadstype === ARBEIDSTAKERE) {
        return harFeriePermisjonUtlandsoppholdSporsmal(soknad)
            ? false
            : tagsMedHjelpetekstForSoknad.includes(fjernIndexFraTag(tag));
    }
    return tagsMedHjelpetekstForSoknad
        ? tagsMedHjelpetekstForSoknad.includes(fjernIndexFraTag(tag))
        : false;
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
