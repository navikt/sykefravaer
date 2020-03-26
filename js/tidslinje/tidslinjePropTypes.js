import PropTypes from 'prop-types';

export const tidslinjehendelse = PropTypes.shape({
    antallDager: PropTypes.number,
    bilde: PropTypes.string,
    data: PropTypes.object,
    id: PropTypes.string,
    inntruffetdato: PropTypes.date,
    tekstkey: PropTypes.string,
    type: PropTypes.string,
    erApen: PropTypes.bool,
    medAnimasjon: PropTypes.bool,
    hindreToggle: PropTypes.bool,
    hoyde: PropTypes.string,
    visBudskap: PropTypes.bool,
    alt: PropTypes.number,
});
