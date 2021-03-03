import PropTypes from 'prop-types';
import * as hendelsetyper from '../enums/hendelsetyper';
import { svar } from './svarProptype';

export {
    arbeidssituasjon,
    soknadperiode,
    annenInntektskilde,
    naermesteLeder,
    arbeidsgiver,
    soknadsaktivitet,
    soknadaktiviteter,
    sykepengesoknadstatus,
    sykepengesoknad,
    sykmeldingdiagnose,
    sykmeldingperiode,
    sykmeldingstatus,
    sykmelding,
    tidslinjehendelse,
    oppsummeringsoknad,
} from '../digisyfoNpm';

export * from './dialogmoteProptypes';

export const brodsmule = PropTypes.shape({
    sti: PropTypes.string,
    tittel: PropTypes.string,
    sisteSmule: PropTypes.bool,
    erKlikkbar: PropTypes.bool,
});

export const hendelse = PropTypes.shape({
    id: PropTypes.number.isRequired,
    inntruffetdato: PropTypes.instanceOf(Date),
    type: PropTypes.oneOf([hendelsetyper.AKTIVITETSKRAV_VARSEL, hendelsetyper.NY_NAERMESTE_LEDER, hendelsetyper.AKTIVITETSKRAV_BEKREFTET]),
    ressursId: PropTypes.string,
});

const meta = PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool,
});

const input = PropTypes.shape({
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onDragStart: PropTypes.func,
    onDrop: PropTypes.func,
    onFocus: PropTypes.func,
});

export const fields = PropTypes.shape({
    push: PropTypes.func,
    map: PropTypes.func,
    length: PropTypes.number,
});

export const fieldPropTypes = { meta, input };

export const childEllerChildren = PropTypes.node;

export const sykeforloepPt = PropTypes.shape({
    data: PropTypes.array,
    henter: PropTypes.bool,
    hentet: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
});

export const skjemasvar = PropTypes.shape({});

export const sykmeldtInfo = PropTypes.shape({
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    data: PropTypes.shape({
        maksDato: PropTypes.string,
        erArbeidsrettetOppfolgingSykmeldtInngangAktiv: PropTypes.bool,
    }),
});

export const oppfolging = PropTypes.shape({
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    data: PropTypes.shape({
        underOppfolging: PropTypes.bool,
    }),
});

export const oppsummeringSporsmal = {
    svar,
    sporsmalstekst: PropTypes.string,
    tag: PropTypes.string,
};

export const sykeforloepMetadataPt = PropTypes.shape({
    data: PropTypes.shape({
        erSykmeldt: PropTypes.bool,
        sykmeldtFraDato: PropTypes.string,
        arbeidsSituasjonIAktiveSykmeldinger: PropTypes.array,
        erArbeidsrettetOppfolgingSykmeldtInngangAktiv: PropTypes.bool,
    }),
});
