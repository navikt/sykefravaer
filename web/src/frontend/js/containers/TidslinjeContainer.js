import React, { PropTypes } from 'react';
import Side from '../sider/Side.js';
import Tidslinje from '../components/Tidslinje.js';
import AppSpinner from '../components/AppSpinner.js';
import Feilmelding from '../components/Feilmelding.js';
import { connect } from 'react-redux';

export const TidslinjeSide = (props) => {
    const { brodsmuler, ledetekster, milepaeler } = props;
    return (<Side tittel="Tidslinjen" brodsmuler={brodsmuler}>
        {
            (() => {
                if (ledetekster.henter) {
                    return <AppSpinner />;
                } else if (ledetekster.hentingFeilet || !ledetekster.data) {
                    return (<Feilmelding />);
                } 
                return <Tidslinje milepaeler={milepaeler.data} ledetekster={ledetekster.data} />;
            })()
        }
        </Side>);
};

TidslinjeSide.propTypes = {
    brodsmuler: PropTypes.array,
    ledetekster: PropTypes.object,
    milepaeler: PropTypes.object,
};

export function mapStateToProps(state) {
    return {
        ledetekster: state.ledetekster,
        milepaeler: state.milepaeler,
        brodsmuler: [{
            tittel: 'Sykefravær og oppfølging',
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: 'Tidslinjen',
        }],
    };
}

const TidslinjeContainer = connect(mapStateToProps)(TidslinjeSide);

export default TidslinjeContainer;
