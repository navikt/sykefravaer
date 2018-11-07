import React from 'react';
import { getLedetekst } from 'digisyfo-npm';
import PropTypes from 'prop-types';
import { ARBEIDSTAKERE } from '../../enums/soknadtyper';
import {
    INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD_ER_DU_SYKMELDT,
    INNTEKTSKILDE_ARBEIDSFORHOLD_ER_DU_SYKMELDT,
    INNTEKTSKILDE_FRILANSER_ER_DU_SYKMELDT,
    INNTEKTSKILDE_JORDBRUKER_ER_DU_SYKMELDT,
    INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA_ER_DU_SYKMELDT,
    INNTEKTSKILDE_SELVSTENDIG_ER_DU_SYKMELDT,
} from '../../enums/tagtyper';
import { JA } from '../../enums/svarEnums';
import { fjernIndexFraTag } from './fieldUtils';
import { soknad as soknadPt } from '../../propTypes';

const visPresisering = (tag, value, soknadstype) => {
    const tagsMedPresisering = {
        [ARBEIDSTAKERE]: {
            [INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD_ER_DU_SYKMELDT]: JA,
            [INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA_ER_DU_SYKMELDT]: JA,
            [INNTEKTSKILDE_ARBEIDSFORHOLD_ER_DU_SYKMELDT]: JA,
            [INNTEKTSKILDE_SELVSTENDIG_ER_DU_SYKMELDT]: JA,
            [INNTEKTSKILDE_JORDBRUKER_ER_DU_SYKMELDT]: JA,
            [INNTEKTSKILDE_FRILANSER_ER_DU_SYKMELDT]: JA,
        },
    };
    return tagsMedPresisering[soknadstype]
        && tagsMedPresisering[soknadstype][fjernIndexFraTag(tag)] === value;
};

const JaEllerNeiPresisering = ({ tag, value, soknad }) => {
    return visPresisering(tag, value, soknad.soknadstype)
        ? <div className="presisering blokk">
            <p className="sist">{getLedetekst(`soknad.infotekst.${fjernIndexFraTag(tag).toLowerCase()}`)}</p>
        </div>
        : null;
};

JaEllerNeiPresisering.propTypes = {
    tag: PropTypes.string,
    value: PropTypes.string,
    soknad: soknadPt,
};

export default JaEllerNeiPresisering;
