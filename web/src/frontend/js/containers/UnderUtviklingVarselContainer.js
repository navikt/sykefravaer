import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/localStorage_actions.js';

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
        return (<div className={'panel typo-infotekst blokk-l under-utvikling-varsel' + (this.state.synlig ? ' er-synlig' : '')}>
            <h2 className="hode hode-informasjon hode-dekorert typo-innholdstittel">Første versjon av ny tjeneste</h2>
            <p>Du er nå kommet til en digital visning av sykmeldingen. Dette er første steget i en
            ny tjeneste vi utvikler. Etter hvert vil du kunne motta og sende informasjon både til arbeidsgiveren din og NAV.</p>
            <p>Hvis du ikke kan se sykmeldingen din, er det fordi vi foreløpig ikke viser alle. Det er avhengig av hvilket system din lege/sykmelder bruker.</p>
            <button className="modal-lukk" onClick={() => { this.props.skjulUnderUtviklingVarsel();}}>Lukk og ikke vis igjen</button>
        </div>);
    }

}

Varsel.propTypes = {
    skjulUnderUtviklingVarsel: PropTypes.function,
};

function mapStateToProps() {
    return {};
}

const UnderUtviklingVarselContainer = connect(mapStateToProps, actionCreators)(Varsel);

export default UnderUtviklingVarselContainer;
