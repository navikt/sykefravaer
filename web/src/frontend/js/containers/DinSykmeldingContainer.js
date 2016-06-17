import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import SideMedHoyrekolonne from '../sider/SideMedHoyrekolonne';
import DinSykmelding from '../components/DinSykmelding';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import { getLedetekst } from '../ledetekster/index';
import { hentAktuelleArbeidsgivere } from '../actions/dineArbeidsgivere_actions';
import { erPilotarbeidsgiver } from '../utils/arbeidsgiverUtils.js';

export class DinSykmldSide extends Component {

    componentWillMount() {
        const { dispatch, sykmeldingId } = this.props;
        dispatch(hentAktuelleArbeidsgivere(sykmeldingId));
    }

    render() {
        const { brodsmuler, ledetekster, sykmelding, visSendTilArbeidsgiver } = this.props;
        return (<SideMedHoyrekolonne tittel={getLedetekst('din-sykmelding.sidetittel', ledetekster.data)} brodsmuler={brodsmuler}>
                { (() => {
                    if (sykmelding.henter) {
                        return <AppSpinner ledetekster={ledetekster.data} />;
                    } else if (sykmelding.hentingFeilet) {
                        return (<Feilmelding />);
                    } else if (!sykmelding.data) {
                        return (<Feilmelding
                            tittel={getLedetekst('sykmelding.vis.fant-ikke-sykmelding.tittel', ledetekster.data)}
                            melding={getLedetekst('sykmelding.vis.fant-ikke-sykmelding.melding', ledetekster.data)} />);
                    }
                    return (<DinSykmelding
                        sykmelding={sykmelding.data}
                        ledetekster={ledetekster.data}
                        visSendTilArbeidsgiver={visSendTilArbeidsgiver} />);
                })()
                }
            </SideMedHoyrekolonne>);
    }
}

DinSykmldSide.propTypes = {
    dispatch: PropTypes.func,
    ledetekster: PropTypes.object,
    sykmelding: PropTypes.object,
    brodsmuler: PropTypes.array,
    visSendTilArbeidsgiver: PropTypes.bool,
    sykmeldingId: PropTypes.string,
};

export function mapStateToProps(state, ownProps) {
    const sykmeldingId = ownProps.params.sykmeldingId;
    let sykmelding = state.dineSykmeldinger.data.filter((sykmld) => {
        return `${sykmld.id}` === `${sykmeldingId}`;
    })[0];

    //  Når vi får disse dataene korrekt. Endre sykmelding til const og fjern disse
    sykmelding.status = 'SENDT';
    sykmelding.innsendtdato = { year: 2016, monthValue: 5, dayOfMonth: 17 };
    sykmelding.organisasjonsnummer = '123456789';
    //  =====================


    return {
        sykmeldingId,
        sykmelding: {
            data: sykmelding,
            hentingFeilet: state.dineSykmeldinger.hentingFeilet,
            henter: state.dineSykmeldinger.henter,
        },
        visSendTilArbeidsgiver: erPilotarbeidsgiver(state.arbeidsgivere.data) &&
            !state.brukerinfo.bruker.data.strengtFortroligAdresse &&
            state.brukerinfo.bruker.data.toggleSendTilArbeidsgiver,
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
            tittel: getLedetekst('din-sykmelding.sidetittel', state.ledetekster.data),
        }],
    };
}

export const DinSykmeldingContainer = connect(mapStateToProps)(DinSykmldSide);
