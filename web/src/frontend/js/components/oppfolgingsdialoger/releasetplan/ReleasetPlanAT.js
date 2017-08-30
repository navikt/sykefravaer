import React, { PropTypes, Component } from 'react';
import {
    BRUKERTYPE,
    ReleasetPlan,
} from 'oppfolgingsdialog-npm';
import { getContextRoot } from '../../../routers/paths';
import ArbeidsgiverHarTvangsgodkjent from './ArbeidsgiverHarTvangsgodkjent';

const foersteInnloggingSidenGodkjenning = (oppfolgingsdialog) => {
    return new Date(oppfolgingsdialog.arbeidstaker.sistInnlogget) < new Date(oppfolgingsdialog.versjoner[0].opprettetTidspunkt);
};

const planBleTvangsgodkjent = (oppfolgingsdialog) => {
    return oppfolgingsdialog.versjoner[0].tvungenGodkjenning;
};

export class ReleasetPlanAT extends Component {
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
        const { ledetekster, oppfolgingsdialog, hentPdfurler, dokument, giSamtykke } = this.props;
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
            oppfolgingsdialog={oppfolgingsdialog}
            hentPdfurler={hentPdfurler}
            dokument={dokument}
            giSamtykke={giSamtykke}
            brukerType={BRUKERTYPE.ARBEIDSTAKER}
            rootUrl={`${getContextRoot()}`}
        />);
    }
}

ReleasetPlanAT.propTypes = {
    manglerSamtykke: PropTypes.func,
    hentPdfurler: PropTypes.func,
    giSamtykke: PropTypes.func,
    markerMottattTvungenGodkjenning: PropTypes.func,
    dokument: PropTypes.object,
    oppfolgingsdialog: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default ReleasetPlanAT;

