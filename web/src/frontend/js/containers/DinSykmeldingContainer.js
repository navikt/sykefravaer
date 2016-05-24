import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/sykmeldinger_actions.js';
import SideMedHoyrekolonne from '../sider/SideMedHoyrekolonne.js';
import DinSykmelding from '../components/DinSykmelding.js';
import AppSpinner from '../components/AppSpinner.js';
import Feilmelding from '../components/Feilmelding.js';
import { getLedetekst } from '../ledetekster';

export const DinSykmldSide = (props) => {
    return (<SideMedHoyrekolonne tittel={getLedetekst('sykmelding.vis.sidetittel', props.ledetekster.data)} brodsmuler={props.brodsmuler}>
            {
                (() => {
                    if (props.sykmelding.henter) {
                        return <AppSpinner ledetekster={props.ledetekster.data} />;
                    } else if (props.sykmelding.hentingFeilet) {
                        return (<Feilmelding />);
                    } else if (!props.sykmelding.data) {
                        return (<Feilmelding
                            tittel={getLedetekst('sykmelding.vis.fant-ikke-sykmelding.tittel', props.ledetekster.data)}
                            melding={getLedetekst('sykmelding.vis.fant-ikke-sykmelding.melding', props.ledetekster.data)} />);
                    }
                    return <DinSykmelding sykmelding={props.sykmelding.data} ledetekster={props.ledetekster.data} />;
                })()
            }
    </SideMedHoyrekolonne>);
};

DinSykmldSide.propTypes = {
    sykmelding: PropTypes.object,
};

export function mapStateToProps(state, ownProps) {
    const sykmeldingId = ownProps.params.sykmeldingId;
    const sykmelding = state.sykmeldinger.data.filter((sykmld) => {
        return (sykmld.id + '') === (sykmeldingId + '');
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

export const DinSykmeldingContainer = connect(mapStateToProps, actionCreators)(DinSykmldSide);
