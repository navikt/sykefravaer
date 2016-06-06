import React, { PropTypes } from 'react';

const Dropdown = ({ alternativer = [], valgtAlternativ = '', onChange, ariaControls, id }) => {
    return (<select onChange={(event) => {onChange(event.target.value);}} defaultValue={valgtAlternativ} aria-controls={ariaControls} id={id}>
                {alternativer.map((alt, idx) => {
                    return (<option className={`${alt.skjult === true ? 'er-skjult' : ''}`} key={idx}
                        value={alt.verdi}>{alt.tekst}</option>);
                })}
            </select>);
};

Dropdown.propTypes = {
    alternativer: PropTypes.array,
    valgtAlternativ: PropTypes.string,
    ariaControls: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func,
};

Dropdown.defaultProps = {
    onChange: () => {
        return;
    },
};

export default Dropdown;
