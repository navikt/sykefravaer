import React, { PropTypes } from 'react';
import { getLedetekst } from 'digisyfo-npm';
import { Link } from 'react-router';
import Sidetopp from '../Sidetopp';
import { isEmpty } from '../../utils/oppfolgingsdialogUtils';
import UnderUtviklingVarsel from './UnderUtviklingVarsel';
import { getContextRoot } from '../../routers/paths';
import {
    OppfolgingsdialogTeasere,
    BRUKERTYPE,
    OppfolgingsdialogerIngenplan,
} from 'oppfolgingsdialog-npm';

export const OppfolgingsdialogNyDialog = () => {
    return (
        <div className="panel oppfolgingsdialogNyDialog">
            <h3>
                {getLedetekst('oppfolgingsdialoger.oppfolgingsdialoger.oppfolgingsdialogNyDialog.arbeidstaker.tittel')}
            </h3>
            <p>
                {getLedetekst('oppfolgingsdialoger.oppfolgingsdialoger.oppfolgingsdialogNyDialog.arbeidstaker.tekst')}
            </p>
            <div className="knapperad">
                <Link role="button" className="knapp" to={`${getContextRoot()}/oppfolgingsplaner/opprett`}>
                    {getLedetekst('oppfolgingsdialog.knapp.ny-oppfolgingsdialog')}
                </Link>
            </div>
        </div>
    );
};

export const Oppfolgingsdialoger = ({ oppfolgingsdialoger = [], ledetekster }) => {
    return (<div>
        <UnderUtviklingVarsel />
        <Sidetopp
            tittel={getLedetekst('oppfolgingsdialoger.sidetittel')} />
        <p className="oppfolgingsdialoger__tekst">
            {getLedetekst('oppfolgingsdialog.oppfolgingsdialoger.arbeidstaker.tekst')}
        </p>

        { !isEmpty(oppfolgingsdialoger) &&
        <div>
            <OppfolgingsdialogTeasere
                ledetekster={ledetekster}
                oppfolgingsdialoger={oppfolgingsdialoger}
                tittel={oppfolgingsdialoger.length > 1 ? getLedetekst('oppfolgingsdialoger.oppfolgingsdialoger.fler.header.tittel') :
                    getLedetekst('oppfolgingsdialoger.oppfolgingsdialoger.header.tittel')}
                brukerType={BRUKERTYPE.ARBEIDSTAKER}
                rootUrl={getContextRoot()}
                rootUrlPlaner={getContextRoot()}
            />
           <OppfolgingsdialogNyDialog ledetekster={ledetekster} />
        </div>
        }

        { isEmpty(oppfolgingsdialoger) &&
        <OppfolgingsdialogerIngenplan
            ledetekster={ledetekster}
            brukerType={BRUKERTYPE.ARBEIDSTAKER}
            rootUrl={getContextRoot()}
        />
        }
    </div>);
};

Oppfolgingsdialoger.propTypes = {
    oppfolgingsdialoger: PropTypes.array,
    ledetekster: PropTypes.object,
};

export default Oppfolgingsdialoger;
