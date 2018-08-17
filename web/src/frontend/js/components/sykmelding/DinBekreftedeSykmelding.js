import React from 'react';
import { getLedetekst, DineSykmeldingOpplysninger, Utvidbar, arbeidssituasjoner } from 'digisyfo-npm';
import ArbeidsgiversSykmeldingContainer from '../../containers/sykmelding/ArbeidsgiversSykmeldingContainer';
import Sidetopp from '../Sidetopp';
import { sykmelding as sykmeldingPt } from '../../propTypes';
import { Vis } from '../../utils';
import BekreftetSykmeldingStatuspanel from '../sykmeldingstatuspanel/BekreftetSykmeldingStatuspanel';
import BekreftetSykmeldingSoknadstatusContainer from '../../containers/sykmeldingSoknadStatus/BekreftetSykmeldingSoknadstatusContainer';

const DinBekreftedeSykmelding = ({ dinSykmelding }) => {
    return (
        <div>
            <Sidetopp tittel={getLedetekst('din-sykmelding.tittel')} />
            <BekreftetSykmeldingStatuspanel sykmelding={dinSykmelding} />
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
            <BekreftetSykmeldingSoknadstatusContainer sykmelding={dinSykmelding} />
        </div>
    );
};

DinBekreftedeSykmelding.propTypes = {
    dinSykmelding: sykmeldingPt,
};

export default DinBekreftedeSykmelding;
