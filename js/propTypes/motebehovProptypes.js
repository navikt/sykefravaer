import PropTypes from 'prop-types';

export const motebehovPt = PropTypes.shape({
    motebehovSvar: PropTypes.shape({
        friskmeldingForventning: PropTypes.string,
        tiltak: PropTypes.string,
        tiltakResultat: PropTypes.string,
        harMotebehov: PropTypes.bool,
        forklaring: PropTypes.string,
    }),
});

export const motebehovReducerPt = PropTypes.shape({
    henter: PropTypes.bool,
    hentet: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    data: motebehovPt,
});

export const motebehovReducerATPt = PropTypes.shape({
    henter: PropTypes.bool,
    hentet: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    data: PropTypes.arrayOf(motebehovPt),
});

export const motebehovSvarReducerPt = PropTypes.shape({
    sender: PropTypes.bool,
    sendt: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
});
