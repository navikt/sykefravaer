import React, { PropTypes, Component } from 'react';
import SideMedHoyrekolonne from '../sider/SideMedHoyrekolonne.js';
import Tidslinje from '../components/Tidslinje.js';
import AppSpinner from '../components/AppSpinner.js';
import Feilmelding from '../components/Feilmelding.js';
import { connect } from 'react-redux';
import { getLedetekst } from '../ledetekster';
import * as actionCreators from '../actions/milepaeler_actions.js';

export class TidslinjeSide extends Component {

    componentWillMount() {
        this.props.apneMilepaeler(this.props.hashMilepaeler)
    }

    render() {
        const { brodsmuler, ledetekster } = this.props;
        return (<SideMedHoyrekolonne tittel={getLedetekst('tidslinje.sidetittel', ledetekster.data)} brodsmuler={brodsmuler}>
            {
                (() => {
                    if (ledetekster.henter) {
                        return <AppSpinner />;
                    } else if (ledetekster.hentingFeilet || !ledetekster.data) {
                        return (<Feilmelding />);
                    }
                    return <Tidslinje {...this.props} ledetekster={ledetekster.data} />;
                })()
            }
        </SideMedHoyrekolonne>);
    }
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

export function setHash(milepaeler) {
    const apneMilepaeler = milepaeler
        .filter((m) => {
            return m.erApen;
        })
        .map((m) => {
            return m.id;
        })
        .join("/");

    window.history.pushState(null, null, `#${apneMilepaeler}`);
}

export function mapStateToProps(state, ownProps) {
    let arbeidssituasjonParam = (ownProps && ownProps.params) ? ownProps.params.arbeidssituasjon : undefined;
    arbeidssituasjonParam = mapArbeidssituasjonParam(arbeidssituasjonParam);
    const arbeidssituasjon = arbeidssituasjonParam || state.brukerinfo.innstillinger.arbeidssituasjon || 'MED_ARBEIDSGIVER';
    const milepaeler = state.milepaeler.data.filter((milepael) => {
        return milepael.visning.indexOf(arbeidssituasjon) > -1;
    });

    setHash(milepaeler);
    const hashMilepaeler = (ownProps && ownProps.location) ? ownProps.location.hash.replace("#", "").split("/") : [];

    return {
        ledetekster: state.ledetekster,
        arbeidssituasjon,
        milepaeler,
        hashMilepaeler: hashMilepaeler,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel', state.ledetekster.data),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('tidslinje.sidetittel', state.ledetekster.data),
        }],
    };
}

const TidslinjeContainer = connect(mapStateToProps, actionCreators)(TidslinjeSide);

export default TidslinjeContainer;
