import React, { PropTypes } from 'react';
import StatusPanel from '../StatusPanel';
import { Utvidbar, getLedetekst, DineSykmeldingOpplysninger } from 'digisyfo-npm';
import { STATUS } from '../../enums/nokkelopplysninger';
import { sykmelding as sykmeldingPt } from '../../propTypes';

const DinBekreftedeSykmelding = ({ sykmelding, ledetekster }) => {
    return (<div>
        <StatusPanel
            sykmelding={sykmelding}
            ledetekster={ledetekster}
            type="info"
            nokkelopplysninger={[
                [STATUS],
            ]} />
        <Utvidbar erApen tittel={getLedetekst('din-sykmelding.dine-opplysninger.tittel', ledetekster)}
            ikon="svg/doctor-2.svg" ikonHover="svg/doctor-2_hover.svg" ikonAltTekst="Lege" className="blokk" variant="lysebla">
            <DineSykmeldingOpplysninger sykmelding={sykmelding} ledetekster={ledetekster} />
        </Utvidbar>
    </div>);
};

DinBekreftedeSykmelding.propTypes = {
    ledetekster: PropTypes.object,
    sykmelding: sykmeldingPt,
};

export default DinBekreftedeSykmelding;
