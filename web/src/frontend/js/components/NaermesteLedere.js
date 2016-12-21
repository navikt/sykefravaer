import React, { Component, PropTypes } from 'react';
import Lightbox from './Lightbox';
import BekreftFeilLederContainer from '../containers/BekreftFeilLederContainer';

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
        const knapp = this.refs[`js-leder-${this.state.leder.orgnummer}`];
        if (knapp) {
            knapp.focus();
        }
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
                <BekreftFeilLederContainer orgnummer={this.state.leder.orgnummer} onAvbryt={() => {
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
