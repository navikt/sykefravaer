import React, { Component, PropTypes } from 'react';
import Radioknapper from '../skjema/Radioknapper';
import SporsmalMedTillegg from '../skjema/SporsmalMedTillegg';
import { Field } from 'redux-form';

export const jaEllerNeiAlternativer = [{
    value: true,
    label: 'Ja',
}, {
    value: false,
    label: 'Nei',
}];

export const JaEllerNeiRadioknapper = (props) => {
    return (<div>
        { props.intro && <p className="skjema__sporsmal blokk--s js-intro">{props.intro}</p> }
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
    input: PropTypes.object,
    intro: PropTypes.string,
};

const RendreJaEllerNei = (props) => {
    const Sporsmal = <JaEllerNeiRadioknapper {...props} />
    return (<SporsmalMedTillegg {...props} Sporsmal={Sporsmal} className="hovedsporsmal blokk--xs" visTillegg={(_props) => {
        const { input, children, verdiMedTilleggssporsmal = true } = _props;
        return (input.value === verdiMedTilleggssporsmal) && children ? true : false;
    }}>
        <div className="tilleggssporsmal">{props.children}</div>
    </SporsmalMedTillegg>);
}

export const parseJaEllerNei = (value) => {
    return value === 'true' || value === 'false' ? value === 'true' : value;
};

const JaEllerNei = (props) => {
    return <Field component={RendreJaEllerNei} {...props} parse={parseJaEllerNei} />;
};

export default JaEllerNei;
