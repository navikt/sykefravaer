import React from 'react';
import PropTypes from 'prop-types';
import { getLabelId } from './Radioknapper';

const Checkbox = ({ input, label, id, children }) => {
    return (<div className="checkboksContainer" id={`cb-${id}`}>
        <div className="skjema__input">
            <input id={id} type="checkbox" className="checkboks" checked={input.value} {...input} />
            <label id={getLabelId(id)} htmlFor={id}>{label}</label>
        </div>
        {
            input.value === true && children && <div className="ekstrasporsmal">{children}</div>
        }
    </div>);
};

Checkbox.propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    id: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]),
};

export default Checkbox;
