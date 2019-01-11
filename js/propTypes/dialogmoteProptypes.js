import PropTypes from 'prop-types';
import * as moteplanleggerDeltakertyper from '../enums/moteplanleggerDeltakerTyper';

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
    data: PropTypes.arrayOf(motebehovPt),
});

export const motebehovSvarReducerPt = PropTypes.shape({
    sender: PropTypes.bool,
    sendt: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
});

export const moteplanleggerAlternativPt = PropTypes.shape({
    id: PropTypes.number,
    tid: PropTypes.instanceOf(Date),
    created: PropTypes.instanceOf(Date),
    sted: PropTypes.string,
    valgt: PropTypes.bool,
});

export const moteplanleggerSvarPt = PropTypes.shape({
    id: PropTypes.number,
    tid: PropTypes.instanceOf(Date),
    created: PropTypes.instanceOf(Date),
    sted: PropTypes.string,
    valgt: PropTypes.bool,
});

export const moteplanleggerDeltakerPt = PropTypes.shape({
    navn: PropTypes.string,
    orgnummer: PropTypes.string,
    type: PropTypes.string,
    svar: PropTypes.arrayOf(moteplanleggerSvarPt),
    svartidspunkt: PropTypes.instanceOf(Date),
});

export const motePt = PropTypes.shape({
    moteUuid: PropTypes.string,
    status: PropTypes.string,
    fnr: PropTypes.string,
    opprettetTidspunkt: PropTypes.instanceOf(Date),
    bekreftetTidspunkt: PropTypes.instanceOf(Date),
    deltakere: PropTypes.arrayOf(moteplanleggerDeltakerPt),
    alternativer: PropTypes.arrayOf(moteplanleggerAlternativPt),
});

export const moteplanleggerDeltakertypePt = PropTypes.oneOf([
    moteplanleggerDeltakertyper.BRUKER,
    moteplanleggerDeltakertyper.ARBEIDSGIVER,
    moteplanleggerDeltakertyper.NAV_VEILEDER,
]);
