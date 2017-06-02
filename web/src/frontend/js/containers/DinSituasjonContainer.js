import React, { Component } from 'react';
import NaermesteLedereContainer from './NaermesteLedereContainer';
import { connect } from 'react-redux';
import { toDatePrettyPrint } from 'digisyfo-npm';
import { hentTidslinjer } from '../actions/tidslinjer_actions';

export const mapStateToProps = (state) => {
    let sykefravaerStartdato;
    try {
        sykefravaerStartdato = state.tidslinjer.data[0].startdato;
    } catch (e) {
        sykefravaerStartdato = undefined;
    }
    return {
        sykefravaerStartdato,   
    }
}

const DinSituasjon = ({ sykefravaerStartdato }) => {
    return (<div className="landingspanel">
            <h2 >Din situasjon</h2>
        <p>Sykefraværet startet den {toDatePrettyPrint(sykefravaerStartdato)}</p>
        <NaermesteLedereContainer />
    </div>);
}

class Container extends Component {
    componentWillMount() {
        if (!this.props.sykefravaerStartdato) {
            this.props.hentTidslinjer();
        }
    }

    render() {
        return <DinSituasjon {...this.props} />
    }
}

const DinSituasjonContainer = connect(mapStateToProps, { hentTidslinjer })(Container);

export default DinSituasjonContainer;
