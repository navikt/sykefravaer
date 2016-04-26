import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/localStorage_actions.js';

const UnderUtviklingVarsel = (props) => {
    console.log(props.navn);
    return (<div className="panel">
        <p>Dette er under utvikling!</p>
        <div className="knapperad">
                <button className="knapp knapp-liten" onClick={(event) => {props.skjulUnderUtviklingVarsel();}}>Ikke vis denne igjen</button>
        </div>
    </div>);
};

function mapStateToProps(state) {
    return {
        navn: state.localStorage.skjulFiskebolle ? "TRUE" : "FALSE",
    };
}

const UnderUtviklingVarselContainer = connect(mapStateToProps, actionCreators)(UnderUtviklingVarsel);

export default UnderUtviklingVarselContainer;
