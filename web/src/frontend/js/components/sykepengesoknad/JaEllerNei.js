import React, { PropTypes } from 'react';
import Radioknapper from '../skjema/Radioknapper';
import { Field } from 'redux-form';

export const jaEllerNeiAlternativer = [{
    value: true,
    label: 'Ja',
}, {
    value: false,
    label: 'Nei',
}];

export const JaEllerNeiRadioknapper = (props) => {
    return (<Radioknapper {...props} name={props.input.name}>
        {
            jaEllerNeiAlternativer.map((alternativ, index) => {
                return <input {...alternativ} key={index} />;
            })
        }
    </Radioknapper>);
};

JaEllerNeiRadioknapper.propTypes = {
    input: PropTypes.object,
};

const JaEllerNei = (props) => {
    const { intro, input, children } = props;
    const visTillegg = input.value && children;
    return (<div className="blokk--xs">
        <div className={`hovedsporsmal ${visTillegg ? 'hovedsporsmal--medTillegg' : ''}`}>
            { intro && <p className="skjema__sporsmal blokk--s">{intro}</p> }
            <JaEllerNeiRadioknapper {...props} />
        </div>
        {
            visTillegg && <div className="tilleggssporsmal">
                {children}
            </div>
        }
    </div>);
};

JaEllerNei.propTypes = {
    intro: PropTypes.string,
    input: PropTypes.object,
    children: PropTypes.object,
};

export const parseJaEllerNei = (value) => {
    return value === 'true' || value === 'false' ? value === 'true' : value;
};

const JaEllerNeiField = (props) => {
    return <Field component={JaEllerNei} {...props} parse={parseJaEllerNei} />;
};

export default JaEllerNeiField;
