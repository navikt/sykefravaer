import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import DinSykmelding from '../components/sykmelding/DinSykmelding';
import DinSendteSykmelding from '../components/sykmelding/DinSendteSykmelding';
import DinBekreftedeSykmelding from '../components/sykmelding/DinBekreftedeSykmelding';
import DinUtgaatteSykmelding from '../components/sykmelding/DinUtgaatteSykmelding';
import LenkeTilDineSykmeldinger from '../components/LenkeTilDineSykmeldinger';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import { getLedetekst } from '../ledetekster';
import { hentAktuelleArbeidsgivere } from '../actions/dineArbeidsgivere_actions';
import { hentArbeidsgiversSykmeldinger } from '../actions/arbeidsgiversSykmeldinger_actions';
import { erPilotarbeidsgiver } from '../utils/arbeidsgiverUtils';
import { getSykmelding } from '../utils';

export class DinSykmldSide extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        const { dispatch, sykmeldingId } = this.props;
        dispatch(hentArbeidsgiversSykmeldinger());
        dispatch(hentAktuelleArbeidsgivere(sykmeldingId));
    }

    render() {
        const { brodsmuler, ledetekster, dinSykmelding, harPilotarbeidsgiver, arbeidsgiversSykmelding, harStrengtFortroligAdresse } = this.props;
        return (<Side tittel={getLedetekst('din-sykmelding.sidetittel', ledetekster.data)} brodsmuler={brodsmuler}>
                { (() => {
                    if (dinSykmelding.henter || (arbeidsgiversSykmelding && arbeidsgiversSykmelding.henter)) {
                        return <AppSpinner ledetekster={ledetekster.data} />;
                    } else if (dinSykmelding.hentingFeilet || (arbeidsgiversSykmelding && arbeidsgiversSykmelding.hentingFeilet)) {
                        return (<Feilmelding />);
                    } else if (!dinSykmelding.data) {
                        return (<Feilmelding
                            tittel={getLedetekst('din-sykmelding.fant-ikke-sykmelding.tittel', ledetekster.data)}
                            melding={getLedetekst('din-sykmelding.fant-ikke-sykmelding.melding', ledetekster.data)} />);
                    } else if (dinSykmelding.data.status === 'SENDT' && arbeidsgiversSykmelding && arbeidsgiversSykmelding.data) {
                        return (<div>
                            <DinSendteSykmelding
                                dinSykmelding={dinSykmelding.data}
                                arbeidsgiversSykmelding={arbeidsgiversSykmelding.data}
                                ledetekster={ledetekster.data} />
                            <LenkeTilDineSykmeldinger ledetekster={ledetekster.data} />
                        </div>);
                    } else if (dinSykmelding.data.status === 'BEKREFTET') {
                        return (<div>
                            <DinBekreftedeSykmelding
                                sykmelding={dinSykmelding.data}
                                ledetekster={ledetekster.data} />
                            <LenkeTilDineSykmeldinger ledetekster={ledetekster.data} />
                        </div>);
                    } else if (dinSykmelding.data.status === 'UTGAATT') {
                        return (<div>
                            <DinUtgaatteSykmelding
                                sykmelding={dinSykmelding.data}
                                ledetekster={ledetekster.data} />
                            <LenkeTilDineSykmeldinger ledetekster={ledetekster.data} />
                        </div>);
                    }
                    return (<div>
                        <DinSykmelding
                            sykmelding={dinSykmelding.data}
                            ledetekster={ledetekster.data}
                            harPilotarbeidsgiver={harPilotarbeidsgiver}
                            harStrengtFortroligAdresse={harStrengtFortroligAdresse} />
                            <LenkeTilDineSykmeldinger ledetekster={ledetekster.data} />
                        </div>);
                })()
                }
            </Side>);
    }
}

DinSykmldSide.propTypes = {
    dispatch: PropTypes.func,
    ledetekster: PropTypes.object,
    arbeidsgivere: PropTypes.object,
    brodsmuler: PropTypes.array,
    harPilotarbeidsgiver: PropTypes.bool,
    harStrengtFortroligAdresse: PropTypes.bool,
    sykmeldingId: PropTypes.string,
    dinSykmelding: PropTypes.object,
    arbeidsgiversSykmelding: PropTypes.object,
};

export function mapStateToProps(state, ownProps) {
    const sykmeldingId = ownProps.params.sykmeldingId;
    const dinSykmelding = getSykmelding(state.dineSykmeldinger.data, sykmeldingId);
    let arbeidsgiversSykmelding;
    const props = {};

    if (dinSykmelding && dinSykmelding.status === 'SENDT') {
        arbeidsgiversSykmelding = getSykmelding(state.arbeidsgiversSykmeldinger.data, sykmeldingId);
        props.arbeidsgiversSykmelding = {
            data: arbeidsgiversSykmelding,
            hentingFeilet: state.arbeidsgiversSykmeldinger.hentingFeilet,
            henter: state.arbeidsgiversSykmeldinger.henter,
        };
    }

    return Object.assign({}, props, {
        sykmeldingId,
        dinSykmelding: {
            data: dinSykmelding,
            hentingFeilet: state.dineSykmeldinger.hentingFeilet,
            henter: state.dineSykmeldinger.henter,
        },
        harPilotarbeidsgiver: erPilotarbeidsgiver(state.arbeidsgivere.data),
        harStrengtFortroligAdresse: state.brukerinfo.bruker.data.strengtFortroligAdresse,
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
    });
}

export const DinSykmeldingContainer = connect(mapStateToProps)(DinSykmldSide);
