import React from 'react';
import PropTypes from 'prop-types';
import {
    SykmeldingPerioder,
    Bjorn,
    SykmeldingNokkelOpplysning,
    Utvidbar,
    toDatePrettyPrint,
    getLedetekst,
    sykmelding as sykmeldingPt } from 'digisyfo-npm';
import { getContextRoot } from '../../routers/paths';

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

const SykmeldingUtdrag = ({ erApen, sykmelding, erOppdelt }) => {
    return (<div className="blokk">
        <Utvidbar
            Overskrift="h2"
            erApen={erApen}
            visLukklenke={!erApen}
            tittel={getLedetekst('sykepengesoknad.sykmelding-utdrag.tittel')}
            variant="lilla"
            ikon="svg/plaster.svg"
            ikonHover="svg/plaster_hover.svg"
            ikonAltTekst="Plaster-ikon">
            <div>
                <SykmeldingPerioder perioder={sykmelding.mulighetForArbeid.perioder} />
                {
                    erOppdelt
                    && <Bjorn rootUrl={getContextRoot()} className="blokk" nokkel="sykepengesoknad.sykmelding-utdrag.oppdelt.bjorn" />
                }
                <SykmeldingNokkelOpplysning
                    tittel={getLedetekst('sykepengesoknad.sykmelding-utdrag.dato-sykmeldingen-ble-skrevet')}>
                    <p className="js-utstedelsesdato">{toDatePrettyPrint(sykmelding.bekreftelse.utstedelsesdato)}</p>
                </SykmeldingNokkelOpplysning>
                <SykmeldingNokkelOpplysning
                    tittel={getLedetekst('din-sykmelding.arbeidssituasjon.tittel.2')}>
                    <p className="js-arbeidssituasjon">{getLedetekst(`din-sykmelding.arbeidssituasjon.alternativ.${sykmelding.valgtArbeidssituasjon.toLowerCase()}`)}</p>
                </SykmeldingNokkelOpplysning>
                <SykmeldingopplysningFravaersperioder sykmelding={sykmelding} />
                <SykmeldingopplysningForsikring sykmelding={sykmelding} />
            </div>
        </Utvidbar>
    </div>);
};

SykmeldingUtdrag.propTypes = {
    erApen: PropTypes.bool,
    erOppdelt: PropTypes.bool,
    sykmelding: sykmeldingPt,
};

export default SykmeldingUtdrag;
