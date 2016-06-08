import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/brukerinfo_actions.js';
import { getLedetekst } from '../ledetekster';

export class Varsel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            synlig: false,
        };
        const that = this;
        window.setTimeout(() => {
            that.setState({
                synlig: true,
            });
        }, 200);
    }

    render() {
        return (<div className={`panel typo-infotekst blokk-l under-utvikling-varsel ${(this.state.synlig ? 'er-synlig' : '')}`}>
            <p className="varselstripe varselstripe--under-utvikling">{getLedetekst('under-utvikling.varsel.tekst', this.props.ledetekster)}</p>
            <button className="modal-lukk" onClick={() => { this.props.skjulUnderUtviklingVarsel();}}>{getLedetekst('under-utvikling.varsel.lukk', this.props.ledetekster)}</button>
        </div>);
    }

}

Varsel.propTypes = {
    skjulUnderUtviklingVarsel: PropTypes.func,
    ledetekster: PropTypes.object,
};

function mapStateToProps() {
    return {};
}

const UnderUtviklingVarselContainer = connect(mapStateToProps, actionCreators)(Varsel);

export default UnderUtviklingVarselContainer;
