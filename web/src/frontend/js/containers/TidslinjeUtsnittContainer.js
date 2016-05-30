import React, { PropTypes } from 'react';
import TidslinjeUtsnitt from '../components/TidslinjeUtsnitt.js';
import { connect } from 'react-redux';

export const TidzlinjeUtsnitt = (props) => {
    const { ledetekster, milepaeler } = props;
    return (<TidslinjeUtsnitt milepaeler={milepaeler.data} ledetekster={ledetekster.data}/>);
};

TidzlinjeUtsnitt.propTypes = {
    ledetekster: PropTypes.object,
    milepaeler: PropTypes.array,
};

export function mapStateToProps(state) {
    return {
        ledetekster: state.ledetekster,
        milepaeler: state.milepaeler,
    };
}

const TidslinjeUtsnittContainer = connect(mapStateToProps)(TidzlinjeUtsnitt);

export default TidslinjeUtsnittContainer;
