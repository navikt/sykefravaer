import React, { PropTypes } from 'react';
import DineSykmeldingOpplysninger from '../sykmeldingOpplysninger/DineSykmeldingOpplysninger';
import StatusPanel from '../StatusPanel';
import Utvidbar from '../Utvidbar';
import { getLedetekst } from '../../ledetekster/index';
import { STATUS, INNSENDT_DATO } from '../../nokkelopplysninger/NokkelOpplysningerEnum';
import ArbeidsgiversSykmelding from './ArbeidsgiversSykmelding.js';

const DinBekreftedeSykmelding = ({ dinSykmelding, arbeidsgiversSykmelding, ledetekster }) => {
    return (<div>
        <h1 className="side-header typo-sidetittel">{getLedetekst('din-sykmelding.tittel', ledetekster)}</h1>
        <StatusPanel
            sykmelding={dinSykmelding}
            ledetekster={ledetekster}
            type="suksess"
            nokkelopplysninger={[[STATUS, INNSENDT_DATO]]} />
        <Utvidbar erApen tittel={getLedetekst('din-sykmelding.dine-opplysninger.tittel', ledetekster)}
            ikon="svg/person.svg" ikonHover="svg/person_hover.svg" ikonAltTekst="Du" className="blokk" variant="lysebla" Overskrift="H2">
            <DineSykmeldingOpplysninger sykmelding={dinSykmelding} ledetekster={ledetekster} />
        </Utvidbar>
        {
            sykmelding.valgtArbeidssituasjon === 'ARBEIDSTAKER' && 
            <div className="blokk">
                <ArbeidsgiversSykmelding sykmelding={arbeidsgiversSykmelding} ledetekster={ledetekster} />
            </div>
        }
    </div>);
};

DinBekreftedeSykmelding.propTypes = {
    ledetekster: PropTypes.object,
    sykmelding: PropTypes.object,
};

export default DinBekreftedeSykmelding;
