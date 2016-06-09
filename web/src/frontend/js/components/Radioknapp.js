import React, { PropTypes } from 'react';

const Radioknapp = ({ value, label, erValgt, name, onChange, id }) => {
    return (<div>
                <div className="nav-input">
                    <input name={name} type="radio"
                        value={value}
                        onChange={() => {
                            onChange(value);
                        }}
                        className="nav-radioknapp"
                        checked={erValgt}
                        id={`radio-${id}`} />
                    <label htmlFor={`radio-${id}`}>
                        {label}
                    </label>
                </div>
            </div>);
};

Radioknapp.propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    erValgt: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    id: PropTypes.string.isRequired,
};

export default Radioknapp;
