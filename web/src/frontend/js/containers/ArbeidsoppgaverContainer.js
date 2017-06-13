import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import { getOppfolgingsdialog } from '../utils/oppfolgingsdialogUtils';
import {
    hentOppfolgingsdialogerAt as hentOppfolgingsdialoger,
    lagreArbeidsoppgave,
    slettArbeidsoppgave,
} from 'oppfolgingsdialog-npm';
import { getLedetekst } from 'digisyfo-npm';
import { brodsmule as brodsmulePt } from '../propTypes';
import Arbeidsoppgaver from '../components/oppfolgingsdialoger/Arbeidsoppgaver';

export class ArbeidsoppgaverSide extends Component {

    constructor(props) {
        super(props);
        this.sendArbeidsoppgave = this.sendArbeidsoppgave.bind(this);
        this.sendSlettArbeidsoppgave = this.sendSlettArbeidsoppgave.bind(this);
    }

    componentDidUpdate(prevProps) {
        if ((prevProps.lagrer && this.props.lagret) || (prevProps.sletter && this.props.lagret)) {
            this.props.hentOppfolgingsdialoger();
        }
    }

    sendArbeidsoppgave(values) {
        this.props.lagreArbeidsoppgave(this.props.oppfolgingsdialogId, values);
    }
    sendSlettArbeidsoppgave(arbeidsoppgaveId) {
        this.props.slettArbeidsoppgave(arbeidsoppgaveId);
    }

    render() {
        const { brodsmuler, ledetekster, oppfolgingsdialog, oppfolgingsdialogId, henter, hentingFeilet, lagrer, lagringFeilet, sletter, slettingFeilet } = this.props;

        return (<Side tittel={getLedetekst('oppfolgingsdialog.sidetittel')} brodsmuler={brodsmuler}>
            { (() => {
                if (henter || lagrer || sletter) {
                    return <AppSpinner />;
                } else if (hentingFeilet || lagringFeilet || slettingFeilet) {
                    return (<Feilmelding />);
                }
                return (
                    <Arbeidsoppgaver
                        oppfolgingsdialog={oppfolgingsdialog}
                        ledetekster={ledetekster}
                        oppfolgingsdialogId={oppfolgingsdialogId}
                        sendArbeidsoppgave={this.sendArbeidsoppgave}
                        sendSlettArbeidsoppgave={this.sendSlettArbeidsoppgave}
                    />
                );
            })()
            }
        </Side>);
    }
}

ArbeidsoppgaverSide.propTypes = {
    dispatch: PropTypes.func,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    ledetekster: PropTypes.object,
    oppfolgingsdialog: PropTypes.object,
    oppfolgingsdialogId: PropTypes.string,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    lagrer: PropTypes.bool,
    lagret: PropTypes.bool,
    lagringFeilet: PropTypes.bool,
    sletter: PropTypes.bool,
    slettet: PropTypes.bool,
    slettingFeilet: PropTypes.bool,
    lagreArbeidsoppgave: PropTypes.func,
    slettArbeidsoppgave: PropTypes.func,
    hentOppfolgingsdialoger: PropTypes.func,
};

export function mapStateToProps(state, ownProps) {
    const oppfolgingsdialogId = ownProps.params.oppfolgingsdialogId;
    const oppfolgingsdialog = getOppfolgingsdialog(state.oppfolgingsdialoger.data, oppfolgingsdialogId);
    const virksomhetsnavn = oppfolgingsdialog ? oppfolgingsdialog.virksomhetsnavn : '';

    return {
        ledetekster: state.ledetekster.data,
        henter: state.oppfolgingsdialoger.henter || state.ledetekster.henter,
        hentingFeilet: state.oppfolgingsdialoger.hentingFeilet || state.ledetekster.hentingFeilet,
        lagrer: state.arbeidsoppgaver.lagrer,
        lagret: state.arbeidsoppgaver.lagret,
        lagringFeilet: state.arbeidsoppgaver.lagringFeilet,
        sletter: state.arbeidsoppgaver.sletter,
        slettet: state.arbeidsoppgaver.slettet,
        slettingFeilet: state.arbeidsoppgaver.slettingFeilet,
        oppfolgingsdialog,
        oppfolgingsdialogId,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('oppfolgingsdialoger.sidetittel'),
            sti: '/oppfolgingsplaner',
            erKlikkbar: true,
        }, {
            tittel: virksomhetsnavn,
        }],
    };
}

const ArbeidsoppgaverContainer = connect(mapStateToProps, { lagreArbeidsoppgave, slettArbeidsoppgave, hentOppfolgingsdialoger })(ArbeidsoppgaverSide);

export default ArbeidsoppgaverContainer;
