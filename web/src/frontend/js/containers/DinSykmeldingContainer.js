import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import DinSykmelding from '../components/sykmelding/DinSykmeldingABTest';
import DinSendteSykmelding from '../components/sykmelding/DinSendteSykmelding';
import DinBekreftedeSykmelding from '../components/sykmelding/DinBekreftedeSykmelding';
import DinAvbrutteSykmelding from '../components/sykmelding/DinAvbrutteSykmelding';
import DinUtgaatteSykmelding from '../components/sykmelding/DinUtgaatteSykmelding';
import LenkeTilDineSykmeldinger from '../components/LenkeTilDineSykmeldinger';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import { hentAktuelleArbeidsgivere } from '../actions/dineArbeidsgivere_actions';
import { hentArbeidsgiversSykmeldinger } from '../actions/arbeidsgiversSykmeldinger_actions';
import { hentDineSykmeldinger } from '../actions/dineSykmeldinger_actions';
import { hentBrukerinfo } from '../actions/brukerinfo_actions';
import { getSykmelding, sorterSykmeldingerEldsteFoerst, getLedetekst } from 'digisyfo-npm';
import { SENDT, TIL_SENDING, BEKREFTET, UTGAATT, NY, AVBRUTT } from '../enums/sykmeldingstatuser';
import { sykmelding as sykmeldingPt, brodsmule as brodsmulePt } from '../propTypes';

export class DinSykmldSide extends Component {
    componentWillMount() {
        const {
            dineSykmeldingerHentet,
            arbeidsgiversSykmeldingerHentet,
            brukerinfoHentet } = this.props;
        if (!dineSykmeldingerHentet) {
            this.props.hentDineSykmeldinger();
        }
        if (!arbeidsgiversSykmeldingerHentet) {
            this.props.hentArbeidsgiversSykmeldinger();
        }
        if (!brukerinfoHentet) {
            this.props.hentBrukerinfo();
        }
    }

