import React, { PropTypes } from 'react';
import Artikkel from '../components/Artikkel';
import Side from '../sider/Side';
import AppSpinner from '../components/AppSpinner';
import { connect } from 'react-redux';
import { Feilmelding } from '../components/Feilmelding';
import { getLedetekst } from '../ledetekster';

export const RollerSide = ({ ledetekster, brodsmuler }) => {
    return (<Side brodsmuler={brodsmuler} tittel={getLedetekst('roller.sidetittel', ledetekster.data)}>
        {
            (() => {
                if (ledetekster.henter) {
                    return <AppSpinner />;
                } else if (ledetekster.hentingFeilet) {
                    return <Feilmelding />;
                }
                return (<Artikkel tittel={getLedetekst('roller.tittel', ledetekster.data)}
                    innhold={getLedetekst('roller.innhold', ledetekster.data)} />);
            })()
        }
    </Side>);
};

RollerSide.propTypes = {
    ledetekster: PropTypes.object,
    brodsmuler: PropTypes.array,
};

export function mapStateToProps(state) {
    return {
        ledetekster: state.ledetekster,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel', state.ledetekster.data),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('roller.sidetittel', state.ledetekster.data),
        }],
    };
}

const RollerContainer = connect(mapStateToProps)(RollerSide);

export default RollerContainer;
