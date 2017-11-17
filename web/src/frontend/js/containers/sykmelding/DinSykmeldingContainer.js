import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSykmelding, sorterSykmeldingerEldsteFoerst, getLedetekst } from 'digisyfo-npm';
import Side from '../../sider/Side';
import DinSykmelding from '../../components/sykmelding/DinSykmelding';
import DinSendteSykmelding from '../../components/sykmelding/DinSendteSykmelding';
import DinBekreftedeSykmelding from '../../components/sykmelding/DinBekreftedeSykmelding';
import DinAvbrutteSykmelding from '../../components/sykmelding/DinAvbrutteSykmelding';
import DinUtgaatteSykmelding from '../../components/sykmelding/DinUtgaatteSykmelding';
import LenkeTilDineSykmeldinger from '../../components/LenkeTilDineSykmeldinger';
import AppSpinner from '../../components/AppSpinner';
import Feilmelding from '../../components/Feilmelding';
import { hentDineSykmeldinger } from '../../actions/dineSykmeldinger_actions';
import { SENDT, TIL_SENDING, BEKREFTET, UTGAATT, NY, AVBRUTT } from '../../enums/sykmeldingstatuser';
import { sykmelding as sykmeldingPt, brodsmule as brodsmulePt } from '../../propTypes';

export class DinSykmldSide extends Component {
    componentWillMount() {
        const { skalHenteDineSykmeldinger } = this.props;
        if (skalHenteDineSykmeldinger) {
            this.props.hentDineSykmeldinger();
        }
    }

    render() {
        const { brodsmuler, dinSykmelding, henter, hentingFeilet,
            visEldreSykmeldingVarsel, eldsteSykmeldingId, hentet } = this.props;
        return (<Side tittel={getLedetekst('din-sykmelding.sidetittel')} brodsmuler={brodsmuler} laster={henter || !hentet}>
            { (() => {
                if (henter || !hentet) {
                    return <AppSpinner />;
                } else if (hentingFeilet) {
                    return (<Feilmelding />);
                } else if (!dinSykmelding) {
                    return (<Feilmelding
                        tittel={getLedetekst('din-sykmelding.fant-ikke-sykmelding.tittel')}
                        melding={getLedetekst('din-sykmelding.fant-ikke-sykmelding.melding')} />);
                } else if ((dinSykmelding.status === SENDT || dinSykmelding.status === TIL_SENDING) && dinSykmelding) {
                    return (<div>
                        <DinSendteSykmelding
                            dinSykmelding={dinSykmelding}
                        />
                        <LenkeTilDineSykmeldinger />
                    </div>);
                } else if (dinSykmelding.status === BEKREFTET) {
                    return (<div>
                        <DinBekreftedeSykmelding
                            dinSykmelding={dinSykmelding}
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
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    dinSykmelding: sykmeldingPt,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    visEldreSykmeldingVarsel: PropTypes.bool,
    eldsteSykmeldingId: PropTypes.string,
    hentDineSykmeldinger: PropTypes.func,
    hentet: PropTypes.bool,
    skalHenteDineSykmeldinger: PropTypes.bool,
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

    const eldsteNyeSykmelding = getEldsteNyeSykmelding(state.dineSykmeldinger.data, sykmeldingId);
    const skalHenteDineSykmeldinger = !state.dineSykmeldinger.hentet && !state.dineSykmeldinger.henter;
    const hentet = state.dineSykmeldinger.hentet === true;

    return {
        sykmeldingId,
        henter: state.dineSykmeldinger.henter || state.ledetekster.henter,
        hentet,
        hentingFeilet: state.dineSykmeldinger.hentingFeilet || state.arbeidsgiversSykmeldinger.hentingFeilet || state.ledetekster.hentingFeilet,
        dinSykmelding,
        skalHenteDineSykmeldinger,
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
    };
}

export const DinSykmeldingContainer = connect(mapStateToProps, {
    hentDineSykmeldinger,
})(DinSykmldSide);
