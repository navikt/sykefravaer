import React, { PropTypes } from 'react';
import {
    GodkjennPlanMottatt,
    GodkjennPlanAvslaatt,
    BRUKERTYPE,
    GodkjennPlanAvslaattOgGodkjent,
} from 'oppfolgingsdialog-npm';
import { getContextRoot } from '../../../routers/paths';

const harMangeGodkjenninger = (godkjenninger) => {
    return godkjenninger.length > 1;
};

const MottattGodkjenninger = ({ oppfolgingsdialog, godkjennPlan, ledetekster, nullstillGodkjenning, avvisDialog, visAvvisPlanKvittering }) => {
    if (harMangeGodkjenninger(oppfolgingsdialog.godkjenninger)) {
        return (<GodkjennPlanAvslaattOgGodkjent
            visAvvisPlanKvittering={visAvvisPlanKvittering}
            avvisDialog={avvisDialog}
            godkjennPlan={godkjennPlan}
            ledetekster={ledetekster}
            oppfolgingsdialog={oppfolgingsdialog}
            rootUrl={`${getContextRoot()}`}
            brukerType={BRUKERTYPE.ARBEIDSTAKER}
        />);
    }

    const godkjenning = oppfolgingsdialog.godkjenninger[0];
    if (godkjenning.godkjent) {
        return (<GodkjennPlanMottatt
            visAvvisPlanKvittering={visAvvisPlanKvittering}
            avvisDialog={avvisDialog}
            godkjennPlan={godkjennPlan}
            ledetekster={ledetekster}
            oppfolgingsdialog={oppfolgingsdialog}
            rootUrl={`${getContextRoot()}`}
            brukerType={BRUKERTYPE.ARBEIDSTAKER}
        />);
    }
    return (<GodkjennPlanAvslaatt
        nullstillGodkjenning={nullstillGodkjenning}
        ledetekster={ledetekster}
        oppfolgingsdialog={oppfolgingsdialog}
        rootUrl={`${getContextRoot()}`}
        brukerType={BRUKERTYPE.ARBEIDSTAKER}
    />);
};

MottattGodkjenninger.propTypes = {
    oppfolgingsdialog: PropTypes.object,
    ledetekster: PropTypes.object,
    godkjennPlan: PropTypes.func,
    nullstillGodkjenning: PropTypes.func,
    visAvvisPlanKvittering: PropTypes.func,
    avvisDialog: PropTypes.func,
};

export default MottattGodkjenninger;
