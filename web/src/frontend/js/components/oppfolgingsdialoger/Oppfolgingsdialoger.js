import React from 'react';
import PropTypes from 'prop-types';
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
    finnTidligereOppfolgingsdialoger,
    harTidligereOppfolgingsdialoger,
    finnAktiveOppfolgingsdialoger,
    harAktivOppfolgingsdialog,
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

        { !isEmpty(oppfolgingsdialoger) && harAktivOppfolgingsdialog(oppfolgingsdialoger) &&
            <div>
                <OppfolgingsdialogTeasere
                    ledetekster={ledetekster}
                    oppfolgingsdialoger={finnAktiveOppfolgingsdialoger(oppfolgingsdialoger)}
                    tittel={finnAktiveOppfolgingsdialoger(oppfolgingsdialoger).length > 1 ? getLedetekst('oppfolgingsdialoger.oppfolgingsdialoger.fler.header.tittel') :
                        getLedetekst('oppfolgingsdialoger.oppfolgingsdialoger.header.tittel')}
                    brukerType={BRUKERTYPE.ARBEIDSTAKER}
                    rootUrl={getContextRoot()}
                    rootUrlPlaner={getContextRoot()}
                />
                <OppfolgingsdialogNyDialog ledetekster={ledetekster} />
            </div>
        }

        { (isEmpty(oppfolgingsdialoger) || !harAktivOppfolgingsdialog(oppfolgingsdialoger)) &&
            <div className="blokk--l">
                <OppfolgingsdialogerIngenplan
                    ledetekster={ledetekster}
                    brukerType={BRUKERTYPE.ARBEIDSTAKER}
                    rootUrl={getContextRoot()}
                />
            </div>
        }

        { !isEmpty(Oppfolgingsdialoger) && harTidligereOppfolgingsdialoger(oppfolgingsdialoger) &&
            <div>
                <OppfolgingsdialogTeasere
                    ledetekster={ledetekster}
                    oppfolgingsdialoger={finnTidligereOppfolgingsdialoger(oppfolgingsdialoger)}
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
