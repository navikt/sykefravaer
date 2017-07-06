import React, { PropTypes } from 'react';
import {
    OppfolgingsdialogSide,
    GodkjennPlanSendt,
    GodkjentPlan,
} from 'oppfolgingsdialog-npm';
import GodkjennPlan from './GodkjennPlan';
import { getContextRoot } from '../../routers/paths';

export const Plan = ({ ledetekster, oppfolgingsdialog, oppfolgingsdialogId, giSamtykkeSvar }) => {
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
                    brukerType="SYKMELDT"
                    giSamtykkeSvar={giSamtykkeSvar}
                />
            }

            {
                oppfolgingsdialog.godkjentAvArbeidstaker && !oppfolgingsdialog.godkjentAvArbeidsgiver &&
                <GodkjennPlanSendt
                    ledetekster={ledetekster}
                    oppfolgingsdialog={oppfolgingsdialog}
                    brukerType="SYKMELDT"
                    rootUrl={`${getContextRoot()}`}
                />
            }
            {
                oppfolgingsdialog.godkjentAvArbeidstaker && oppfolgingsdialog.godkjentAvArbeidsgiver &&
                <GodkjentPlan
                    ledetekster={ledetekster}
                    oppfolgingsdialog={oppfolgingsdialog}
                    brukerType="SYKMELDT"
                    rootUrl={`${getContextRoot()}`}
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
};

export default Plan;
