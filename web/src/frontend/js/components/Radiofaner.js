import React, { PropTypes } from 'react';
import Hjelpetekst from './skjema/Hjelpetekst';

const Radiofaner = ({ alternativer = [], valgtAlternativ, changeHandler, className, radioName }) => {
    return (<div className="radiofaner-container">
        <ul className={`radiofaner ${className}`}>
            {
                alternativer.map((a, index) => {
                    const erValgt = a.verdi === valgtAlternativ;
                    const liClassName = a.hjelpetekst ? ' med-hjelpetekst' : '';
                    return (<li className={`nav-input${liClassName}`} key={index}>
                        <input
                            type="radio"
                            className={`nav-radioknapp nav-radioknapp--mork js-${a.verdi}`}
                            name={radioName}
                            value={a.verdi}
                            id={`radio-${a.verdi}`}
                            checked={erValgt}
                            onChange={() => {changeHandler(a.verdi);}} />
                        <label htmlFor={`radio-${a.verdi}`}>{a.tittel}</label>
                        {
                            a.hjelpetekst ?
                            <Hjelpetekst id="velg-arbeidssituasjon" {...a.hjelpetekst} /> : null
                        }
                    </li>);
                })
            }
        </ul>
    </div>);
};

Radiofaner.propTypes = {
    alternativer: PropTypes.array,
    changeHandler: PropTypes.func,
    valgtAlternativ: PropTypes.string,
    className: PropTypes.string,
    radioName: PropTypes.string,
};

export default Radiofaner;
