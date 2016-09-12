import React, { PropTypes } from 'react';

const Varselstripe = ({ type = 'default', children }) => {
    const typeClass = `varselstripe--${type}`;
    const modigFrontendIkonRot = '/sykefravaer/img/modig-frontend/ikoner-svg/';
    let typeIkon;
    let ikonAlt = 'Info';

    switch (type) {
        case 'suksess': {
            typeIkon = `${modigFrontendIkonRot}ikon-suksess.svg`;
            ikonAlt = 'Suksess';
            break;
        }
        case 'feil': {
            typeIkon = `${modigFrontendIkonRot}ikon-utropstegn.svg`;
            break;
        }
        case 'info': {
            typeIkon = `${modigFrontendIkonRot}ikon-utropstegn.svg`;
            break;
        }
        case 'avbrutt': {
            typeIkon = '/sykefravaer/img/svg/avbryt-sykmelding-roed.svg';
            ikonAlt = 'Avbrutt';
            break;
        }
        default: {
            typeIkon = `${modigFrontendIkonRot}ikon-informasjon.svg`;
            break;
        }
    }
    return (<div className={`varselstripe ${(type ? typeClass : '')}`}>
        <div className="varselstripe__ikon">
            <img src={typeIkon} alt={ikonAlt} />
        </div>
        {children}
    </div>);
};

Varselstripe.propTypes = {
    type: PropTypes.string,
    children: PropTypes.object,
};

export default Varselstripe;
