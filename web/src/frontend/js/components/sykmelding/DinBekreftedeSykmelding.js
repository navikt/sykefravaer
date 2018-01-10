import React from 'react';
import { getLedetekst, DineSykmeldingOpplysninger, Utvidbar, nokkelopplysninger } from 'digisyfo-npm';
import StatusPanel from '../StatusPanel';
import ArbeidsgiversSykmeldingContainer from '../../containers/sykmelding/ArbeidsgiversSykmeldingContainer';
import Sidetopp from '../Sidetopp';
import { sykmelding as sykmeldingPt } from '../../propTypes';
import SykepengesoknadstatusContainer from '../../containers/sykmelding/SykepengesoknadstatusContainer';

const { STATUS, INNSENDT_DATO } = nokkelopplysninger;

const DinBekreftedeSykmelding = ({ dinSykmelding }) => {
    return (<div>
        <Sidetopp tittel={getLedetekst('din-sykmelding.tittel')} />
        <StatusPanel
            sykmelding={dinSykmelding}
            type="suksess"
            nokkelopplysninger={[[STATUS, INNSENDT_DATO]]} />
        <Utvidbar
            erApen
            tittel={getLedetekst('din-sykmelding.dine-opplysninger.tittel')}
            ikon="svg/person.svg"
            ikonHover="svg/person_hover.svg"
            ikonAltTekst="Du"
            className="blokk"
            variant="lysebla"
            Overskrift="h2">
            <DineSykmeldingOpplysninger sykmelding={dinSykmelding} />
        </Utvidbar>
        {
            dinSykmelding.valgtArbeidssituasjon === 'ARBEIDSTAKER' &&
                <div className="blokk">
                    <ArbeidsgiversSykmeldingContainer sykmeldingId={dinSykmelding.id} />
                </div>
        }
        <SykepengesoknadstatusContainer sykmeldingId={dinSykmelding.id} />
    </div>);
};

DinBekreftedeSykmelding.propTypes = {
    dinSykmelding: sykmeldingPt,
};

export default DinBekreftedeSykmelding;
