import React, { Component, PropTypes } from 'react';
import { getContextRoot } from '../../../routers/paths';
import { GodkjennPlanSkjema, GodkjennPlanOversiktInformasjon } from 'oppfolgingsdialog-npm';

export class Godkjenn extends Component {
    componentWillMount() {
        window.location.hash = 'godkjenn';
    }

    render() {
        const { ledetekster, oppfolgingsdialog, settAktivtSteg, godkjennDialog } = this.props;
        return (<div className="godkjennPlanOversikt">
            <GodkjennPlanOversiktInformasjon
                ledetekster={ledetekster}
                oppfolgingsdialog={oppfolgingsdialog}
                rootUrl={`${getContextRoot()}`}
            />
            <GodkjennPlanSkjema
                ledetekster={ledetekster}
                oppfolgingsdialog={oppfolgingsdialog}
                godkjennPlan={godkjennDialog}
                settAktivtSteg={settAktivtSteg}
            />
        </div>);
    }
}

Godkjenn.propTypes = {
    settAktivtSteg: PropTypes.func,
    oppfolgingsdialog: PropTypes.object,
    ledetekster: PropTypes.object,
    godkjennDialog: PropTypes.func,
};

export default Godkjenn;
