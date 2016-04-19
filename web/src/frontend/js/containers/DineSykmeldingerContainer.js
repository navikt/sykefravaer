import React, { PropTypes } from 'react';
import DineSykmeldinger from '../components/DineSykmeldinger.js';
import { connect } from 'react-redux';
import Side from '../sider/Side.js';
import AppSpinner from '../components/AppSpinner.js';
import { getLedetekst } from '../ledetekster';
import Feilmelding from '../components/Feilmelding.js';

const DineSykmldSide = (state) => {
    return (<Side tittel={getLedetekst('dine-sykmeldinger.sidetittel', state.ledetekster.data)} brodsmuler={state.brodsmuler}>
        {
            (() => {
                if (state.sykmeldinger.henter) {
                    return <AppSpinner ledetekster={state.ledetekster.data} />;
                } else if (state.sykmeldinger.hentingFeilet) {
                    return (<Feilmelding tittel="Det oppstod en feil" melding="Vennligst prøv igjen litt senere" />);
                }
                return <DineSykmeldinger sykmeldinger={state.sykmeldinger.data} ledetekster={state.ledetekster.data} />;
            })()
        }
    </Side>);
};

DineSykmldSide.propTypes = {
    router: PropTypes.object,
    props: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
    return {
        sykmeldinger: state.sykmeldinger,
        ledetekster: state.ledetekster, 
        brodsmuler: [{
            tittel: "Dine sykmeldinger",
            sti: "/sykmeldinger"
        }],
    };
}

const DineSykmeldingerContainer = connect(mapStateToProps)(DineSykmldSide);

export default DineSykmeldingerContainer;
