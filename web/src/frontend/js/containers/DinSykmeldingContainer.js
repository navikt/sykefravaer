import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/dineSykmeldinger_actions.js';
import SideMedHoyrekolonne from '../sider/SideMedHoyrekolonne.js';
import DinSykmelding from '../components/DinSykmelding.js';
import AppSpinner from '../components/AppSpinner.js';
import Feilmelding from '../components/Feilmelding.js';
import { getLedetekst } from '../ledetekster';

export const DinSykmldSide = (props) => {
    return (<SideMedHoyrekolonne tittel={getLedetekst('din-sykmelding.sidetittel', props.ledetekster.data)} brodsmuler={props.brodsmuler}>
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
                    return (<DinSykmelding
                        sykmelding={props.sykmelding.data}
                        ledetekster={props.ledetekster.data}
                        brukerinfo={props.brukerinfo} />);
                })()
            }
    </SideMedHoyrekolonne>);
};


DinSykmldSide.propTypes = {
    ledetekster: PropTypes.object,
    sykmelding: PropTypes.object,
    brodsmuler: PropTypes.array,
    brukerinfo: PropTypes.object,
};

export function mapStateToProps(state, ownProps) {
    const sykmeldingId = ownProps.params.sykmeldingId;
    const sykmelding = state.dineSykmeldinger.data.filter((sykmld) => {
        return `${sykmld.id}` === `${sykmeldingId}`;
    })[0];

    return {
        sykmelding: {
            data: sykmelding,
            hentingFeilet: state.dineSykmeldinger.hentingFeilet,
            henter: state.dineSykmeldinger.henter,
        },
        brukerinfo: state.brukerinfo.bruker.data,
        ledetekster: state.ledetekster,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel', state.ledetekster.data),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('dine-sykmeldinger.sidetittel', state.ledetekster.data),
            sti: '/sykmeldinger',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('din-sykmelding.sidetittel', state.ledetekster.data),
        }],
        valgtArbeidssituasjon: state.valgtArbeidssituasjon,
    };
}

export const DinSykmeldingContainer = connect(mapStateToProps, Object.assign({}, actionCreators))(DinSykmldSide);
