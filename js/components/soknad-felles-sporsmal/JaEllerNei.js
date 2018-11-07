import React from 'react';
import { getLedetekst } from 'digisyfo-npm';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Radioknapper from '../skjema/Radioknapper';
import SporsmalMedTillegg from '../skjema/SporsmalMedTillegg';
import { childEllerChildren, fieldPropTypes, soknad as soknadPt, sporsmal as sporsmalPt } from '../../propTypes';
import { formaterEnkeltverdi, genererParseForEnkeltverdi } from './fieldUtils';
import { JA, NEI } from '../../enums/svarEnums';
import SporsmalBjornKondisjonell from './SporsmalBjornKondisjonell';
import SporsmalBjorn from './SporsmalBjorn';
import { getOnChange } from '../../utils/soknad-felles/getOnChange';
import SporsmalHjelpetekst from './SporsmalHjelpetekst';
import JaEllerNeiPresisering from './JaEllerNeiPresisering';

const jaEllerNeiAlternativer = [JA, NEI];

export const JaEllerNeiRadioknapper = (props) => {
    return (<Radioknapper {...props} name={props.input.name} spoersmal={props.sporsmalstekst}>
        {
            jaEllerNeiAlternativer
                .map((alternativ, index) => {
                    return (<i
                        value={alternativ}
                        label={getLedetekst(`soknad.${alternativ.toLowerCase()}`)}
                        key={index}>
                        <JaEllerNeiPresisering tag={props.tag} value={props.input.value} soknad={props.soknad} />
                    </i>);
                })
        }
    </Radioknapper>);
};

JaEllerNeiRadioknapper.propTypes = {
    input: fieldPropTypes.input,
    intro: PropTypes.string,
    sporsmalstekst: PropTypes.string,
    tag: PropTypes.string,
    soknad: soknadPt,
};

export const RendreJaEllerNei = (props) => {
    const classNames = props.hovedsporsmal ? 'hovedsporsmal blokk--xs' : null;
    const classNamesTilleggssporsmal = props.hovedsporsmal ? 'hovedsporsmal__tilleggssporsmal' : null;
    const hjelpetekst = <SporsmalHjelpetekst tag={props.tag} />;
    const Sporsmal = <JaEllerNeiRadioknapper {...props} hjelpetekst={hjelpetekst} />;
    return props.undersporsmal.length === 0
        ? Sporsmal
        : (<SporsmalMedTillegg
            {...props}
            Sporsmal={Sporsmal}
            className={classNames}
            visTillegg={(_props) => {
                return _props.input.value === _props.kriterieForVisningAvUndersporsmal;
            }}>
            <div className={classNamesTilleggssporsmal}>{props.children}</div>
            <SporsmalBjorn tag={props.tag} soknad={props.soknad} className="press" />
        </SporsmalMedTillegg>);
};

RendreJaEllerNei.propTypes = {
    children: childEllerChildren,
    undersporsmal: PropTypes.arrayOf(sporsmalPt),
    hovedsporsmal: PropTypes.bool,
    tag: PropTypes.string,
    soknad: soknadPt,
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
