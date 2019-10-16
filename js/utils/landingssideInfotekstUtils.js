import PropTypes from 'prop-types';

export const visInfotekst = (str) => {
    if (str.includes('MANGLER LEDETEKST')) {
        return false;
    }
    return !!(str.length > 0 && str.trim());
};

visInfotekst.PropTypes = {
    str: PropTypes.string,
};
