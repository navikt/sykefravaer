/* eslint arrow-body-style: ["error", "as-needed"] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst, getSykmelding, sykmeldingstatuser } from '@navikt/digisyfo-npm';
import Side from '../../../sider/Side';
import NySykmelding from '../../sykmelding-ny/NySykmelding';
import KoronaSykmeldingNy from '../../sykmelding-korona/KoronaSykmelding-Ny';
import KoronaSykmeldingSendt from '../../sykmelding-korona/KoronaSykmelding-Sendt';
import KoronaSykmeldingBekreftet from '../../sykmelding-korona/KoronaSykmelding-Bekreftet';
import KoronaSykmeldingUtgaatt from '../../sykmelding-korona/KoronaSYkmelding-Utgaatt';
import SendtSykmelding from '../../sykmelding-sendt/SendtSykmelding';
import BekreftetSykmelding from '../../sykmelding-bekreftet/BekreftetSykmelding';
import AvbruttSykmelding from '../../sykmelding-avbrutt/AvbruttSykmelding';
import UtgaattSykmelding from '../../sykmelding-utgatt/UtgaattSykmelding';
import LenkeTilDineSykmeldinger from '../../../components/LenkeTilDineSykmeldinger';
import Feilmelding from '../../../components/Feilmelding';
import { hentDineSykmeldinger } from '../../data/dine-sykmeldinger/dineSykmeldingerActions';
import { sykmelding as sykmeldingPt } from '../../../propTypes';
import SykmeldingContext from '../../contexts/SykmeldingContext';
import { hentSmSykmeldinger } from '../../data/sm-sykmeldinger/smSykmeldingerActions';
import { henterSmSykmeldingerSelector, hentingFeiletSmSykmeldingerSelector, smSykmeldingSelector } from '../../data/sm-sykmeldinger/smSykmeldingerSelectors';
import AvvistSykmelding from '../../sykmelding-avvist/AvvistSykmelding';
import { smSykmeldingPt } from '../../../propTypes/smSykmeldingProptypes';
import KoronaSykmeldingAvbrutt from '../../sykmelding-korona/KoronaSykmelding-Avbrutt';

const {
    SENDT, TIL_SENDING, BEKREFTET, UTGAATT, NY, AVBRUTT,
} = sykmeldingstatuser;

export class Container extends Component {
    componentWillMount() {
        const { doHentDineSykmeldinger, doHentSmSykmeldinger } = this.props;
        doHentDineSykmeldinger();
        doHentSmSykmeldinger();
    }

    componentWillUpdate() {
        const { doHentSmSykmeldinger } = this.props;
        doHentSmSykmeldinger();
    }

    render() {
        const {
            dinSykmelding,
            henter,
            hentingFeilet,
            visEldreSykmeldingVarsel,
            eldsteSykmeldingId,
            smSykmelding,
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

        return (
            <Side tittel={getLedetekst('din-sykmelding.sidetittel')} brodsmuler={brodsmuler} laster={henter}>
                <SykmeldingContext.Provider value={{
                    sykmelding: dinSykmelding,
                    smSykmelding,
                    dinSykmelding,
                    visEldreSykmeldingVarsel,
                    eldsteSykmeldingId,
                }}>
                    {(() => {
                        if (henter) {
                            return <div />;
                        }
                        if (hentingFeilet) {
                            return (<Feilmelding />);
                        }
                        if (!dinSykmelding && !smSykmelding) {
                            return (
                                <Feilmelding
                                    tittel={getLedetekst('din-sykmelding.fant-ikke-sykmelding.tittel')}
                                    melding={getLedetekst('din-sykmelding.fant-ikke-sykmelding.melding')} />
                            );
                        }
                        if (smSykmelding && smSykmelding.behandlingsutfall.status === 'INVALID') {
                            return <AvvistSykmelding />;
                        }
                        if (dinSykmelding.erEgenmeldt) {
                            switch (dinSykmelding.status) {
                                case SENDT:
                                case TIL_SENDING: {
                                    return (
                                        <div>
                                            <KoronaSykmeldingSendt dinSykmelding={dinSykmelding} />
                                            <LenkeTilDineSykmeldinger />
                                        </div>
                                    );
                                }
                                case BEKREFTET: {
                                    return (
                                        <div>
                                            <KoronaSykmeldingBekreftet dinSykmelding={dinSykmelding} />
                                            <LenkeTilDineSykmeldinger />
                                        </div>
                                    );
                                }
                                case UTGAATT: {
                                    return (
                                        <div>
                                            <KoronaSykmeldingUtgaatt sykmelding={dinSykmelding} />
                                            <LenkeTilDineSykmeldinger />
                                        </div>
                                    );
                                }
                                case NY: {
                                    return (<KoronaSykmeldingNy />);
                                }
                                case AVBRUTT: {
                                    return (
                                        <div>
                                            <KoronaSykmeldingAvbrutt sykmelding={dinSykmelding} />
                                            <LenkeTilDineSykmeldinger />
                                        </div>
                                    );
                                }
                                default: {
                                    return <Feilmelding tittel="Egenerklæringen har ukjent status" />;
                                }
                            }
                        }
                        switch (dinSykmelding.status) {
                            case SENDT:
                            case TIL_SENDING: {
                                return (
                                    <div>
                                        <SendtSykmelding dinSykmelding={dinSykmelding} />
                                        <LenkeTilDineSykmeldinger />
                                    </div>
                                );
                            }
                            case BEKREFTET: {
                                return (
                                    <div>
                                        <BekreftetSykmelding dinSykmelding={dinSykmelding} />
                                        <LenkeTilDineSykmeldinger />
                                    </div>
                                );
                            }
                            case UTGAATT: {
                                return (
                                    <div>
                                        <UtgaattSykmelding sykmelding={dinSykmelding} />
                                        <LenkeTilDineSykmeldinger />
                                    </div>
                                );
                            }
                            case NY: {
                                return (<NySykmelding />);
                            }
                            case AVBRUTT: {
                                return (
                                    <div>
                                        <AvbruttSykmelding sykmelding={dinSykmelding} />
                                        <LenkeTilDineSykmeldinger />
                                    </div>
                                );
                            }
                            default: {
                                return <Feilmelding tittel="Sykmeldingen har ukjent status" />;
                            }
                        }
                    })()
                    }
                </SykmeldingContext.Provider>
            </Side>
        );
    }
}

Container.propTypes = {
    dinSykmelding: sykmeldingPt,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    visEldreSykmeldingVarsel: PropTypes.bool,
    eldsteSykmeldingId: PropTypes.string,
    doHentDineSykmeldinger: PropTypes.func,
    doHentSmSykmeldinger: PropTypes.func,
    smSykmelding: smSykmeldingPt,
};

export function mapStateToProps(state, ownProps) {
    const { sykmeldingId } = ownProps.params;
    const dinSykmelding = getSykmelding(state.dineSykmeldinger.data, sykmeldingId);
    const smSykmelding = smSykmeldingSelector(state, sykmeldingId);

    return {
        sykmeldingId,
        dinSykmelding,
        smSykmelding,
        henter: (state.dineSykmeldinger.henter && !smSykmelding)
            || state.ledetekster.henter
            || state.dineSykmeldinger.hentet !== true
            || (henterSmSykmeldingerSelector(state) && !dinSykmelding),
        hentingFeilet: (state.dineSykmeldinger.hentingFeilet && !smSykmelding)
            || state.arbeidsgiversSykmeldinger.hentingFeilet
            || state.ledetekster.hentingFeilet
            || (hentingFeiletSmSykmeldingerSelector(state) && !dinSykmelding),
    };
}

export default connect(mapStateToProps, {
    doHentDineSykmeldinger: hentDineSykmeldinger,
    doHentSmSykmeldinger: hentSmSykmeldinger,
})(Container);
