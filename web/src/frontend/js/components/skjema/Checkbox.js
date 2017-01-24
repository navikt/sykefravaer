import React, { PropTypes } from 'react';

const Checkbox = ({ input, label, id, children }) => {
    return (<div className="checkboksContainer" id={`cb-${id}`}>
        <div className="skjema__input">
            <input id={id} type="checkbox" className="checkboks" checked={input.value} {...input} />
            <label htmlFor={id}>{label}</label>
        </div>
        {
            input.value === true && children && <div className="ekstraspoersmal">{children}</div>
        }
    </div>);
};

Checkbox.propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    id: PropTypes.string,
    children: PropTypes.object,
};

export default Checkbox;
