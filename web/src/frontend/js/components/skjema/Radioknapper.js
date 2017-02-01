import React, { PropTypes } from 'react';
import Feilomrade from './Feilomrade';

export const Radioknapp = ({ input, value, children, id, label }) => {
    return (<div>
        <div className="skjema__input">
            <input id={id} className="radioknapp" type="radio" {...input} checked={input.value.toString() === value.toString()} value={value} onBlur={() => {
                input.onBlur();
            }} />
            <label htmlFor={id}>{label}</label>
        </div>
        {input.value === value && children}
    </div>);
};

Radioknapp.propTypes = {
    input: PropTypes.object,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
    children: PropTypes.object,
    id: PropTypes.string,
    label: PropTypes.string,
};

const Radioknapper = ({ input, meta, spoersmal, Overskrift = 'h3', children, horisontal = false }) => {
    return (<Feilomrade {...meta}>
        <Overskrift className="skjema__sporsmal">{spoersmal}</Overskrift>
        <div className={horisontal ? 'inputgruppe inputgruppe--horisontal' : 'inputgruppe'}>
            {
                children.map((radioknapp, index) => {
                    return <Radioknapp key={index} input={input} id={`${input.name}-${index}`} {...radioknapp.props} />;
                })
            }
        </div>
    </Feilomrade>);
};

Radioknapper.propTypes = {
    input: PropTypes.object,
    meta: PropTypes.object,
    spoersmal: PropTypes.string,
    Overskrift: PropTypes.string,
    children: PropTypes.array,
    horisontal: PropTypes.bool,
};

export default Radioknapper;
