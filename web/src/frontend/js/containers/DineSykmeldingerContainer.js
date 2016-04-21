import React, { PropTypes } from 'react';
import DineSykmeldinger from '../components/DineSykmeldinger.js';
import * as actionCreators from '../actions/sykmeldinger_actions.js';
import { connect } from 'react-redux';
import Side from '../sider/Side.js';
import AppSpinner from '../components/AppSpinner.js';
import { getLedetekst } from '../ledetekster';
import Feilmelding from '../components/Feilmelding.js';

const DineSykmldSide = (props) => {
    return (<Side tittel={getLedetekst('dine-sykmeldinger.sidetittel', props.ledetekster.data)} brodsmuler={props.brodsmuler}>
        {
            (() => {
                if (props.sykmeldinger.henter) {
                    return <AppSpinner ledetekster={props.ledetekster.data} />;
                } else if (props.sykmeldinger.hentingFeilet) {
                    return (<Feilmelding tittel="Det oppstod en feil" melding="Vennligst prøv igjen litt senere" />);
                }
                const sykmld = props.sykmeldinger.data.sort(function(a, b) {
                    if(props.sykmeldinger.sortering === "arbeidsgiver") {
                        return a.arbeidsgiver > b.arbeidsgiver;
                    }
                    return a.fom === b.fom ? (a.tom < b.tom) : a.fom < b.fom;
                })
                return <DineSykmeldinger sykmeldinger={props.sykmeldinger.data} ledetekster={props.ledetekster.data} onSorteringChange={props.sorterSykmeldinger} />;
            })()
        }
    </Side>);
};

DineSykmldSide.propTypes = {
    router: PropTypes.object,
    props: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        sykmeldinger: state.sykmeldinger,
        ledetekster: state.ledetekster,
        brodsmuler: [{
            tittel: 'Dine sykmeldinger',
            sti: '/sykmeldinger',
        }],
    };
}

const DineSykmeldingerContainer = connect(mapStateToProps, actionCreators)(DineSykmldSide);

export default DineSykmeldingerContainer;
