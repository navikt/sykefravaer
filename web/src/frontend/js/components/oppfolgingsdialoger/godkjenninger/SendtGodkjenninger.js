import React, { PropTypes } from 'react';
import { GodkjennPlanSendt, BRUKERTYPE } from 'oppfolgingsdialog-npm';
import { getContextRoot } from '../../../routers/paths';

const SendtGodkjenninger = ({ oppfolgingsdialog, ledetekster, koblingId }) => {
    return (<div>
        <GodkjennPlanSendt brukerType={BRUKERTYPE.ARBEIDSTAKER} ledetekster={ledetekster} oppfolgingsdialog={oppfolgingsdialog} rootUrl={`${getContextRoot()}`} />
        <div className="knapperad">
            <button className="knapp knapperad__element" onClick={() => { history.push(`${getContextRoot()}/${koblingId}`); }}>TILBAKE TIL OVERSIKT</button>
        </div>
    </div>);
};

SendtGodkjenninger.propTypes = {
    oppfolgingsdialog: PropTypes.object,
    ledetekster: PropTypes.object,
    koblingId: PropTypes.number,
};

export default SendtGodkjenninger;
