import React, { PropTypes } from 'react';
import SykmeldingTeasere from './SykmeldingTeasere';
import { getLedetekst, getHtmlLedetekst, sorterSykmeldinger, sorterSykmeldingerEldsteFoerst } from 'digisyfo-npm';
import SykmeldingerSorteringContainer from '../../containers/SykmeldingerSorteringContainer';
import Sidetopp from '../Sidetopp';
import { NY } from '../../enums/sykmeldingstatuser';

const DineSykmeldinger = ({ sykmeldinger = [], ledetekster = {}, sortering }) => {
    const nyeSykmeldinger = sykmeldinger.filter((sykmld) => {
        return sykmld.status === NY;
    });
    const tidligereSykmeldinger = sykmeldinger.filter((sykmld) => {
        return sykmld.status !== NY;
    });
    const tidligereSortering = sortering && sortering.tidligere ? sortering.tidligere : undefined;

    return (<div>
        <Sidetopp
            tittel={getLedetekst('dine-sykmeldinger.tittel', ledetekster)}
            htmlTekst={getHtmlLedetekst('dine-sykmeldinger.introduksjonstekst', ledetekster)}
            />
        <SykmeldingTeasere
            sykmeldinger={sorterSykmeldingerEldsteFoerst(nyeSykmeldinger)}
            tittel={getLedetekst('dine-sykmeldinger.nye-sykmeldinger.tittel', ledetekster)}
            ingenSykmeldingerMelding={getLedetekst('dine-sykmeldinger.nye-sykmeldinger.ingen-sykmeldinger.melding', ledetekster)}
            className="js-nye-sykmeldinger"
            ledetekster={ledetekster}
            id="sykmelding-liste-nye" />
        {
            tidligereSykmeldinger.length > 0 && <SykmeldingTeasere
                sykmeldinger={sorterSykmeldinger(tidligereSykmeldinger, tidligereSortering)}
                tittel={getLedetekst('dine-sykmeldinger.tidligere-sykmeldinger.tittel', ledetekster)}
                ingenSykmeldingerMelding={getLedetekst('dine-sykmeldinger.tidligere-sykmeldinger.ingen-sykmeldinger.melding', ledetekster)}
                className="js-tidligere-sykmeldinger"
                ledetekster={ledetekster}
                id="sykmelding-liste-tidligere">
                    <SykmeldingerSorteringContainer status="tidligere" />
                </SykmeldingTeasere>
        }
    </div>);
};

DineSykmeldinger.propTypes = {
    sykmeldinger: PropTypes.array.isRequired,
    ledetekster: PropTypes.object.isRequired,
    sortering: PropTypes.object,
};

export default DineSykmeldinger;
