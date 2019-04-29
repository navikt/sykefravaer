import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alertstripe from 'nav-frontend-alertstriper';
import { Vis } from '../../utils/index';
import logger from '../../logging';

const ledetekster = {
    mote: 'Kunne ikke hente dialogmøter',
    dineSykmeldinger: 'Kunne ikke hente dine sykmeldinger',
    sykepengesoknader: 'Kunne ikke hente sykepengesøknader',
    soknader: 'Kunne ikke hente søknader',
    oppfolgingsdialoger: 'Kunne ikke hente oppfølgingsplaner',
    ledere: 'Kunne ikke hente din(e) nærmeste leder(e)',
    hendelser: 'Kunne ikke hente alle hendelser',
    sykeforloep: 'Kunne ikke hente ditt siste sykeforløp',
    sykeforloepMetadata: 'Kunne ikke hente metadata for ditt siste sykeforløp',
    smSykmeldinger: 'Kunne ikke hente alle dine sykmeldinger',
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

class AiAiAiFeilmelding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visFeil: false,
        };
    }

    componentDidMount() {
        const { feilliste } = this.props;
        if (feilliste.length > 0) {
            logger.error(`Bruker fikk aiaiai med feilmeldinger: [${feilliste.join(', ')}]`);
        }
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

        return (
            <Vis
                hvis={noeErFeil}
                render={() => {
                    return (
                        <Alertstripe type="advarsel" className="landingspanel">
                            <p className="sist">
                                <strong>Ai ai ai!</strong><span> Vi har problemer med noen av baksystemene nå. </span>
                                <Vis
                                    hvis={visKnapp}
                                    render={() => {
                                        return (<button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                this.toggleVisFeil();
                                            }}
                                            className="lenke"
                                            aria-pressed={this.state.visFeil}>Se hva som er feil</button>);
                                    }} />
                            </p>
                            {
                                visKnapp && <div aria-live="polite">
                                    { this.state.visFeil && <Feiliste feilliste={feilliste} /> }
                                </div>
                            }
                        </Alertstripe>
                    );
                }} />);
    }
}

AiAiAiFeilmelding.propTypes = {
    feilliste: PropTypes.arrayOf(PropTypes.string),
    noeErFeil: PropTypes.bool,
};

export default AiAiAiFeilmelding;
