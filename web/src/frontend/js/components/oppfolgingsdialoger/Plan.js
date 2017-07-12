import React, { PropTypes } from 'react';
import {
    OppfolgingsdialogSide,
    GodkjennPlanSendt,
    GodkjentPlan,
    BRUKERTYPE,
} from 'oppfolgingsdialog-npm';
import GodkjennPlan from './GodkjennPlan';
import { getContextRoot } from '../../routers/paths';

export const Plan = ({ ledetekster, oppfolgingsdialog, oppfolgingsdialogId, pdfUrler, giSamtykkeSvar }) => {
    return (
        <OppfolgingsdialogSide
            brukernavn={oppfolgingsdialog.virksomhetsnavn}
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
