import React, { PropTypes } from 'react';
import { GodkjennPlanSendt, BRUKERTYPE } from 'oppfolgingsdialog-npm';
import { getContextRoot } from '../../../routers/paths';
import history from '../../../history';

const SendtGodkjenninger = ({ oppfolgingsdialog, ledetekster }) => {
    return (<div>
        <GodkjennPlanSendt brukerType={BRUKERTYPE.ARBEIDSTAKER} ledetekster={ledetekster} oppfolgingsdialog={oppfolgingsdialog} rootUrl={`${getContextRoot()}`} />
        <div className="knapperad">
            <button className="knapp knapperad__element" onClick={() => { history.push(`${getContextRoot()}`); }}>TILBAKE TIL OVERSIKT</button>
        </div>
    </div>);
};

SendtGodkjenninger.propTypes = {
    oppfolgingsdialog: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default SendtGodkjenninger;
