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

export class Container extends Component {
    componentWillMount() {
        this.props.hentDineSykmeldinger();
    }

    render() {
        const { brodsmuler, sykmeldinger, henter, hentingFeilet, sortering } = this.props;
        return (<Side tittel={getLedetekst('dine-sykmeldinger.sidetittel')} brodsmuler={brodsmuler} laster={henter}>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    } else if (hentingFeilet) {
                        return (<Feilmelding />);
                    }
                    return (<Sykmeldinger
                        sykmeldinger={sykmeldinger}
                        sortering={sortering} />);
                })()
            }
        </Side>);
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
    hentDineSykmeldinger: PropTypes.func,
};

export function mapStateToProps(state) {
    return {
        sykmeldinger: state.dineSykmeldinger.data,
        sortering: state.dineSykmeldinger.sortering,
        henter: state.ledetekster.henter || state.dineSykmeldinger.henter || !state.dineSykmeldinger.hentet,
        hentingFeilet: state.ledetekster.hentingFeilet || state.dineSykmeldinger.hentingFeilet,
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

export default connect(mapStateToProps, { hentDineSykmeldinger })(Container);
