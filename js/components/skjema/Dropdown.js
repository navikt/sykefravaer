import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'nav-frontend-skjema';

const Dropdown = ({
    alternativer, valgtAlternativ, ariaControls, id, onChange, label,
}) => {
    return (
        <Select
            label={label}
            onChange={(event) => {
                onChange(event.target.value);
            }}
            selected={valgtAlternativ}
            aria-controls={ariaControls}
            id={id}>
            {alternativer.map((alt, idx) => {
                return (
                    <option
                        className={`js-${alt.verdi}`}
                        key={`${id}-${idx}`}
                        value={alt.verdi}>
                        {alt.tekst}
                    </option>
                );
            })}
        </Select>
    );
};

Dropdown.propTypes = {
    label: PropTypes.string,
    alternativer: PropTypes.arrayOf(PropTypes.shape({
        tekst: PropTypes.string,
        verdi: PropTypes.string,
    })),
    valgtAlternativ: PropTypes.string,
    ariaControls: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func,
};

Dropdown.defaultProps = {
    onChange: () => {},
};

export default Dropdown;
