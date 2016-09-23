import React, { PropTypes } from 'react';
import DineSykmeldingOpplysninger from '../sykmeldingOpplysninger/DineSykmeldingOpplysninger';
import StatusPanel from '../StatusPanel';
import Utvidbar from '../Utvidbar';
import { getLedetekst } from '../../ledetekster/index';
import { STATUS, INNSENDT_DATO } from '../../nokkelopplysninger/NokkelOpplysningerEnum';
import Sidetopp from '../Sidetopp';

const DinAvbrutteSykmelding = ({ sykmelding, ledetekster }) => {
    return (<div>
        <Sidetopp tittel={getLedetekst('din-sykmelding.tittel', ledetekster)} />
        <StatusPanel
            sykmelding={sykmelding}
            ledetekster={ledetekster}
            type="avbrutt"
            nokkelopplysninger={[[STATUS, INNSENDT_DATO]]} />
        <Utvidbar erApen tittel={getLedetekst('din-sykmelding.dine-opplysninger.tittel', ledetekster)}
            ikon="svg/person.svg" ikonHover="svg/person_hover.svg" ikonAltTekst="Du" className="blokk" variant="lysebla" Overskrift="H2">
            <DineSykmeldingOpplysninger sykmelding={sykmelding} ledetekster={ledetekster} />
        </Utvidbar>
    </div>);
};

DinAvbrutteSykmelding.propTypes = {
    ledetekster: PropTypes.object,
    sykmelding: PropTypes.object,
};

export default DinAvbrutteSykmelding;
