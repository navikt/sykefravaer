import React, { Component, PropTypes } from 'react';
import Lightbox from './Lightbox';

export const BekreftFeil = ({ leder, onAvbryt, onBekreft }) => {
    return (<div>
        <h3 className="typo-undertittel">Feil nærmeste leder</h3>
        <p>Er du sikker på at det er feil at <strong>{leder.navn}</strong> er din nærmeste leder i {leder.organisasjon}?</p>
        <div className="knapperad">
            <button type="button" className="knapp knapp-fare blokk-s js-bekreft" onClick={() => {
                onBekreft(leder.orgnummer);
            }}>Ja, dette er feil</button>
            <p className="side-innhold"><a className="js-avbryt" href="#" role="button" onClick={(e) => {
                e.preventDefault();
                onAvbryt();
            }}>Avbryt</a></p>
        </div>
    </div>);
};

BekreftFeil.propTypes = {
    leder: PropTypes.object,
    onAvbryt: PropTypes.func,
    onBekreft: PropTypes.func,
};

export default class NaermesteLedere extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visLightbox: false,
        };
    }

    apneLightbox(leder) {
        this.setState({
            visLightbox: true,
            leder,
        });
    }

    lukkLightbox() {
        this.refs[`js-leder-${this.state.leder.orgnummer}`].focus();
        this.setState({
            visLightbox: false,
            leder: undefined,
        });
    }

    render() {
        const { ledere } = this.props;
        return (<div className="panel blokk">
            {this.state.visLightbox && <Lightbox onClose={() => {
                this.lukkLightbox();
            }}>
                <BekreftFeil leder={this.state.leder} onAvbryt={() => {
                    this.lukkLightbox();
                }} />
            </Lightbox>}
            <h2 className="typo-undertittel">Din nærmeste leder</h2>
            <p>Din nærmeste leder med personalansvar vil få se sykmeldinger du sender inn fra nav.no.</p>
            {
                ledere.map((leder, index) => {
                    return (<div className="leder" key={index}>
                        <div className="leder__data">
                            <h3>{leder.navn}</h3>
                            <p>{leder.organisasjon}</p>
                        </div>
                        <div className="leder__handlinger">
                            <button ref={`js-leder-${leder.orgnummer}`} type="button" className="rammeknapp knapp-liten js-feil" onClick={() => {
                                this.apneLightbox(leder);
                            }}>Dette er feil</button>
                        </div>
                    </div>);
                })
            }
        </div>);
    }
}

NaermesteLedere.propTypes = {
    ledere: PropTypes.array,
    ledetekster: PropTypes.object,
};
