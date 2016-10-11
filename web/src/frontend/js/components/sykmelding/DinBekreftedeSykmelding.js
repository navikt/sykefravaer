import React, { PropTypes } from 'react';
import DineSykmeldingOpplysninger from '../sykmeldingOpplysninger/DineSykmeldingOpplysninger';
import StatusPanel from '../StatusPanel';
import Utvidbar from '../Utvidbar';
import { getLedetekst } from '../../ledetekster';
import { STATUS, INNSENDT_DATO } from '../../nokkelopplysninger/NokkelOpplysningerEnum';
import ArbeidsgiversSykmelding from './ArbeidsgiversSykmelding';
import Sidetopp from '../Sidetopp';

const DinBekreftedeSykmelding = ({ dinSykmelding, arbeidsgiversSykmelding, ledetekster }) => {
    return (<div>
        <Sidetopp tittel={getLedetekst('din-sykmelding.tittel', ledetekster)} />
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
            dinSykmelding.valgtArbeidssituasjon === 'ARBEIDSTAKER' &&
            <div className="blokk">
                <ArbeidsgiversSykmelding sykmelding={arbeidsgiversSykmelding} ledetekster={ledetekster} />
            </div>
        }
    </div>);
};

DinBekreftedeSykmelding.propTypes = {
    ledetekster: PropTypes.object,
    dinSykmelding: PropTypes.object,
    arbeidsgiversSykmelding: PropTypes.object,
};

export default DinBekreftedeSykmelding;
