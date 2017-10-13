import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DinSituasjon from '../../components/landingsside/DinSituasjon';

const Container = ({ visDinSituasjon }) => {
    if (!visDinSituasjon) {
        return null;
    }
    return <DinSituasjon />;
};

Container.propTypes = {
    visDinSituasjon: PropTypes.bool.isRequired,
};

export const mapStateToProps = (state) => {
    return {
        visDinSituasjon: state.ledere.data.length > 0,
    };
};

const DinSituasjonContainer = connect(mapStateToProps)(Container);
export default DinSituasjonContainer;
