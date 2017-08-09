import React, { PropTypes } from 'react';
import { getLedetekst } from 'digisyfo-npm';
import Sidetopp from '../Sidetopp';
import { OppfolgingsdialogInfoboks, OppfolgingsdialogTeasere, BRUKERTYPE } from 'oppfolgingsdialog-npm';
import { isEmpty } from '../../utils/oppfolgingsdialogUtils';
import { getContextRoot } from '../../routers/paths';
import { Link } from 'react-router';

const Oppfolgingsdialoger = ({ oppfolgingsdialoger = [], ledetekster }) => {
    return (<div>
        <Sidetopp
            tittel={getLedetekst('oppfolgingsdialoger.sidetittel')} />
        <OppfolgingsdialogInfoboks
            svgUrl="/sykefravaer/img/svg/oppfolgingsdialog-infoboks.svg"
            altUrl="Oppfølgingsplan"
            tittel={getLedetekst('oppfolgingsdialog.arbeidstaker.infoboks.tittel')}
            tekst={getLedetekst('oppfolgingsdialog.arbeidstaker.infoboks.tekst')} />

        { isEmpty(oppfolgingsdialoger) &&
            <img className="oppfolgingsdialoger__pil" src="/sykefravaer/img/svg/oppfolgingsdialog-opprett-pil.svg" alt="pil" />
        }
        <div className="knapperad">
            <Link role="button" className="rammeknapp oppfolgingsdialoger__rammeknapp" to={"/sykefravaer/oppfolgingsplaner/opprett"}>
                {getLedetekst('oppfolgingsdialog.knapp.ny-oppfolgingsdialog')}
            </Link>
        </div>
        { !isEmpty(oppfolgingsdialoger) &&
            <OppfolgingsdialogTeasere
                oppfolgingsdialoger={oppfolgingsdialoger}
                tittel={getLedetekst('oppfolgingsdialoger.nye-oppfolgingsdialoger.tittel')}
                ingenOppfolgingsdialogerMelding={getLedetekst('oppfolgingsdialoger.nye-oppfolgingsdialoger.ingen-oppfolgingsdialoger.melding')}
                rootUrl={`${getContextRoot()}`}
                ledetekster={ledetekster}
                brukerType={BRUKERTYPE.ARBEIDSTAKER}
            />
        }
    </div>);
};

Oppfolgingsdialoger.propTypes = {
    oppfolgingsdialoger: PropTypes.array,
    ledetekster: PropTypes.object,
};

export default Oppfolgingsdialoger;
