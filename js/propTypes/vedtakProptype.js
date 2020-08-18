import PropTypes from 'prop-types';
import * as dokumentTyper from '../enums/dokumentTyper';

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

export const dokument = PropTypes.shape({
    dokumentId: PropTypes.string,
    type: PropTypes.oneOf(Object.values(dokumentTyper)),
});

export const vedtakDto = PropTypes.shape({
    fom: PropTypes.string,
    tom: PropTypes.string,
    forbrukteSykedager: PropTypes.number,
    gjenståendeSykedager: PropTypes.number,
    utbetalinger: PropTypes.arrayOf(utbetalingDto),
    dokumenter: PropTypes.arrayOf(dokument),
});

export const vedtakPt = PropTypes.shape({
    id: PropTypes.string,
    lest: PropTypes.bool,
    opprettet: PropTypes.string,
    vedatkDto: vedtakDto,
});
