import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/sykmeldinger_actions.js';
import Side from '../sider/Side.js';
import DinSykmelding from '../components/DinSykmelding.js';
import AppSpinner from '../components/AppSpinner.js';
import Feilmelding from '../components/Feilmelding.js';
import { getLedetekst } from '../ledetekster';

const Controller = (state) => {
    return (<Side tittel={getLedetekst('sykmelding.vis.sidetittel', state.ledetekster.data)} brodsmuler={state.brodsmuler}>
            {
                (() => {
                    if (state.sykmelding.henter) {
                        return <AppSpinner ledetekster={state.ledetekster.data} />;
                    } else if (state.sykmelding.hentingFeilet) {
                        return (<Feilmelding tittel="Det oppstod en feil" melding="Vennligst prøv igjen litt senere" />);
                    }
                    return <DinSykmelding sykmelding={state.sykmelding.data} ledetekster={state.ledetekster.data} />;
                })()
            }
    </Side>);
};

Controller.propTypes = {
    sykmelding: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
    const sykmelding = state.sykmeldinger.data.filter((sykmld) => {
        return sykmld.id === Number(ownProps.params.sykmeldingId);
    })[0];

    return {
        sykmelding: {
            data: sykmelding,
            hentingFeilet: state.sykmeldinger.hentingFeilet,
            henter: state.sykmeldinger.henter,
        },
        ledetekster: state.ledetekster,
        brodsmuler: [{
            tittel: 'Dine sykmeldinger',
            sti: '/sykmeldinger',
            erKlikkbar: true,
        }, {
            tittel: 'Sykmelding',
        }],
    };
}

export const DinSykmeldingContainer = connect(mapStateToProps, actionCreators)(Controller);
