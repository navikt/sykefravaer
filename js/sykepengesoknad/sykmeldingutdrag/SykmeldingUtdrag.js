import React from 'react';
import { connect } from 'react-redux';

const Utdrag = ({ sykmelding, soknad }) => {
    return <p>Sykmeldingutdrag</p>;
};

const mapStateToProps = (state, ownProps) => {
    return {};
};

const SykmeldingUtdrag = connect(mapStateToProps)(Utdrag);

export default SykmeldingUtdrag;
