import React, { PropTypes } from 'react';

const Radiofaner = ({ alternativer = [], valgtAlternativ, changeHandler, className, radioName }) => {
    return (<div className="radiofaner-container"><ul className={`radiofaner ${className}`}>
        {
            alternativer.map((a, index) => {
                const erValgt = a.verdi === valgtAlternativ;
                return (<li className="nav-input" key={index}>
                    <input
                        type="radio"
                        className={`nav-radioknapp nav-radioknapp--mork js-${a.verdi}`}
                        name={radioName}
                        value={a.verdi}
                        id={`radio-${a.verdi}`}
                        checked={erValgt}
                        onChange={() => {changeHandler(a.verdi);}} />
                    <label htmlFor={`radio-${a.verdi}`}>{a.tittel}</label>
                </li>);
            })
        }
    </ul></div>);
};

Radiofaner.propTypes = {
    alternativer: PropTypes.array,
    changeHandler: PropTypes.func,
    valgtAlternativ: PropTypes.string,
    className: PropTypes.string,
    radioName: PropTypes.string,
};

export default Radiofaner;
