import React, { PropTypes } from 'react';
import DineSykmeldinger from '../components/DineSykmeldinger.js';
import { connect } from 'react-redux';
import Side from '../sider/Side.js';
import AppSpinner from '../components/AppSpinner.js';
import { getLedetekst } from '../ledetekster';
import Feilmelding from '../components/Feilmelding.js';
import { sorterSykmeldinger } from '../utils';

export const DineSykmldSide = (props) => {
    const { ledetekster, brodsmuler, sykmeldinger, skjulVarsel } = props;
    return (<Side tittel={getLedetekst('dine-sykmeldinger.sidetittel', ledetekster.data)} brodsmuler={brodsmuler}>
        {
            (() => {
                if (sykmeldinger.henter) {
                    return <AppSpinner />;
                } else if (sykmeldinger.hentingFeilet) {
                    return (<Feilmelding />);
                }
                return (<DineSykmeldinger
                    skjulVarsel={skjulVarsel}
                    sykmeldinger={sorterSykmeldinger(sykmeldinger.data, sykmeldinger.sortering)}
                    ledetekster={ledetekster.data} />);
            })()
        }
    </Side>);
};

DineSykmldSide.propTypes = {
    ledetekster: PropTypes.object,
    brodsmuler: PropTypes.array,
    sykmeldinger: PropTypes.object,
    skjulVarsel: PropTypes.bool,
};

export function mapStateToProps(state) {
    return {
        sykmeldinger: state.dineSykmeldinger,
        ledetekster: state.ledetekster,
        skjulVarsel: state.brukerinfo.data.skjulUnderUtviklingVarsel === true,
        brodsmuler: [{
            tittel: 'Dine sykmeldinger',
            sti: '/sykmeldinger',
        }],
    };
}

const DineSykmeldingerContainer = connect(mapStateToProps)(DineSykmldSide);

export default DineSykmeldingerContainer;
