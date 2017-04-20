import React, { PropTypes } from 'react';
import { SykmeldingPerioder, SykmeldingNokkelOpplysning, toDatePrettyPrint } from 'digisyfo-npm';
import { Avkrysset } from './SendtSoknad';
import { Utvidbar, getLedetekst } from 'digisyfo-npm';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';

const SykmeldingUtdrag = ({ erApen, sykepengesoknad, ledetekster }) => {
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
                tittel={getLedetekst('sykepengesoknad.sykmelding-utdrag.tittel', ledetekster)}
                variant="lysebla" ikon="svg/plaster.svg" ikonHover="svg/plaster--hover.svg" ikonAltTekst="Plaster-ikon">
            <div>
                <SykmeldingPerioder perioder={perioder} ledetekster={ledetekster} />
                <SykmeldingNokkelOpplysning
                    tittel={getLedetekst('sykepengesoknad.sykmelding-utdrag.arbeidsgiver', ledetekster)}>
                    <p className="js-arbeidsgiver">{sykepengesoknad.arbeidsgiver.navn}</p>
                </SykmeldingNokkelOpplysning>
                <div className="blokk">
                    <Avkrysset tekst={getLedetekst('sykepengesoknad.sykmelding-utdrag.lonn-etter-16-dager', ledetekster)} />
                </div>
                <SykmeldingNokkelOpplysning
                    tittel={getLedetekst('sykepengesoknad.sykmelding-utdrag.dato-sykmeldingen-ble-skrevet', ledetekster)}>
                    <p className="js-utstedelsesdato">{toDatePrettyPrint(sykepengesoknad.sykmeldingSkrevetDato)}</p>
                </SykmeldingNokkelOpplysning>
            </div>
        </Utvidbar>
    </div>);
};

SykmeldingUtdrag.propTypes = {
    erApen: PropTypes.bool,
    sykepengesoknad: sykepengesoknadPt,
    ledetekster: PropTypes.object,
};

export default SykmeldingUtdrag;
