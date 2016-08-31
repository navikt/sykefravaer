import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import DineSykmeldinger from '../components/sykmeldinger/DineSykmeldinger';
import Side from '../sider/Side.js';
import AppSpinner from '../components/AppSpinner.js';
import { getLedetekst } from '../ledetekster';
import Feilmelding from '../components/Feilmelding.js';

export const DineSykmldSide = (props) => {
    const { ledetekster, brodsmuler, sykmeldinger } = props;
    return (<Side tittel={getLedetekst('dine-sykmeldinger.sidetittel', ledetekster.data)} brodsmuler={brodsmuler}>
        {
            (() => {
                if (sykmeldinger.henter) {
                    return <AppSpinner />;
                } else if (sykmeldinger.hentingFeilet) {
                    console.log('Henting av sykmeldinger feilet');
                    return (<Feilmelding />);
                }
                return (<DineSykmeldinger
                    sykmeldinger={sykmeldinger.data}
                    sortering={sykmeldinger.sortering}
                    ledetekster={ledetekster.data} />);
            })()
        }
    </Side>);
};

DineSykmldSide.propTypes = {
    ledetekster: PropTypes.object,
    brodsmuler: PropTypes.array,
    sykmeldinger: PropTypes.object,
};

export function mapStateToProps(state) {
    return {
        sykmeldinger: state.dineSykmeldinger,
        ledetekster: state.ledetekster,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel', state.ledetekster.data),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: 'Dine sykmeldinger',
            sti: '/sykmeldinger',
        }],
    };
}

const DineSykmeldingerContainer = connect(mapStateToProps)(DineSykmldSide);

export default DineSykmeldingerContainer;
