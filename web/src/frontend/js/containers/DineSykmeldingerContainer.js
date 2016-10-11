import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import DineSykmeldinger from '../components/sykmeldinger/DineSykmeldinger';
import Side from '../sider/Side.js';
import AppSpinner from '../components/AppSpinner.js';
import { getLedetekst } from 'digisyfo-npm';
import Feilmelding from '../components/Feilmelding.js';

export const DineSykmldSide = ({ ledetekster, brodsmuler, sykmeldinger, henter, hentingFeilet }) => {
    return (<Side tittel={getLedetekst('dine-sykmeldinger.sidetittel', ledetekster.data)} brodsmuler={brodsmuler}>
        {
            (() => {
                if (henter) {
                    return <AppSpinner />;
                } else if (hentingFeilet) {
                    return (<Feilmelding />);
                }
                return (<DineSykmeldinger
                    sykmeldinger={sykmeldinger}
                    sortering={sykmeldinger.sortering}
                    ledetekster={ledetekster} />);
            })()
        }
    </Side>);
};

DineSykmldSide.propTypes = {
    ledetekster: PropTypes.object,
    brodsmuler: PropTypes.array,
    sykmeldinger: PropTypes.array,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
};

export function mapStateToProps(state) {
    return {
        sykmeldinger: state.dineSykmeldinger.data,
        henter: state.ledetekster.henter || state.dineSykmeldinger.henter,
        hentingFeilet: state.ledetekster.hentingFeilet || state.dineSykmeldinger.hentingFeilet,
        ledetekster: state.ledetekster.data,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel', state.ledetekster.data),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('dine-sykmeldinger.sidetittel', state.ledetekster.data),
            sti: '/sykmeldinger',
        }],
    };
}

const DineSykmeldingerContainer = connect(mapStateToProps)(DineSykmldSide);

export default DineSykmeldingerContainer;
