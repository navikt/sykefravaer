import React, { PropTypes, Component } from 'react';
import Landingsside from '../components/Landingsside.js';
import { connect } from 'react-redux';
import Side from '../sider/Side.js';
import { getLedetekst } from '../ledetekster';

export class LandingssideSide extends Component {
    componentDidMount() {
        // Retter IE-feil som gjør at fokus settes på feil lenke når man klikker tilbake
        document.body.focus();
    }

    render() {
        const { ledetekster, brodsmuler, skjulVarsel } = this.props;
        return (<Side tittel={getLedetekst('landingsside.sidetittel', ledetekster.data)} brodsmuler={brodsmuler}>
                <Landingsside skjulVarsel={skjulVarsel} ledetekster={ledetekster.data} />
            </Side>);
    }
}

LandingssideSide.propTypes = {
    ledetekster: PropTypes.object,
    brodsmuler: PropTypes.array,
    skjulVarsel: PropTypes.bool,
};

export function mapStateToProps(state) {
    return {
        ledetekster: state.ledetekster,
        skjulVarsel: (state.brukerinfo && state.brukerinfo.innstillinger) ? (state.brukerinfo.innstillinger.skjulUnderUtviklingVarsel === true) : false,
        brodsmuler: [{
            tittel: 'Ditt sykefravær',
            sti: '/',
        }],
    };
}

const LandingssideContainer = connect(mapStateToProps)(LandingssideSide);

export default LandingssideContainer;
