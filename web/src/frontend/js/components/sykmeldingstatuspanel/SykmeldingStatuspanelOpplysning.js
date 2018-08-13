import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, SykmeldingNokkelOpplysning, sykmeldingstatuser, toDatePrettyPrint } from 'digisyfo-npm';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { sykmelding as sykmeldingPt } from '../../propTypes';
import { Vis } from '../../utils';
import { StatusNokkelopplysning } from '../Statuspanel';

const { BEKREFTET, AVBRUTT, TIL_SENDING } = sykmeldingstatuser;

const tilSendingHjelpetekst = () => {
    return (<Hjelpetekst>{getLedetekst('sykepengesoknad.til-sending.hjelpetekst.tekst')}</Hjelpetekst>);
};

export const Sykmeldingstatus = ({ sykmelding }) => {
    return (<StatusNokkelopplysning tittel={getLedetekst('statuspanel.status')}>
        {
            sykmelding.status === TIL_SENDING
                ? (
                    <div className="medHjelpetekst">
                        <span>{getLedetekst(`statuspanel.status.${sykmelding.status}`)}</span>
                        {tilSendingHjelpetekst()}
                    </div>
                )
                : <p className="js-status">{getLedetekst(`statuspanel.status.${sykmelding.status}`)}</p>
        }
    </StatusNokkelopplysning>);
};

Sykmeldingstatus.propTypes = {
    sykmelding: sykmeldingPt,
};

export const SendtDato = ({ sykmelding }) => {
    const nokkel = sykmelding.status === BEKREFTET
        ? 'statuspanel.dato.bekreftet'
        : sykmelding.status === AVBRUTT
            ? 'statuspanel.dato.avbrutt'
            : 'statuspanel.dato.innsendt';
    return (<StatusNokkelopplysning tittel={getLedetekst(nokkel)}>
        <p className="js-dato">{toDatePrettyPrint(sykmelding.sendtdato)}</p>
    </StatusNokkelopplysning>);
};

SendtDato.propTypes = {
    sykmelding: sykmeldingPt,
};

export const Arbeidsgiver = ({ sykmelding }) => {
    return (<StatusNokkelopplysning tittel={getLedetekst('statuspanel.arbeidsgiver')}>
        <p className="js-arbeidsgiver">{sykmelding.innsendtArbeidsgivernavn}</p>
    </StatusNokkelopplysning>);
};

Arbeidsgiver.propTypes = {
    sykmelding: sykmeldingPt,
};

export const Orgnummer = ({ sykmelding }) => {
    const orgnummer = sykmelding.orgnummer
        ? sykmelding.orgnummer.replace(/(...)(...)(...)/g, '$1 $2 $3')
        : null;
    return (<StatusNokkelopplysning tittel={getLedetekst('statuspanel.organisasjonsnummer')}>
        <p className="js-organisasjonsnummer">{orgnummer}</p>
    </StatusNokkelopplysning>);
};

Orgnummer.propTypes = {
    sykmelding: sykmeldingPt,
};

export const SykmeldingopplysningFravaersperioder = ({ sykmelding, className }) => {
    return sykmelding.sporsmal.fravaerBesvart
        ? (<SykmeldingNokkelOpplysning
            className={className}
            tittel={getLedetekst('sykepengesoknad.sykmelding-utdrag.egenmelding-papir')}>
            <ul className="nokkelopplysning__liste">
                {
                    sykmelding.sporsmal.fravaersperioder.map((p) => {
                        return <li key={toDatePrettyPrint(p.fom)}>{toDatePrettyPrint(p.fom)} – {toDatePrettyPrint(p.tom)}</li>;
                    })
                }
            </ul>
        </SykmeldingNokkelOpplysning>)
        : null;
};

SykmeldingopplysningFravaersperioder.propTypes = {
    sykmelding: sykmeldingPt,
    className: PropTypes.string,
};

export const SykmeldingopplysningForsikring = ({ sykmelding, className }) => {
    const grad = sykmelding.sporsmal.dekningsgrad;
    const nokkel = grad === null
        ? 'sykepengesoknad.sykmelding-utdrag.forsikring-nei'
        : 'sykepengesoknad.sykmelding-utdrag.forsikring-ja';
    return sykmelding.sporsmal.forsikringBesvart
        ? (<SykmeldingNokkelOpplysning
            className={className}
            tittel={getLedetekst('sykepengesoknad.sykmelding-utdrag.forsikring')}>
            <p>
                {
                    getLedetekst(nokkel, {
                        '%GRAD%': grad,
                    })
                }
            </p>
        </SykmeldingNokkelOpplysning>)
        : null;
};

SykmeldingopplysningForsikring.propTypes = {
    sykmelding: sykmeldingPt,
    className: PropTypes.string,
};

export const Frilansersporsmal = ({ sykmelding }) => {
    return (<Vis
        hvis={sykmelding.sporsmal && (sykmelding.sporsmal.fravaerBesvart || sykmelding.sporsmal.dekningsgrad)}
        render={() => {
            return ([
                <SykmeldingopplysningFravaersperioder
                    key={`fravaersperioder-${sykmelding.id}`}
                    sykmelding={sykmelding}
                    className="nokkelopplysning--statusopplysning" />,
                <SykmeldingopplysningForsikring
                    key={`forsikring-${sykmelding.id}`}
                    sykmelding={sykmelding}
                    className="nokkelopplysning--statusopplysning" />,
            ]);
        }} />);
};

Frilansersporsmal.propTypes = {
    sykmelding: sykmeldingPt,
};
