import PropTypes from 'prop-types';
import { naermesteLeder } from 'digisyfo-npm';
import * as hendelsetyper from '../enums/hendelsetyper';
import * as svartyper from '../enums/svartyper';
import { FOM, TOM } from '../enums/svarverdityper';

export { arbeidssituasjon,
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
    oppsummeringsoknad } from 'digisyfo-npm';

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

export const childEllerChildren = PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
]);

export const opprettOppfolgingArbeidsgiverPt = PropTypes.shape({
    virksomhetsnummer: PropTypes.string,
    navn: PropTypes.string,
    harNaermesteLeder: PropTypes.bool,
    naermesteLeder: PropTypes.string,
});

export const dinesykmeldingerReducerPt = PropTypes.shape({
    data: PropTypes.arrayOf(naermesteLeder),
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    hentet: PropTypes.bool,
    sender: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
    avbryter: PropTypes.bool,
    avbrytFeilet: PropTypes.bool,
});

export const sykeforloepPt = PropTypes.shape({
    data: PropTypes.array,
    henter: PropTypes.bool,
    hentet: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
});

export const ledereReducerPt = PropTypes.shape({
    data: PropTypes.arrayOf(naermesteLeder),
    henter: PropTypes.bool,
    hentet: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    avkrefter: PropTypes.bool,
    avkreftet: PropTypes.bool,
    avkreftFeilet: PropTypes.bool,
});

export const svartypePt = PropTypes.oneOf(Object.values(svartyper));

export const svar = PropTypes.shape({
    svartype: svartypePt,
    svarverdi: PropTypes.arrayOf(PropTypes.shape({
        verdi: PropTypes.string,
        svarverdiType: PropTypes.oneOf(FOM, TOM, null),
    })),
    min: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
    max: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
    kriterieForVisningAvUndersporsmal: PropTypes.string,
    undersporsmal: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        tag: PropTypes.string,
        sporsmalstekst: PropTypes.string,
        svar,
    })),
});

export const sporsmal = PropTypes.shape({
    id: PropTypes.string,
    tag: PropTypes.string,
    sporsmalstekst: PropTypes.string,
    svar,
});

export const skjemasvar = PropTypes.shape({});

export const soknad = PropTypes.shape({
    id: PropTypes.string,
    sykmeldingId: PropTypes.string,
    soknadstype: PropTypes.string,
    status: PropTypes.string,
    fom: PropTypes.instanceOf(Date),
    tom: PropTypes.instanceOf(Date),
    opprettetDato: PropTypes.instanceOf(Date),
    sporsmal: PropTypes.arrayOf(sporsmal),
});

export const oppsummeringSporsmal = {
    svar,
    sporsmalstekst: PropTypes.string,
    tag: PropTypes.string,
};
