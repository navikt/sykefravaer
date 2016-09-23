import React, { PropTypes } from 'react';

const Radioknapp = ({ value, label, erValgt, name, onChange, id, labelSekundaer, children }) => {
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
                        {labelSekundaer ? <span className="sekundaerLabel">{labelSekundaer}</span> : null}
                    </label>
                    { erValgt && children }
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
    labelSekundaer: PropTypes.string,
    children: PropTypes.object,
};

export default Radioknapp;
