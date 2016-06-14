import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/dineSykmeldinger_actions';
import SideMedHoyrekolonne from '../sider/SideMedHoyrekolonne';
import DinSykmelding from '../components/DinSykmelding';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import { getLedetekst } from '../ledetekster/index';
import { hentArbeidsforhold } from '../actions/dinSykmelding_actions';


export class DinSykmeldingPage extends Component {

    componentWillMount() {
        const { dispatch, params } = this.props;
        dispatch(hentArbeidsforhold(params.sykmeldingId));
    }

    render() {
        const { brodsmuler, ledetekster, sykmelding, brukerinfo, arbeidsforhold } = this.props;
        return (

            <SideMedHoyrekolonne tittel={getLedetekst('din-sykmelding.sidetittel', ledetekster.data)}
                                 brodsmuler={brodsmuler}>
                { (() => {
                    if (sykmelding.henter) {
                        return <AppSpinner ledetekster={ledetekster.data}/>;
                    } else if (sykmelding.hentingFeilet) {
                        return (<Feilmelding />);
                    } else if (!sykmelding.data) {
                        return (<Feilmelding
                            tittel={getLedetekst('sykmelding.vis.fant-ikke-sykmelding.tittel', ledetekster.data)}
                            melding={getLedetekst('sykmelding.vis.fant-ikke-sykmelding.melding', ledetekster.data)}/>);
                    }
                    return (<DinSykmelding
                        sykmelding={sykmelding.data}
                        ledetekster={ledetekster.data}
                        arbeidsforhold={arbeidsforhold}
                        brukerinfo={brukerinfo}/>);
                })()
                }
            </SideMedHoyrekolonne>);
    }
}

DinSykmeldingPage.propTypes = {
    dispatch: PropTypes.func,
    ledetekster: PropTypes.object,
    sykmelding: PropTypes.object,
    brodsmuler: PropTypes.array,
    arbeidsforhold: PropTypes.array,
    brukerinfo: PropTypes.object
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
            henter: state.dineSykmeldinger.henter
        },
        brukerinfo: state.brukerinfo.bruker.data,
        ledetekster: state.ledetekster,
        arbeidsforhold: state.arbeidsforhold.data,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel', state.ledetekster.data),
            sti: '/',
            erKlikkbar: true
        }, {
            tittel: getLedetekst('dine-sykmeldinger.sidetittel', state.ledetekster.data),
            sti: '/sykmeldinger',
            erKlikkbar: true
        }, {
            tittel: getLedetekst('din-sykmelding.sidetittel', state.ledetekster.data)
        }],
        valgtArbeidssituasjon: state.valgtArbeidssituasjon
    };
}

export const DinSykmeldingContainer = connect(mapStateToProps)(DinSykmeldingPage);
