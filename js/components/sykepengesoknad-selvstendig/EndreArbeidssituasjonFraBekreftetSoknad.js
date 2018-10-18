import React, { Component } from 'react';
import Knapp from 'nav-frontend-knapper';
import { getLedetekster } from 'digisyfo-npm';
import { connectAngreArbeidssituasjon } from '../../containers/sykmelding/AngreBekreftSykmeldingContainer';
import Lightbox from '../Lightbox';
import Feilstripe from '../Feilstripe';
import { getLedetekst } from 'digisyfo-npm';

const BekreftLightbox = ({ isOpen, onClose, angreBekreftSykmelding, angreBekreftSykmeldingFeilet, sykmelding }) => {
        return isOpen
            ? (<Lightbox bredde="m" onClose={onClose}>
                <h3 className="modal__tittel">{getLedetekst('din-sykmelding.arbeidssituasjon.tittel.2')}</h3>
                <p>{getLedetekst('din-sykmelding.gjenapne.lightboks.tekst')}</p>
                <Feilstripe vis={angreBekreftSykmeldingFeilet} />
                <div className="knapperad">
                    <Knapp
                        onClick={(e) => {
                            e.preventDefault();
                            angreBekreftSykmelding(sykmelding.id);
                        }}
                        type="hoved"
                        className="blokk--s">{getLedetekst('din-sykmelding.gjenapne.lightboks.knapp')}</Knapp>
                    <p><button className="lenke" onClick={onClose}>{getLedetekst('din-sykmelding.gjenapne.lightboks.lukk')}</button></p>
                </div>
            </Lightbox>)
            : null;
}

class Lenke extends Component {
    constructor(props) {
        super(props);
        this.toggleLightbox = this.toggleLightbox.bind(this);
        this.state = {
            visLightbox: false,
        };
    }

    toggleLightbox(e) {
        if (e) {
            e.preventDefault();
        }
        this.setState({
            visLightbox: !this.state.visLightbox,
        });
    }

    render() {
        return (<div>
            <BekreftLightbox
                sykmelding={this.props.sykmelding}
                isOpen={this.state.visLightbox}
                onClose={this.toggleLightbox}
                angreBekreftSykmelding={this.props.angreBekreftSykmelding}
                angreBekreftSykmeldingFeilet={this.props.angreBekreftSykmeldingFeilet} />
            <p>
                <button type="button" className="lenke" onClick={this.toggleLightbox}>
                    Er dette feil?
                </button>
            </p>
        </div>)
    }
}

const EndreArbeidssituasjonFraBekreftetSoknad = connectAngreArbeidssituasjon(Lenke);

export default EndreArbeidssituasjonFraBekreftetSoknad;
