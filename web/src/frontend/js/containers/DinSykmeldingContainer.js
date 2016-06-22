import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import SideMedHoyrekolonne from '../sider/SideMedHoyrekolonne';
import DinSykmelding from '../components/DinSykmelding';
import DinSendteSykmelding from '../components/DinSendteSykmelding';
import DinBekrefteteSykmelding from '../components/DinBekrefteteSykmelding';
import { ARBEIDSGIVER, INNSENDT_DATO, ORGNUMMER, STATUS } from '../nokkelopplysninger/NokkelOpplysningerEnum';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import { getLedetekst } from '../ledetekster/index';
import { hentAktuelleArbeidsgivere } from '../actions/dineArbeidsgivere_actions';
import { navigerFraBekreftetkvittering } from '../actions/dinSykmelding_actions';
import { erPilotarbeidsgiver } from '../utils/arbeidsgiverUtils.js';
import SykmeldingKvittering from '../components/SykmeldingKvittering.js';
import LenkeTilDineSykmeldinger from '../components/LenkeTilDineSykmeldinger.js';

export class DinSykmldSide extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        const { dispatch, sykmeldingId } = this.props;
        dispatch(hentAktuelleArbeidsgivere(sykmeldingId));
    }

    componentWillUnmount() {
        if (this.props.sykmelding.data && this.props.sykmelding.data.status === 'BEKREFTET') {
            const { dispatch } = this.props;
            dispatch(navigerFraBekreftetkvittering(this.props.sykmelding.data.id));
        }
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
                            tittel={getLedetekst('din-sykmelding.fant-ikke-sykmelding.tittel', ledetekster.data)}
                            melding={getLedetekst('din-sykmelding.fant-ikke-sykmelding.melding', ledetekster.data)} />);
                    } else if (sykmelding.data.status === 'SENDT') {
                        return (<div>
                            <DinSendteSykmelding
                                sykmelding={sykmelding.data}
                                ledetekster={ledetekster.data}
                                nokkelopplysninger={[
                                [STATUS, INNSENDT_DATO],
                                [ARBEIDSGIVER, ORGNUMMER],
                                ]} />
                            <LenkeTilDineSykmeldinger ledetekster={ledetekster.data} />
                        </div>);
                    } else if (sykmelding.data.status === 'BEKREFTET' && sykmelding.data.nettoppBekreftet) {
                        return (<SykmeldingKvittering
                            tittel={getLedetekst('bekreft-sykmelding.kvittering.tittel', ledetekster.data)}
                            sykmelding={sykmelding.data}
                            ledetekster={ledetekster.data} />);
                    } else if (sykmelding.data.status === 'BEKREFTET' && !sykmelding.data.nettoppBekreftet) {
                        return (<div>
                            <DinBekrefteteSykmelding
                                sykmelding={sykmelding.data}
                                ledetekster={ledetekster.data}
                                nokkelopplysninger={[
                                [STATUS, INNSENDT_DATO],
                                ]} />
                            <LenkeTilDineSykmeldinger ledetekster={ledetekster.data} />
                        </div>);
                    }
                    return (<div>
                        <DinSykmelding
                            sykmelding={sykmelding.data}
                            ledetekster={ledetekster.data}
                            visSendTilArbeidsgiver={visSendTilArbeidsgiver} />
                            <LenkeTilDineSykmeldinger ledetekster={ledetekster.data} />
                        </div>);
                })()
                }
            </SideMedHoyrekolonne>);
    }
}

DinSykmldSide.propTypes = {
    dispatch: PropTypes.func,
    ledetekster: PropTypes.object,
    sykmelding: PropTypes.object,
    arbeidsgivere: PropTypes.object,
    brodsmuler: PropTypes.array,
    visSendTilArbeidsgiver: PropTypes.bool,
    sykmeldingId: PropTypes.string,
};

export function mapStateToProps(state, ownProps) {
    const sykmeldingId = ownProps.params.sykmeldingId;
    const sykmelding = state.dineSykmeldinger.data.filter((sykmld) => {
        return `${sykmld.id}` === `${sykmeldingId}`;
    })[0];

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
