import React, { PropTypes } from 'react';

export const getIkon = (type) => {
    const ikon = {};

    switch (type) {
        case 'FØRSTE_SYKMELDINGSDAG': {
            ikon.className = 'hendelse-ikon-start';
            ikon.bilde = 'plaster';
            break;
        }
        case 'AKTIVITETSKRAV_VARSEL': {
            ikon.className = 'hendelse-ikon-varsel';
            ikon.bilde = 'varsel';
            break;
        }
        case 'TITTEL':
        case 'TID': {
            ikon.className = 'hendelse-ikon-klokke';
            ikon.bilde = 'klokke';
            break;
        }
        default: {
            ikon.className = 'hendelse-ikon-sirkel';
            ikon.bilde = 'sirkel';
            break;
        }
    }

    return ikon;
};

const HendelseIkon = ({ type }) => {
    const ikonData = getIkon(type);
    return (<div className={`hendelse-ikon ${ikonData.className}`}>
            <img className="hendelse-img" src={`/sykefravaer/img/tidslinje/${ikonData.bilde}.svg`} alt="" />
            <img className="hendelse-img-hoykontrast" src={`/sykefravaer/img/tidslinje/${ikonData.bilde}-highcontrast.svg`} alt="" />
        </div>);
};

HendelseIkon.propTypes = {
    type: PropTypes.string,
};

export default HendelseIkon;
