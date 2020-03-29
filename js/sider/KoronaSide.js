/* eslint-disable class-methods-use-this */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLedetekst } from '@navikt/digisyfo-npm';

import { brodsmule as brodsmulePt } from '../propTypes';
import Side from './Side';
import KoronaSchema from './KoronaComponents/KoronaSchema';
import { hentSendingURL } from './KoronaComponents/koronaUtils';
import { post } from '../data/gateway-api/gatewayApi';
import history from '../history';

class KoronaContainer extends Component {
    constructor(props) {
        super(props);
        this.opprettSykmelding = this.opprettSykmelding.bind(this);
        this.state = {
            isLoading: false,
            error: undefined,
            isSent: false,
            arbeidsgivere: [],
        };
    }

    componentWillMount() {
        this.setState({ isLoading: true });
        fetch(`${process.env.REACT_APP_SYFOREST_ROOT}/informasjon/arbeidsgivere`)
            .then((res) => {
                return res.json();
            })
            .then((arbeidsgivere) => {
                this.setState({ arbeidsgivere, isLoading: false });
            })
            .catch((error) => {
                this.setState({
                    error: 'Feil under henting av arbeidsgivere',
                    isLoading: false,
                });
            });
    }

    opprettSykmelding(periode) {
        this.setState({ isLoading: true });
        const URL = `${hentSendingURL()}/sykmelding/egenmeldt`;
        post(URL, { periode, arbeidsforhold: [] })
            .then((res) => {
                history.push('/sykefravaer/egensykmelding/kvittering');
            })
            .catch((error) => {
                this.setState({ isLoading: false, error: 'Feil under innsending av egenmelding' });
            });
    }

    render() {
        const { henterLedetekster, brodsmuler } = this.props;

        if (this.state.error) {
            return (
                <Side
                    tittel="16-dagers koronamelding"
                    brodsmuler={brodsmuler}
                    laster={henterLedetekster || this.state.isLoading}
                >
                    <p>{this.state.error}</p>
                </Side>
            );
        }

        return (
            <Side
                tittel="16-dagers koronamelding"
                brodsmuler={brodsmuler}
                laster={henterLedetekster || this.state.isLoading}
            >
                <KoronaSchema
                    opprettSykmelding={this.opprettSykmelding}
                    key={this.state.arbeidsgivere}
                />
            </Side>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        henterLedetekster: state.ledetekster.henter,
        brodsmuler: [
            {
                tittel: getLedetekst('landingsside.sidetittel'),
                sti: '/',
                erKlikkbar: true,
            },
            {
                tittel: '16-dagers koronamelding',
            },
        ],
    };
};

KoronaContainer.propTypes = {
    henterLedetekster: PropTypes.bool,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
};

export default connect(mapStateToProps)(KoronaContainer);
