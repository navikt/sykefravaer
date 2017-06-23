import React, { PropTypes } from 'react';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import Sidetopp from '../Sidetopp';
import SoknadTeasere from './SoknaderTeasere';
import { SENDT, TIL_SENDING, UTGAATT, NY, UTKAST_TIL_KORRIGERING } from '../../enums/sykepengesoknadstatuser';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import { sorterEtterDato } from '../../utils/sykepengesoknadUtils';

const Soknader = ({ soknader = [] }) => {
    const nyeSoknader = soknader.filter((soknad) => {
        return soknad.status === NY || soknad.status === UTKAST_TIL_KORRIGERING;
    });
    const sendteSoknader = soknader.filter((soknad) => {
        return soknad.status === SENDT || soknad.status === TIL_SENDING || soknad.status === UTGAATT;
    }).sort(sorterEtterDato);

    return (<div>
        <Sidetopp
            tittel={getLedetekst('soknader.sidetittel')}
            htmlTekst={getHtmlLedetekst('soknader.introduksjonstekst')}
        />
        <SoknadTeasere
            soknader={nyeSoknader}
            tittel={getLedetekst('soknader.venter-paa-behandling.tittel')}
            tomListeTekst={getLedetekst('soknader.venter-paa-behandling.ingen-soknader')}
            className="js-til-behandling"
            id="soknader-list-til-behandling"
        />
        {
            sendteSoknader.length > 0 && (<SoknadTeasere
                soknader={sendteSoknader}
                tittel={getLedetekst('soknader.sendt.tittel')}
                tomListeTekst={getLedetekst('soknader.sendt.ingen-soknader')}
                className="js-sendt"
                id="soknader-sendt"
            />)
        }
    </div>);
};

Soknader.propTypes = {
    soknader: PropTypes.arrayOf(sykepengesoknadPt),
};

export default Soknader;
