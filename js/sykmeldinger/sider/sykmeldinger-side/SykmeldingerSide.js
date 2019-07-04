import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst } from '@navikt/digisyfo-npm';
import Sykmeldinger from '../../sykmeldinger/Sykmeldinger';
import Feilmelding from '../../../components/Feilmelding';
import Side from '../../../sider/Side';
import AppSpinner from '../../../components/AppSpinner';
import { brodsmule as brodsmulePt, sykmelding as sykmeldingPt } from '../../../propTypes';
import { hentDineSykmeldinger } from '../../data/dine-sykmeldinger/dineSykmeldingerActions';
import { hentSmSykmeldinger } from '../../data/sm-sykmeldinger/smSykmeldingerActions';
import {
    avvisteSmSykmeldingerDataSelector,
    henterSmSykmeldingerSelector,
    hentingFeiletSmSykmeldingerSelector,
    skalHenteSmSykmeldingerSelector,
} from '../../data/sm-sykmeldinger/smSykmeldingerSelectors';
import { smSykmeldingerPt } from '../../../propTypes/smSykmeldingProptypes';

export class Container extends Component {
    componentWillMount() {
        const { doHentDineSykmeldinger } = this.props;
        doHentDineSykmeldinger();
    }

    componentDidUpdate() {
        const { doHentSmSykmeldinger, skalHenteSmSykmeldinger } = this.props;
        if (skalHenteSmSykmeldinger) {
            doHentSmSykmeldinger();
        }
    }

    render() {
        const {
            brodsmuler, sykmeldinger, henter, hentingFeilet, sortering, smSykmeldinger,
        } = this.props;
        return (
            <Side tittel={getLedetekst('dine-sykmeldinger.sidetittel')} brodsmuler={brodsmuler} laster={henter}>
                {
                    (() => {
                        if (henter) {
                            return <AppSpinner />;
                        }
                        if (hentingFeilet) {
                            return (<Feilmelding />);
                        }
                        return (
                            <Sykmeldinger
                                smSykmeldinger={smSykmeldinger}
                                sykmeldinger={sykmeldinger}
                                sortering={sortering} />
                        );
                    })()
                }
            </Side>
        );
    }
}

Container.propTypes = {
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    sykmeldinger: PropTypes.arrayOf(sykmeldingPt),
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    sortering: PropTypes.shape({
        tidligere: PropTypes.string,
    }),
    doHentDineSykmeldinger: PropTypes.func,
    doHentSmSykmeldinger: PropTypes.func,
    smSykmeldinger: smSykmeldingerPt,
    skalHenteSmSykmeldinger: PropTypes.bool,
};

export function mapStateToProps(state) {
    return {
        sykmeldinger: state.dineSykmeldinger.data,
        smSykmeldinger: avvisteSmSykmeldingerDataSelector(state),
        sortering: state.dineSykmeldinger.sortering,
        henter: state.ledetekster.henter || state.dineSykmeldinger.henter || !state.dineSykmeldinger.hentet || henterSmSykmeldingerSelector(state),
        hentingFeilet: state.ledetekster.hentingFeilet || state.dineSykmeldinger.hentingFeilet || hentingFeiletSmSykmeldingerSelector(state),
        skalHenteSmSykmeldinger: skalHenteSmSykmeldingerSelector(state),
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('dine-sykmeldinger.sidetittel'),
            sti: '/sykmeldinger',
        }],
    };
}

const actionCreators = {
    doHentDineSykmeldinger: hentDineSykmeldinger,
    doHentSmSykmeldinger: hentSmSykmeldinger,
};

export default connect(mapStateToProps, actionCreators)(Container);
