import React from 'react';
import { getLedetekst, DineSykmeldingOpplysninger, Utvidbar, nokkelopplysninger, arbeidssituasjoner } from 'digisyfo-npm';
import StatusPanel from '../StatusPanel';
import ArbeidsgiversSykmeldingContainer from '../../containers/sykmelding/ArbeidsgiversSykmeldingContainer';
import Sidetopp from '../Sidetopp';
import { sykmelding as sykmeldingPt } from '../../propTypes';
import SykepengesoknadstatusContainer from '../../containers/sykmelding/SykepengesoknadstatusContainer';
import AngreBekreftSykmeldingContainer from '../../containers/sykmelding/AngreBekreftSykmeldingContainer';
import { Vis } from '../../utils';

const { STATUS, INNSENDT_DATO } = nokkelopplysninger;

const DinBekreftedeSykmelding = ({ dinSykmelding }) => {
    return (
        <div>
            <Sidetopp tittel={getLedetekst('din-sykmelding.tittel')} />
            <StatusPanel
                sykmelding={dinSykmelding}
                type="suksess"
                nokkelopplysninger={[[STATUS, INNSENDT_DATO]]}>
                <AngreBekreftSykmeldingContainer sykmeldingId={dinSykmelding.id} />
            </StatusPanel>
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
            <Vis
                hvis={dinSykmelding.valgtArbeidssituasjon === arbeidssituasjoner.ARBEIDSTAKER}
                render={() => {
                    return (<div className="blokk">
                        <ArbeidsgiversSykmeldingContainer sykmeldingId={dinSykmelding.id} />
                    </div>);
                }} />
            <SykepengesoknadstatusContainer sykmeldingId={dinSykmelding.id} />
        </div>
    );
};

DinBekreftedeSykmelding.propTypes = {
    dinSykmelding: sykmeldingPt,
};

export default DinBekreftedeSykmelding;
