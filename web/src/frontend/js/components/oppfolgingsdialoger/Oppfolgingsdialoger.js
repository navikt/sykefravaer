import React, { PropTypes } from 'react';
import { getLedetekst } from 'digisyfo-npm';
import Sidetopp from '../Sidetopp';
import { OppfolgingsdialogTeasere, BRUKERTYPE } from 'oppfolgingsdialog-npm';
import { isEmpty } from '../../utils/oppfolgingsdialogUtils';
import UnderUtviklingVarsel from './UnderUtviklingVarsel';
import { getContextRoot } from '../../routers/paths';
import { Link } from 'react-router';

const Oppfolgingsdialoger = ({ oppfolgingsdialoger = [], ledetekster }) => {
    return (<div>
        <UnderUtviklingVarsel />
        <Sidetopp
            tittel={getLedetekst('oppfolgingsdialoger.sidetittel')} />
        <p className="oppfolgingsdialoger_tekst" dangerouslySetInnerHTML={{ __html: getLedetekst('oppfolgingsdialog.arbeidstaker.infoboks.tekst') }} />

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

        <div className="panel">
            <p className="oppfolgingsdialoger__start_tekst">{getLedetekst('oppfolgingsdialoger.oppfolgingsdialoger.start-oppfolgingsdialog.tekst')}</p>
            <div className="knapperad">
                <Link role="button" className="knapp" to={`${getContextRoot()}/oppfolgingsplaner/opprett`}>
                    {getLedetekst('oppfolgingsdialog.knapp.ny-oppfolgingsdialog')}
                </Link>
            </div>
        </div>
    </div>);
};

Oppfolgingsdialoger.propTypes = {
    oppfolgingsdialoger: PropTypes.array,
    ledetekster: PropTypes.object,
};

export default Oppfolgingsdialoger;
