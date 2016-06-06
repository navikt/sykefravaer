import React, { PropTypes } from 'react';

const Faner = ({ alternativer = [], valgtAlternativ, clickHandler, className }) => {
    return (<ul className={`faner ${className}`}>
        {
            alternativer.map((a, index) => {
                const erValgt = a.verdi === valgtAlternativ;
                return (<li key={index}>
                    <a
                        role="button"
                        aria-pressed={erValgt}
                        className={erValgt ? `er-valgt js-er-valgt js-${a.verdi}` : `js-${a.verdi}`}
                        href="#"
                        onClick={(e) => { clickHandler(e, a.verdi); }}>{a.tittel}</a>
                </li>);
            })
        }
    </ul>);
};

Faner.propTypes = {
    alternativer: PropTypes.array,
    clickHandler: PropTypes.func,
    valgtAlternativ: PropTypes.string,
    className: PropTypes.string,
};

export default Faner;
