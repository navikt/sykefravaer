/* eslint-disable class-methods-use-this */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLedetekst, post as syforestPost } from '@navikt/digisyfo-npm';

import { brodsmule as brodsmulePt } from '../propTypes';
import Side from './Side';
import KoronaSchema from './KoronaComponents/KoronaSchema';
import { hentEgenmeldtSmApiUrl, hentEgenmeldtSmCacheInvalidateApiUrl } from './KoronaComponents/koronaUtils';
import { get, post } from '../data/gateway-api/gatewayApi';

const KVITTERING_ERROR = true;
const FORM_ERROR = false;

const ERROR_CODES = {
    TOM_ER_FOR_FOM: FORM_ERROR,
    FOR_LANG_PERIODE: FORM_ERROR,
    FOM_BEFORE_VALID_DATE: FORM_ERROR,
    OVERLAPPER_MED_ANDRE_SYKMELDINGSPERIODER: FORM_ERROR,
    HAR_ALLEREDE_EGENMELDT_SYKMELDING: FORM_ERROR,
    PERSON_NOT_FOUND: KVITTERING_ERROR,
    AKTOR_NOT_FOUND: KVITTERING_ERROR,
    FORBIDDEN: KVITTERING_ERROR,
};

class KoronaContainer extends Component {
    constructor(props) {
        super(props);
        this.opprettSykmelding = this.opprettSykmelding.bind(this);
        this.state = {
            isLoading: false,
            error: undefined,
            isSent: false,
            arbeidsgivere: [],
            formError: undefined,
            kvitteringError: undefined,
            submitSuccess: undefined,
        };
    }

    componentWillMount() {
        this.setState({ isLoading: true });
        const URL = `${hentEgenmeldtSmApiUrl()}/api/v1/arbeidsforhold`;
        get(URL)
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
        const INVALIDATE_URL = `${hentEgenmeldtSmCacheInvalidateApiUrl()}/sykmeldinger/invaliderSesjon`;
        const URL = `${hentEgenmeldtSmApiUrl()}/api/v1/sykmelding/egenmeldt/formerror`;
        post(URL, { periode, arbeidsforhold: [] })
            .then((res) => {
                if (res.errorCode) {
                    const errorType = ERROR_CODES[res.errorCode];
                    if (errorType === undefined) {
                        this.setState({
                            isLoading: false,
                            error: 'Feil under innsending av egenmelding',
                        });
                    }

                    if (errorType === KVITTERING_ERROR) {
                        this.setState({
                            isLoading: false,
                            kvitteringError: res.description,
                        });
                    }

                    if (errorType === FORM_ERROR) {
                        this.setState({
                            isLoading: false,
                            formError: res.description,
                        });
                    }
                } else {
                    // show success kvittering
                    syforestPost(INVALIDATE_URL);
                    this.setState({
                        isLoading: false,
                        submitSuccess: true,
                    });
                }
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    error: 'Feil under innsending av egenmelding',
                });
            });
    }

    render() {
        const { henterLedetekster, brodsmuler, kvitteringErrorBrodsmuler, suksessBrodsmuler } = this.props;
        const { formError, kvitteringError, submitSuccess, error } = this.state;

        if (error) {
            return (
                <Side
                    tittel="Opprett egenmelding"
                    brodsmuler={brodsmuler}
                    laster={henterLedetekster || this.state.isLoading}
                >
                    <p>{error}</p>
                </Side>
            );
        }

        if (kvitteringError) {
            return (
                <Side
                    tittel="Egenmeldingen ble ikke opprettet"
                    brodsmuler={kvitteringErrorBrodsmuler}
                    laster={henterLedetekster || this.state.isLoading}
                >
                    <p>feilkvittering</p>
                </Side>
            );
        }

        if (submitSuccess) {
            return (
                <Side
                    tittel="Egenmelding opprettes"
                    brodsmuler={suksessBrodsmuler}
                    laster={henterLedetekster || this.state.isLoading}
                >
                    <p>suksesskvittering</p>
                </Side>
            );
        }

        return (
            <Side
                tittel="Opprett egenmelding"
                brodsmuler={brodsmuler}
                laster={henterLedetekster || this.state.isLoading}
            >
                <KoronaSchema
                    opprettSykmelding={this.opprettSykmelding}
                    key={this.state.arbeidsgivere}
                    formError={formError}
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
                tittel: 'Opprett egenmelding',
            },
        ],
        suksessBrodsmuler: [
            {
                tittel: getLedetekst('landingsside.sidetittel'),
                sti: '/',
                erKlikkbar: true,
            },
            {
                tittel: 'Opprett egenmelding',
                sti: '/egensykmelding',
                erKlikkbar: true,
            },
            {
                tittel: 'Egenmeldingen opprettes',
            },
        ],
        kvitteringErrorBrodsmuler: [
            {
                tittel: getLedetekst('landingsside.sidetittel'),
                sti: '/',
                erKlikkbar: true,
            },
            {
                tittel: 'Opprett egenmelding',
                sti: '/egensykmelding',
                erKlikkbar: true,
            },
            {
                tittel: 'Egenmeldingen ble ikke opprettet',
            },
        ],
    };
};

KoronaContainer.propTypes = {
    henterLedetekster: PropTypes.bool,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    kvitteringErrorBrodsmuler: PropTypes.arrayOf(brodsmulePt),
    suksessBrodsmuler: PropTypes.arrayOf(brodsmulePt),
};

export default connect(mapStateToProps)(KoronaContainer);
