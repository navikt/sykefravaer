import React, { Component, PropTypes } from 'react';
import { Varselstripe } from 'digisyfo-npm';

const ledetekster = {
    mote: 'Kunne ikke hente dialogmøter',
    dineSykmeldinger: 'Kunne ikke hente dine sykmeldinger',
    sykepengesoknader: 'Kunne ikke hente sykepengesoknader',
    ledere: 'Kunne ikke hente din(e) nærmeste leder(e)',
};

const Feiliste = ({ feilliste }) => {
    return (<ul className="sist">
        {
            feilliste.map((feil, idx) => {
                return <li key={idx}>{ledetekster[feil]}</li>;
            })
        }
    </ul>);
};

Feiliste.propTypes = {
    feilliste: PropTypes.array,
};

class Serverfeilmelding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visFeil: false,
        };
    }

    toggleVisFeil() {
        this.setState({
            visFeil: !this.state.visFeil,
        });
    }

    visFeillisteknapp() {
        const { feilliste } = this.props;
        const keys = Object.keys(ledetekster);
        for (let i = 0; i < keys.length; i++) {
            if (feilliste.indexOf(keys[i]) > -1) {
                return true;
            }
        }
        return false;
    }

    render() {
        const { noeErFeil, feilliste } = this.props;
        const visKnapp = this.visFeillisteknapp();

        if (!noeErFeil) {
            return null;
        }
        return (<div className="panel landingspanel" role="alert">
            <Varselstripe type="feil" fylt>
                <p className="sist">
                    <strong>Ai ai ai!</strong><span> Vi har problemer med noen av baksystemene nå. </span>
                    {
                        visKnapp && <button onClick={(e) => {
                            e.preventDefault();
                            this.toggleVisFeil();
                        }} className="lenke" aria-toggle={this.state.visFeil}>Se hva som er feil</button>
                    }
                </p>
            </Varselstripe>
            { visKnapp && <div aria-live="polite">
                { this.state.visFeil && <Feiliste feilliste={feilliste} /> }
            </div>}
        </div>);
    }
}

Serverfeilmelding.propTypes = {
    feilliste: PropTypes.array,
    noeErFeil: PropTypes.bool,
};

export default Serverfeilmelding;
