import React, { PropTypes } from 'react';
import { getLedetekst } from 'digisyfo-npm';
import Sidetopp from '../Sidetopp';
import OppfolgingsdialogerTeasere from './OppfolgingsdialogerTeasere';
import { OppfolgingsdialogInfoboks } from 'oppfolgingsdialog-npm';
import { isEmpty } from '../../utils/oppfolgingsdialogUtils';
import { Link } from 'react-router';

const Oppfolgingsdialoger = ({ oppfolgingsdialoger = [] }) => {
    return (<div>
        <Sidetopp
            tittel={getLedetekst('oppfolgingsdialoger.sidetittel')} />
        <OppfolgingsdialogInfoboks
            svgUrl="/sykefravaer/img/svg/oppfolgingsdialog-infoboks.svg"
            altUrl="Oppfølgingsdialog"
            tittel={getLedetekst('oppfolgingsdialog.arbeidstaker.infoboks.tittel')}
            tekst={getLedetekst('oppfolgingsdialog.arbeidstaker.infoboks.tekst')} />

        { isEmpty(oppfolgingsdialoger) &&
            <img className="pil" src="/sykefravaer/img/svg/pil.svg" alt="pil" />
        }
        <div className="knapperad">
            <Link role="button" className="knapp__opprettOppfolgingsdialog" to={"/sykefravaer/oppfolgingsdialoger/opprett"}>
                {getLedetekst('oppfolgingsdialog.knapp.ny-oppfolgingsdialog')}
            </Link>
        </div>
        { !isEmpty(oppfolgingsdialoger) &&
            <OppfolgingsdialogerTeasere
                oppfolgingsdialoger={oppfolgingsdialoger}
                tittel={getLedetekst('oppfolgingsdialoger.nye-oppfolgingsdialoger.tittel')}
                ingenOppfolgingsdialogerMelding={getLedetekst('oppfolgingsdialoger.nye-oppfolgingsdialoger.ingen-oppfolgingsdialoger.melding')}
            />
        }
    </div>);
};

Oppfolgingsdialoger.propTypes = {
    oppfolgingsdialoger: PropTypes.array,
    ledetekster: PropTypes.object,
};

export default Oppfolgingsdialoger;
