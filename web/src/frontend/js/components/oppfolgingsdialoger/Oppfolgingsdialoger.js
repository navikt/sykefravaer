import React, { PropTypes } from 'react';
import { getLedetekst } from 'digisyfo-npm';
import { Link } from 'react-router';
import Sidetopp from '../Sidetopp';
import { isEmpty, erDatoIFortiden } from '../../utils/oppfolgingsdialogUtils';
import UnderUtviklingVarsel from './UnderUtviklingVarsel';
import { getContextRoot } from '../../routers/paths';
import {
    OppfolgingsdialogTeasere,
    BRUKERTYPE,
    OppfolgingsdialogerIngenplan,
    sortEtterEvalueringsDato,
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

const tidligereOppfolgingsdialoger = (oppfolgingsdialoger) => {
    sortEtterEvalueringsDato(oppfolgingsdialoger);
    return oppfolgingsdialoger.filter((oppfolgingsdialog) => {
        return oppfolgingsdialog.godkjentPlan && oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt && oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.tom &&
            erDatoIFortiden(oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.tom);
    });
};

const aktivOppfolgingsdialog = (oppfolgingsdialoger) => {
    sortEtterEvalueringsDato(oppfolgingsdialoger);
    return oppfolgingsdialoger.filter((oppfolgingsdialog) => {
        return !oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt || (oppfolgingsdialog.godkjentPlan && oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt && oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.tom &&
            !erDatoIFortiden(oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.tom));
    });
};

export const Oppfolgingsdialoger = ({ oppfolgingsdialoger = [], ledetekster }) => {
    return (<div>
        <UnderUtviklingVarsel />
        <Sidetopp
            tittel={getLedetekst('oppfolgingsdialoger.sidetittel')} />
        <p className="oppfolgingsdialoger__tekst">
            {getLedetekst('oppfolgingsdialog.oppfolgingsdialoger.arbeidstaker.tekst')}
        </p>

        { !isEmpty(oppfolgingsdialoger) && aktivOppfolgingsdialog(oppfolgingsdialoger).length > 0 &&
        <div>
            <OppfolgingsdialogTeasere
                ledetekster={ledetekster}
                oppfolgingsdialoger={aktivOppfolgingsdialog(oppfolgingsdialoger)}
                tittel={oppfolgingsdialoger.length > 1 ? getLedetekst('oppfolgingsdialoger.oppfolgingsdialoger.fler.header.tittel') :
                    getLedetekst('oppfolgingsdialoger.oppfolgingsdialoger.header.tittel')}
                brukerType={BRUKERTYPE.ARBEIDSTAKER}
                rootUrl={getContextRoot()}
                rootUrlPlaner={getContextRoot()}
            />
            <OppfolgingsdialogNyDialog ledetekster={ledetekster} />
        </div>
        }

        { (isEmpty(oppfolgingsdialoger) || aktivOppfolgingsdialog(oppfolgingsdialoger).length === 0) &&
        <div className="blokk--l">
            <OppfolgingsdialogerIngenplan
                ledetekster={ledetekster}
                brukerType={BRUKERTYPE.ARBEIDSTAKER}
                rootUrl={getContextRoot()}
            />
        </div>
        }

        { !isEmpty(Oppfolgingsdialoger) && tidligereOppfolgingsdialoger(oppfolgingsdialoger).length > 0 &&
        <div>
            <OppfolgingsdialogTeasere
                ledetekster={ledetekster}
                oppfolgingsdialoger={tidligereOppfolgingsdialoger(oppfolgingsdialoger)}
                harTidligerOppfolgingsdialoger
                tittel={getLedetekst('oppfolgingsdialoger.tidligereplaner.tittel')}
                id="OppfolgingsdialogTeasereAT"
                brukerType={BRUKERTYPE.ARBEIDSTAKER}
                rootUrl={getContextRoot()}
                rootUrlPlaner={getContextRoot()}
                svgUrl={`${window.APP_SETTINGS.APP_ROOT}/img/svg/plan-godkjent.svg`}
                svgAlt="OppfølgingsdialogTidligere"
            />
        </div>
        }

    </div>);
};

Oppfolgingsdialoger.propTypes = {
    oppfolgingsdialoger: PropTypes.array,
    ledetekster: PropTypes.object,
};

export default Oppfolgingsdialoger;
