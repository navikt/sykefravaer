import React, { PropTypes } from 'react';
import { Utvidbar, SykmeldingPerioder, SykmeldingNokkelOpplysning, toDatePrettyPrint } from 'digisyfo-npm';
import { Avkrysset } from './Oppsummering/opplysninger';

const SykmeldingUtdrag = ({ erApen, sykepengesoknad, ledetekster }) => {
    const perioder = sykepengesoknad.aktiviteter.map((aktivitet) => {
        return {
            fom: aktivitet.periode.fom,
            tom: aktivitet.periode.tom,
            grad: aktivitet.grad,
        };
    });

    return (<div className="blokk">
            <Utvidbar Overskrift="h2" erApen={erApen} visLukklenke={!erApen} tittel="Informasjon fra sykmeldingen søknaden gjelder for" variant="lysebla" ikon="svg/plaster.svg" ikonHover="svg/plaster--hover.svg" ikonAltTekst="Plaster-ikon">
            <div>
                <SykmeldingPerioder perioder={perioder} ledetekster={ledetekster} />
                <SykmeldingNokkelOpplysning
                    tittel="Arbeidsgiver">
                    <p className="js-arbeidsgiver">{sykepengesoknad.arbeidsgiver.navn}</p>
                </SykmeldingNokkelOpplysning>
                <div className="blokk">
                    <Avkrysset tekst="Arbeidsgiveren utbetaler lønn også etter 16 dagers sykefravær" />
                </div>
                <SykmeldingNokkelOpplysning
                    tittel="Dato sykmeldingen ble skrevet">
                    <p className="js-utstedelsesdato">{toDatePrettyPrint(sykepengesoknad.identdato)}</p>
                </SykmeldingNokkelOpplysning>
            </div>
        </Utvidbar>
    </div>);
};

SykmeldingUtdrag.propTypes = {
    erApen: PropTypes.bool,
    sykepengesoknad: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default SykmeldingUtdrag;
