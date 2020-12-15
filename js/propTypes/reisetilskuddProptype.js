import PropTypes from 'prop-types';

export const kvittering = PropTypes.shape({
    reisetilskuddId: PropTypes.string,
    kvitteringId: PropTypes.string,
    navn: PropTypes.string,
    storrelse: PropTypes.number,
    belop: PropTypes.number,
    fom: PropTypes.string,
    tom: PropTypes.string,
    transportmiddel: PropTypes.string,
});

export const reisetilskuddPt = PropTypes.shape({
    fnr: PropTypes.string,
    fom: PropTypes.string,
    tom: PropTypes.string,
    orgNavn: PropTypes.string,
    orgNumber: PropTypes.string,
    utbetalingTilArbeidsgiver: PropTypes.bool,
    går: PropTypes.bool,
    sykler: PropTypes.bool,
    kollektivtransport: PropTypes.number,
    egenBil: PropTypes.number,
    reisetilskuddId: PropTypes.string,
    sykmeldingId: PropTypes.string,
    kvitteringer: PropTypes.arrayOf(kvittering),
});
