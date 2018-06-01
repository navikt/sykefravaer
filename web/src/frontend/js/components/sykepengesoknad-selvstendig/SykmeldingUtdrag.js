import React from 'react';
import PropTypes from 'prop-types';
import { SykmeldingPerioder, SykmeldingNokkelOpplysning, Utvidbar, toDatePrettyPrint, getLedetekst, sykmelding as sykmeldingPt } from 'digisyfo-npm';
import { Vis } from '../../utils';

const Fravaersperioder = ({ sykmelding }) => {
    return (<SykmeldingNokkelOpplysning
        tittel={getLedetekst('sykepengesoknad.sykmelding-utdrag.egenmelding-papir')}>
        <ul>
            {
                sykmelding.sporsmal.fravaersperioder.map((p) => {
                    return <li key={toDatePrettyPrint(p.fom)}>{toDatePrettyPrint(p.fom)} – {toDatePrettyPrint(p.tom)}</li>;
                })
            }
        </ul>
    </SykmeldingNokkelOpplysning>);
};

Fravaersperioder.propTypes = {
    sykmelding: sykmeldingPt,
};

const Forsikring = ({ sykmelding }) => {
    const grad = sykmelding.sporsmal.forsikring;
    const nokkel = grad === null
        ? 'sykepengesoknad.sykmelding-utdrag.forsikring-nei'
        : 'sykepengesoknad.sykmelding-utdrag.forsikring-ja';
    return (<SykmeldingNokkelOpplysning
        tittel={getLedetekst('sykepengesoknad.sykmelding-utdrag.forsikring')}>
        <p>
            {
                getLedetekst(nokkel, {
                    '%GRAD%': grad,
                })
            }
        </p>
    </SykmeldingNokkelOpplysning>);
};

Forsikring.propTypes = {
    sykmelding: sykmeldingPt,
};

const SykmeldingUtdrag = ({ erApen, sykmelding }) => {
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
                <SykmeldingNokkelOpplysning
                    tittel={getLedetekst('sykepengesoknad.sykmelding-utdrag.dato-sykmeldingen-ble-skrevet')}>
                    <p className="js-utstedelsesdato">{toDatePrettyPrint(sykmelding.bekreftelse.utstedelsesdato)}</p>
                </SykmeldingNokkelOpplysning>
                <SykmeldingNokkelOpplysning
                    tittel={getLedetekst('din-sykmelding.arbeidssituasjon.tittel.2')}>
                    <p className="js-arbeidssituasjon">{getLedetekst(`din-sykmelding.arbeidssituasjon.alternativ.${sykmelding.valgtArbeidssituasjon.toLowerCase()}`)}</p>
                </SykmeldingNokkelOpplysning>
                <Vis hvis={sykmelding.sporsmal.fravaerBesvart}>
                    <Fravaersperioder sykmelding={sykmelding} />
                </Vis>
                <Vis hvis={sykmelding.sporsmal.forsikringBesvart}>
                    <Forsikring sykmelding={sykmelding} />
                </Vis>
            </div>
        </Utvidbar>
    </div>);
};

SykmeldingUtdrag.propTypes = {
    erApen: PropTypes.bool,
    sykmelding: sykmeldingPt,
};

export default SykmeldingUtdrag;
