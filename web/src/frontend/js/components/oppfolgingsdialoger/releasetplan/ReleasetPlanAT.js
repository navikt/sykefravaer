import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { keyValue, togglesPt } from 'digisyfo-npm';
import {
    BRUKERTYPE,
    ReleasetPlan,
    proptypes as oppfolgingProptypes,
} from 'oppfolgingsdialog-npm';
import { getContextRoot } from '../../../routers/paths';
import ArbeidsgiverHarTvangsgodkjent from './ArbeidsgiverHarTvangsgodkjent';

const foersteInnloggingSidenGodkjenning = (oppfolgingsdialog) => {
    return new Date(oppfolgingsdialog.arbeidstaker.sistInnlogget) < new Date(oppfolgingsdialog.godkjentPlan.opprettetTidspunkt);
};

const planBleTvangsgodkjent = (oppfolgingsdialog) => {
    return oppfolgingsdialog.godkjentPlan.tvungenGodkjenning;
};

class ReleasetPlanAT extends Component {
    constructor(props) {
        super(props);
        this.state = {
            settTvungenGodkjenning: false,
        };
        this.markerMottattTvungenGodkjenning = this.markerMottattTvungenGodkjenning.bind(this);
    }

    markerMottattTvungenGodkjenning() {
        this.setState({ settTvungenGodkjenning: true });
    }

    render() {
        const { ledetekster, oppfolgingsdialog, hentPdfurler, dokument, giSamtykke, avbrytDialog, toggles, delMedNavFunc, delmednav, oppfolgingsdialoger } = this.props;
        if (!this.state.settTvungenGodkjenning && foersteInnloggingSidenGodkjenning(oppfolgingsdialog) && planBleTvangsgodkjent(oppfolgingsdialog)) {
            return (<ArbeidsgiverHarTvangsgodkjent
                ledetekster={ledetekster}
                oppfolgingsdialog={oppfolgingsdialog}
                hentPdfurler={hentPdfurler}
                dokument={dokument}
                markerMottattTvungenGodkjenning={this.markerMottattTvungenGodkjenning}
            />);
        }
        return (<ReleasetPlan
            ledetekster={ledetekster}
            toggles={toggles}
            oppfolgingsdialog={oppfolgingsdialog}
            hentPdfurler={hentPdfurler}
            dokument={dokument}
            giSamtykke={giSamtykke}
            avbrytDialog={avbrytDialog}
            brukerType={BRUKERTYPE.ARBEIDSTAKER}
            delMedNavFunc={delMedNavFunc}
            delmednav={delmednav}
            oppfolgingsdialoger={oppfolgingsdialoger}
            rootUrl={`${getContextRoot()}`}
        />);
    }
}

ReleasetPlanAT.propTypes = {
    hentPdfurler: PropTypes.func,
    giSamtykke: PropTypes.func,
    avbrytDialog: PropTypes.func,
    delMedNavFunc: PropTypes.func,
    dokument: oppfolgingProptypes.dokumentReducerPt,
    oppfolgingsdialog: oppfolgingProptypes.oppfolgingsdialogPt,
    ledetekster: keyValue,
    toggles: togglesPt,
    delmednav: oppfolgingProptypes.delmednavPt,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingProptypes.oppfolgingsdialogPt),
};

export default ReleasetPlanAT;

