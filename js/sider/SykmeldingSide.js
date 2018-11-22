import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSykmelding, getLedetekst, sykmeldingstatuser } from 'digisyfo-npm';
import Side from './Side';
import NySykmelding from '../components/sykmelding/NySykmelding';
import SendtSykmelding from '../components/sykmelding/SendtSykmelding';
import BekreftetSykmelding from '../components/sykmelding/BekreftetSykmelding';
import AvbruttSykmelding from '../components/sykmelding/AvbruttSykmelding';
import UtgaattSykmelding from '../components/sykmelding/UtgaattSykmelding';
import LenkeTilDineSykmeldinger from '../components/LenkeTilDineSykmeldinger';
import Feilmelding from '../components/Feilmelding';
import { hentDineSykmeldinger } from '../actions/dineSykmeldinger_actions';
import { sykmelding as sykmeldingPt } from '../propTypes';
import SykmeldingContext from '../contexts/SykmeldingContext';

const { SENDT, TIL_SENDING, BEKREFTET, UTGAATT, NY, AVBRUTT } = sykmeldingstatuser;

export class Container extends Component {
    componentWillMount() {
        this.props.hentDineSykmeldinger();
    }

    render() {
        const {
            dinSykmelding,
            henter,
            hentingFeilet,
            visEldreSykmeldingVarsel,
            eldsteSykmeldingId,
        } = this.props;

        const brodsmuler = [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('dine-sykmeldinger.sidetittel'),
            sti: '/sykmeldinger',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('din-sykmelding.sidetittel'),
        }];

        return (<Side tittel={getLedetekst('din-sykmelding.sidetittel')} brodsmuler={brodsmuler} laster={henter}>
            <SykmeldingContext.Provider value={{
                sykmelding: dinSykmelding,
                dinSykmelding,
                visEldreSykmeldingVarsel,
                eldsteSykmeldingId,
            }}>
                {(() => {
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
                            return (<NySykmelding />);
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
            </SykmeldingContext.Provider>
        </Side>);
    }
}

Container.propTypes = {
    dinSykmelding: sykmeldingPt,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    visEldreSykmeldingVarsel: PropTypes.bool,
    eldsteSykmeldingId: PropTypes.string,
    hentDineSykmeldinger: PropTypes.func,
};

export function mapStateToProps(state, ownProps) {
    const sykmeldingId = ownProps.params.sykmeldingId;
    const dinSykmelding = getSykmelding(state.dineSykmeldinger.data, sykmeldingId);

    return {
        sykmeldingId,
        dinSykmelding,
        henter: state.dineSykmeldinger.henter
            || state.ledetekster.henter
            || state.dineSykmeldinger.hentet !== true,
        hentingFeilet: state.dineSykmeldinger.hentingFeilet
            || state.arbeidsgiversSykmeldinger.hentingFeilet
            || state.ledetekster.hentingFeilet,
    };
}

export default connect(mapStateToProps, {
    hentDineSykmeldinger,
})(Container);
