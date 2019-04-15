import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Radioknapper from './Radioknapper';
import SporsmalMedTillegg from './SporsmalMedTillegg';
import { fieldPropTypes, childEllerChildren } from '../../propTypes/index';
import { Vis } from '../../utils/index';

export const jaEllerNeiAlternativer = [{
    value: true,
    label: 'Ja',
}, {
    value: false,
    label: 'Nei',
}];

export const JaEllerNeiRadioknapper = (props) => {
    return (<div>
        <Vis
            hvis={props.intro}
            render={() => {
                return (<p className="skjema__sporsmal blokk--s js-intro">{props.intro}</p>);
            }} />
        <Radioknapper {...props} name={props.input.name}>
            {
                jaEllerNeiAlternativer.map((alternativ, index) => {
                    return <input {...alternativ} key={index} />;
                })
            }
        </Radioknapper>
    </div>);
};

JaEllerNeiRadioknapper.propTypes = {
    input: fieldPropTypes.input,
    intro: PropTypes.string,
};

export const RendreJaEllerNei = (props) => {
    const Sporsmal = <JaEllerNeiRadioknapper {...props} />;
    return (<SporsmalMedTillegg
        {...props}
        Sporsmal={Sporsmal}
        className="hovedsporsmal"
        visTillegg={(_props) => {
            const { input, children, verdiMedTilleggssporsmal = true } = _props;
            return !!((input.value === verdiMedTilleggssporsmal) && children);
        }}>
        <div className="hovedsporsmal__tilleggssporsmal">{props.children}</div>
    </SporsmalMedTillegg>);
};

RendreJaEllerNei.propTypes = {
    children: childEllerChildren,
};

export const parseJaEllerNei = (value) => {
    return value === 'true' || value === 'false'
        ? value === 'true'
        : value;
};

const JaEllerNei = (props) => {
    return <Field component={RendreJaEllerNei} {...props} parse={parseJaEllerNei} />;
};

export default JaEllerNei;
