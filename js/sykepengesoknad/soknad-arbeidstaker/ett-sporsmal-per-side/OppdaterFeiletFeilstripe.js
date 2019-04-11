import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Feilstripe from '../../../components/Feilstripe';

const Stripe = ({ oppdaterFeilet }) => {
    return (<Feilstripe
        className="press"
        type="advarsel"
        vis={oppdaterFeilet}>Oi, der skjedde det en feil. Prøv igjen!</Feilstripe>);
};

Stripe.propTypes = {
    oppdaterFeilet: PropTypes.bool,
};

const mapStateToProps = (state) => {
    return {
        oppdaterFeilet: state.soknader.oppdaterFeilet,
    };
};

const OppdaterFeiletFeilstripe = connect(mapStateToProps)(Stripe);

export default OppdaterFeiletFeilstripe;
