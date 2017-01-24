import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../../sider/Side';
import Oppsummering from '../../components/sykepenger/Oppsummering/Oppsummering';
import { sykmelding } from '../../mockdata';

export const Container = (props) => {
    const { brodsmuler, soknad } = props;
    return (<Side tittel="Søknad om sykepenger" brodsmuler={brodsmuler}>
        <Oppsummering soknad={soknad} />
    </Side>);
};

Container.propTypes = {
    brodsmuler: PropTypes.array,
    soknad: PropTypes.object,
};

const getSoknad = (state) => {
    return state && state.form && state.form.sykepengerSkjema && state.form.sykepengerSkjema.values || {};
};

export const mapStateToProps = (state) => {
    return {
        brodsmuler: [{
            tittel: 'Ditt sykefravær',
            sti: '',
            erKlikkbar: false,
        }, {
            tittel: 'Søknad om sykepenger',
            sti: '/sykepenger',
        }],
        sykmelding,
        soknad: getSoknad(state),
    };
};

const OppsummeringContainer = connect(mapStateToProps)(Container);

export default OppsummeringContainer;
