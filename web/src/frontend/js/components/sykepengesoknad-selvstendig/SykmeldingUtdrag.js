import React from 'react';
import PropTypes from 'prop-types';
import { SykmeldingPerioder, SykmeldingNokkelOpplysning, Utvidbar, toDatePrettyPrint, getLedetekst, sykmelding as sykmeldingPt } from 'digisyfo-npm';

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
            </div>
        </Utvidbar>
    </div>);
};

SykmeldingUtdrag.propTypes = {
    erApen: PropTypes.bool,
    sykmelding: sykmeldingPt,
};

export default SykmeldingUtdrag;
