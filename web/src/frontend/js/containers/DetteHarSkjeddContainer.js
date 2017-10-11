import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AKTIVITETSKRAV_BEKREFTET } from '../enums/hendelsetyper';
import DetteHarSkjedd from '../components/landingsside/DetteHarSkjedd';
import { hendelse } from '../propTypes';

export const Container = ({ visDetteHarSkjedd, hendelser }) => {
    if (!visDetteHarSkjedd) {
        return null;
    }
    return <DetteHarSkjedd hendelser={hendelser} />;
};

Container.propTypes = {
    visDetteHarSkjedd: PropTypes.bool,
    hendelser: PropTypes.arrayOf(hendelse),
};

export const mapStateToProps = (state) => {
    const hendelser = state.hendelser.data.filter((h) => {
        return h.type === AKTIVITETSKRAV_BEKREFTET;
    });
    return {
        hendelser,
        visDetteHarSkjedd: hendelser.length > 0,
    };
};

const DetteHarSkjeddContainer = connect(mapStateToProps)(Container);

export default DetteHarSkjeddContainer;
