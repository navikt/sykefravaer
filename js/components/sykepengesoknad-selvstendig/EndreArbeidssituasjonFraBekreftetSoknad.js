import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Knapp from 'nav-frontend-knapper';
import { getLedetekst, sykmelding as sykmeldingPt } from 'digisyfo-npm';
import { connectAngreArbeidssituasjon } from '../../containers/sykmelding/AngreBekreftSykmeldingContainer';
import Lightbox from '../Lightbox';
import Feilstripe from '../Feilstripe';

const BekreftLightbox = ({ isOpen, onClose, angreBekreftSykmelding, angrerBekreftSykmelding, angreBekreftSykmeldingFeilet, sykmelding }) => {
    return isOpen
        ? (<Lightbox bredde="m" onClose={onClose}>
            <h3 className="modal__tittel">{getLedetekst('din-sykmelding.arbeidssituasjon.tittel.2')}</h3>
            <p>{getLedetekst('din-sykmelding.gjenapne.lightboks.tekst')}</p>
            <Feilstripe vis={angreBekreftSykmeldingFeilet} />
            <div className="knapperad">
                <Knapp
                    spinner={angrerBekreftSykmelding}
                    disabled={angrerBekreftSykmelding}
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
};

BekreftLightbox.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    angreBekreftSykmelding: PropTypes.func,
    angreBekreftSykmeldingFeilet: PropTypes.bool,
    angrerBekreftSykmelding: PropTypes.bool,
    sykmelding: sykmeldingPt,
};

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
        return this.props.vis
            ? (<div>
                <BekreftLightbox
                    isOpen={this.state.visLightbox}
                    onClose={this.toggleLightbox}
                    sykmelding={this.props.sykmelding}
                    angreBekreftSykmelding={this.props.angreBekreftSykmelding}
                    angreBekreftSykmeldingFeilet={this.props.angreBekreftSykmeldingFeilet} />
                <p>
                    <button type="button" className="lenke" onClick={this.toggleLightbox}>
                        {getLedetekst('din-sykmelding.gjenapne.apne-lightbox')}
                    </button>
                </p>
            </div>)
            : null;
    }
}

Lenke.propTypes = {
    sykmelding: sykmeldingPt,
    angreBekreftSykmelding: PropTypes.func,
    angreBekreftSykmeldingFeilet: PropTypes.bool,
    vis: PropTypes.bool,
};

const EndreArbeidssituasjonFraBekreftetSoknad = connectAngreArbeidssituasjon(Lenke);

export default EndreArbeidssituasjonFraBekreftetSoknad;
