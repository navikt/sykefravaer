import React, { PropTypes } from 'react';
import DineSykmeldinger from '../components/DineSykmeldinger.js';
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
                const sykmldngr = props.sykmeldinger.data.sort((a, b) => {
                    if (props.sykmeldinger.sortering === 'arbeidsgiver') {
                        return a.arbeidsgiver > b.arbeidsgiver ? 1 : -1;
                    }
                    const sorteringskriterum = a.perioder[0].fom !== b.perioder[0].fom ? 'fom' : 'tom';
                    return a.perioder[0][sorteringskriterum] > b.perioder[0][sorteringskriterum] ? 1 : -1;
                });
                return <DineSykmeldinger sykmeldinger={sykmldngr} ledetekster={props.ledetekster.data} />;
            })()
        }
    </Side>);
};

DineSykmldSide.propTypes = {
    props: PropTypes.object,
    ledetekster: PropTypes.object,
    brodsmuler: PropTypes.array,
    sykmeldinger: PropTypes.object,
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

const DineSykmeldingerContainer = connect(mapStateToProps)(DineSykmldSide);

export default DineSykmeldingerContainer;
