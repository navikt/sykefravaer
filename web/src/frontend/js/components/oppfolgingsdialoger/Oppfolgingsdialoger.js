import React, { PropTypes } from 'react';
import { getLedetekst } from 'digisyfo-npm';
import Sidetopp from '../Sidetopp';
import OppfolgingsdialogerTeasere from './OppfolgingsdialogerTeasere';
import { OppfolgingsdialogInfoboks } from 'oppfolgingsdialog-npm';

const Oppfolgingsdialoger = ({ oppfolgingsdialoger = [] }) => {
    return (<div>
        <Sidetopp
            tittel={getLedetekst('oppfolgingsdialoger.sidetittel')} />
        <OppfolgingsdialogInfoboks
            svgUrl="/sykefravaer/img/svg/oppfolgingsdialog-infoboks.svg"
            altUrl="Oppfølgingsdialog"
            tittel={getLedetekst('oppfolgingsdialog.arbeidstaker.infoboks.tittel')}
            tekst={getLedetekst('oppfolgingsdialog.arbeidstaker.infoboks.tekst')} />
        <img className="pil" src="/sykefravaer/img/svg/pil.svg" alt="pil" />
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
