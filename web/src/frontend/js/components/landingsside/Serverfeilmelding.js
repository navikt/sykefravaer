import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Varselstripe } from 'digisyfo-npm';

const ledetekster = {
    mote: 'Kunne ikke hente dialogmøter',
    dineSykmeldinger: 'Kunne ikke hente dine sykmeldinger',
    sykepengesoknader: 'Kunne ikke hente sykepengesøknader',
    oppfolgingsdialoger: 'Kunne ikke hente oppfølgingsplaner',
    ledere: 'Kunne ikke hente din(e) nærmeste leder(e)',
    hendelser: 'Kunne ikke hente alle hendelser',
    sykeforloep: 'Kunne ikke hente ditt siste sykeforløp',
};

const Feiliste = ({ feilliste }) => {
    return (<ul className="sist">
        {
            feilliste.map((feil, idx) => {
                const melding = ledetekster[feil];
                if (melding) {
                    return <li key={idx}>{melding}</li>;
                }
                return null;
            })
        }
    </ul>);
};

Feiliste.propTypes = {
    feilliste: PropTypes.arrayOf(PropTypes.string),
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
        for (let i = 0; i < keys.length; i += 1) {
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
                        visKnapp && <button
                            onClick={(e) => {
                                e.preventDefault();
                                this.toggleVisFeil();
                            }}
                            className="lenke"
                            aria-pressed={this.state.visFeil}>Se hva som er feil</button>
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
    feilliste: PropTypes.arrayOf(PropTypes.string),
    noeErFeil: PropTypes.bool,
};

export default Serverfeilmelding;
