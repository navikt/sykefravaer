/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLedetekst } from '@navikt/digisyfo-npm';

import { Sidetittel, Normaltekst } from 'nav-frontend-typografi';
import { brodsmule as brodsmulePt } from '../propTypes';
import Side from './Side';
import AppSpinner from '../components/AppSpinner';
import Sidetopp from '../components/Sidetopp';
import KoronaSchema from './KoronaComponents/KoronaSchema';

class KoronaContainer extends Component {
    constructor(props) {
        super(props);
        this.isLoading = false;
    }

    componentWillMount() {
        // this.isLoading = true;
        // Do fetching of arbeidsforhold etc.
    }

    render() {
        const { henterLedetekster, brodsmuler } = this.props;
        return (
            <Side tittel="Korona" brodsmuler={brodsmuler} laster={henterLedetekster || this.isLoading}>
                <Sidetittel tag="h1" style={{ marginBottom: '2rem' }}>Registrering av egen sykmelding</Sidetittel>
                <Normaltekst>Her kommer det informasjon om hva som gjelder for denne siden.</Normaltekst>
                <KoronaSchema />
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
                tittel: 'Opprett egen sykmelding',
            },
        ],
    };
};

KoronaContainer.propTypes = {
    henterLedetekster: PropTypes.bool,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
};

export default connect(mapStateToProps)(KoronaContainer);
