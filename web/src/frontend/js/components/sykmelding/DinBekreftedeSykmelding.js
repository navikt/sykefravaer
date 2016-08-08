import React, { PropTypes } from 'react';
import DineSykmeldingOpplysninger from '../sykmeldingOpplysninger/DineSykmeldingOpplysninger';
import StatusPanel from '../StatusPanel';
import Utvidbar from '../Utvidbar';
import { getLedetekst } from '../../ledetekster/index';
import { STATUS, INNSENDT_DATO } from '../../nokkelopplysninger/NokkelOpplysningerEnum';

const DinBekreftedeSykmelding = ({ sykmelding, ledetekster }) => {
    return (<div>
        <h1 className="side-header typo-sidetittel">{getLedetekst('din-sykmelding.tittel', ledetekster)}</h1>
        <StatusPanel
            sykmelding={sykmelding}
            ledetekster={ledetekster}
            type="suksess"
            nokkelopplysninger={[[STATUS, INNSENDT_DATO]]} />
        <Utvidbar erApen tittel={getLedetekst('din-sykmelding.dine-opplysninger.tittel', ledetekster)}
            ikon="svg/person.svg" ikonHover="svg/person_hover.svg" ikonAltTekst="Du" className="blokk" variant="lysebla">
            <DineSykmeldingOpplysninger sykmelding={sykmelding} ledetekster={ledetekster} />
        </Utvidbar>
    </div>);
};

DinBekreftedeSykmelding.propTypes = {
    ledetekster: PropTypes.object,
    sykmelding: PropTypes.object,
};

export default DinBekreftedeSykmelding;
