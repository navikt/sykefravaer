import React, { PropTypes } from 'react';
import {
    OppfolgingsdialogSide,
    GodkjennPlanSendt,
    GodkjentPlan,
    BRUKERTYPE,
    OppfolgingsdialogFooter,
} from 'oppfolgingsdialog-npm';
import GodkjennPlan from './GodkjennPlan';
import { getContextRoot } from '../../routers/paths';
import history from '../../history';

export const Plan = ({ ledetekster, oppfolgingsdialog, oppfolgingsdialogId, pdfUrler, giSamtykkeSvar }) => {
    return (
        <OppfolgingsdialogSide
            brukernavn={oppfolgingsdialog.virksomhetsnavn}
            oppfolgingsdialog={oppfolgingsdialog}
            aktivUrl={history.getCurrentLocation().pathname}
            ledetekster={ledetekster}
            rootUrl={`/sykefravaer/oppfolgingsplaner/${oppfolgingsdialogId}`}>

            {
                !oppfolgingsdialog.godkjentAvArbeidstaker &&
                <GodkjennPlan
                    ledetekster={ledetekster}
                    oppfolgingsdialog={oppfolgingsdialog}
                    brukerType={BRUKERTYPE.ARBEIDSTAKER}
                    giSamtykkeSvar={giSamtykkeSvar}
                />
            }

            {
                oppfolgingsdialog.godkjentAvArbeidstaker && !oppfolgingsdialog.godkjentAvArbeidsgiver &&
                <GodkjennPlanSendt
                    ledetekster={ledetekster}
                    oppfolgingsdialog={oppfolgingsdialog}
                    brukerType={BRUKERTYPE.ARBEIDSTAKER}
                    rootUrl={`${getContextRoot()}`}
                />
            }
            {
                oppfolgingsdialog.godkjentAvArbeidstaker && oppfolgingsdialog.godkjentAvArbeidsgiver &&
                <GodkjentPlan
                    ledetekster={ledetekster}
                    oppfolgingsdialog={oppfolgingsdialog}
                    oppfolgingsdialogId={oppfolgingsdialogId}
                    brukerType={BRUKERTYPE.ARBEIDSTAKER}
                    rootUrl={`${getContextRoot()}`}
                    pdfUrler={pdfUrler}
                />
            }
            {
                <OppfolgingsdialogFooter
                    sideNr="3"
                    ledetekster={ledetekster}
                    oppfolgingsdialog={oppfolgingsdialog}
                    rootUrl={`/sykefravaer/oppfolgingsplaner/${oppfolgingsdialogId}`}
                />
            }
        </OppfolgingsdialogSide>
    );
};

Plan.propTypes = {
    ledetekster: PropTypes.object,
    oppfolgingsdialog: PropTypes.object,
    oppfolgingsdialogId: PropTypes.string,
    giSamtykkeSvar: PropTypes.func,
    pdfUrler: PropTypes.array,
};

export default Plan;
