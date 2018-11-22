import PropTypes from 'prop-types';

export const evalueringPt = PropTypes.shape({
    effekt: PropTypes.string,
    hvorfor: PropTypes.string,
    videre: PropTypes.string,
    interneaktiviteter: PropTypes.bool,
    ekstratid: PropTypes.bool,
    bistand: PropTypes.bool,
    ingen: PropTypes.bool,
});

export const gjennomfoeringPt = PropTypes.shape({
    kanGjennomfoeres: PropTypes.string,
    paaAnnetSted: PropTypes.bool,
    medMerTid: PropTypes.bool,
    medHjelp: PropTypes.bool,
    kanBeskrivelse: PropTypes.string,
    kanIkkeBeskrivelse: PropTypes.string,
});

export const gyldighetstidspunktPt = PropTypes.shape({
    fom: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    tom: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    evalueres: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
});

export const personPt = PropTypes.shape({
    navn: PropTypes.string,
    fnr: PropTypes.string,
    epost: PropTypes.string,
    tlf: PropTypes.string,
    sistInnlogget: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    samtykke: PropTypes.bool,
    evaluering: evalueringPt,
});

export const arbeidsoppgavePt = PropTypes.shape({
    arbeidsoppgaveId: PropTypes.number,
    arbeidsoppgavenavn: PropTypes.string,
    erVurdertAvSykmeldt: PropTypes.bool,
    gjennomfoering: gjennomfoeringPt,
    opprettetDato: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    sistEndretAv: personPt,
    sistEndretDato: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    opprettetAv: personPt,
});

export const tiltakPt = PropTypes.shape({
    tiltakId: PropTypes.number,
    tiltaknavn: PropTypes.string,
    knyttetTilArbeidsoppgaveId: PropTypes.number,
    fom: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    tom: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    beskrivelse: PropTypes.string,
    opprettetDato: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    sistEndretAv: personPt,
    sistEndretDato: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    opprettetAv: personPt,
});

export const avbruttPlanPt = PropTypes.shape({
    av: personPt,
    tidspunkt: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    id: PropTypes.number,
});

export const godkjenningPt = PropTypes.shape({
    godkjent: PropTypes.bool,
    godkjentAv: personPt,
    beskrivelse: PropTypes.string,
    godkjenningsTidspunkt: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    gyldighetstidspunkt: gyldighetstidspunktPt,
});

export const godkjentPlanPt = PropTypes.shape({
    opprettetTidspunkt: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    gyldighetstidspunkt: gyldighetstidspunktPt,
    tvungenGodkjenning: PropTypes.bool,
    deltMedNAVTidspunkt: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    deltMedNAV: PropTypes.bool,
    dokumentUuid: PropTypes.string,
    avbruttPlan: avbruttPlanPt,
});

export const virksomhetPt = PropTypes.shape({
    virksomhetsnummer: PropTypes.string,
    navn: PropTypes.string,
});

export const oppfolgingsdialogPt = PropTypes.shape({
    id: PropTypes.number,
    sistEndretAv: personPt,
    sistEndretDato: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    status: PropTypes.string,
    virksomhet: virksomhetPt,
    godkjentPlan: godkjentPlanPt,
    godkjenninger: PropTypes.arrayOf(godkjenningPt),
    arbeidsoppgaveListe: PropTypes.arrayOf(arbeidsoppgavePt),
    tiltakListe: PropTypes.arrayOf(tiltakPt),
    avbruttPlanListe: PropTypes.arrayOf(avbruttPlanPt),
    arbeidsgiver: personPt,
    arbeidstaker: personPt,
});
