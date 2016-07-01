import React, { PropTypes } from 'react';

const Varselstripe = ({ type, children }) => {
    const typeClass = `varselstripe--${type}`;
    let typeIkon;
    let ikonAlt = 'Info';
    switch (type) {
        case 'suksess': {
            typeIkon = 'ikon-suksess.svg';
            ikonAlt = 'Suksess';
            break;
        }
        case 'feil': {
            typeIkon = 'ikon-utropstegn.svg';
            break;
        }
        case 'info': {
            typeIkon = 'ikon-utropstegn.svg';
            break;
        }
        default: {
            typeIkon = 'ikon-informasjon.svg';
            break;
        }
    }
    return (<div className={`varselstripe ${(type ? typeClass : '')}`}>
        <div className="varselstripe__ikon">
            <img src={`/sykefravaer/img/modig-frontend/ikoner-svg/${typeIkon}`} alt={ikonAlt} />
        </div>
        {children}
    </div>);
};

Varselstripe.propTypes = {
    type: PropTypes.string,
    children: PropTypes.object,
};

export default Varselstripe;
