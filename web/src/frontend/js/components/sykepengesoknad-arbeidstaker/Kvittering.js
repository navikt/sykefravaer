import React, { Component } from 'react';
import { Link } from 'react-router';
import { getLedetekst, getHtmlLedetekst, scrollTo, erSynligIViewport } from 'digisyfo-npm';
import Sidetopp from '../Sidetopp';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import { getSendtTilSuffix } from '../../utils/sykepengesoknadUtils';

class Kvittering extends Component {
    componentDidMount() {
        const el = this.kvittering;
        if (!erSynligIViewport(el)) {
            scrollTo(el, 200);
        }
    }

    render() {
        const { sykepengesoknad } = this.props;
        return (<div ref={(c) => {
            this.kvittering = c;
        }}>
            <Sidetopp tittel="Kvittering" />
            <div className="panel blokk js-kvittering">
                <div className="hode hode--suksess">
                    <h2 className="hode__tittel">{getLedetekst(`sykepengesoknad.kvittering${getSendtTilSuffix(sykepengesoknad)}.tittel`)}</h2>
                    <div
                        className="redaksjonelt-innhold"
                        dangerouslySetInnerHTML={getHtmlLedetekst(`sykepengesoknad.kvittering${getSendtTilSuffix(sykepengesoknad)}.tekst`, {
                            '%ARBEIDSGIVER%': sykepengesoknad.arbeidsgiver ? sykepengesoknad.arbeidsgiver.navn : '',
                        })} />
                </div>
            </div>
            <p className="ikke-print blokk navigasjonsstripe">
                <Link to="/sykefravaer/soknader" className="tilbakelenke">
                    Gå til dine sykepengesøknader
                </Link>
            </p>
        </div>);
    }
}

Kvittering.propTypes = {
    sykepengesoknad: sykepengesoknadPt.isRequired,
};

export default Kvittering;
