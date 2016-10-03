import React, { PropTypes } from 'react';

export const getIkon = (type) => {
    const ikon = {};

    switch (type) {
        case 'FØRSTE_SYKMELDINGSDAG': {
            ikon.className = 'tidslinjeHendelse__ikon--start';
            ikon.bilde = 'plaster';
            break;
        }
        case 'AKTIVITETSKRAV_VARSEL': {
            ikon.className = 'tidslinjeHendelse__ikon--varsel';
            ikon.bilde = 'varsel';
            break;
        }
        case 'TITTEL':
        case 'TID': {
            ikon.className = 'tidslinjeHendelse__ikon--klokke';
            ikon.bilde = 'klokke';
            break;
        }
        default: {
            ikon.className = 'tidslinjeHendelse__ikon--sirkel';
            ikon.bilde = 'sirkel';
            break;
        }
    }

    return ikon;
};

const HendelseIkon = ({ type }) => {
    const ikonData = getIkon(type);
    return (<div className={`tidslinjeHendelse__ikon ${ikonData.className}`}>
            <img className="tidslinjeHendelse__img" src={`/sykefravaer/img/tidslinje/${ikonData.bilde}.svg`} alt="" />
            <img className="tidslinjeHendelse__img--hoykontrast" src={`/sykefravaer/img/tidslinje/${ikonData.bilde}-highcontrast.svg`} alt="" />
        </div>);
};

HendelseIkon.propTypes = {
    type: PropTypes.string,
};

export default HendelseIkon;
