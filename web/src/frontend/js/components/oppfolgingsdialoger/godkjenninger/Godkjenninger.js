import React, { PropTypes } from 'react';
import MottattGodkjenninger from './MottattGodkjenninger';
import SendtGodkjenninger from './SendtGodkjenninger';

const harMottattGodkjenninger = (godkjenninger, arbeidsgiver) => {
    return godkjenninger.length > 0 && godkjenninger[0].godkjentAvAktoerId === arbeidsgiver.aktoerId;
};

const Godkjenninger = ({ oppfolgingsdialog, godkjennPlan, ledetekster, nullstillGodkjenning, avvisDialog }) => {
    if (harMottattGodkjenninger(oppfolgingsdialog.godkjenninger, oppfolgingsdialog.arbeidsgiver)) {
        return (<MottattGodkjenninger
            oppfolgingsdialog={oppfolgingsdialog}
            godkjennPlan={godkjennPlan}
            ledetekster={ledetekster}
            nullstillGodkjenning={nullstillGodkjenning}
            avvisDialog={avvisDialog}
        />);
    }
    return (<SendtGodkjenninger
        ledetekster={ledetekster}
        oppfolgingsdialog={oppfolgingsdialog}
    />);
};


Godkjenninger.propTypes = {
    ledetekster: PropTypes.object,
    oppfolgingsdialog: PropTypes.object,
    avvisDialog: PropTypes.func,
    nullstillGodkjenning: PropTypes.func,
    godkjennPlan: PropTypes.func,
};

export default Godkjenninger;
