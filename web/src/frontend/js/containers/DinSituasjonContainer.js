import React, { PropTypes } from 'react';
import DinSituasjon from '../components/landingsside/DinSituasjon';
import { connect } from 'react-redux';

let DinSituasjonContainer = ({ visDinSituasjon }) => {
    if (!visDinSituasjon) {
        return null;
    }
    return <DinSituasjon />;
};

DinSituasjonContainer.propTypes = {
    visDinSituasjon: PropTypes.bool.isRequired,
};

export const mapStateToProps = (state) => {
    return {
        visDinSituasjon: state.ledere.data.length > 0,
    };
};

DinSituasjonContainer = connect(mapStateToProps)(DinSituasjonContainer);

export default DinSituasjonContainer;
