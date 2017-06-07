import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import { getOppfolgingsdialog } from '../utils/oppfolgingsdialogUtils';
import { hentOppfolgingsdialogerAt as hentOppfolgingsdialoger } from 'oppfolgingsdialog-npm';
import {
    lagreArbeidsoppgave,
} from 'oppfolgingsdialog-npm';
import { getLedetekst } from 'digisyfo-npm';
import { brodsmule as brodsmulePt } from '../propTypes';
import Arbeidsoppgaver from '../components/oppfolgingsdialoger/Arbeidsoppgaver';

export class ArbeidsoppgaverSide extends Component {

    constructor(props) {
        super(props);
        this.sendArbeidsoppgave = this.sendArbeidsoppgave.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.lagrer && this.props.lagret) {
            this.props.hentOppfolgingsdialoger();
        }
    }

    sendArbeidsoppgave(values) {
        this.props.lagreArbeidsoppgave(this.props.oppfolgingsdialogId, values);
    }

    render() {
        const { brodsmuler, ledetekster, oppfolgingsdialog, oppfolgingsdialogId, henter, hentingFeilet, lagrer, lagringFeilet } = this.props;

        return (<Side tittel={getLedetekst('oppfolgingsdialog.sidetittel')} brodsmuler={brodsmuler}>
            { (() => {
                if (henter || lagrer) {
                    return <AppSpinner />;
                } else if (hentingFeilet || lagringFeilet) {
                    return (<Feilmelding />);
                }
                return (
                    <Arbeidsoppgaver
                        oppfolgingsdialog={oppfolgingsdialog}
                        ledetekster={ledetekster}
                        oppfolgingsdialogId={oppfolgingsdialogId}
                        sendArbeidsoppgave={this.sendArbeidsoppgave}
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
    lagreArbeidsoppgave: PropTypes.func,
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

const ArbeidsoppgaverContainer = connect(mapStateToProps, { lagreArbeidsoppgave, hentOppfolgingsdialoger })(ArbeidsoppgaverSide);

export default ArbeidsoppgaverContainer;
