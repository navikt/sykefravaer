import React, { PropTypes, Component } from 'react';
import SideMedHoyrekolonne from '../sider/SideMedHoyrekolonne.js';
import Tidslinje from '../components/Tidslinje.js';
import AppSpinner from '../components/AppSpinner.js';
import Feilmelding from '../components/Feilmelding.js';
import { connect } from 'react-redux';
import { getLedetekst } from '../ledetekster';
import { hentSykeforloep } from '../actions/sykeforloep_actions.js';
import { apneHendelser, setHendelseData, setHendelser } from '../actions/hendelser_actions.js';
import hendelserData from '../hendelserData';

export class TidslinjeSide extends Component {

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(setHendelser(hendelserData));
        dispatch(hentSykeforloep());
    }

    componentDidMount() {
        const { dispatch, hashHendelser } = this.props;
        dispatch(apneHendelser(hashHendelser));
    }

    setHendelseData(id, data) {
        const { dispatch } = this.props;
        dispatch(setHendelseData(id, data));
    }

    render() {
        const { brodsmuler, ledetekster, hendelser, arbeidssituasjon, sykeforloep } = this.props;
        return (<SideMedHoyrekolonne tittel={getLedetekst('tidslinje.sidetittel', ledetekster.data)} brodsmuler={brodsmuler}>
            {
                (() => {
                    if (ledetekster.henter || sykeforloep.henter) {
                        return <AppSpinner />;
                    } else if (ledetekster.hentingFeilet || !ledetekster.data) {
                        return (<Feilmelding />);
                    }
                    return (<Tidslinje
                        hendelser={hendelser}
                        ledetekster={ledetekster.data}
                        arbeidssituasjon={arbeidssituasjon}
                        setHendelseData={(id, data) => {
                            this.setHendelseData(id, data);
                        }} />);
                })()
            }
        </SideMedHoyrekolonne>);
    }
}

TidslinjeSide.propTypes = {
    dispatch: PropTypes.func,
    brodsmuler: PropTypes.array,
    ledetekster: PropTypes.object,
    hendelser: PropTypes.array,
    arbeidssituasjon: PropTypes.string,
    hashMilepaeler: PropTypes.array,
    apneHendelser: PropTypes.func,
    hashHendelser: PropTypes.array,
    sykeforloep: PropTypes.object,
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
    const _apneHendelser = hendelser
        .filter((m) => {
            return m.erApen;
        })
        .map((m) => {
            return m.id;
        })
        .join('/');

    window.history.replaceState(null, null, `#${_apneHendelser}`);
}

export function mapStateToProps(state, ownProps) {
    let arbeidssituasjonParam = (ownProps && ownProps.params) ? ownProps.params.arbeidssituasjon : undefined;
    arbeidssituasjonParam = mapArbeidssituasjonParam(arbeidssituasjonParam);
    const arbeidssituasjon = arbeidssituasjonParam || state.brukerinfo.innstillinger.arbeidssituasjon || 'MED_ARBEIDSGIVER';
    const hendelser = state.hendelser.data.filter((hendelse) => {
        return hendelse.visning.indexOf(arbeidssituasjon) > -1;
    });
    hendelser.sort((a, b) => {
        return a.dagerEtterStart - b.dagerEtterStart;
    });

    setHash(hendelser);
    const hashHendelser = (ownProps && ownProps.location) ? ownProps.location.hash.replace('#', '').split('/') : [];

    return {
        ledetekster: state.ledetekster,
        arbeidssituasjon,
        hendelser,
        hashHendelser,
        sykeforloep: state.sykeforloep,
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
