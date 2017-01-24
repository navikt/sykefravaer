import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../../sider/Side';
import FravaerOgFriskmelding from '../../components/sykepenger/FravaerOgFriskmelding/FravaerOgFriskmelding';

export const Container = (props) => {
    const { brodsmuler } = props;
    return (<Side tittel="Søknad om sykepenger" brodsmuler={brodsmuler}>
        <FravaerOgFriskmelding />
    </Side>);
};

Container.propTypes = {
    brodsmuler: PropTypes.array,
};

export const mapStateToProps = () => {
    return {
        brodsmuler: [{
            tittel: 'Ditt sykefravær',
            sti: '',
            erKlikkbar: false,
        }, {
            tittel: 'Søknad om sykepenger',
            sti: '/sykepenger',
        }],
    };
};

const FravaerOgFriskmeldingContainer = connect(mapStateToProps)(Container);

export default FravaerOgFriskmeldingContainer;
