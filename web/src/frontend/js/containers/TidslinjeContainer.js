import React, { PropTypes } from 'react';
import SideMedHoyrekolonne from '../sider/SideMedHoyrekolonne.js';
import Tidslinje from '../components/Tidslinje.js';
import AppSpinner from '../components/AppSpinner.js';
import Feilmelding from '../components/Feilmelding.js';
import { connect } from 'react-redux';

export const TidslinjeSide = (props) => {
    const { brodsmuler, ledetekster, milepaeler, arbeidssituasjon } = props;
    return (<SideMedHoyrekolonne tittel="Tidslinjen" brodsmuler={brodsmuler}>
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
        </SideMedHoyrekolonne>);
};

TidslinjeSide.propTypes = {
    brodsmuler: PropTypes.array,
    ledetekster: PropTypes.object,
    milepaeler: PropTypes.array,
    arbeidssituasjon: PropTypes.string,
};

export function mapStateToProps(state) {
    const arbeidssituasjon = state.brukerinfo.innstillinger.arbeidssituasjon || 'MED_ARBEIDSGIVER';
    const milepaeler = state.milepaeler.data.filter((milepael) => {
        return milepael.visning.indexOf(arbeidssituasjon) > -1;
    });

    return {
        ledetekster: state.ledetekster,
        arbeidssituasjon,
        milepaeler,
        brodsmuler: [{
            tittel: 'Ditt sykefravær',
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: 'Tidslinjen',
        }],
    };
}

const TidslinjeContainer = connect(mapStateToProps)(TidslinjeSide);

export default TidslinjeContainer;
