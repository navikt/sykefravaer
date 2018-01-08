import React from 'react';
import { Utvidbar, getLedetekst, DineSykmeldingOpplysninger, nokkelopplysninger } from 'digisyfo-npm';
import StatusPanel from '../StatusPanel';
import { sykmelding as sykmeldingPt } from '../../propTypes';

const DinBekreftedeSykmelding = ({ sykmelding }) => {
    return (<div>
        <StatusPanel
            sykmelding={sykmelding}
            type="info"
            nokkelopplysninger={[
                [nokkelopplysninger.STATUS],
            ]} />
        <Utvidbar
            erApen
            tittel={getLedetekst('din-sykmelding.dine-opplysninger.tittel')}
            ikon="svg/doctor-2.svg"
            ikonHover="svg/doctor-2_hover.svg"
            ikonAltTekst="Lege"
            className="blokk"
            variant="lysebla">
            <DineSykmeldingOpplysninger sykmelding={sykmelding} />
        </Utvidbar>
    </div>);
};

DinBekreftedeSykmelding.propTypes = {
    sykmelding: sykmeldingPt,
};

export default DinBekreftedeSykmelding;
