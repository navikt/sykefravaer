import React, { PropTypes } from 'react';
import { BRUKERTYPE, GodkjentPlan } from 'oppfolgingsdialog-npm';
import Samtykke from '../samtykke/Samtykke';

const manglerSamtykke = (oppfolgingsdialog) => {
    return oppfolgingsdialog.arbeidstaker.samtykke === null;
};

const ReleasetPlan = ({ ledetekster, oppfolgingsdialog, hentPdfurler, dokument, giSamtykke }) => {
    if (manglerSamtykke(oppfolgingsdialog)) {
        return (<Samtykke
            sendSamtykke={giSamtykke}
            oppfolgingsdialog={oppfolgingsdialog}
        />);
    }
    return (<GodkjentPlan
        ledetekster={ledetekster}
        oppfolgingsdialog={oppfolgingsdialog}
        hentPdfurler={hentPdfurler}
        dokument={dokument}
        brukerType={BRUKERTYPE.ARBEIDSTAKER}
        rootUrl={`${window.APP_SETTINGS.APP_ROOT}`}
    />);
};

ReleasetPlan.propTypes = {
    manglerSamtykke: PropTypes.func,
    hentPdfurler: PropTypes.func,
    giSamtykke: PropTypes.func,
    dokument: PropTypes.object,
    oppfolgingsdialog: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default ReleasetPlan;

