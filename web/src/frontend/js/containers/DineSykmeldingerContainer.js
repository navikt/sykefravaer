import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import DineSykmeldinger from '../components/sykmeldinger/DineSykmeldinger';
import Side from '../sider/Side';
import AppSpinner from '../components/AppSpinner';
import { getLedetekst } from 'digisyfo-npm';
import Feilmelding from '../components/Feilmelding';
import { brodsmule as brodsmulePt, sykmelding as sykmeldingPt } from '../propTypes';

export const DineSykmldSide = ({ brodsmuler, sykmeldinger, henter, hentingFeilet }) => {
    return (<Side tittel={getLedetekst('dine-sykmeldinger.sidetittel')} brodsmuler={brodsmuler}>
        {
            (() => {
                if (henter) {
                    return <AppSpinner />;
                } else if (hentingFeilet) {
                    return (<Feilmelding />);
                }
                return (<DineSykmeldinger
                    sykmeldinger={sykmeldinger}
                    sortering={sykmeldinger.sortering} />);
            })()
        }
    </Side>);
};

DineSykmldSide.propTypes = {
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    sykmeldinger: PropTypes.arrayOf(sykmeldingPt),
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
};

export function mapStateToProps(state) {
    return {
        sykmeldinger: state.dineSykmeldinger.data,
        henter: state.ledetekster.henter || state.dineSykmeldinger.henter,
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

const DineSykmeldingerContainer = connect(mapStateToProps)(DineSykmldSide);

export default DineSykmeldingerContainer;
