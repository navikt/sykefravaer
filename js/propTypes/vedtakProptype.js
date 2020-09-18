import PropTypes from 'prop-types';

export const utbetalingslinjeDto = PropTypes.shape({
    fom: PropTypes.string,
    tom: PropTypes.string,
    dagsats: PropTypes.number,
    beløp: PropTypes.number,
    grad: PropTypes.number,
    sykedager: PropTypes.number,
});

export const utbetalingDto = PropTypes.shape({
    mottaker: PropTypes.string,
    fagområde: PropTypes.string,
    totalbeløp: PropTypes.number,
    utbetalingslinjer: PropTypes.arrayOf(utbetalingslinjeDto),
});

export const vedtakDto = PropTypes.shape({
    fom: PropTypes.string,
    tom: PropTypes.string,
    forbrukteSykedager: PropTypes.number,
    gjenståendeSykedager: PropTypes.number,
    utbetalinger: PropTypes.arrayOf(utbetalingDto),
    dokumenter: PropTypes.object,
});

export const vedtakPt = PropTypes.shape({
    id: PropTypes.string,
    lest: PropTypes.bool,
    opprettet: PropTypes.string,
    vedatkDto: vedtakDto,
});
