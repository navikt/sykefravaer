import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AKTIVITETSKRAV_BEKREFTET } from '../../enums/hendelsetyper';
import DetteHarSkjedd from './DetteHarSkjedd';
import { hendelse } from '../../propTypes/index';

export const Container = ({ visDetteHarSkjedd, hendelser }) => {
    return visDetteHarSkjedd
        ? <DetteHarSkjedd hendelser={hendelser} />
        : null;
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
