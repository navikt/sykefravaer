import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../../sider/Side';
import FoerDuBegynner from '../../components/sykepengesoknad/FoerDuBegynner/FoerDuBegynner';

export const Container = (props) => {
    const { brodsmuler } = props;
    return (<Side tittel="Søknad om sykepenger" brodsmuler={brodsmuler}>
        <FoerDuBegynner />
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

const SoknadContainer = connect(mapStateToProps)(Container);

export default SoknadContainer;
