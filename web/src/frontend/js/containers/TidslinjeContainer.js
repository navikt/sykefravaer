import React, { PropTypes } from 'react';
import Side from '../sider/Side.js';
import Tidslinje from '../components/Tidslinje.js';
import AppSpinner from '../components/AppSpinner.js';
import Feilmelding from '../components/Feilmelding.js';
import { connect } from 'react-redux';

export const TidslinjeSide = (props) => {
    const { brodsmuler, ledetekster, tidspunkter } = props;
    return (<Side tittel="Tidslinjen" brodsmuler={brodsmuler}>
        {
            (() => {
                if (ledetekster.henter) {
                    return <AppSpinner />;
                } else if (ledetekster.hentingFeilet || !ledetekster.data) {
                    return (<Feilmelding />);
                } 
                return <Tidslinje tidspunkter={tidspunkter.data} ledetekster={ledetekster.data} />;
            })()
        }
        </Side>);
};

TidslinjeSide.propTypes = {
    brodsmuler: PropTypes.array,
    ledetekster: PropTypes.object,
    tidspunkter: PropTypes.object,
};

export function mapStateToProps(state) {
    return {
        ledetekster: state.ledetekster,
        tidspunkter: state.informasjon,
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
