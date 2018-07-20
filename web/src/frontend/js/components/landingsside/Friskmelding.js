import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Bjorn, getHtmlLedetekst, getLedetekst, log } from 'digisyfo-npm';
import { Experiment, Variant } from 'react-ab';
import { Knapp } from 'nav-frontend-knapper';
import { getContextRoot } from '../../routers/paths';
import { Vis } from '../../utils';
import Lightbox from '../Lightbox';

const track = (event, variant, datalayerData, sykefravaerVarighet) => {
    /* eslint-disable quote-props */
    const data = { ...datalayerData, sykefravaerVarighet };
    const args = {
        'event': event,
        'variant': variant,
        'metadata': JSON.stringify(data),
    };
    /* eslint-enable quote-props */
    log(args);
    window.dataLayer.push(args);
};

const Friskmeldingslightbox = ({ lukk }) => {
    return (<Lightbox onClose={lukk}>
        <h2 className="modal__tittel">{getLedetekst('friskmelding.info-tittel.helt')}</h2>
        <div
            className="redaksjonelt-innhold blokk"
            dangerouslySetInnerHTML={getHtmlLedetekst('friskmelding.info.helt')} />
        <h2 className="panel__tittel">{getLedetekst('friskmelding.info-tittel.delvis')}</h2>
        <div
            className="redaksjonelt-innhold"
            dangerouslySetInnerHTML={getHtmlLedetekst('friskmelding.info.delvis')} />
    </Lightbox>);
};

Friskmeldingslightbox.propTypes = {
    lukk: PropTypes.func,
};

const TekstOgKnapp = ({ onClick, tekstnokkel }) => {
    return (<div>
        <p>{getLedetekst(tekstnokkel)}</p>
        <p className="sist">
            <Knapp
                mini
                onClick={onClick}>{getLedetekst('friskmelding.bjorn-knapp')}</Knapp>
        </p>
    </div>);
};

TekstOgKnapp.propTypes = {
    onClick: PropTypes.func,
    tekstnokkel: PropTypes.string,
};

const TekstOgLenke = ({ onClick, tekstnokkel }) => {
    return (<p>{getLedetekst(tekstnokkel)} <button onClick={onClick} type="button" className="lenke">Les mer om hva du kan gjøre.</button></p>);
};

TekstOgLenke.propTypes = TekstOgKnapp.propTypes;

class Friskmelding extends Component {
    constructor(props) {
        super(props);
        this.visLightbox = this.visLightbox.bind(this);
        this.lukkLightbox = this.lukkLightbox.bind(this);
        this.startABTest = this.startABTest.bind(this);
        this.state = {
            visLightbox: false,
        };
    }

    pushToDataLayer(event, variant) {
        const v = variant || this.state.variant;
        track(event, v, this.props.datalayerData, this.props.sykefravaerVarighet);
    }

    visLightbox() {
        this.pushToDataLayer('FRISKMELDINGSKNAPP_KLIKKET');
        this.setState({
            visLightbox: true,
        });
    }

    lukkLightbox() {
        this.setState({
            visLightbox: false,
        });
    }

    startABTest(eksperiment, variant) {
        this.setState({ variant });
        this.pushToDataLayer('FRISKMELDINGSKNAPP_VIST', variant);
    }

    render() {
        return ([
            <Bjorn key="friskmeldingsbjorn" rootUrl={getContextRoot()} className="landingspanel" hvit>
                <Experiment name="friskmeldingsknapp_lenke_eller_knapp" onChoice={this.startABTest}>
                    <Variant name="FRISKMELDING_KNAPP">
                        <TekstOgKnapp onClick={this.visLightbox} tekstnokkel="friskmelding.bjorn" />
                    </Variant>
                    <Variant name="FRISKMELDING_LENKE">
                        <TekstOgLenke onClick={this.visLightbox} tekstnokkel="friskmelding.bjorn" />
                    </Variant>
                </Experiment>
            </Bjorn>,
            <Vis
                key="friskmeldingslightbox"
                hvis={this.state.visLightbox}
                render={() => {
                    return <Friskmeldingslightbox lukk={this.lukkLightbox} />;
                }} />,
        ]);
    }
}

Friskmelding.propTypes = {
    sykefravaerVarighet: PropTypes.number,
    datalayerData: PropTypes.shape({
        erSykmeldt: PropTypes.bool,
        antallDagerTilFrisk: PropTypes.number,
        sykmeldingstype: PropTypes.string,
    }),
};

export default Friskmelding;
