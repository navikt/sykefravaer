import React from 'react';
import PropTypes from 'prop-types';
import SykmeldingPerioder from '../sykmeldingOpplysninger/SykmeldingPerioder';
import { SykmeldingNokkelOpplysning } from '../sykmeldingOpplysninger/SykmeldingOpplysning';
import Utvidbar from '../Utvidbar';
import { tilLesbarDatoMedArstall } from '../../utils/datoUtils';
import { getLedetekst } from '../../ledetekster';
import { keyValue, sykmelding as sykmeldingPt } from '../../propTypes';
import { Bjorn } from '../Hjelpeboble';

const SykmeldingUtdrag = ({ erApen, sykmelding, sykepengesoknad, ledetekster }) => {
    return (
        <div className="blokk">
            <Utvidbar
                Overskrift="h2"
                erApen={erApen}
                visLukklenke={!erApen}
                tittel={getLedetekst('sykepengesoknad.sykmelding-utdrag.tittel', ledetekster)}
                variant="lilla"
                ikon="svg/plaster.svg"
                ikonHover="svg/plaster_hover.svg"
                ikonAltTekst="Plaster-ikon">
                <div>
                    <SykmeldingPerioder perioder={sykmelding.mulighetForArbeid.perioder} ledetekster={ledetekster} />
                    {
                        sykepengesoknad
                    && sykepengesoknad._erOppdelt
                    && <Bjorn className="blokk" nokkel="sykepengesoknad.sykmelding-utdrag.oppdelt.bjorn" />
                    }
                    <SykmeldingNokkelOpplysning
                        tittel={getLedetekst('sykepengesoknad.sykmelding-utdrag.arbeidsgiver', ledetekster)}>
                        <p className="js-arbeidsgiver">{sykmelding.mottakendeArbeidsgiver.navn}</p>
                    </SykmeldingNokkelOpplysning>
                    <SykmeldingNokkelOpplysning
                        tittel={getLedetekst('sykepengesoknad.sykmelding-utdrag.dato-sykmeldingen-ble-skrevet', ledetekster)}>
                        <p className="js-utstedelsesdato">{tilLesbarDatoMedArstall(sykmelding.bekreftelse.utstedelsesdato)}</p>
                    </SykmeldingNokkelOpplysning>
                </div>
            </Utvidbar>
        </div>
    );
};

SykmeldingUtdrag.propTypes = {
    erApen: PropTypes.bool,
    sykmelding: sykmeldingPt,
    sykepengesoknad: PropTypes.shape({
        _erOppdelt: PropTypes.bool,
    }),
    ledetekster: keyValue,
};

export default SykmeldingUtdrag;
