import React, { PropTypes } from 'react';
import Feilomrade from './Feilomrade';

export const getLabelId = (id) => {
    const nyId = id
        .split('.').join('-')
        .split('[').join('-')
        .split(']').join('-');
    return `label-${nyId}`;
};

export const Radioknapp = ({ input, value, children, id, label, checked, labelSekundaer, disabled, visUndertekst }) => {
    return (<div>
        <div className={`skjema__input ${disabled ? 'skjema__input--inaktiv' : ''}`}>
            <input id={id} className="radioknapp" type="radio" {...input} disabled={disabled} checked={checked || input.value.toString() === value.toString()} value={value} onBlur={() => {
                input.onBlur();
            }} />
            <label id={getLabelId(id)} htmlFor={id}>{label} {labelSekundaer ? <span className="sekundaerLabel">{labelSekundaer}</span> : null}</label>
        </div>
        {input.value === value || disabled && children}
        {visUndertekst && !disabled && children}
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
    checked: PropTypes.bool,
    labelSekundaer: PropTypes.string,
    disabled: PropTypes.bool,
    visUndertekst: PropTypes.bool,
};

const Radioknapper = ({ input, meta, spoersmal, Overskrift = 'h3', children, horisontal = false, hjelpetekst, hjelpelinje, visUndertekst }) => {
    return (<Feilomrade {...meta} id={input.name}>
        <div className={`${hjelpetekst ? 'medHjelpetekst' : ''}`}>
            <Overskrift className="skjema__sporsmal">{spoersmal}</Overskrift>
            { hjelpetekst }
        </div>
        { hjelpelinje }
        <div className={horisontal ? 'inputgruppe inputgruppe--horisontal' : 'inputgruppe'}>
            {
                children.map((radioknapp, index) => {
                    return <Radioknapp key={index} input={input} id={`${input.name}-${index}`} visUndertekst={visUndertekst} {...radioknapp.props} />;
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
    hjelpetekst: PropTypes.object,
    hjelpelinje: PropTypes.object,
    visUndertekst: PropTypes.bool,
};

export default Radioknapper;
