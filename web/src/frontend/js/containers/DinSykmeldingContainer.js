import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import DinSykmelding from '../components/sykmelding/DinSykmelding';
import DinSendteSykmelding from '../components/sykmelding/DinSendteSykmelding';
import DinBekreftedeSykmelding from '../components/sykmelding/DinBekreftedeSykmelding';
import DinAvbrutteSykmelding from '../components/sykmelding/DinAvbrutteSykmelding';
import DinUtgaatteSykmelding from '../components/sykmelding/DinUtgaatteSykmelding';
import LenkeTilDineSykmeldinger from '../components/LenkeTilDineSykmeldinger';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import { getLedetekst } from '../ledetekster';
import { hentAktuelleArbeidsgivere } from '../actions/dineArbeidsgivere_actions';
import { hentArbeidsgiversSykmeldinger } from '../actions/arbeidsgiversSykmeldinger_actions';
import { getSykmelding } from '../utils';
import { sorterSykmeldingerEldsteFoerst } from '../utils/datoUtils';

export class DinSykmldSide extends Component {

    componentWillMount() {
        const { dispatch, sykmeldingId } = this.props;
        dispatch(hentArbeidsgiversSykmeldinger());
        dispatch(hentAktuelleArbeidsgivere(sykmeldingId));
    }

    render() {
        const { brodsmuler, ledetekster, dinSykmelding, arbeidsgiversSykmelding, henter, hentingFeilet, erEldsteNyeSykmelding, eldsteSykmeldingId } = this.props;
        return (<Side tittel={getLedetekst('din-sykmelding.sidetittel', ledetekster)} brodsmuler={brodsmuler}>
                { (() => {
                    if (henter) {
                        return <AppSpinner ledetekster={ledetekster} />;
                    } else if (hentingFeilet) {
                        return (<Feilmelding />);
                    } else if (!dinSykmelding) {
                        return (<Feilmelding
                            tittel={getLedetekst('din-sykmelding.fant-ikke-sykmelding.tittel', ledetekster)}
                            melding={getLedetekst('din-sykmelding.fant-ikke-sykmelding.melding', ledetekster)} />);
                    } else if (dinSykmelding.status === 'SENDT' && arbeidsgiversSykmelding && arbeidsgiversSykmelding) {
                        return (<div>
                            <DinSendteSykmelding
                                dinSykmelding={dinSykmelding}
                                arbeidsgiversSykmelding={arbeidsgiversSykmelding}
                                ledetekster={ledetekster} />
                            <LenkeTilDineSykmeldinger ledetekster={ledetekster} />
                        </div>);
                    } else if (dinSykmelding.status === 'BEKREFTET') {
                        return (<div>
                            <DinBekreftedeSykmelding
                                dinSykmelding={dinSykmelding}
                                arbeidsgiversSykmelding={arbeidsgiversSykmelding}
                                ledetekster={ledetekster} />
                            <LenkeTilDineSykmeldinger ledetekster={ledetekster} />
                        </div>);
                    } else if (dinSykmelding.status === 'UTGAATT') {
                        return (<div>
                            <DinUtgaatteSykmelding
                                sykmelding={dinSykmelding}
                                ledetekster={ledetekster} />
                            <LenkeTilDineSykmeldinger ledetekster={ledetekster} />
                        </div>);
                    } else if (dinSykmelding.status === 'NY') {
                        return (<div>
                            <DinSykmelding
                                sykmelding={dinSykmelding}
                                ledetekster={ledetekster}
                                erEldsteNyeSykmelding={erEldsteNyeSykmelding}
                                eldsteSykmeldingId={eldsteSykmeldingId} />
                                <LenkeTilDineSykmeldinger ledetekster={ledetekster} />
                            </div>);
                    } else if (dinSykmelding.status === 'AVBRUTT') {
                        return (<div>
                            <DinAvbrutteSykmelding
                                sykmelding={dinSykmelding}
                                ledetekster={ledetekster} />
                            <LenkeTilDineSykmeldinger ledetekster={ledetekster} />
                        </div>);
                    }
                    return <Feilmelding tittel="Sykmeldingen har ukjent status" />;
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
    sykmeldingId: PropTypes.string,
    dinSykmelding: PropTypes.object,
    arbeidsgiversSykmelding: PropTypes.object,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    erEldsteNyeSykmelding: PropTypes.bool,
    eldsteSykmeldingId: PropTypes.string,
};

export function mapStateToProps(state, ownProps) {
    const sykmeldingId = ownProps.params.sykmeldingId;
    const dinSykmelding = getSykmelding(state.dineSykmeldinger.data, sykmeldingId);
    let arbeidsgiversSykmelding;
    const props = {};

    const nyeSykmeldinger = state.dineSykmeldinger.data.filter((_sykmelding) => {
        return _sykmelding.status === 'NY';
    });
    const eldsteSykmelding = sorterSykmeldingerEldsteFoerst(nyeSykmeldinger)[0];
    const erEldsteNyeSykmelding = eldsteSykmelding && eldsteSykmelding.id === sykmeldingId;
    const eldsteSykmeldingId = eldsteSykmelding ? eldsteSykmelding.id : null;

    if (dinSykmelding && (dinSykmelding.status === 'SENDT' || (dinSykmelding.status === 'BEKREFTET' && dinSykmelding.valgtArbeidssituasjon === 'ARBEIDSTAKER'))) {
        arbeidsgiversSykmelding = getSykmelding(state.arbeidsgiversSykmeldinger.data, sykmeldingId);
        props.arbeidsgiversSykmelding = {
            data: arbeidsgiversSykmelding,
            hentingFeilet: state.arbeidsgiversSykmeldinger.hentingFeilet,
            henter: state.arbeidsgiversSykmeldinger.henter,
        };
    }

    return Object.assign({}, props, {
        sykmeldingId,
        henter: state.dineSykmeldinger.henter || state.arbeidsgiversSykmeldinger.henter || state.ledetekster.henter,
        hentingFeilet: state.dineSykmeldinger.hentingFeilet || state.arbeidsgiversSykmeldinger.hentingFeilet || state.ledetekster.hentingFeilet,
        dinSykmelding,
        arbeidsgiversSykmelding,
        erEldsteNyeSykmelding,
        eldsteSykmeldingId,
        ledetekster: state.ledetekster.data,
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
