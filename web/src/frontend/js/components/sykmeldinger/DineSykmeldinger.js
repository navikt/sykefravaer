import React, { PropTypes } from 'react';
import SykmeldingTeasere from './SykmeldingTeasere.js';
import { getLedetekst, getHtmlLedetekst } from '../../ledetekster';
import { sorterSykmeldinger } from '../../utils/datoUtils';
import SykmeldingerSorteringContainer from '../../containers/SykmeldingerSorteringContainer';

const DineSykmeldinger = ({ sykmeldinger = [], ledetekster = {}, sortering }) => {
    const nyeSykmeldinger = sykmeldinger.filter((sykmld) => {
        return sykmld.status === 'NY';
    });
    const tidligereSykmeldinger = sykmeldinger.filter((sykmld) => {
        return sykmld.status !== 'NY';
    });
    const nyeSortering = sortering && sortering.nye ? sortering.nye : undefined;
    const tidligereSortering = sortering && sortering.tidligere ? sortering.tidligere : undefined;

    return (<div>
        <h1 className="side-header typo-sidetittel">
            {getLedetekst('dine-sykmeldinger.tittel', ledetekster)}
        </h1>
        <div className="dine-sykmeldinger-intro redaksjonelt-innhold side-innhold js-intro">
            <p dangerouslySetInnerHTML={getHtmlLedetekst('dine-sykmeldinger.introduksjonstekst', ledetekster)} />
        </div>
        <SykmeldingTeasere
            sykmeldinger={sorterSykmeldinger(nyeSykmeldinger, nyeSortering)}
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
