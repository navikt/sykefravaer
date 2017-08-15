import React, { PropTypes, Component } from 'react';
import { BRUKERTYPE, GodkjentPlan } from 'oppfolgingsdialog-npm';
import Samtykke from '../samtykke/Samtykke';
import ArbeidsgiverHarTvangsgodkjent from './ArbeidsgiverHarTvangsgodkjent';

const manglerSamtykke = (oppfolgingsdialog) => {
    return oppfolgingsdialog.arbeidstaker.samtykke === null;
};

const foersteInnloggingSidenGodkjenning = (oppfolgingsdialog) => {
    return new Date(oppfolgingsdialog.arbeidstaker.sistInnlogget) < new Date(oppfolgingsdialog.versjoner[0].opprettetTidspunkt);
};

const planBleTvangsgodkjent = (oppfolgingsdialog) => {
    return oppfolgingsdialog.versjoner[0].tvungenGodkjenning;
};

export class ReleasetPlan extends Component {
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
            return <ArbeidsgiverHarTvangsgodkjent ledetekster={ledetekster} oppfolgingsdialog={oppfolgingsdialog} hentPdfurler={hentPdfurler} dokument={dokument} markerMottattTvungenGodkjenning={this.markerMottattTvungenGodkjenning} />;
        }
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
    }
}

ReleasetPlan.propTypes = {
    manglerSamtykke: PropTypes.func,
    hentPdfurler: PropTypes.func,
    giSamtykke: PropTypes.func,
    markerMottattTvungenGodkjenning: PropTypes.func,
    dokument: PropTypes.object,
    oppfolgingsdialog: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default ReleasetPlan;

