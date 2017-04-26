import React from 'react';
import StatusPanel from '../StatusPanel';
import { getLedetekst, DineSykmeldingOpplysninger, Utvidbar } from 'digisyfo-npm';
import { STATUS, INNSENDT_DATO } from '../../enums/nokkelopplysninger';
import ArbeidsgiversSykmelding from './ArbeidsgiversSykmelding';
import Sidetopp from '../Sidetopp';
import { sykmelding as sykmeldingPt } from '../../propTypes';

const DinBekreftedeSykmelding = ({ dinSykmelding, arbeidsgiversSykmelding }) => {
    return (<div>
        <Sidetopp tittel={getLedetekst('din-sykmelding.tittel')} />
        <StatusPanel
            sykmelding={dinSykmelding}
            type="suksess"
            nokkelopplysninger={[[STATUS, INNSENDT_DATO]]} />
        <Utvidbar erApen tittel={getLedetekst('din-sykmelding.dine-opplysninger.tittel')}
            ikon="svg/person.svg" ikonHover="svg/person_hover.svg" ikonAltTekst="Du" className="blokk" variant="lysebla" Overskrift="H2">
            <DineSykmeldingOpplysninger sykmelding={dinSykmelding} />
        </Utvidbar>
        {
            dinSykmelding.valgtArbeidssituasjon === 'ARBEIDSTAKER' &&
            <div className="blokk">
                <ArbeidsgiversSykmelding sykmelding={arbeidsgiversSykmelding} />
            </div>
        }
    </div>);
};

DinBekreftedeSykmelding.propTypes = {
    dinSykmelding: sykmeldingPt,
    arbeidsgiversSykmelding: sykmeldingPt,
};

export default DinBekreftedeSykmelding;
