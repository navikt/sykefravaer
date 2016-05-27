import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { getLedetekst, getHtmlLedetekst } from '../ledetekster';
import * as actionCreators from '../actions/brukerinfo_actions.js';

export class Varsel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            synlig: false
        };
        const that = this;
        window.setTimeout(() => {
            that.setState({
                synlig: true
            });
        }, 200);
    }

    render() {
        return (<div className={`panel typo-infotekst blokk-l under-utvikling-varsel ${(this.state.synlig ? 'er-synlig' : '')}`}>
            <h2 className="hode hode-informasjon hode-dekorert typo-innholdstittel">Første versjon av ny tjeneste</h2>
            <p>Sidene er under kontinuerlig utvikling og vil på sikt inneholde mer tilpasset informasjon og flere verktøy. Løsningen inneholder en digital visning av sykmeldingen. Om du kan se sykmeldingen avhenger av hvilket system din lege/sykmelder bruker.</p>
            <button className="modal-lukk" onClick={() => { this.props.skjulUnderUtviklingVarsel();}}>Lukk og ikke vis igjen</button>
        </div>);
    }

}

Varsel.propTypes = {
    skjulUnderUtviklingVarsel: PropTypes.func,
};

function mapStateToProps() {
    return {};
}

const UnderUtviklingVarselContainer = connect(mapStateToProps, actionCreators)(Varsel);

export default UnderUtviklingVarselContainer;
