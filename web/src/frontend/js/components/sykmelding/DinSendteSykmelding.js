import React from 'react';
import { getLedetekst, Utvidbar, DineSykmeldingOpplysninger } from 'digisyfo-npm';
import StatusPanel from '../StatusPanel';
import ArbeidsgiversSykmelding from './ArbeidsgiversSykmelding';
import { ARBEIDSGIVER, INNSENDT_DATO, ORGNUMMER, STATUS } from '../../enums/nokkelopplysninger';
import Sidetopp from '../Sidetopp';
import { sykmelding as sykmeldingPt } from '../../propTypes';

const DinSendteSykmelding = ({ dinSykmelding, arbeidsgiversSykmelding }) => {
    return (<div>
        <Sidetopp tittel={getLedetekst('din-sykmelding.tittel')} />
        <StatusPanel
            sykmelding={dinSykmelding}
            type="suksess"
            nokkelopplysninger={[
                [STATUS, INNSENDT_DATO],
                [ARBEIDSGIVER, ORGNUMMER],
            ]} />
        <Utvidbar
            tittel={getLedetekst('din-sykmelding.dine-opplysninger.tittel')}
            ikon="svg/person.svg"
            ikonHover="svg/person_hover.svg"
            ikonAltTekst="Du"
            className="blokk"
            variant="lysebla"
            Overskrift="h2">
            <DineSykmeldingOpplysninger sykmelding={dinSykmelding} />
        </Utvidbar>
        <div className="blokk--l">
            <ArbeidsgiversSykmelding sykmelding={arbeidsgiversSykmelding} />
        </div>
    </div>);
};

DinSendteSykmelding.propTypes = {
    dinSykmelding: sykmeldingPt,
    arbeidsgiversSykmelding: sykmeldingPt,
};

export default DinSendteSykmelding;
