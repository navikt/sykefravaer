import PropTypes from 'prop-types';
import * as hendelsetyper from '../enums/hendelsetyper';
import { svar } from '../sykepengesoknad/prop-types/svarProptype';

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
} from '@navikt/digisyfo-npm';

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

export const loginInfo = PropTypes.shape({
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    data: PropTypes.shape({
        name: PropTypes.string,
    }),
});

export const oppsummeringSporsmal = {
    svar,
    sporsmalstekst: PropTypes.string,
    tag: PropTypes.string,
};

