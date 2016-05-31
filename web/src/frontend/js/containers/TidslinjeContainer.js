import React, { PropTypes } from 'react';
import Side from '../sider/Side.js';
import Tidslinje from '../components/Tidslinje.js';
import AppSpinner from '../components/AppSpinner.js';
import Feilmelding from '../components/Feilmelding.js';
import { connect } from 'react-redux';

export const TidslinjeSide = (props) => {
    const { brodsmuler, ledetekster, milepaeler, arbeidssituasjon } = props;
    return (<Side tittel="Tidslinjen" brodsmuler={brodsmuler}>
        {
            (() => {
                if (ledetekster.henter) {
                    return <AppSpinner />;
                } else if (ledetekster.hentingFeilet || !ledetekster.data) {
                    return (<Feilmelding />);
                }
                return <Tidslinje arbeidssituasjon={arbeidssituasjon} milepaeler={milepaeler} ledetekster={ledetekster.data} />;
            })()
        }
        </Side>);
};

TidslinjeSide.propTypes = {
    brodsmuler: PropTypes.array,
    ledetekster: PropTypes.object,
    milepaeler: PropTypes.array,
};

export function mapStateToProps(state) {
    const arbeidssituasjon = state.brukerinfo.data.arbeidssituasjon || 'MED_ARBEIDSGIVER';
    const milepaeler = state.milepaeler.data.filter((milepael) => {
        return milepael.visning.indexOf(arbeidssituasjon) > -1;
    });

    return {
        ledetekster: state.ledetekster,
        arbeidssituasjon,
        milepaeler,
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
