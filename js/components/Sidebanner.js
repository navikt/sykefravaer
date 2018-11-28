import React from 'react';
import { getLedetekst } from 'digisyfo-npm';
import PropTypes from 'prop-types';
import { brodsmule as brodsmulePt } from '../propTypes';
import Brodsmuler from './Brodsmuler';

const Sidebanner = ({ brodsmuler }) => {
    return (<div className="sidebanner">
        <div className="sidebanner__innhold">
            <Brodsmuler brodsmuler={brodsmuler} />
            <h1 className="js-sidetittel sidebanner__tittel">{getLedetekst('landingsside.sidetittel')}</h1>
            <img className="sidebanner__illustrasjon" src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/landingsside/konsultasjon.svg`} alt="Konsultasjon" />
        </div>
    </div>);
};

Sidebanner.propTypes = {
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
};

export default Sidebanner;
