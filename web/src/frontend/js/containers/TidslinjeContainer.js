import React, { PropTypes, Component } from 'react';
import SideMedHoyrekolonne from '../sider/SideMedHoyrekolonne.js';
import Tidslinje from '../components/Tidslinje.js';
import AppSpinner from '../components/AppSpinner.js';
import Feilmelding from '../components/Feilmelding.js';
import { connect } from 'react-redux';
import { getLedetekst } from '../ledetekster';
import * as actionCreators from '../actions/hendelser_actions.js';

export class TidslinjeSide extends Component {
    componentWillMount() {
        this.props.apneHendelser(this.props.hashMilepaeler);
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
}

TidslinjeSide.propTypes = {
    brodsmuler: PropTypes.array,
    ledetekster: PropTypes.object,
    hendelser: PropTypes.array,
    arbeidssituasjon: PropTypes.string,
    hashMilepaeler: PropTypes.array,
    apneHendelser: PropTypes.func,
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

export function setHash(hendelser) {
    const apneHendelser = hendelser
        .filter((m) => {
            return m.erApen;
        })
        .map((m) => {
            return m.id;
        })
        .join('/');

    window.history.replaceState(null, null, `#${apneHendelser}`);
}

export function mapStateToProps(state, ownProps) {
    let arbeidssituasjonParam = (ownProps && ownProps.params) ? ownProps.params.arbeidssituasjon : undefined;
    arbeidssituasjonParam = mapArbeidssituasjonParam(arbeidssituasjonParam);
    const arbeidssituasjon = arbeidssituasjonParam || state.brukerinfo.innstillinger.arbeidssituasjon || 'MED_ARBEIDSGIVER';
    const hendelser = state.hendelser.data.filter((hendelse) => {
        return hendelse.visning.indexOf(arbeidssituasjon) > -1;
    });

    setHash(hendelser);
    const hashMilepaeler = (ownProps && ownProps.location) ? ownProps.location.hash.replace('#', '').split('/') : [];

    return {
        ledetekster: state.ledetekster,
        arbeidssituasjon,
        hendelser,
        hashMilepaeler,
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
