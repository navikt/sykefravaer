import React from 'react';
import { getLedetekst } from 'digisyfo-npm';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Radioknapper from '../skjema/Radioknapper';
import SporsmalMedTillegg from '../skjema/SporsmalMedTillegg';
import { childEllerChildren, fieldPropTypes, sporsmal as sporsmalPt, soknad as soknadPt } from '../../propTypes';
import { formaterEnkeltverdi, genererParseForEnkeltverdi, tagMatcher } from './fieldUtils';
import { JA, NEI } from '../../enums/svarEnums';
import SporsmalBjornKondisjonell from './SporsmalBjornKondisjonell';
import SporsmalBjorn from './SporsmalBjorn';
import { getOnChange } from '../../utils/soknad-felles/getOnChange';
import SporsmalHjelpetekst from './SporsmalHjelpetekst';
import {
    INNTEKTSKILDE_ARBEIDSFORHOLD_ER_DU_SYKMELDT,
    INNTEKTSKILDE_JORDBRUKER_ER_DU_SYKMELDT,
    INNTEKTSKILDE_FRILANSER_ER_DU_SYKMELDT,
    INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA_ER_DU_SYKMELDT,
} from '../../enums/tagtyper';

const jaEllerNeiAlternativer = [JA, NEI];

const visInfotekst = (tag, value) => {
    return value === JA && tagMatcher([
        INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA_ER_DU_SYKMELDT,
        INNTEKTSKILDE_ARBEIDSFORHOLD_ER_DU_SYKMELDT,
        INNTEKTSKILDE_JORDBRUKER_ER_DU_SYKMELDT,
        INNTEKTSKILDE_FRILANSER_ER_DU_SYKMELDT,
    ], tag);
};

const JaEllerNeiInfotekst = ({ tag, value }) => {
    return visInfotekst(tag, value)
        ? <p>Infotekst</p>
        : null;
};

export const JaEllerNeiRadioknapper = (props) => {
    return (<Radioknapper {...props} name={props.input.name} spoersmal={props.sporsmalstekst}>
        {
            jaEllerNeiAlternativer
                .map((alternativ, index) => {
                    return (<i
                        value={alternativ}
                        label={getLedetekst(`soknad.${alternativ.toLowerCase()}`)}
                        key={index}>
                        <JaEllerNeiInfotekst tag={props.tag} value={props.input.value} />
                    </i>);
                })
        }
    </Radioknapper>);
};

JaEllerNeiRadioknapper.propTypes = {
    input: fieldPropTypes.input,
    intro: PropTypes.string,
    sporsmalstekst: PropTypes.string,
};

export const RendreJaEllerNei = (props) => {
    const classNames = props.hovedsporsmal ? 'hovedsporsmal blokk--xs' : null;
    const classNamesTilleggssporsmal = props.hovedsporsmal ? 'hovedsporsmal__tilleggssporsmal' : null;
    const hjelpetekst = <SporsmalHjelpetekst tag={props.tag} />;
    const Sporsmal = <JaEllerNeiRadioknapper {...props} hjelpetekst={hjelpetekst} />;
    if (props.undersporsmal.length === 0) {
        return Sporsmal;
    }
    return (<SporsmalMedTillegg
        {...props}
        Sporsmal={Sporsmal}
        className={classNames}
        visTillegg={(_props) => {
            return _props.input.value === _props.kriterieForVisningAvUndersporsmal;
        }}>
        <div className={classNamesTilleggssporsmal}>{props.children}</div>
        <SporsmalBjorn tag={props.tag} className="press" />
    </SporsmalMedTillegg>);
};

RendreJaEllerNei.propTypes = {
    children: childEllerChildren,
    undersporsmal: PropTypes.arrayOf(sporsmalPt),
    hovedsporsmal: PropTypes.bool,
    tag: PropTypes.string,
};

const JaEllerNei = (props) => {
    return ([
        <Field
            onChange={getOnChange(props)}
            key={`${props.id}-field`}
            format={formaterEnkeltverdi}
            parse={genererParseForEnkeltverdi(props.id)}
            component={RendreJaEllerNei}
            {...props} />,
        <SporsmalBjornKondisjonell
            soknad={props.soknad}
            key={`${props.id}-sporsmalbjorn`}
            tag={props.tag} />]);
};

JaEllerNei.propTypes = {
    id: PropTypes.string,
    tag: PropTypes.string,
    soknad: soknadPt.isRequired,
};

export default JaEllerNei;
