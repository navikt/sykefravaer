import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Side from '../sider/Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import history from '../history';
import { getOppfolgingsdialog } from '../utils/oppfolgingsdialogUtils';
import { lagreArbeidsoppgave, OppfolgingsdialogArbeidsoppgaver } from 'oppfolgingsdialog-npm';
import { getLedetekst } from 'digisyfo-npm';
import { brodsmule as brodsmulePt } from '../propTypes';
import OpprettArbeidsoppgaveSkjema from '../components/oppfolgingsdialoger/OpprettArbeidsoppgaveSkjema';

export class ArbeidsoppgaverSide extends Component {

    constructor(props) {
        super(props);
        this.sendArbeidsoppgave = this.sendArbeidsoppgave.bind(this);
    }

    sendArbeidsoppgave(values) {
        this.props.lagreArbeidsoppgave(this.props.oppfolgingsdialogId, values);
        history.push(`/sykefravaer/oppfolgingsdialoger/${this.props.oppfolgingsdialogId}/`);
    }

    render() {
        const { brodsmuler, ledetekster, oppfolgingsdialog, oppfolgingsdialogId, arbeidsgiver, henter, hentingFeilet, sender, senderFeilet } = this.props;

        return (<Side tittel={getLedetekst('oppfolgingsdialog.sidetittel')} brodsmuler={brodsmuler}>
            { (() => {
                if (henter || sender) {
                    return <AppSpinner />;
                } else if (hentingFeilet || senderFeilet) {
                    return (<Feilmelding />);
                } else if (oppfolgingsdialog.arbeidsoppgaveListe.length !== 0) {
                    return (
                        <div>
                            <h2>{getLedetekst('oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.tittel', ledetekster)}</h2>
                            <OpprettArbeidsoppgaveSkjema
                                ledetekster={ledetekster}
                                avbrytHref={`/sykefravaer/oppfolgingsdialoger/${oppfolgingsdialogId}`}
                                sendArbeidsoppgave={this.sendArbeidsoppgave}
                            />
                        </div>
                    );
                }
                return (
                    <div>
                        <OppfolgingsdialogArbeidsoppgaver
                            ledetekster={ledetekster}
                            arbeidsoppgaveListe={oppfolgingsdialog.arbeidsoppgaveListe}
                            tittel={getLedetekst('oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.tittel', ledetekster)}
                            bruker={arbeidsgiver}
                            rootUrl={`/sykefravaer/oppfolgingsdialoger/${oppfolgingsdialogId}/`}
                        />

                        <div className="knapperad">
                            <Link role="button"
                                className="knapp knapp__opprettarbeidsoppgave"
                                to={"/sykefravaer/oppfolgingsdialoger/${oppfolgingsdialogId}/arbeidsoppgaver/opprett"}>
                                {getLedetekst('oppfolgingsdialog.arbeidstaker.knapp.leggtil-arbeidsoppgavelegg')}
                            </Link>
                        </div>

                    </div>
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
    arbeidsgiver: PropTypes.string,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    sender: PropTypes.bool,
    senderFeilet: PropTypes.bool,
    lagreArbeidsoppgave: PropTypes.func,
};

export function mapStateToProps(state, ownProps) {
    const oppfolgingsdialogId = ownProps.params.oppfolgingsdialogId;
    const oppfolgingsdialog = getOppfolgingsdialog(state.oppfolgingsdialoger.data, oppfolgingsdialogId);
    const arbeidsgiver = oppfolgingsdialog ? oppfolgingsdialog.virksomhetsnummer : '';

    return {
        ledetekster: state.ledetekster.data,
        henter: state.oppfolgingsdialoger.henter || state.ledetekster.henter,
        hentingFeilet: state.oppfolgingsdialoger.hentingFeilet || state.ledetekster.hentingFeilet,
        sender: state.arbeidsoppgaver.sender,
        sendingFeilet: state.arbeidsoppgaver.sendingFeilet,
        oppfolgingsdialog,
        oppfolgingsdialogId,
        arbeidsgiver,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('oppfolgingsdialoger.sidetittel'),
            sti: '/oppfolgingsdialoger',
            erKlikkbar: true,
        }, {
            tittel: arbeidsgiver,
        }],
    };
}

const ArbeidsoppgaverContainer = connect(mapStateToProps, { lagreArbeidsoppgave })(ArbeidsoppgaverSide);

export default ArbeidsoppgaverContainer;
