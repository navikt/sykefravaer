import React, { PropTypes } from 'react';

const HendelseIkon = ({ type }) => {
    const status = {};

    switch (type) {
        case 'FØRSTE_SYKMELDINGSDAG': {
            status.ikonClassName = 'hendelse-ikon-start';
            status.ikon = 'plaster';
            break;
        }
        case 'AKTIVITETSKRAV_VARSEL': {
            status.ikonClassName = 'hendelse-ikon-varsel';
            status.ikon = 'tidslinje-utropstegn';
            break;
        }
        case 'TITTEL':
        case 'TID': {
            status.ikonClassName = 'hendelse-ikon-klokke';
            status.ikon = 'tidslinje-klokke';
            break;
        }
        default: {
            status.ikonClassName = 'hendelse-ikon-sirkel';
            status.ikon = 'tidslinje-sirkel';
            break;
        }
    }

    return (<div className={`hendelse-ikon ${status.ikonClassName}`}>
            <img className="hendelse-img" src={`/sykefravaer/img/svg/${status.ikon}.svg`} alt="" />
            <img className="hendelse-img-hoykontrast" src={`/sykefravaer/img/svg/${status.ikon}-highcontrast.svg`} alt="" />
        </div>);
};

HendelseIkon.propTypes = {
    type: PropTypes.string,
};

export default HendelseIkon;