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
import KoronaKvittering from './KoronaComponents/KoronaKvittering';
import { hentSendingURL } from './KoronaComponents/koronaUtils';

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

    opprettSykmelding(sykmelding) {
        this.setState({ isLoading: true });
        const URL = `${hentSendingURL()}/sykmelding/egenmeldt`;
        fetch(URL, {
            method: 'POST',
            body: JSON.stringify(sykmelding),
        })
            .then((res) => {
                this.setState({ isLoading: false, isSent: true });
            })
            .catch((error) => {
                this.setState({ isLoading: false, error: 'Feil under innsending av egenmelding' });
            });
    }

    render() {
        const { henterLedetekster, brodsmuler } = this.props;
        return (
            <Side
                tittel="Korona"
                brodsmuler={brodsmuler}
                laster={henterLedetekster || this.state.isLoading}
            >
                {(() => {
                    if (this.state.error) {
                        return <p>{this.state.error}</p>;
                    }
                    if (this.state.isSent) {
                        return <KoronaKvittering />;
                    }
                    return (
                        <KoronaSchema
                            opprettSykmelding={this.opprettSykmelding}
                            key={this.state.arbeidsgivere}
                            arbeidsgivere={this.state.arbeidsgivere}
                        />
                    );
                })()}
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
                tittel: '14-dagers egenmelding',
            },
        ],
    };
};

KoronaContainer.propTypes = {
    henterLedetekster: PropTypes.bool,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
};

export default connect(mapStateToProps)(KoronaContainer);
