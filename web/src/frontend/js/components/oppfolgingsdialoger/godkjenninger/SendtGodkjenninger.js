import React, { PropTypes } from 'react';
import { GodkjennPlanSendt, BRUKERTYPE } from 'oppfolgingsdialog-npm';
import { getContextRoot } from '../../../routers/paths';

const SendtGodkjenninger = ({ oppfolgingsdialog, ledetekster }) => {
    return (<GodkjennPlanSendt
        brukerType={BRUKERTYPE.ARBEIDSTAKER}
        ledetekster={ledetekster}
        oppfolgingsdialog={oppfolgingsdialog}
        rootUrl={`${getContextRoot()}`}
    />);
};

SendtGodkjenninger.propTypes = {
    oppfolgingsdialog: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default SendtGodkjenninger;
