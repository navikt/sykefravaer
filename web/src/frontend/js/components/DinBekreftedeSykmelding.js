import React, { PropTypes } from 'react';
import StatusPanel from './StatusPanel';
import DineSykmeldingOpplysninger from './DineSykmeldingOpplysninger';
import Utvidbar from './Utvidbar';
import { getLedetekst } from '../ledetekster/index';

const DinBekreftedeSykmelding = (props) => {
    return (<div>
        <StatusPanel {...props} />
        <Utvidbar erApen tittel={getLedetekst('din-sykmelding.tittel', props.ledetekster)}
            ikon="svg/doctor-2.svg" ikonHover="svg/doctor-2_hover.svg" ikonAltTekst="Lege" className="blokk" variant="lysebla">
            <DineSykmeldingOpplysninger {...props} />
        </Utvidbar>
    </div>);
};

DinBekreftedeSykmelding.propTypes = {
    ledetekster: PropTypes.object,
};

export default DinBekreftedeSykmelding;
