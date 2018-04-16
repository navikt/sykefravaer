import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Survey from '../../components/landingsside/Survey';
import { dagerMellom } from '../../utils/periodeUtils';

export const Container = ({ startdato }) => {
    return startdato && dagerMellom(startdato, new Date()) > 14
        ? <Survey />
        : null;
};

Container.propTypes = {
    startdato: PropTypes.instanceOf(Date),
};

export const mapStateToProps = (state) => {
    const startdato = state.sykeforloep.startdato;
    return {
        startdato,
    };
};

const SurveyContainer = connect(mapStateToProps)(Container);
export default SurveyContainer;
