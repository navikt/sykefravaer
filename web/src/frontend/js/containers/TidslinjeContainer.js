import React, { PropTypes } from 'react';
import SideMedHoyrekolonne from '../sider/SideMedHoyrekolonne.js';
import Tidslinje from '../components/Tidslinje.js';
import AppSpinner from '../components/AppSpinner.js';
import Feilmelding from '../components/Feilmelding.js';
import { connect } from 'react-redux';
import { getLedetekst } from '../ledetekster';

export const TidslinjeSide = (props) => {
    const { brodsmuler, ledetekster, milepaeler, arbeidssituasjon } = props;
    return (<SideMedHoyrekolonne tittel={getLedetekst('tidslinje.sidetittel', ledetekster.data)} brodsmuler={brodsmuler}>
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

export const mapArbeidssituasjonParam = (param) => {
    switch (param) {
        case 'uten-arbeidsgiver': {
            return 'UTEN_ARBEIDSGIVER';
        }
        case 'med-arbeidsgiver': {
            return 'MED_ARBEIDSGIVER';
        }
        case undefined: {
            return undefined;
        }
        default: {
            return 'MED_ARBEIDSGIVER';
        }
    }
};

export function mapStateToProps(state, ownProps) {
    let arbeidssituasjonParam = ownProps ? ownProps.params.arbeidssituasjon : undefined;
    arbeidssituasjonParam = mapArbeidssituasjonParam(arbeidssituasjonParam);
    const arbeidssituasjon = arbeidssituasjonParam || state.brukerinfo.innstillinger.arbeidssituasjon || 'MED_ARBEIDSGIVER';
    const milepaeler = state.milepaeler.data.filter((milepael) => {
        return milepael.visning.indexOf(arbeidssituasjon) > -1;
    });

    return {
        ledetekster: state.ledetekster,
        arbeidssituasjon,
        milepaeler,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel', state.ledetekster.data),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('tidslinje.sidetittel', state.ledetekster.data),
        }],
    };
}

const TidslinjeContainer = connect(mapStateToProps)(TidslinjeSide);

export default TidslinjeContainer;
