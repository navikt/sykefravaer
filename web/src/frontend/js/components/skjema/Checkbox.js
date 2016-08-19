import React, { PropTypes } from 'react';

const Checkbox = ({ id, name, label, erValgt = false, changeHandler, children }) => {
    return (<div className="nav-input">
        <input className="nav-checkbox" id={id} name={name} type="checkbox" checked={erValgt} onChange={changeHandler} />
        <label htmlFor={`checkbox-${id}`}>{label}</label>
        {
            erValgt && children
        }
    </div>);
};

Checkbox.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    erValgt: PropTypes.bool,
    changeHandler: PropTypes.func,
    children: PropTypes.object,
};

export default Checkbox;
