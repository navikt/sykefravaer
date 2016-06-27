import React, { PropTypes } from 'react';
import StatusPanel from './StatusPanel';
import ArbeidsgiversSykmelding from './ArbeidsgiversSykmelding';
import DineSykmeldingOpplysninger from './DineSykmeldingOpplysninger';
import Utvidbar from './Utvidbar';
import { getLedetekst } from '../ledetekster/index';
import { ARBEIDSGIVER, INNSENDT_DATO, ORGNUMMER, STATUS } from '../nokkelopplysninger/NokkelOpplysningerEnum';

const DinSendteSykmelding = ({ dinSykmelding, ledetekster, arbeidsgiversSykmelding }) => {
    return (<div>
        <h1 className="side-header typo-sidetittel">Sykmelding</h1>
        <StatusPanel
            sykmelding={dinSykmelding}
            ledetekster={ledetekster}
            type="suksess"
            nokkelopplysninger={[
                [STATUS, INNSENDT_DATO],
                [ARBEIDSGIVER, ORGNUMMER],
            ]} />
        <Utvidbar erApen tittel={getLedetekst('din-sykmelding.tittel', ledetekster)}
            ikon="svg/doctor-2.svg" ikonHover="svg/doctor-2_hover.svg" ikonAltTekst="Lege" className="blokk" variant="lysebla" Overskrift="H2">
            <DineSykmeldingOpplysninger sykmelding={dinSykmelding} ledetekster={ledetekster} />
        </Utvidbar>
        <div className="blokk-l">
            <ArbeidsgiversSykmelding sykmelding={arbeidsgiversSykmelding} ledetekster={ledetekster} />
        </div>
    </div>);
};

DinSendteSykmelding.propTypes = {
    ledetekster: PropTypes.object,
    dinSykmelding: PropTypes.object,
    arbeidsgiversSykmelding: PropTypes.object,
};

export default DinSendteSykmelding;
