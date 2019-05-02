import PropTypes from 'prop-types';
import * as behandlingsutfallstatuser from '../enums/behandlingsutfallstatuser';

const ruleHitPt = PropTypes.shape({
    ruleName: PropTypes.string,
    messageForSender: PropTypes.string,
    messageForUser: PropTypes.string,
});

const behandlingsutfallPt = PropTypes.shape({
    status: PropTypes.oneOf(Object.values(behandlingsutfallstatuser)),
    ruleHits: PropTypes.arrayOf(ruleHitPt),
});

export const smSykmeldingPt = PropTypes.shape({
    id: PropTypes.string.isRequired,
    behandlingsutfall: behandlingsutfallPt.isRequired,
    bekreftetDato: PropTypes.instanceOf(Date),
    legeNavn: PropTypes.string,
});

export const smSykmeldingerPt = PropTypes.arrayOf(smSykmeldingPt);

