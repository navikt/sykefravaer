import React, { PropTypes } from 'react';
import { getContextRoot } from '../../../routers/paths';
import { getLedetekst } from 'digisyfo-npm';
import { GodkjennPlanOversikt } from 'oppfolgingsdialog-npm';

export const Godkjenn = ({ ledetekster, oppfolgingsdialog, godkjennPlan }) => {
    return (
            <GodkjennPlanOversikt
                ledetekster={ledetekster}
                oppfolgingsdialog={oppfolgingsdialog}
                varselstripeTekst={getLedetekst('oppfolgingsdialog.arbeidsgiver.godkjennplanskjema.varselstripe.tekst')}
                godkjennPlan={godkjennPlan}
                rootUrl={`${getContextRoot()}`}
            />
    );
};

Godkjenn.propTypes = {
    ledetekster: PropTypes.object,
    oppfolgingsdialog: PropTypes.object,
    godkjennPlan: PropTypes.func,
};

export default Godkjenn;
