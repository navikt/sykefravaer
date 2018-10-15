import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSykmelding, sorterSykmeldingerEldsteFoerst, getLedetekst, sykmeldingstatuser } from 'digisyfo-npm';
import Side from './Side';
import NySykmelding from '../components/sykmelding/NySykmelding';
import SendtSykmelding from '../components/sykmelding/SendtSykmelding';
import BekreftetSykmelding from '../components/sykmelding/BekreftetSykmelding';
import AvbruttSykmelding from '../components/sykmelding/AvbruttSykmelding';
import UtgaattSykmelding from '../components/sykmelding/UtgaattSykmelding';
import LenkeTilDineSykmeldinger from '../components/LenkeTilDineSykmeldinger';
import Feilmelding from '../components/Feilmelding';
import { hentDineSykmeldinger } from '../actions/dineSykmeldinger_actions';
import { sykmelding as sykmeldingPt, brodsmule as brodsmulePt } from '../propTypes/index';

const { SENDT, TIL_SENDING, BEKREFTET, UTGAATT, NY, AVBRUTT } = sykmeldingstatuser;

export class Container extends Component {
    componentWillMount() {
        this.props.hentDineSykmeldinger();
    }

    render() {
        const {
            brodsmuler,
            dinSykmelding,
            henter,
            hentingFeilet,
            visEldreSykmeldingVarsel,
            eldsteSykmeldingId,
        } = this.props;
        return (<Side tittel={getLedetekst('din-sykmelding.sidetittel')} brodsmuler={brodsmuler} laster={henter}>
            { (() => {
                if (henter) {
                    return <div />;
                } else if (hentingFeilet) {
                    return (<Feilmelding />);
                } else if (!dinSykmelding) {
                    return (<Feilmelding
                        tittel={getLedetekst('din-sykmelding.fant-ikke-sykmelding.tittel')}
                        melding={getLedetekst('din-sykmelding.fant-ikke-sykmelding.melding')} />);
                }
                switch (dinSykmelding.status) {
                    case SENDT:
                    case TIL_SENDING: {
                        return (<div>
                            <SendtSykmelding dinSykmelding={dinSykmelding} />
                            <LenkeTilDineSykmeldinger />
                        </div>);
                    }
                    case BEKREFTET: {
                        return (<div>
                            <BekreftetSykmelding dinSykmelding={dinSykmelding} />
                            <LenkeTilDineSykmeldinger />
                        </div>);
                    }
                    case UTGAATT: {
                        return (<div>
                            <UtgaattSykmelding sykmelding={dinSykmelding} />
                            <LenkeTilDineSykmeldinger />
                        </div>);
                    }
                    case NY: {
                        return (<NySykmelding
                            sykmelding={dinSykmelding}
                            visEldreSykmeldingVarsel={visEldreSykmeldingVarsel}
                            eldsteSykmeldingId={eldsteSykmeldingId} />);
                    }
                    case AVBRUTT: {
                        return (<div>
                            <AvbruttSykmelding sykmelding={dinSykmelding} />
                            <LenkeTilDineSykmeldinger />
                        </div>);
                    }
                    default: {
                        return <Feilmelding tittel="Sykmeldingen har ukjent status" />;
                    }
                }
            })()
            }
        </Side>);
    }
}

Container.propTypes = {
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    dinSykmelding: sykmeldingPt,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    visEldreSykmeldingVarsel: PropTypes.bool,
    eldsteSykmeldingId: PropTypes.string,
    hentDineSykmeldinger: PropTypes.func,
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
    return erEldst
        ? false
        : !(!erEldst
            && detFinnesAndreSykmeldingerMedSammePeriode(nyeSykmeldinger, sykmeldingId)
            && harSammePeriodeSomDenEldsteSykmeldingen(nyeSykmeldinger, sykmeldingId));
};

export function mapStateToProps(state, ownProps) {
    const sykmeldingId = ownProps.params.sykmeldingId;
    const dinSykmelding = getSykmelding(state.dineSykmeldinger.data, sykmeldingId);

    const eldsteNyeSykmelding = getEldsteNyeSykmelding(state.dineSykmeldinger.data, sykmeldingId);
    const hentet = state.dineSykmeldinger.hentet === true;

    return {
        sykmeldingId,
        henter: state.dineSykmeldinger.henter
            || state.ledetekster.henter
            || !hentet,
        hentingFeilet: state.dineSykmeldinger.hentingFeilet
            || state.arbeidsgiversSykmeldinger.hentingFeilet
            || state.ledetekster.hentingFeilet,
        dinSykmelding,
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

export default connect(mapStateToProps, {
    hentDineSykmeldinger,
})(Container);
