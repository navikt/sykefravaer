import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import SideMedHoyrekolonne from '../sider/SideMedHoyrekolonne';
import DinSykmelding from '../components/DinSykmelding';
import DinSendteSykmelding from '../components/DinSendteSykmelding';
import DinBekrefteteSykmelding from '../components/DinBekrefteteSykmelding';
import { ARBEIDSGIVER, INNSENDT_DATO, ORGNUMMER, STATUS } from '../nokkelopplysninger/NokkelOpplysningerEnum';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import { getLedetekst, getHtmlLedetekst } from '../ledetekster/index';
import { hentAktuelleArbeidsgivere } from '../actions/dineArbeidsgivere_actions';
import { navigerFraBekreftetkvittering } from '../actions/dinSykmelding_actions';
import { hentArbeidsgiversSykmeldinger } from '../actions/arbeidsgiversSykmeldinger_actions';
import { erPilotarbeidsgiver } from '../utils/arbeidsgiverUtils.js';
import SykmeldingKvittering from '../components/SykmeldingKvittering.js';
import LenkeTilDineSykmeldinger from '../components/LenkeTilDineSykmeldinger.js';

export class DinSykmldSide extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        const { dispatch, sykmeldingId, dinSykmelding: { data } } = this.props;
        if (data && data.status) {
            switch (data.status) {
                case 'SENDT': {
                    dispatch(hentArbeidsgiversSykmeldinger());
                    break;
                }
                case 'BEKREFTET':
                    break;
                default: {
                    dispatch(hentAktuelleArbeidsgivere(sykmeldingId));
                }
            }
        }
    }

    componentWillUnmount() {
        if (this.props.dinSykmelding.data && this.props.dinSykmelding.data.nettoppBekreftet) {
            const { dispatch } = this.props;
            dispatch(navigerFraBekreftetkvittering(this.props.sykmeldingId));
        }
    }

    render() {
        const { brodsmuler, ledetekster, dinSykmelding, visSendTilArbeidsgiver, arbeidsgiversSykmelding } = this.props;
        return (<SideMedHoyrekolonne tittel={getLedetekst('din-sykmelding.sidetittel', ledetekster.data)} brodsmuler={brodsmuler}>
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
                                ledetekster={ledetekster.data}
                                nokkelopplysninger={[
                                [STATUS, INNSENDT_DATO],
                                [ARBEIDSGIVER, ORGNUMMER],
                                ]} />
                            <LenkeTilDineSykmeldinger ledetekster={ledetekster.data} />
                        </div>);
                    } else if (dinSykmelding.data.status === 'BEKREFTET' && dinSykmelding.data.nettoppBekreftet) {
                        return (<SykmeldingKvittering
                            tittel={getLedetekst('bekreft-sykmelding.kvittering.tittel', ledetekster.data)}
                            sykmelding={dinSykmelding.data}
                            ledetekster={ledetekster.data}
                            sykepengerTittel={getLedetekst('bekreft-sykmelding.kvittering.sok-om-sykepenger.tittel', ledetekster)}
                            sykepengerTekst={getHtmlLedetekst('bekreft-sykmelding.kvittering.sok-om-sykepenger.tekst', ledetekster)} />);
                    } else if (dinSykmelding.data.status === 'BEKREFTET' && !dinSykmelding.data.nettoppBekreftet) {
                        return (<div>
                            <DinBekrefteteSykmelding
                                sykmelding={dinSykmelding.data}
                                ledetekster={ledetekster.data}
                                nokkelopplysninger={[
                                [STATUS, INNSENDT_DATO],
                                ]} />
                            <LenkeTilDineSykmeldinger ledetekster={ledetekster.data} />
                        </div>);
                    }
                    return (<div>
                        <DinSykmelding
                            sykmelding={dinSykmelding.data}
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
    arbeidsgivere: PropTypes.object,
    brodsmuler: PropTypes.array,
    visSendTilArbeidsgiver: PropTypes.bool,
    sykmeldingId: PropTypes.string,
    dinSykmelding: PropTypes.object,
    arbeidsgiversSykmelding: PropTypes.object,
};

export function mapStateToProps(state, ownProps) {
    const sykmeldingId = ownProps.params.sykmeldingId;
    const dinSykmelding = state.dineSykmeldinger.data.filter((sykmld) => {
        return `${sykmld.id}` === `${sykmeldingId}`;
    })[0];
    let arbeidsgiversSykmelding;

    if (dinSykmelding.status === 'SENDT') {
        arbeidsgiversSykmelding = state.arbeidsgiversSykmeldinger.data.filter((sykmld) => {
            return `${sykmld.id}` === `${sykmeldingId}`;
        })[0];
    }

    let returnObject = {
        sykmeldingId,
        dinSykmelding: {
            data: dinSykmelding,
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

    if (dinSykmelding.status === 'SENDT') {
        returnObject = Object.assign({}, returnObject, {
            arbeidsgiversSykmelding: {
                data: arbeidsgiversSykmelding,
                hentingFeilet: state.arbeidsgiversSykmeldinger.hentingFeilet,
                henter: state.arbeidsgiversSykmeldinger.henter,
            },
        });
    }

    return returnObject;
}

export const DinSykmeldingContainer = connect(mapStateToProps)(DinSykmldSide);
