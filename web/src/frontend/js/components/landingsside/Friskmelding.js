import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Bjorn, getHtmlLedetekst, getLedetekst, log } from 'digisyfo-npm';
import { Experiment, Variant } from 'react-ab';
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
        <h2 className="panel__tittel">{getLedetekst('friskmelding.info-tittel.helt')}</h2>
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

const TekstOgKnapp = ({ onClick, withRef, tekstnokkel }) => {
    return (<div>
        <p>{getLedetekst(tekstnokkel)}</p>
        <p className="sist">
            <button
                ref={withRef}
                onClick={onClick}
                className="rammeknapp rammeknapp--mini"
                type="button">{getLedetekst('friskmelding.bjorn-knapp')}</button>
        </p>
    </div>);
};

TekstOgKnapp.propTypes = {
    onClick: PropTypes.func,
    withRef: PropTypes.func,
    tekstnokkel: PropTypes.string,
};

class Friskmelding extends Component {
    constructor(props) {
        super(props);
        this.visLightbox = this.visLightbox.bind(this);
        this.lukkLightbox = this.lukkLightbox.bind(this);
        this.withRef = this.withRef.bind(this);
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
        this.knapp.focus();
        this.setState({
            visLightbox: false,
        });
    }

    startABTest(eksperiment, variant) {
        this.setState({ variant });
        this.pushToDataLayer('FRISKMELDINGSKNAPP_VIST', variant);
    }

    withRef(c) {
        this.knapp = c;
    }

    render() {
        return ([
            <Experiment name="friskmeldingsknapp_bjorn" onChoice={this.startABTest}>
                <Variant name="BJORN">
                    <Bjorn key="friskmeldingsbjorn" rootUrl={getContextRoot()} className="landingspanel" hvit>
                        <TekstOgKnapp onClick={this.visLightbox} withRef={this.withRef} tekstnokkel="friskmelding.bjorn" />
                    </Bjorn>
                </Variant>
                <Variant name="IKKE_BJORN">
                    <div className="panel landingspanel">
                        <TekstOgKnapp onClick={this.visLightbox} withRef={this.withRef} tekstnokkel="friskmelding.introtekst" />
                    </div>
                </Variant>
            </Experiment>,
            <Vis key="friskmeldingslightbox" hvis={this.state.visLightbox}>
                <Friskmeldingslightbox lukk={this.lukkLightbox} />
            </Vis>,
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
