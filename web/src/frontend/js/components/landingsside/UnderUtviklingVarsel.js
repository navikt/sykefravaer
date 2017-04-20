import React, { Component, PropTypes } from 'react';
import { getLedetekst, Varselstripe } from 'digisyfo-npm';

class UnderUtviklingVarsel extends Component {
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
        return (<div className={`panel typo-infotekst blokk--l underUtvikling ${(this.state.synlig ? 'underUtvikling--erSynlig' : '')}`}>
            <Varselstripe>
                <p className="sist">{getLedetekst('under-utvikling.varsel.tekst')}</p>
            </Varselstripe>
            <button className="js-lukk lightbox__lukk" onClick={() => {
                this.props.skjulUnderUtviklingVarsel();
            }}>{getLedetekst('under-utvikling.varsel.lukk')}</button>
        </div>);
    }

}

UnderUtviklingVarsel.propTypes = {
    skjulUnderUtviklingVarsel: PropTypes.func,
};

export default UnderUtviklingVarsel;