    render() {
        const { brodsmuler, dinSykmelding, arbeidsgiversSykmelding, henter, hentingFeilet,
            visEldreSykmeldingVarsel, eldsteSykmeldingId, hentet } = this.props;

        return (<Side tittel={getLedetekst('din-sykmelding.sidetittel')} brodsmuler={brodsmuler} laster={henter || !hentet}>
                { (() => {
                    if (henter) {
                        return <AppSpinner />;
                    } else if (hentingFeilet) {
                        return (<Feilmelding />);
                    } else if (!dinSykmelding) {
                        return (<Feilmelding
                            tittel={getLedetekst('din-sykmelding.fant-ikke-sykmelding.tittel')}
                            melding={getLedetekst('din-sykmelding.fant-ikke-sykmelding.melding')} />);
                    } else if ((dinSykmelding.status === SENDT || dinSykmelding.status === TIL_SENDING) && dinSykmelding && arbeidsgiversSykmelding) {
                        return (<div>
                            <DinSendteSykmelding
                                dinSykmelding={dinSykmelding}
                                arbeidsgiversSykmelding={arbeidsgiversSykmelding}
                                />
                            <LenkeTilDineSykmeldinger />
                        </div>);
                    } else if (dinSykmelding.status === BEKREFTET) {
                        return (<div>
                            <DinBekreftedeSykmelding
                                dinSykmelding={dinSykmelding}
                                arbeidsgiversSykmelding={arbeidsgiversSykmelding}
                                />
                            <LenkeTilDineSykmeldinger />
                        </div>);
                    } else if (dinSykmelding.status === UTGAATT) {
                        return (<div>
                            <DinUtgaatteSykmelding sykmelding={dinSykmelding} />
                            <LenkeTilDineSykmeldinger />
                        </div>);
                    } else if (dinSykmelding.status === NY) {
                        return (<DinSykmelding
                            sykmelding={dinSykmelding}
                            visEldreSykmeldingVarsel={visEldreSykmeldingVarsel}
                            eldsteSykmeldingId={eldsteSykmeldingId} />);
                    } else if (dinSykmelding.status === AVBRUTT) {
                        return (<div>
                            <DinAvbrutteSykmelding
                                sykmelding={dinSykmelding} />
                            <LenkeTilDineSykmeldinger />
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
    arbeidsgivere: PropTypes.object,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    sykmeldingId: PropTypes.string,
    dinSykmelding: sykmeldingPt,
    arbeidsgiversSykmelding: sykmeldingPt,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    visEldreSykmeldingVarsel: PropTypes.bool,
    eldsteSykmeldingId: PropTypes.string,
    hentAktuelleArbeidsgivere: PropTypes.func,
    hentArbeidsgiversSykmeldinger: PropTypes.func,
    dineSykmeldingerHentet: PropTypes.bool,
    arbeidsgiversSykmeldingerHentet: PropTypes.bool,
    brukerinfoHentet: PropTypes.bool,
    hentDineSykmeldinger: PropTypes.func,
    hentBrukerinfo: PropTypes.func,
    hentet: PropTypes.bool,
};

const getEldsteNyeSykmelding = (sykmeldinger) => {
    const nyeSykmeldinger = sykmeldinger.filter((_sykmelding) => {
        return _sykmelding.status === NY;
    });
    return sorterSykmeldingerEldsteFoerst(nyeSykmeldinger)[0];
};

const erEldsteSykmelding = (sykmeldinger, sykmeldingId) => {
    const eldsteSykmelding = getEldsteNyeSykmelding(sykmeldinger, sykmeldingId);
    return eldsteSykmelding && eldsteSykmelding.id === sykmeldingId;
};

const detFinnesAndreSykmeldingerMedSammePeriode = (sykmeldinger, sykmeldingId) => {
    const sykmelding = getSykmelding(sykmeldinger, sykmeldingId);
    if (!sykmelding || !sykmelding.mulighetForArbeid) {
        return false;
    }
    const denneSykmeldingensPerioder = JSON.stringify(sykmelding.mulighetForArbeid.perioder);
    const antallMedSammePerioder = sykmeldinger.filter((_sykmelding) => {
        return JSON.stringify(_sykmelding.mulighetForArbeid.perioder) === denneSykmeldingensPerioder;
    }).length;
    return antallMedSammePerioder > 1;
};

const harSammePeriodeSomDenEldsteSykmeldingen = (sykmeldinger, sykmeldingId) => {
    const sykmelding = getSykmelding(sykmeldinger, sykmeldingId);
    const eldsteSykmelding = sorterSykmeldingerEldsteFoerst(sykmeldinger)[0];
    return JSON.stringify(sykmelding.mulighetForArbeid.perioder) === JSON.stringify(eldsteSykmelding.mulighetForArbeid.perioder);
};

const visEldreSykmeldingVarsel = (sykmeldinger, sykmeldingId) => {
    const nyeSykmeldinger = sykmeldinger.filter((s) => {
        return s.status === NY;
    });
    const erEldst = erEldsteSykmelding(nyeSykmeldinger, sykmeldingId);
    if (erEldst) {
        return false;
    }
    if (!erEldst && detFinnesAndreSykmeldingerMedSammePeriode(nyeSykmeldinger, sykmeldingId) && harSammePeriodeSomDenEldsteSykmeldingen(nyeSykmeldinger, sykmeldingId)) {
        return false;
    }
    return true;
};

export function mapStateToProps(state, ownProps) {
    const sykmeldingId = ownProps.params.sykmeldingId;
    const dinSykmelding = getSykmelding(state.dineSykmeldinger.data, sykmeldingId);
    let arbeidsgiversSykmelding = {};

    if (dinSykmelding && (dinSykmelding.status === SENDT || dinSykmelding.status === TIL_SENDING || (dinSykmelding.status === BEKREFTET && dinSykmelding.valgtArbeidssituasjon === 'ARBEIDSTAKER'))) {
        arbeidsgiversSykmelding = getSykmelding(state.arbeidsgiversSykmeldinger.data, sykmeldingId);
    }

    const eldsteNyeSykmelding = getEldsteNyeSykmelding(state.dineSykmeldinger.data, sykmeldingId);

    return {
        sykmeldingId,
        henter: state.dineSykmeldinger.henter || state.arbeidsgiversSykmeldinger.henter || state.ledetekster.henter,
        hentet: state.brukerinfo.bruker.hentet === true && state.dineSykmeldinger.hentet === true && state.arbeidsgiversSykmeldinger.hentet === true,
        hentingFeilet: state.dineSykmeldinger.hentingFeilet || state.arbeidsgiversSykmeldinger.hentingFeilet || state.ledetekster.hentingFeilet,
        dinSykmelding,
        arbeidsgiversSykmelding,
        dineSykmeldingerHentet: state.dineSykmeldinger.hentet,
        arbeidsgiversSykmeldingerHentet: state.arbeidsgiversSykmeldinger.hentet,
        visEldreSykmeldingVarsel: visEldreSykmeldingVarsel(state.dineSykmeldinger.data, sykmeldingId),
        eldsteSykmeldingId: eldsteNyeSykmelding ? eldsteNyeSykmelding.id : '',
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('dine-sykmeldinger.sidetittel'),
            sti: '/sykmeldinger',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('din-sykmelding.sidetittel'),
        }],
        brukerinfoHentet: state.brukerinfo.bruker.hentet === true,
    };
}

export const DinSykmeldingContainer = connect(mapStateToProps, {
    hentAktuelleArbeidsgivere, hentArbeidsgiversSykmeldinger, hentDineSykmeldinger, hentBrukerinfo,
})(DinSykmldSide);
