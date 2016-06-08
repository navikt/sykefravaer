import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side.js';
import AppSpinner from '../components/AppSpinner.js';
import Feilmelding from '../components/Feilmelding.js';
import SendTilArbeidsgiver from '../components/SendTilArbeidsgiver.js';
import { getLedetekst } from '../ledetekster';
import { hentArbeidsgiversSykmeldinger } from '../actions/arbeidsgiversSykmeldinger_actions.js';

export class SendTilArbeidsgiverSide extends Component {

    componentWillMount() {
        const { dispatch } = this.props;
        const action = hentArbeidsgiversSykmeldinger();
        dispatch(action);
    }

    render() {
        return this.props.brukerinfo.toggleSendTilArbeidsgiver ? (
            <Side tittel="Send sykmelding til arbeidsgiver" brodsmuler={this.props.brodsmuler}>
        {
            (() => {
                if (this.props.sykmelding.henter) {
                    return <AppSpinner />;
                } else if (this.props.sykmelding.hentingFeilet) {
                    return (<Feilmelding />);
                } else if (!this.props.sykmelding.data) {
                    return (<Feilmelding
                        tittel={getLedetekst('sykmelding.vis.fant-ikke-sykmelding.tittel', this.props.ledetekster.data)}
                        melding={getLedetekst('sykmelding.vis.fant-ikke-sykmelding.melding', this.props.ledetekster.data)} />);
                }
                return (<SendTilArbeidsgiver sykmelding={this.props.sykmelding.data}
                                             ledetekster={this.props.ledetekster.data}/>);
            })()
        }
            </Side>) : null;
    }

}

SendTilArbeidsgiverSide.propTypes = {
    sykmelding: PropTypes.object,
    brodsmuler: PropTypes.array,
    ledetekster: PropTypes.object,
    dispatch: PropTypes.func,
    brukerinfo: PropTypes.object,
};

export function mapStateToProps(state, ownProps) {
    const sykmeldingId = ownProps.params.sykmeldingId;
    const sykmelding = state.arbeidsgiversSykmeldinger.data.filter((sykmld) => {
        return `${sykmld.id}` === `${sykmeldingId}`;
    })[0];

    return {
        sykmelding: {
            data: sykmelding,
            henter: state.arbeidsgiversSykmeldinger.henter,
            hentingFeilet: state.arbeidsgiversSykmeldinger.hentingFeilet,
        },
        brukerinfo: state.brukerinfo.bruker.data,
        ledetekster: state.ledetekster,
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
