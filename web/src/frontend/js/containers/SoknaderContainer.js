import React, { PropTypes, Component } from 'react';
import Soknader from '../components/soknader/Soknader';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import { getLedetekst } from 'digisyfo-npm';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import { hentSykepengesoknader } from '../actions/sykepengesoknader_actions';

export class SoknaderSide extends Component {

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(hentSykepengesoknader());
    }

    render() {
        const { ledetekster, brodsmuler, henter, hentingFeilet, sykepengesoknader } = this.props;
        return (
            <Side tittel={getLedetekst('soknader.sidetittel', ledetekster)} brodsmuler={brodsmuler}>
                {
                    (() => {
                        if (henter) {
                            return <AppSpinner />;
                        }
                        if (hentingFeilet) {
                            return <Feilmelding />;
                        }
                        return (<Soknader ledetekster={ledetekster} soknader={sykepengesoknader} />);
                    })()
                }
            </Side>
        );
    }
}

SoknaderSide.propTypes = {
    ledetekster: PropTypes.object,
    brodsmuler: PropTypes.array,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    sykepengesoknader: PropTypes.array,
    dispatch: PropTypes.func.isRequired,
};

export function mapStateToProps(state) {
    const ledetekster = state.ledetekster.data;
    const sykepengesoknader = state.sykepengesoknader.data;
    return {
        ledetekster,
        sykepengesoknader,
        henter: state.ledetekster.henter || state.sykepengesoknader.henter,
        hentingFeilet: state.ledetekster.hentingFeilet || state.sykepengesoknader.hentingFeilet,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel', ledetekster),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('soknader.sidetittel', ledetekster),
        }],
    };
}

const SoknaderContainer = connect(mapStateToProps)(SoknaderSide);

export default SoknaderContainer;
