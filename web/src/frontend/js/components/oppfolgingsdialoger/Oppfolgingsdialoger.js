import React, { PropTypes } from 'react';
import { getLedetekst, getHtmlLedetekst, sorterSykmeldinger, sorterSykmeldingerEldsteFoerst } from 'digisyfo-npm';
import Sidetopp from '../Sidetopp';
import OppfolgingsdialogerTeasere from './OppfolgingsdialogerTeasere';

const Oppfolgingsdialoger = ({ oppfolgingsdialoger = [] }) => {
    const nyeOppfolgingsdialoger = oppfolgingsdialoger.filter((dialog) => {
        return dialog;
    });
    const tidligereOppfolgingsdialoger = oppfolgingsdialoger.filter((dialog) => {
        return dialog;
    });

    return (<div>
        <Sidetopp
            tittel={getLedetekst('oppfolgingsdialoger.sidetittel')} />
        <button className='nyoppfolgingsdialogknapp'>
            {getLedetekst('oppfolgingsdialog.knapp.ny-oppfolgingsdialog')}
        </button>
        <OppfolgingsdialogerTeasere
            oppfolgingsdialoger={nyeOppfolgingsdialoger}
            tittel={getLedetekst('oppfolgingsdialoger.nye-oppfolgingsdialoger.tittel')}
            ingenOppfolgingsdialogerMelding={getLedetekst('oppfolgingsdialoger.nye-oppfolgingsdialoger.ingen-oppfolgingsdialoger.melding')} />
        {
            tidligereOppfolgingsdialoger.length > 0 && <OppfolgingsdialogerTeasere
                oppfolgingsdialoger={tidligereOppfolgingsdialoger}
                tittel={getLedetekst('oppfolgingsdialoger.tidligere-oppfolgingsdialoger.tittel')}
                ingenOppfolgingsdialogerMelding={getLedetekst('oppfolgingsdialoger.tidligere-oppfolgingsdialoger.ingen-oppfolgingsdialoger.melding')} />
        }
    </div>);
};

Oppfolgingsdialoger.propTypes = {
    oppfolgingsdialoger: PropTypes.array,
};

export default Oppfolgingsdialoger;
