import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, sykepengesoknadstatuser, Varselstripe } from 'digisyfo-npm';
import Sidetopp from '../Sidetopp';
import SoknadTeasere from './SoknaderTeasere';
import { sykepengesoknad as sykepengesoknadPt, soknad as soknadPt } from '../../propTypes';
import { sorterEtterPerioder, sorterEtterOpprettetDato } from '../../utils/sykepengesoknadUtils';
import FremtidigSoknadTeaser from './FremtidigSoknadTeaser';
import UtbetalingerLenke from './UtbetalingerLenke';
import { Vis } from '../../utils';

const { SENDT, TIL_SENDING, UTGAATT, NY, UTKAST_TIL_KORRIGERING, FREMTIDIG, AVBRUTT } = sykepengesoknadstatuser;

const Soknader = ({ sykepengesoknader = [], soknader = [], visFeil }) => {
    const nyeSoknader = [...sykepengesoknader, ...soknader].filter((soknad) => {
        return soknad.status === NY || soknad.status === UTKAST_TIL_KORRIGERING;
    }).sort(sorterEtterOpprettetDato);
    const tidligereSoknader = [...sykepengesoknader, ...soknader]
        .filter((soknad) => {
            return soknad.status === SENDT || soknad.status === TIL_SENDING || soknad.status === UTGAATT || soknad.status === AVBRUTT;
        })
        .sort(sorterEtterPerioder);
    const fremtidigeSoknader = [...sykepengesoknader, ...soknader]
        .filter((soknad) => {
            return soknad.status === FREMTIDIG;
        })
        .sort(sorterEtterPerioder)
        .reverse();

    return (<div>
        <Sidetopp
            tittel={getLedetekst('soknader.sidetittel')}
        />
        <Vis hvis={visFeil}>
            <div className="panel blokk">
                <Varselstripe type="feil" fylt>
                    <p className="sist"><strong>Oops! </strong> Vi kunne ikke hente alle dine sykepengesøknader.</p>
                </Varselstripe>
            </div>
        </Vis>
        <SoknadTeasere
            soknader={nyeSoknader}
            tittel={getLedetekst('soknader.venter-paa-behandling.tittel')}
            tomListeTekst={getLedetekst('soknader.venter-paa-behandling.ingen-soknader')}
            className="js-til-behandling"
            id="soknader-list-til-behandling"
        />
        {
            fremtidigeSoknader.length > 0 && <SoknadTeasere
                Child={FremtidigSoknadTeaser}
                soknader={fremtidigeSoknader}
                tittel={getLedetekst('soknader.planlagt.tittel')}
                className="js-planlagt"
                id="soknader-planlagt"
            />
        }
        <UtbetalingerLenke />
        {
            tidligereSoknader.length > 0 && (<SoknadTeasere
                soknader={tidligereSoknader}
                tittel={getLedetekst('soknader.sendt.tittel')}
                tomListeTekst={getLedetekst('soknader.sendt.ingen-soknader')}
                className="js-sendt"
                id="soknader-sendt"
            />)
        }
    </div>);
};

Soknader.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
    soknader: PropTypes.arrayOf(soknadPt),
};

export default Soknader;
