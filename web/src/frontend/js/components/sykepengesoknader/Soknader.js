import React, { PropTypes } from 'react';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import Sidetopp from '../Sidetopp';
import SoknadTeasere from './SoknaderTeasere';

const Soknader = ({ ledetekster = {}, soknader = [] }) => {
    const nyeSoknader = soknader.filter((soknad) => {
        return soknad.status === 'NY';
    });
    const sendteSoknader = soknader.filter((soknad) => {
        return soknad.status === 'SENDT';
    });

    return (<div>
        <Sidetopp
            tittel={getLedetekst('soknader.sidetittel', ledetekster)}
            htmlTekst={getHtmlLedetekst('soknader.introduksjonstekst', ledetekster)}
        />
        <SoknadTeasere
            soknader={nyeSoknader}
            tittel={getLedetekst('soknader.venter-paa-behandling.tittel', ledetekster)}
            tomListeTekst={getLedetekst('soknader.venter-paa-behandling.ingen-soknader', ledetekster)}
            className="js-til-behandling"
            ledetekster={ledetekster}
            id="soknader-list-til-behandling"
        />
        {
            sendteSoknader.length > 0 && (<SoknadTeasere
                soknader={sendteSoknader}
                tittel={getLedetekst('soknader.sendt.tittel', ledetekster)}
                tomListeTekst={getLedetekst('soknader.sendt.ingen-soknader', ledetekster)}
                className="js-sendt"
                ledetekster={ledetekster}
                id="soknader-sendt"
            />)
        }
    </div>);
};

Soknader.propTypes = {
    ledetekster: PropTypes.object.isRequired,
    soknader: PropTypes.array,
};

export default Soknader;
