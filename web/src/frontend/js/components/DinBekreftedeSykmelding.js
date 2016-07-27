import React, { PropTypes } from 'react';
import StatusPanel from './StatusPanel';
import DineSykmeldingOpplysninger from './DineSykmeldingOpplysninger';
import Utvidbar from './Utvidbar';
import { getLedetekst } from '../ledetekster/index';
import { STATUS, INNSENDT_DATO } from '../nokkelopplysninger/NokkelOpplysningerEnum';

const DinBekreftedeSykmelding = ({ sykmelding, ledetekster }) => {
    return (<div>
        <h1 className="side-header typo-sidetittel">{getLedetekst('din-sykmelding.tittel', ledetekster)}</h1>
        <StatusPanel
            sykmelding={sykmelding}
            ledetekster={ledetekster}
            type="suksess"
            nokkelopplysninger={[[STATUS, INNSENDT_DATO]]} />
        <Utvidbar erApen tittel={getLedetekst('din-sykmelding.dine-opplysninger.tittel', ledetekster)}
            ikon="svg/doctor-2.svg" ikonHover="svg/doctor-2_hover.svg" ikonAltTekst="Lege" className="blokk" variant="lysebla">
            <DineSykmeldingOpplysninger sykmelding={sykmelding} ledetekster={ledetekster} />
        </Utvidbar>
    </div>);
};

DinBekreftedeSykmelding.propTypes = {
    ledetekster: PropTypes.object,
    sykmelding: PropTypes.object,
};

export default DinBekreftedeSykmelding;
