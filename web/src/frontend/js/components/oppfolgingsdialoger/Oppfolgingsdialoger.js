import React, { PropTypes } from 'react';
import { getLedetekst } from 'digisyfo-npm';
import Sidetopp from '../Sidetopp';
import OppfolgingsdialogerTeasere from './OppfolgingsdialogerTeasere';

const Oppfolgingsdialoger = ({ oppfolgingsdialoger = [] }) => {

    return (<div>
        <Sidetopp
            tittel={getLedetekst('oppfolgingsdialoger.sidetittel')} />
        <button className="nyoppfolgingsdialogknapp">
            {getLedetekst('oppfolgingsdialog.knapp.ny-oppfolgingsdialog')}
        </button>
        <OppfolgingsdialogerTeasere
            oppfolgingsdialoger={oppfolgingsdialoger}
            tittel={getLedetekst('oppfolgingsdialoger.nye-oppfolgingsdialoger.tittel')}
            ingenOppfolgingsdialogerMelding={getLedetekst('oppfolgingsdialoger.nye-oppfolgingsdialoger.ingen-oppfolgingsdialoger.melding')} />
    </div>);
};

Oppfolgingsdialoger.propTypes = {
    oppfolgingsdialoger: PropTypes.array,
};

export default Oppfolgingsdialoger;
