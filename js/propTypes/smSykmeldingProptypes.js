import PropTypes from 'prop-types';
import * as behandlingsutfallstatuser from '../enums/behandlingsutfallstatuser';
import {
    AKTIVITET_IKKE_MULIG, AVVENTENDE, BEHANDLINGSDAGER, GRADERT, REISETILSKUDD,
} from '../sykmeldinger/enums/sykmeldingskjemaenums';

const ruleHitPt = PropTypes.shape({
    ruleName: PropTypes.string,
    messageForSender: PropTypes.string,
    messageForUser: PropTypes.string,
    ruleStatus: PropTypes.oneOf(Object.values(behandlingsutfallstatuser)),
});

const behandlingsutfallPt = PropTypes.shape({
    status: PropTypes.oneOf(Object.values(behandlingsutfallstatuser)),
    ruleHits: PropTypes.arrayOf(ruleHitPt),
});

const smGradertPt = PropTypes.shape({
    grad: PropTypes.number.isRequired,
    reisetilskudd: PropTypes.bool.isRequired,
});

export const smSykmeldingPeriodePt = PropTypes.shape({
    fom: PropTypes.instanceOf(Date).isRequired,
    tom: PropTypes.instanceOf(Date).isRequired,
    gradert: smGradertPt,
    behandlingsdager: PropTypes.number,
    innspillTilArbeidsgiver: PropTypes.string,
    type: PropTypes.oneOf(AKTIVITET_IKKE_MULIG, AVVENTENDE, BEHANDLINGSDAGER, GRADERT, REISETILSKUDD).isRequired,
});

export const smSykmeldingPerioderPt = PropTypes.arrayOf(smSykmeldingPeriodePt);

export const smArbeidsgiverPt = PropTypes.shape({
    navn: PropTypes.string.isRequired,
    stillingsprosent: PropTypes.number.isRequired,
});

export const smDiagnosePt = PropTypes.shape({
    diagnosekode: PropTypes.string,
    diagnosesystem: PropTypes.string,
    diagnosetekst: PropTypes.string,
});

export const smMedisinskVurderingPt = PropTypes.shape({
    hovedDiagnose: smDiagnosePt,
    biDiagnoser: PropTypes.arrayOf(smDiagnosePt),
});

// Types minimum required fields of the status object. The rest is not of intereset
export const smSykmeldingStatusPt = PropTypes.shape({
    timestamp: PropTypes.instanceOf(Date).isRequired,
    statusEvent: PropTypes.oneOf('SENDT', 'APEN', 'AVBRUTT', 'UTGATT', 'BEKREFTET').isRequired,
});

// Types minimum required fields of the status object. The rest is not of intereset
export const smBehandlerPt = PropTypes.shape({
    fornavn: PropTypes.string.isRequired,
    mellomnavn: PropTypes.string,
    etternavn: PropTypes.string.isRequired,
});

export const smSykmeldingPt = PropTypes.shape({
    id: PropTypes.string.isRequired,
    behandlingsutfall: behandlingsutfallPt.isRequired,
    mottattTidspunkt: PropTypes.instanceOf(Date),
    legekontorOrgnummer: PropTypes.string,
    arbeidsgiver: smArbeidsgiverPt,
    sykmeldingsperioder: smSykmeldingPerioderPt,
    medisinskVurdering: smMedisinskVurderingPt,
    sykmeldingStatus: smSykmeldingStatusPt.isRequired,
    behandler: smBehandlerPt.isRequired,
});

export const smSykmeldingerPt = PropTypes.arrayOf(smSykmeldingPt);
