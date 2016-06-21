import React from 'react';
import KvitteringPanel from './KvitteringPanel';
import DinSykmelding from './DinSykmelding';
import ArbeidsgiversSykmelding from './ArbeidsgiversSykmelding';
import DineSykmeldingOpplysninger from './DineSykmeldingOpplysninger';
import Utvidbar from './Utvidbar';
import { getLedetekst } from '../ledetekster';

const DinSendteSykmelding = (props) => {
    return (<div>
        <KvitteringPanel {...props} />
        <Utvidbar erApen={true} tittel={getLedetekst('din-sykmelding.tittel', props.ledetekster)}
            ikon="svg/doctor-2.svg" ikonHover="svg/doctor-2_hover.svg" ikonAltTekst="Lege" className="blokk" variant="lysebla">
            <DineSykmeldingOpplysninger {...props} />
        </Utvidbar>
        <div className="blokk-l">
            <ArbeidsgiversSykmelding {...props} />
        </div>
    </div>);
};

export default DinSendteSykmelding;
