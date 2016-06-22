import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import SendTilArbeidsgiver from '../components/SendTilArbeidsgiver';
import SykmeldingKvittering from '../components/SykmeldingKvittering';
import { getLedetekst } from '../ledetekster';
import { getSykmelding } from '../utils';
import { hentArbeidsgiversSykmeldinger } from '../actions/arbeidsgiversSykmeldinger_actions';
import * as dinSykmeldingActions from '../actions/dinSykmelding_actions';

export class SendTilArbeidsgiverSide extends Component {

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(hentArbeidsgiversSykmeldinger());
    }

    getKvitteringBrodtekst() {
        const params = {
            '%ARBEIDSGIVER%': this.props.sykmelding.valgtArbeidsgiver.navn,
        };
        return `${getLedetekst('send-til-arbeidsgiver.kvittering.undertekst', this.props.ledetekster.data, params)} `;
    }

    sendSykmelding(sykmeldingId) {
        const { dispatch, sykmelding } = this.props;
        dispatch(dinSykmeldingActions.sendSykmeldingTilArbeidsgiver(sykmeldingId, sykmelding.valgtArbeidsgiver.orgnummer));
    }

    render() {
        return this.props.brukerinfo.toggleSendTilArbeidsgiver ? (
            <Side tittel={this.props.sidetittel} brodsmuler={this.props.brodsmuler}>
                {
                    (() => {
                        if (this.props.henter) {
                            return <AppSpinner />;
                        } else if (this.props.hentingFeilet) {
                            return (<Feilmelding />);
                        } else if (!this.props.sykmelding) {
                            return (<Feilmelding
                                tittel={getLedetekst('sykmelding.vis.fant-ikke-sykmelding.tittel', this.props.ledetekster.data)}
                                melding={getLedetekst('sykmelding.vis.fant-ikke-sykmelding.melding', this.props.ledetekster.data)} />);
                        } else if (this.props.sykmelding.status === 'SENDT') {
                            return (<SykmeldingKvittering
                                tittel={getLedetekst('send-til-arbeidsgiver.kvittering.tittel', this.props.ledetekster.data)}
                                brodtekst={this.getKvitteringBrodtekst()}
                                ledetekster={this.props.ledetekster.data}
                                sykmelding={this.props.sykmelding}
                                />);
                        }
                        return (<SendTilArbeidsgiver
                            sykmelding={this.props.sykmelding}
                            sender={this.props.sender}
                            sendingFeilet={this.props.sendingFeilet}
                            ledetekster={this.props.ledetekster.data}
                            sendSykmelding={(sykmeldingId) => {
                                this.sendSykmelding(sykmeldingId);
                            }} />);
                    })()
                }
            </Side>) : null;
    }

}

SendTilArbeidsgiverSide.propTypes = {
    sykmelding: PropTypes.object,
    brodsmuler: PropTypes.array,
    ledetekster: PropTypes.object,
    brukerinfo: PropTypes.object,
    sendSykmeldingTilArbeidsgiver: PropTypes.func,
    henter: PropTypes.bool,
    sender: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
    dispatch: PropTypes.func,
    sidetittel: PropTypes.string,
};

export function mapStateToProps(state, ownProps) {
    const sykmeldingId = ownProps.params.sykmeldingId;
    const sykmelding = getSykmelding(state.arbeidsgiversSykmeldinger.data, sykmeldingId);
    const sidetittelNokkel = sykmelding && sykmelding.status === 'SENDT' ? 'send-til-arbeidsgiver.sidetittel' : 'send-til-arbeidsgiver.kvittering.sidetittel';

    return {
        sykmelding,
        henter: state.arbeidsgiversSykmeldinger.henter,
        hentingFeilet: state.arbeidsgiversSykmeldinger.hentingFeilet,
        sender: state.arbeidsgiversSykmeldinger.sender,
        sendingFeilet: state.arbeidsgiversSykmeldinger.sendingFeilet,
        brukerinfo: state.brukerinfo.bruker.data,
        ledetekster: state.ledetekster,
        sidetittel: getLedetekst(sidetittelNokkel, state.ledetekster.data),
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel', state.ledetekster.data),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('dine-sykmeldinger.sidetittel', state.ledetekster.data),
            sti: '/sykmeldinger',
            erKlikkbar: true,
        }, {
            tittel: 'Sykmelding',
            sti: `/sykmeldinger/${sykmeldingId}`,
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('send-til-arbeidsgiver.sidetittel', state.ledetekster.data),
        }],
    };
}

export const SendTilArbeidsgiverContainer = connect(mapStateToProps)(SendTilArbeidsgiverSide);
