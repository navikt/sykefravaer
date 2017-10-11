import React from 'react';
import PropTypes from 'prop-types';
import { SykmeldingPerioder, SykmeldingNokkelOpplysning, toDatePrettyPrint, Utvidbar, getLedetekst } from 'digisyfo-npm';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';

const SykmeldingUtdrag = ({ erApen, sykepengesoknad }) => {
    const perioder = sykepengesoknad.aktiviteter.map((aktivitet) => {
        return {
            fom: aktivitet.periode.fom,
            tom: aktivitet.periode.tom,
            grad: aktivitet.grad,
        };
    });

    return (<div className="blokk">
        <Utvidbar
            Overskrift="h2"
            erApen={erApen}
            visLukklenke={!erApen}
            tittel={getLedetekst('sykepengesoknad.sykmelding-utdrag.tittel')}
            variant="lysebla"
            ikon="svg/plaster.svg"
            ikonHover="svg/plaster--hover.svg"
            ikonAltTekst="Plaster-ikon">
            <div>
                <SykmeldingPerioder perioder={perioder} />
                <SykmeldingNokkelOpplysning
                    tittel={getLedetekst('sykepengesoknad.sykmelding-utdrag.arbeidsgiver')}>
                    <p className="js-arbeidsgiver">{sykepengesoknad.arbeidsgiver.navn}</p>
                </SykmeldingNokkelOpplysning>
                <SykmeldingNokkelOpplysning
                    tittel={getLedetekst('sykepengesoknad.sykmelding-utdrag.dato-sykmeldingen-ble-skrevet')}>
                    <p className="js-utstedelsesdato">{toDatePrettyPrint(sykepengesoknad.sykmeldingSkrevetDato)}</p>
                </SykmeldingNokkelOpplysning>
            </div>
        </Utvidbar>
    </div>);
};

SykmeldingUtdrag.propTypes = {
    erApen: PropTypes.bool,
    sykepengesoknad: sykepengesoknadPt,
};

export default SykmeldingUtdrag;
