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

export const RendreJaEllerNei = (props) => {
    const { intro, input, children, verdi = true } = props;
    const visTillegg = (input.value === verdi) && children;
    return (<div className="blokk--xs">
        <div className={`hovedsporsmal ${visTillegg ? 'hovedsporsmal--medTillegg' : ''}`}>
            { intro && <p className="skjema__sporsmal blokk--s js-intro">{intro}</p> }
            <JaEllerNeiRadioknapper {...props} />
        </div>
        {
            visTillegg ? <div className="tilleggssporsmal js-tillegg">
                {children}
            </div> : null
        }
    </div>);
};

RendreJaEllerNei.propTypes = {
    intro: PropTypes.string,
    input: PropTypes.object,
    verdi: PropTypes.bool,
    children: PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object,
    ]),
};

export const parseJaEllerNei = (value) => {
    return value === 'true' || value === 'false' ? value === 'true' : value;
};

const JaEllerNei = (props) => {
    return <Field component={RendreJaEllerNei} {...props} parse={parseJaEllerNei} />;
};

JaEllerNei.protoTypes = {
    verdi: PropTypes.bool,
};

export default JaEllerNei;
