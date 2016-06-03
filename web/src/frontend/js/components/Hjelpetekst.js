import React, { PropTypes, Component } from 'react';
import { getLedetekst } from '../ledetekster';

class Hjelpetekst extends Component {
    constructor(props) {
        super(props);
        this.state = {
            erApen: props.erApen === true,
        };
    }

    componentDidUpdate() {
        const focusRef = this.state.erApen ? 'js-lukk' : 'js-apne';
        this.refs[focusRef].focus(); 
    }

    apne() {
        this.setState({ erApen: true });
    }

    lukk() {
        this.setState({ erApen: false });
    }

    toggle() {
        if (this.state.erApen) {
            this.lukk();
        } else {
            this.apne();
        }
    }

    render() {
        const ariaId = `tooltip-${this.props.id}`;
        return (
            <div className="hjelpetekst">
                <button type="button" className="hjelpetekst-ikon js-apne" aria-describedby={ariaId}
                        onClick={(event) => { this.toggle(event); }} ref="js-apne">
                        <span aria-hidden="true">?</span>
                         <span className="vekk">
                            ? Hjelpetekst
                        </span>
                </button>
                <div role="tooltip" id={ariaId}
                     className={`hjelpetekst-tooltip js-tooltip ${this.state.erApen ? 'er-synlig' : ''}`}>
                    <h3 className="decorated hjelpetekst-tittel js-tittel">{this.props.tittel}</h3>
                    <div className="hjelpetekst-tekst js-tekst">
                        <p>
                            {this.props.tekst}
                        </p>
                    </div>
                    <button type="button" className="hjelpetekst-lukk js-lukk"
                            aria-controls={ariaId}
                            onClick={() => { this.lukk(); }}
                            ref="js-lukk">
                             <span className="vekk">
                                Lukk
                            </span>
                    </button>
                </div>
            </div>
        );
    }
}

Hjelpetekst.propTypes = {
    ledetekster: PropTypes.object,
    id: PropTypes.number,
};

export default Hjelpetekst;

